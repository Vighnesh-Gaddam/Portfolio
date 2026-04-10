# Vighnesh Gaddam — Portfolio

Started with "hello world", ended up building full-stack platforms. <br>
I'm Vighnesh — a developer from Mumbai who takes clean code 
a little too seriously. Welcome to my portfolio.

[![Website](https://img.shields.io/badge/Website-whoisvighnesh.in-blue?style=for-the-badge&logo=google-chrome)](https://whoisvighnesh.in)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Vighnesh%20Gaddam-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/vighnesh-gaddam/)
[![Email](https://img.shields.io/badge/Email-vgnshgdm%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:vgnshgdm@gmail.com)

If you find this useful or just like the design, a ⭐ goes a long way — thank you!

---

![Portfolio Preview](public/preview.gif)

---

## What's inside

A bento-style portfolio that goes beyond a static page. Every section is interactive, the data is real, and it's built to be fast on any device.

- **Bento grid** — 2-col on mobile, 5-col on desktop, row heights adapt to screen size using `dvh`
- **Live GitHub graph** — real contribution data fetched from the GitHub GraphQL API, cached hourly
- **MDX blog** — file-based posts, no CMS, renders with custom styled components
- **Detail modals** — click any card to expand it into a full view (experience, education, stack, testimonials, blog)
- **Connection hub** — one modal for resume, email, and every social link
- **Dark / light mode** — CSS variable theming, instant switch, no flash
- **Mobile-first** — deferred API fetches, touch-safe hover states, smooth on low-end devices

---

## Tech

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · COBE · next-mdx-remote

---

## Run it locally

```bash
git clone https://github.com/Vighnesh-Gaddam/portfolio.git
cd portfolio
npm install
npm run dev
```

The site works without any environment variables. The GitHub graph falls back to a static visualization if no token is set.

To enable the live graph, create `.env.local`:

```env
GITHUB_TOKEN=your_personal_access_token
```

Get a token at GitHub → Settings → Developer settings → Personal access tokens → Classic → select `read:user` scope only.

---

## Want to use this as a template?

Go ahead. The portfolio data lives entirely in one file — `src/data/siteConfig.ts`. Update your name, links, experience, projects, and blog posts there and you're done. No hunting through components.

---

## License

MIT — use it, learn from it, build on it. Credit is appreciated but not required.

---

Built by [Vighnesh Gaddam](https://whoisvighnesh.in) · Open to work