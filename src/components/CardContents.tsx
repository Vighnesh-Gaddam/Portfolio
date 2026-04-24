'use client';

import React, { useCallback, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Terminal,
  Database,
  Code2,
  GraduationCap,
  ArrowUpRight,
  Brain,
  Cpu,
  Layout,
  Server,
  FolderOpen,
  Layers,
  Quote,
} from 'lucide-react';
import {
  testimonials,
  blogPosts,
  person,
  socials,
  experiences,
  education,
  projects,
} from '@/data/siteConfig';
import { useTheme } from 'next-themes';

interface SocialsProps {
  onOpenConnect?: () => void;
}

// ─── INTRO ──────────────────────────────────────────────────
export const IntroContent: React.FC = () => {
  const renderBio = useCallback(() => {
    const parts = person.bio.split(/(<full-stack>.*?<\/full-stack>|<devops>.*?<\/devops>)/g);
    return parts.map((part, i) => {
      if (part.startsWith('<full-stack>')) {
        return <span key={i} className="text-main font-semibold">{part.replace(/<\/?full-stack>/g, '')}</span>;
      }
      if (part.startsWith('<devops>')) {
        return <span key={i} className="text-main font-semibold">{part.replace(/<\/?devops>/g, '')}</span>;
      }
      return part;
    });
  }, []);

  return (
    <div className="relative h-full flex flex-col justify-between">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex justify-end">
        <div className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-card border border-custom shadow-sm hover:border-emerald-500/30 cursor-default group transition-all">
          <div className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500" />
          </div>
          <span className="text-[8px] sm:text-[0.65rem] font-semibold tracking-wider uppercase text-muted group-hover:text-main transition-colors duration-200">
            {person.available ? 'AVAILABLE FOR WORK' : 'NOT AVAILABLE'}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 mt-auto">
        <div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.85] text-main">
            {person.firstName}
          </h1>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.85] text-muted/20">
            {person.lastName}
          </h1>
        </div>
        <div className="block md:max-w-40 md:text-right pb-1">
          <p className="text-[0.65rem] sm:text-xs text-muted font-medium leading-relaxed opacity-80">
            {renderBio()}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── SOCIALS ────────────────────────────────────────────────
export const SocialsContent: React.FC<SocialsProps> = ({ onOpenConnect }) => (
  <div className="flex flex-col h-full gap-2 sm:gap-3 w-full">
    <div className="flex-1 flex gap-2 sm:gap-3 min-h-0">

      <a href={socials.github}
        target="_blank"
        rel="noreferrer"
        className="group/github flex-1 flex items-center justify-center rounded-2xl sm:rounded-3xl bg-card-hover border border-custom transition-colors duration-200 [@media(hover:hover)]:hover:bg-(--text-main)"
      >
        <Github className="w-6 h-6 sm:w-8 sm:h-8 text-main transition-colors duration-200 [@media(hover:hover)]:group-hover/github:text-(--text-inverse)" />
      </a>

      <a href={socials.linkedin}
        target="_blank"
        rel="noreferrer"
        className="flex-1 flex items-center justify-center rounded-2xl sm:rounded-3xl bg-card-hover border border-custom transition-colors duration-200 [@media(hover:hover)]:hover:bg-[#0077b5]"
      >
        <Linkedin className="w-6 h-6 sm:w-8 sm:h-8 text-main [@media(hover:hover)]:hover:text-white transition-colors duration-200" />
      </a>
    </div>
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onOpenConnect?.(); }}
      className="group h-11 sm:h-14 w-full bg-text-main text-page rounded-2xl sm:rounded-3xl flex items-center justify-between px-4 sm:px-6 font-bold shadow-md transition-all hover:shadow-xl active:scale-[0.98]"
    >
      <span className="text-[0.65rem] sm:text-xs tracking-wide">Contact & Resume</span>
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-(--bg-page) group-hover:text-(--text-main)">
        <ArrowUpRight size={14} />
      </div>
    </button>
  </div>
);

// ─── TECH ICON ───────────────────────────────────────────────

