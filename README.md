# 🍱 vighnesh-portfolio

A high-performance, bento-style professional showcase built with **Next.js 16** and **Tailwind CSS v4**. This portfolio focuses on clean architecture, fluid animations, and a sophisticated developer experience.

## ✨ Features

* **Next-Gen Bento Grid** – A modular, responsive UI built with Tailwind CSS v4's modern engine.
* **Interactive 3D Globe** – High-performance location visualization using `cobe` (Canvas-based).
* **Smooth Animations** – Powered by Framer Motion 12 for layout transitions and modal expansions.
* **Unified Error Handling** – Custom-designed 404 and Error pages sharing a consistent "System Glitch" UI.
* **ATS-Ready** – Built with semantic HTML5 and JSON-LD schema for professional search indexing.
* **Zero-Latency Theming** – Seamless Dark/Light mode switching via `next-themes`.

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
* **Library**: [React 19](https://react.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
* **Visuals**: [COBE](https://github.com/shuding/cobe)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

```text
├── public/                  # Static assets (vighnesh1.png, icons)
├── src/
│   ├── app/                 # Next.js 16 App Router
│   │   ├── error.tsx        # Global error boundary
│   │   ├── layout.tsx       # Root layout (Metadata & Theme Providers)
│   │   ├── not-found.tsx    # Custom 404 handler
│   │   ├── page.tsx         # Home page (Bento Grid)
│   │   ├── robots.ts        # Search engine instructions
│   │   ├── sitemap.ts       # Dynamic SEO sitemap
│   │   └── projects/        # /projects route (Timeline & Portfolio)
│   │       ├── page.tsx     # Project page
│   ├── components/          # Modular React Components
│   │   ├── BentoCard.tsx    # Responsive grid card container
│   │   ├── CardContents.tsx # Content switch-case for bento items
│   │   ├── DetailView.tsx   # Modal system for card expansion
│   │   ├── ErrorState.tsx   # Shared UI for 404/Error pages
│   │   ├── Globe.tsx        # Server-side globe wrapper
│   │   ├── GlobeClient.tsx  # Client-side 3D Canvas rendering
│   │   └── ThemeToggle.tsx  # Theme switch logic
│   └── types/               # TypeScript interfaces
└── package.json             # Dependencies and scripts

```

## 🛣️ Routing Architecture

The application utilizes the **Next.js 16 App Router** for optimized delivery:

* **Home (`/`)**: A modular Bento interface providing a high-level overview of skills and personality.
* **Showcase (`/projects`)**: A dedicated, vertically scrolling timeline showcasing full-stack and freelance work.
* **Global States**: Unified design system for missing routes and runtime errors via `ErrorState.tsx`.

## 🚀 Getting Started

### Prerequisites

* **Node.js 20+**
* **npm** or **pnpm**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Vighnesh-Gaddam/portfolio.git

```


2. Install dependencies:
```bash
npm install

```


3. Start development server:
```bash
npm run dev

```



## 📈 Performance & SEO

* **SEO Optimized**: Dynamic metadata generation using Next.js `generateMetadata` API.
* **Accessibility**: ARIA labels, semantic landmark tags, and high-contrast theme support.
* **Speed**: Optimized images and 60fps canvas animations.

## 📬 Contact

* **Website**: [vighneshgaddam.com](https://vighneshgaddam.com)
* **LinkedIn**: [@vighnesh-gaddam](https://www.linkedin.com/in/vighnesh-gaddam/)
* **Email**: [vgnshgdm@gmail.com](mailto:vgnshgdm@gmail.com)

---

Built with 🤍 by [Vighnesh Gaddam](https://github.com/Vighnesh-Gaddam)

---
