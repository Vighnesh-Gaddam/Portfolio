"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // For lazy loading
import { BentoCard } from "../components/BentoCard";
import { DetailView, DetailType } from "../components/DetailView";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import '../app/globals.css';

// Components
import {
  IntroContent,
  SocialsContent,
  TechStackContent,
  AboutContent,
  ExperienceContent,
  EducationContent,
  ContactContent,
  ProjectsTriggerContent,
} from "../components/CardContents";

// LAZY LOAD the MapContent: This stops the 10-second "blank" delay
const MapContent = dynamic(() => import("@/components/GlobeClient").then(mod => mod.MapContent), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-card/20 animate-pulse" />
});

interface BentoItem {
  id: string;
  colSpan: string;
  hasArrow?: boolean;
  bgImage?: string;
  noPadding?: boolean;
  onClickModal?: DetailType;
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<DetailType | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  const { resolvedTheme } = useTheme();
  const router = useRouter();

  // 1. Unified Loading Logic
  useEffect(() => {
    const clearLoaders = () => {
      // 1. Hide the raw HTML loader from layout.tsx
      const rawLoader = document.getElementById('initial-loader');
      if (rawLoader) rawLoader.classList.add('loaded');
      
      // 2. Hide the React Framer Motion loader
      setLoading(false);
    };

    if (document.readyState === "complete") {
      const timer = setTimeout(clearLoaders, 10);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener("load", clearLoaders);
      return () => window.removeEventListener("load", clearLoaders);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (loading || activeModal) ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [loading, activeModal]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch {
      alert("Failed to copy.");
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const items: BentoItem[] = [
    { id: "intro", colSpan: "col-span-2 sm:col-span-2" },
    { id: "photo", colSpan: "col-span-1", bgImage: "/vighnesh1.webp" },
    { id: "socials", colSpan: "col-span-1" },
    { id: "about", colSpan: "col-span-1", hasArrow: true, onClickModal: "about" },
    { id: "experience", colSpan: "col-span-1", hasArrow: true, onClickModal: "experience" },
    { id: "stack", colSpan: "col-span-2 sm:col-span-2", hasArrow: true, onClickModal: "stack" },
    { id: "education", colSpan: "col-span-1", hasArrow: true, onClickModal: "education" },
    { id: "featured projects", colSpan: "col-span-2 sm:col-span-2", hasArrow: true },
    { id: "map", colSpan: "col-span-1", noPadding: true },
  ];

  const renderCardContent = (id: string) => {
    switch (id) {
      case "intro": return <IntroContent />;
      case "socials": return <SocialsContent />;
      case "stack": return <TechStackContent />;
      case "about": return <AboutContent />;
      case "experience": return <ExperienceContent />;
      case "education": return <EducationContent />;
      case "featured projects": return <ProjectsTriggerContent />;
      case "contact": return (<ContactContent copyToClipboard={copyToClipboard} copiedText={copiedText} />);
      case 'map': return <MapContent time={time.toLocaleString()} theme={resolvedTheme} />;
      default: return null;
    }
  };

  return (
    <main className="relative bg-page min-h-screen">
      {/* 1. React-Side Loader (Framer Motion) */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-page flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="spinner-ring" /> {/* Use the CSS spinner for consistency */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-main font-bold tracking-[0.4em] uppercase text-[11px]">Vighnesh Gaddam</span>
                <span className="text-muted text-[9px] tracking-[0.2em] uppercase font-medium">Portfolio 2026</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'} min-h-screen text-main p-4 pt-8 md:p-6 md:pt-12 flex flex-col items-center`}>
        <AnimatePresence>
          {activeModal && (
            <DetailView
              onClose={() => setActiveModal(null)}
              type={activeModal}
              layoutId={activeModal}
            />
          )}
        </AnimatePresence>

        <div className="w-full max-w-7xl mx-auto pb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={loading ? "hidden" : "visible"}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-[152px] sm:auto-rows-[190px] md:auto-rows-[237px] grid-flow-row-dense"
          >
            {items.map((item, index) => (
              <motion.div key={item.id} variants={itemVariants} className={item.colSpan}>
                <BentoCard
                  layoutId={item.id}
                  dataId={item.id}
                  index={index}
                  className="h-full w-full"
                  title={["intro", "socials", "photo"].includes(item.id) ? undefined : item.id}
                  backgroundImage={item.bgImage}
                  hasArrow={item.hasArrow}
                  isVisible={activeModal !== item.id}
                  noPadding={item.noPadding}
                  onClick={
                    item.id === "featured projects"
                      ? () => { setLoading(true); setTimeout(() => router.push("/projects"), 100); }
                      : item.onClickModal ? () => setActiveModal(item.onClickModal!) : undefined
                  }
                >
                  {renderCardContent(item.id)}
                </BentoCard>
              </motion.div>
            ))}
          </motion.div>

          <footer className="mt-8 flex flex-row justify-between items-center text-muted text-xs font-medium uppercase tracking-wider opacity-50">
            <p>© 2026 Vighnesh Gaddam</p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <p>Full Stack Developer</p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}