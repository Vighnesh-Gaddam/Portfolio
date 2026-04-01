
# whoisvighnesh — Developer Portfolio

> Full-stack developer building fast, scalable web apps that hold up in the real world.

[![Live](https://img.shields.io/badge/Live-whoisvighnesh.in-black?style=for-the-badge)](https://whoisvighnesh.in)

---

## ✨ Overview

A fast, bento-style developer portfolio built to showcase real work, clean design, and production-ready systems. Focused on performance, smooth interactions, and a solid user experience.

---

## ✨ Features

* **Bento Grid Layout** – Clean, modular UI built with Tailwind CSS v4  
* **Interactive Globe** – Lightweight 3D visualization using `cobe`  
* **Smooth Animations** – Subtle transitions powered by Framer Motion  
* **Custom Error States** – Consistent UI for 404 and runtime errors  
* **SEO-Friendly** – Semantic structure and structured data  
* **Dark/Light Mode** – Seamless theme switching  

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router)  
* **Library**: React 19  
* **Styling**: Tailwind CSS v4  
* **Animations**: Framer Motion 12  
* **Visuals**: COBE  
* **Icons**: Lucide React  
* **Language**: TypeScript  

---

## 📂 Project Structure

```text
├── public/                  # Static assets (images, icons)
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── error.tsx        # Global error boundary
│   │   ├── layout.tsx       # Root layout (Metadata & Theme Providers)
│   │   ├── not-found.tsx    # Custom 404 handler
│   │   ├── page.tsx         # Home page (Bento Grid)
│   │   ├── robots.ts        # Search engine instructions
│   │   ├── sitemap.ts       # Dynamic SEO sitemap
│   │   └── projects/        # /projects route
│   │       └── page.tsx     # Project showcase
│   ├── components/          # Reusable components
│   │   ├── BentoCard.tsx
│   │   ├── CardContents.tsx
│   │   ├── DetailView.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Globe.tsx
│   │   ├── GlobeClient.tsx
│   │   └── ThemeToggle.tsx
│   └── types/               # TypeScript types
└── package.json
````

---

## 🛣️ Routing

* **Home (`/`)** → Bento-style overview of skills and work
* **Projects (`/projects`)** → Timeline-based showcase
* **Error Handling** → Unified design for 404 and runtime states

---

## 🚀 Getting Started

### Prerequisites

* Node.js 20+
* npm / pnpm

### Installation

```bash
git clone https://github.com/Vighnesh-Gaddam/portfolio.git
cd portfolio
npm install
npm run dev
```

---

## 📈 Performance & SEO

* Optimized metadata using Next.js
* Semantic HTML and accessibility best practices
* Fast load times with optimized assets and animations

---

## 📬 Contact

* **Website**: [https://whoisvighnesh.in](https://whoisvighnesh.in)
* **LinkedIn**: [https://www.linkedin.com/in/vighnesh-gaddam/](https://www.linkedin.com/in/vighnesh-gaddam/)
* **Email**: [vgnshgdm@gmail.com](mailto:vgnshgdm@gmail.com)

---
Built with 🤍 by [Vighnesh Gaddam](https://whoisvighnesh.in)