const TechIcon = React.memo(function TechIcon({
  icon,
  label,
  hoverColor,
}: {
  icon: React.ReactNode;
  label: string;
  hoverColor: string;
}) {
  return (
    <div
      className="group/tech flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-card-hover border border-custom/50 shrink-0 shadow-sm cursor-default transition-all duration-300 [@media(hover:hover)]:hover:scale-105 [@media(hover:hover)]:hover:shadow-md [@media(hover:hover)]:hover:border-(--hover-color)"
      style={{ ['--hover-color' as string]: hoverColor }}
    >
      <span className="text-muted transition-colors duration-300 [@media(hover:hover)]:group-hover/tech:text-(--hover-color)">
        {icon}
      </span>
      <span className="text-[0.65rem] sm:text-xs font-semibold text-main whitespace-nowrap transition-colors duration-300 [@media(hover:hover)]:group-hover/tech:text-(--hover-color)">
        {label}
      </span>
    </div>
  );
});



// ─── TECH STACK ──────────────────────────────────────────────
const techRow1 = [
  { icon: <Code2 size={14} />, label: 'React', hoverColor: '#61DAFB' },
  { icon: <Cpu size={14} />, label: 'Next.js', hoverColor: '#ffffff' },
  { icon: <Terminal size={14} />, label: 'TypeScript', hoverColor: '#3178C6' },
  { icon: <Layout size={14} />, label: 'Tailwind', hoverColor: '#06B6D4' },
  { icon: <Brain size={14} />, label: 'Gemini API', hoverColor: '#8B5CF6' },
  { icon: <Database size={14} />, label: 'PostgreSQL', hoverColor: '#336791' },
];

const techRow2 = [
  { icon: <Server size={14} />, label: 'Node.js', hoverColor: '#68A063' },
  { icon: <Code2 size={14} />, label: 'Java', hoverColor: '#FFD43B' },
  { icon: <Database size={14} />, label: 'MongoDB', hoverColor: '#00ED64' },
  { icon: <Layout size={14} />, label: 'Framer Motion', hoverColor: '#FF0080' },
  { icon: <Terminal size={14} />, label: 'Docker', hoverColor: '#2496ED' },
  { icon: <Database size={14} />, label: 'Prisma', hoverColor: '#DC382D' },
];

export const TechStackContent = React.memo(function TechStackContent() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center h-full w-full relative overflow-hidden py-4">
      <div className="flex gap-3 overflow-x-hidden w-full mb-3 py-1">
        <div className="flex shrink-0 animate-marquee items-center gap-3">
          {techRow1.map((item, i) => <TechIcon key={`r1-${i}`} {...item} />)}
        </div>
        <div className="flex shrink-0 animate-marquee items-center gap-3">
          {techRow1.map((item, i) => <TechIcon key={`r1-d-${i}`} {...item} />)}
        </div>
      </div>
      <div className="flex gap-3 overflow-x-hidden w-full py-1">
        <div className="flex shrink-0 animate-marquee-reverse items-center gap-3">
          {techRow2.map((item, i) => <TechIcon key={`r2-${i}`} {...item} />)}
        </div>
        <div className="flex shrink-0 animate-marquee-reverse items-center gap-3">
          {techRow2.map((item, i) => <TechIcon key={`r2-d-${i}`} {...item} />)}
        </div>
      </div>
    </div>
  );
});

// ─── ABOUT ───────────────────────────────────────────────────
export const AboutContent: React.FC = () => (
  <div className="h-full flex flex-col justify-end relative z-10">
    <div className="mb-1.5 sm:space-y-1 sm:mb-3">
      <div className="flex items-baseline gap-2">
        <span className="text-[0.6rem] font-bold text-muted opacity-40 font-mono">01</span>
        <p className="text-xs font-semibold text-main">Build with precision</p>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[0.6rem] font-bold text-muted opacity-40 font-mono">02</span>
        <p className="text-xs font-semibold text-muted">Ship clean code</p>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[0.6rem] font-bold text-muted opacity-40 font-mono">03</span>
        <p className="text-xs font-semibold text-muted opacity-50">Scale quietly</p>
      </div>
    </div>
    <p className="text-[0.7rem] text-muted leading-relaxed">
      No fluff — just functional code.
    </p>
  </div>
);

