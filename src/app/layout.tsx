import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";

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
        {/* RAW HTML LOADER: Shows instantly before JS loads */}
        <div id="initial-loader">
          <div className="spinner-ring"></div>
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