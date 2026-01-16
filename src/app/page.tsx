"use client";

import { useState, useEffect } from "react";
import { BentoCard } from "../components/BentoCard";
import { DetailView, DetailType } from "../components/DetailView";
import { AnimatePresence, motion, Variants } from "framer-motion"; // Added Variants type
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
import { MapContent } from "@/components/GlobeClient";

// --- Types ---
interface BentoItem {
  id: string;
  colSpan: string;
  hasArrow?: boolean;
  bgImage?: string;
  noPadding?: boolean;
  onClickModal?: DetailType;
}

export default function HomePage() {

  const [loading, setLoading] = useState(typeof window !== 'undefined' ? document.readyState !== "complete" : true);
  const [activeModal, setActiveModal] = useState<DetailType | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  const { resolvedTheme } = useTheme();
  const router = useRouter();

  // --- Effects ---

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      const timer = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // 2. Clock Logic
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 3. Scroll Lock Logic
  useEffect(() => {
    document.body.style.overflow = (activeModal || loading) ? "hidden" : "";
  }, [activeModal, loading]);

  // --- Helpers ---
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch {
      alert("Failed to copy to clipboard.");
    }
  };

  // --- Animation Variants (Typed to fix build errors) ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] // Framer Motion uses this for cubic-bezier
      }
    }
  };

  // --- Grid Data ---
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
      {/* 1. Universal Loader */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-page flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border-2 border-primary/10 rounded-full" />
                <div className="absolute inset-0 border-2 border-t-primary rounded-full animate-spin" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-main font-bold tracking-[0.4em] uppercase text-[11px]">
                  Vighnesh Gaddam
                </span>
                <span className="text-muted text-[9px] tracking-[0.2em] uppercase font-medium">
                  Portfolio 2026
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Site UI */}
      <div className="min-h-screen text-main p-4 pt-8 md:p-6 md:pt-12 md:pb-0 font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-hidden flex flex-col items-center">

        <AnimatePresence>
          {activeModal && (
            <DetailView
              onClose={() => setActiveModal(null)}
              type={activeModal}
              layoutId={activeModal}
            />
          )}
        </AnimatePresence>

        <div className="w-full max-w-7xl mx-auto pb-12 sm:pb-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={loading ? "hidden" : "visible"}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-[152px] sm:auto-rows-[190px] md:auto-rows-[237px] grid-flow-row-dense"
          >
            {items.map((item, index) => {
              const isExpanded = activeModal === item.id;

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={item.colSpan}
                >
                  <BentoCard
                    layoutId={item.id}
                    dataId={item.id}
                    index={index}
                    className="h-full w-full"
                    title={["intro", "socials", "photo"].includes(item.id) ? undefined : item.id}
                    backgroundImage={item.bgImage}
                    hasArrow={item.hasArrow}
                    isVisible={!isExpanded}
                    noPadding={item.noPadding}
                    onClick={
                      item.id === "featured projects"
                        ? () => {
                          setLoading(true);
                          setTimeout(() => {
                            router.push("/projects");
                          }, 150);
                        }
                        : item.onClickModal
                          ? () => setActiveModal(item.onClickModal!)
                          : undefined
                    }
                  >
                    {renderCardContent(item.id)}
                  </BentoCard>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 0.5 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 flex flex-row justify-between items-center text-muted text-xs font-medium uppercase tracking-wider gap-4"
          >
            <p>© 2026 Vighnesh Gaddam</p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
              <p>Full Stack Developer</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}