// ─── EXPERIENCE ──────────────────────────────────────────────
export const ExperienceContent: React.FC = () => {
  const previous = experiences.find(e => !e.current);

  return (
    <div className="h-full flex flex-col justify-end">

      <div className="flex flex-col gap-2 sm:gap-3">

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <p className="text-[11px] sm:text-xs font-bold text-main leading-none">
              Freelance & Full-time
            </p>
          </div>
          <p className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.15em] text-muted/50 pl-3.5">
            Seeking new roles
          </p>
        </div>

        <div className="flex flex-col gap-0.5 opacity-35">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-1.5 h-1.5 rounded-full border border-white/30 shrink-0" />
            <p className="text-[10px] sm:text-[11px] font-bold text-muted leading-none truncate">
              {previous?.company}
            </p>
            <span className="text-muted/30 text-[8px] shrink-0">·</span>
            <span className="text-[8px] font-mono text-muted/40 shrink-0 tabular-nums">
              {previous?.period}
            </span>
          </div>
          <p className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.15em] text-muted/50 pl-3.5 truncate">
            {previous?.role}
          </p>
        </div>

      </div>

    </div>
  );
};

// ─── EDUCATION ───────────────────────────────────────────────
export const EducationContent: React.FC = () => {
  const current = education[0];
  return (
    <div className="h-full flex flex-col justify-end pb-1 sm:pb-0 pt-4 relative">
      <div className="absolute top-0 right-0 p-24 bg-linear-to-br from-primary/5 to-purple-500/5 blur-[60px] rounded-full pointer-events-none z-0" />
      <div className="mt-auto space-y-2 sm:space-y-3 relative z-10">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-card border border-custom flex items-center justify-center text-main shadow-sm">
          <GraduationCap size={18} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-[10px] sm:text-[11px] md:text-lg font-bold text-main leading-tight mb-0.5">
            {current.degree.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            <p className="text-muted text-[0.65rem] sm:text-xs font-medium truncate">{current.institution}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PROJECTS ────────────────────────────────────────────────
export const ProjectsTriggerContent = React.memo(function ProjectsTriggerContent() {
  return (
    <div className="relative h-full flex flex-col justify-end group/projects overflow-hidden p-1">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover/projects:bg-primary/25 transition-colors duration-500" />
      <div className="relative z-10">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-card border border-custom flex items-center justify-center text-main shadow-sm mb-2 group-hover/projects:border-primary/30 transition-all duration-500">
          <FolderOpen size={16} strokeWidth={1.5} />
        </div>
        <h3 className="text-xs sm:text-base font-bold text-main tracking-tight leading-tight">Featured Projects</h3>
        <p className="text-[0.45rem] sm:text-[0.65rem] font-semibold uppercase tracking-widest text-muted mt-1 flex items-center gap-1.5">
          <Layers size={11} /> View Portfolio
        </p>
      </div>
      <div className="relative z-10 flex -space-x-2 mt-2">
        {projects.slice(0, 3).map((p, i) => (
          <div
            key={p.id}
            className="w-6 h-6 rounded-full border-2 border-custom bg-card-hover flex items-center justify-center text-[0.55rem] font-bold text-muted shadow-sm transition-transform group-hover/projects:-translate-y-0.5"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {i === 2 ? `+${projects.length - 2}` : ''}
          </div>
        ))}
      </div>
    </div>
  );
});



// ─── TESTIMONIALS ────────────────────────────────────────────
export const TestimonialsContent = React.memo(function TestimonialsContent() {
  const t = testimonials[0];
  return (
    <div className="h-full flex flex-col justify-between relative z-10">
      <div className="flex items-center gap-1.5">
        <Quote size={12} className="text-primary/60" strokeWidth={2} />
        <span className="text-[0.55rem] font-bold uppercase tracking-widest text-muted">Testimonial</span>
      </div>
      <div className="flex-1 flex items-center py-2">
        <p className="text-[0.55rem] sm:text-[0.65rem] text-main font-medium leading-relaxed line-clamp-4 italic">
          &quot;{t.text}&quot;
        </p>
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-custom">
        <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-[0.55rem] shrink-0">
          {t.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-[0.65rem] font-bold text-main truncate">{t.name}</p>
          <p className="text-[0.55rem] text-muted uppercase tracking-wider font-semibold truncate">
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </div>
  );
});

// ─── BLOG ────────────────────────────────────────────────────
export const BlogContent = React.memo(function BlogContent() {
  const latest = blogPosts[0];
  return (
    <div className="h-full flex flex-col justify-between relative z-10">
      <div className="flex-1 flex flex-col justify-center py-2 relative z-10">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted">Latest</p>
          <span className="text-[8px] font-mono text-muted/50 tabular-nums">
            {String(blogPosts.length).padStart(2, '0')}
          </span>
        </div>
        <h3 className="text-[0.65rem] sm:text-xs font-bold text-main leading-snug line-clamp-3 mb-2">
          {latest.title}
        </h3>
        <div className="hidden sm:flex items-center gap-1.5">
          {latest.tags.slice(0, 1).map(tag => (
            <span key={tag} className="text-[8px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-md bg-card border border-custom text-muted">
              {tag}
            </span>
          ))}
          <span className="text-[0.55rem] text-muted/50 font-medium">{latest.readTime}</span>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-between pt-2 border-t border-custom/50 relative z-10">
        <span className="text-[0.55rem] font-semibold uppercase tracking-widest text-muted">View all posts</span>
        <ArrowUpRight size={11} className="text-muted/50" />
      </div>
    </div>
  );
});

// ─── GITHUB ──────────────────────────────────────────────────
type Level = 0 | 1 | 2 | 3;

const DISPLAY_WEEKS = 39;
const CELL = 10;
const GAP = 2;
const STEP = CELL + GAP;
const TOP_OFFSET = 14;

const getLevel = (count: number): Level => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  return 3;
};

const generateFallback = (): Level[][] =>
  Array.from({ length: DISPLAY_WEEKS }, (_, w) =>
    Array.from({ length: 7 }, (_, d): Level => {
      const seed = (w * 7 + d + 1) * 17;
      const r = Math.abs(Math.sin(seed * 9301 + 49297));
      return r > 0.82 ? 3 : r > 0.65 ? 2 : r > 0.45 ? 1 : 0;
    })
  );

const fallbackGrid = generateFallback();

export const GitHubContent = React.memo(function GitHubContent() {
  const [grid, setGrid] = React.useState<Level[][]>(fallbackGrid);
  const [total, setTotal] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { resolvedTheme } = useTheme();

  const fillColor: Record<Level, string> = resolvedTheme === 'light'
    ? { 0: 'rgba(0,0,0,0.06)', 1: 'rgba(16,185,129,0.25)', 2: 'rgba(16,185,129,0.55)', 3: '#059669' }
    : { 0: 'rgba(255,255,255,0.045)', 1: 'rgba(16,185,129,0.20)', 2: 'rgba(16,185,129,0.48)', 3: '#10b981' };

  const labelColor = resolvedTheme === 'light' ? 'rgba(100,100,100,0.6)' : 'rgba(107,105,101,0.5)';

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    fetch('https://github-contributions-api.jogruber.de/v4/Vighnesh-Gaddam?y=last', {
      signal: controller.signal,
    })
      .then(r => r.json())
      .then(data => {
        clearTimeout(timeout);
        if (data.contributions) {
          const flat: { date: string; count: number }[] = data.contributions;
          const weeks: Level[][] = [];
          for (let i = 0; i < flat.length; i += 7) {
            weeks.push(flat.slice(i, i + 7).map(d => getLevel(d.count)));
          }
          setGrid(weeks.slice(-DISPLAY_WEEKS));
          setTotal(flat.reduce((sum, d) => sum + d.count, 0));
        }
        setLoading(false);
      })
      .catch(() => {
        clearTimeout(timeout);
        setLoading(false);
      });

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  // Change useMemo to only run client-side
  const [monthPositions, setMonthPositions] = React.useState<{ weekIdx: number; name: string }[]>([]);

  useEffect(() => {
    const now = new Date();
    const result: { weekIdx: number; name: string }[] = [];
    let lastMonth = -1;
    let lastWeekIdx = -999;
    for (let w = 0; w < DISPLAY_WEEKS; w++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (DISPLAY_WEEKS - w) * 7);
      const month = date.getMonth();
      if (month !== lastMonth && w - lastWeekIdx >= 3) {
        result.push({ weekIdx: w, name: date.toLocaleString('en-US', { month: 'short' }) });
        lastMonth = month;
        lastWeekIdx = w;
      }
    }
    queueMicrotask(() => {
      setMonthPositions(result);
    });
  }, []);

  const svgW = DISPLAY_WEEKS * STEP - GAP;
  const svgH = TOP_OFFSET + 7 * STEP - GAP;

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <Github size={11} strokeWidth={1.5} className="text-muted" />
          <span className="text-[0.55rem] font-bold uppercase tracking-widest text-muted">
            {loading ? 'Loading…' : total !== null ? `${total} contributions` : 'Activity'}
          </span>
        </div>
        <span className="text-[0.55rem] font-bold uppercase tracking-[.12em] text-emerald-500">
          Consistent builder
        </span>
      </div>

      <div className="flex-1 min-h-0 w-full">
        <svg width="100%" height="100%" viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="xMidYMid meet">
          {monthPositions.map(({ weekIdx, name }) => (
            <text key={weekIdx} x={weekIdx * STEP} y={10} fontSize="6" fontWeight="700"
              letterSpacing="0.05em" fill={labelColor} fontFamily="system-ui, sans-serif">
              {name.toUpperCase()}
            </text>
          ))}
          {loading
            ? (() => {
              const totalCells = DISPLAY_WEEKS * 7;
              return Array.from({ length: DISPLAY_WEEKS }, (_, w) =>
                Array.from({ length: 7 }, (_, d) => {
                  const delay = ((w * 7 + d) / totalCells) * 1.5;
                  return (
                    <rect
                      key={`sk-${w}-${d}`}
                      x={w * STEP} y={TOP_OFFSET + d * STEP}
                      width={CELL} height={CELL} rx="2"
                      fill={resolvedTheme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)'}
                    >
                      <animate
                        attributeName="fill"
                        values={
                          resolvedTheme === 'light'
                            ? 'rgba(0,0,0,0.06);rgba(16,185,129,0.25);rgba(0,0,0,0.06)'
                            : 'rgba(255,255,255,0.04);rgba(16,185,129,0.3);rgba(255,255,255,0.04)'
                        }
                        dur="1.8s"
                        begin={`${delay}s`}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
                      />
                    </rect>
                  );
                })
              );
            })()
            : grid.map((week, w) =>
              week.map((level, d) => (
                <rect key={`${w}-${d}`} x={w * STEP} y={TOP_OFFSET + d * STEP}
                  width={CELL} height={CELL} rx="2" fill={fillColor[level]} />
              ))
            )
          }
        </svg>
      </div>

      <div className="flex items-center justify-between shrink-0">
        <a href={socials.github} target="_blank" rel="noreferrer"
          className="text-[0.55rem] font-bold uppercase tracking-widest text-muted [@media(hover:hover)]:hover:text-main transition-colors"
          onClick={e => e.stopPropagation()}>
          @Vighnesh-Gaddam
        </a>
        <div className="flex items-center gap-1">
          <span className="text-[0.55rem] text-muted/50">Less</span>
          {([0, 1, 2, 3] as Level[]).map(l => (
            <div key={l} className="w-1.5 h-1.5 rounded-sm" style={{ background: fillColor[l] }} />
          ))}
          <span className="text-[0.55rem] text-muted/50">More</span>
        </div>
      </div>
    </div>
  );
});