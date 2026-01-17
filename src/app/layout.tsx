import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://vighnesh-dev.vercel.app"),
  title: {
    default: "Vighnesh Gaddam | Software Engineer",
    template: "%s | Vighnesh Gaddam"
  },
  verification: {
    google: "cIA6t7lrm7bP85h9L0MiaI6I5a3yfqBvbs4De7nFfCs",
  },
  description: "I build web apps using React, NextJS, NestJS and TypeScript. I'm big on clean code, snappy interfaces, and making sure things don't break when they grow.",
  keywords: [
    "Vighnesh Gaddam", "Full Stack Developer", "React & Next.js Expert", "NestJS Backend Developer", "TypeScript Engineer", "Java and Python Developer", "MongoDB & PostgreSQL", "Prisma ORM", "Auth0 & Clerk Integration", "REST API Development", "Razorpay Integration", "Software Portfolio"
  ],
  authors: [{ name: "Vighnesh Gaddam" }],
  creator: "Vighnesh Gaddam",
  icons: { icon: "/vighnesh1.png", apple: "/vighnesh1.png" },
  openGraph: {
    title: "Vighnesh Gaddam | Full-Stack Developer",
    description: "Full-stack engineer specializing in React, NestJS, and secure auth integrations.",
    url: "https://vighnesh-dev.vercel.app",
    siteName: "Vighnesh Gaddam Portfolio",
    images: [{ url: "/vighnesh1.png", width: 800, height: 800, alt: "Vighnesh Gaddam Portfolio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vighnesh Gaddam | Software Engineer",
    description: "Building better web experiences with React and TypeScript.",
    images: ["/vighnesh1.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-page text-main antialiased">
        {/* SAFETY SCRIPT: 
          This forces the loader to disappear even if the page is a 404.
          It checks if the document is ready and removes the loader.
        */}
        <Script id="loader-safety-switch" strategy="afterInteractive">
          {`
            (function() {
              const hideLoader = () => {
                const loader = document.getElementById('initial-loader');
                if (loader) loader.classList.add('loaded');
              };
              if (document.readyState === 'complete') hideLoader();
              else window.addEventListener('load', hideLoader);
              
              // Fallback: If it's still there after 3 seconds (like on a slow 404), kill it.
              setTimeout(hideLoader, 3000);
            })();
          `}
        </Script>

        {/* RAW HTML LOADER */}
        <div id="initial-loader">
          <div className="loader-content">
            <div className="loader-typography">
              <span className="loader-name">VIGHNESH GADDAM</span>
              <span className="loader-year">Portfolio 2026</span>
            </div>

            {/* This matches your SVG circle design */}
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