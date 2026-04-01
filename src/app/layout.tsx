import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://whoisvighnesh.in"),

  title: {
    default: "Vighnesh Gaddam | Software Engineer",
    template: "%s | Vighnesh Gaddam",
  },

  verification: {
    google: "cIA6t7lrm7bP85h9L0MiaI6I5a3yfqBvbs4De7nFfCs",
  },

  description:
    "I’m Vighnesh Gaddam, a full-stack developer who enjoys building fast, scalable web apps and turning ideas into real, working products. I work mainly with React, Next.js, NestJS, and TypeScript, focusing on clean architecture, performance, and systems that hold up in production.",

  keywords: [
    "Vighnesh Gaddam",
    "Full Stack Developer Portfolio",
    "Next.js Developer",
    "React Developer",
    "NestJS Backend Developer",
    "TypeScript Engineer",
    "Web Application Developer",
    "MongoDB PostgreSQL Prisma",
    "API Development",
    "Software Engineer Portfolio",
  ],

  authors: [{ name: "Vighnesh Gaddam" }],
  creator: "Vighnesh Gaddam",

  alternates: {
    canonical: "https://whoisvighnesh.in",
  },

  icons: {
    icon: [
      { url: "/vighnesh1.png", sizes: "any" },
      { url: "/vighnesh1.png", sizes: "96x96", type: "image/png" },
      { url: "/vighnesh1.png", sizes: "144x144", type: "image/png" },
    ],
    apple: [
      { url: "/vighnesh1.png", sizes: "180x180", type: "image/png" },
    ],
  },

  openGraph: {
    title: "Vighnesh Gaddam | Full-Stack Developer",
    description:
      "Here’s a glimpse of what I’ve been working on — building web apps that don’t just run fast, but hold up when things get real.",
    url: "https://whoisvighnesh.in",
    siteName: "Vighnesh Gaddam Portfolio",
    images: [
      {
        url: "https://whoisvighnesh.in/vighnesh1.png",
        width: 800,
        height: 800,
        alt: "Vighnesh Gaddam Portfolio",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vighnesh Gaddam | Software Engineer",
    description:
      "I build web apps using React, Next.js, and TypeScript — the kind that stay fast, scale smoothly, and don’t fall apart once real users show up.",
    
    images: ["https://whoisvighnesh.in/vighnesh1.png"],
  },

  applicationName: "Vighnesh Portfolio",
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-page text-main antialiased">
        
        {/* Loader safety script */}
        <Script id="loader-safety-switch" strategy="afterInteractive">
          {`
            (function() {
              const hideLoader = () => {
                const loader = document.getElementById('initial-loader');
                if (loader) loader.classList.add('loaded');
              };
              if (document.readyState === 'complete') hideLoader();
              else window.addEventListener('load', hideLoader);
              setTimeout(hideLoader, 3000);
            })();
          `}
        </Script>

        {/* Loader */}
        <div id="initial-loader">
          <div className="loader-content">
            <div className="loader-typography">
              <span className="loader-name">VIGHNESH GADDAM</span>
              <span className="loader-year">Portfolio 2026</span>
            </div>

            <div className="loader-circle-container">
              <svg className="loader-circle-svg" viewBox="0 0 48 48">
                <circle className="circle-bg" cx="24" cy="24" r="22" />
                <circle className="circle-progress" cx="24" cy="24" r="22" />
              </svg>
            </div>
          </div>
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}