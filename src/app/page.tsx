"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { BentoCard } from "../components/BentoCard";
import { DetailView, DetailType } from "../components/DetailView";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import '../app/globals.css';

import {
  IntroContent,
  SocialsContent,
  TechStackContent,
  AboutContent,
  ExperienceContent,
  EducationContent,
  ProjectsTriggerContent,
} from "../components/CardContents";
import { ConnectionHub } from "@/components/ConnectionHub";

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

// Move this OUTSIDE the HomePage component, just above it
const BENTO_ITEMS: BentoItem[] = [
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

// Move these OUTSIDE the HomePage component too
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

export default function HomePage() {
  // ---- ALL STATE AT TOP ----
  const [activeModal, setActiveModal] = useState<DetailType | null>(null);
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const { resolvedTheme } = useTheme();
  const router = useRouter();

  // ---- EFFECTS ----
  // ---- EFFECTS ----
  useEffect(() => {
    const rawLoader = document.getElementById('initial-loader');
    if (rawLoader) rawLoader.classList.add('loaded');
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeModal || isConnectOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [activeModal, isConnectOpen]);

  // ---- RENDER ----
  const renderCardContent = useCallback((id: string) => {
    switch (id) {
      case "intro": return <IntroContent />;
      case "socials": return <SocialsContent onOpenConnect={() => setIsConnectOpen(true)} />;
      case "stack": return <TechStackContent />;
      case "about": return <AboutContent />;
      case "experience": return <ExperienceContent />;
      case "education": return <EducationContent />;
      case "featured projects": return <ProjectsTriggerContent />;
      case 'map': return <MapContent theme={resolvedTheme} />;
      default: return null;
    }
  }, [resolvedTheme]);

  return (
    <main className="relative bg-page min-h-screen">
      <div className="min-h-screen text-main p-4 pt-8 md:p-6 md:pt-12 flex flex-col items-center">
        <AnimatePresence>
          {activeModal && (
            <DetailView
              onClose={() => setActiveModal(null)}
              type={activeModal}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isConnectOpen && (
            <ConnectionHub
              layoutId="connect-hub"
              onClose={() => setIsConnectOpen(false)}
            />
          )}
        </AnimatePresence>

        <div className="w-full max-w-7xl mx-auto pb-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-[152px] sm:auto-rows-[190px] md:auto-rows-[237px] grid-flow-row-dense"
          >
            {BENTO_ITEMS.map((item, index) => (
              <motion.div key={item.id} variants={itemVariants} className={item.colSpan} layout>
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
                      ? () => router.push("/projects")
                      : item.onClickModal
                        ? () => setActiveModal(item.onClickModal!)
                        : undefined
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