import { NextResponse } from 'next/server';

interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubGraphQLResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    };
  };
  errors?: { message: string }[];
}

export async function GET() {
  const username = 'Vighnesh-Gaddam';
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ weeks: null, error: 'No token configured' }, { status: 401 });
  }

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error('[GitHub API] HTTP error:', res.status);
      return NextResponse.json({ weeks: null }, { status: 500 });
    }

    const json: GitHubGraphQLResponse = await res.json();

    if (json.errors?.length) {
      console.error('[GitHub API] GraphQL errors:', json.errors);
      return NextResponse.json({ weeks: null }, { status: 500 });
    }

    const { weeks, totalContributions } =
      json.data.user.contributionsCollection.contributionCalendar;

    const last52 = weeks.slice(-52).map((week) =>
      week.contributionDays.map((day) => ({
        count: day.contributionCount,
        date: day.date,
      }))
    );

    return NextResponse.json({ weeks: last52, total: totalContributions });
  } catch (err) {
    console.error('[GitHub API] Exception:', err);
    return NextResponse.json({ weeks: null }, { status: 500 });
  }
}