"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { BentoCard } from "../components/BentoCard";
import { DetailView, DetailType } from "../components/DetailView";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  IntroContent, SocialsContent, TechStackContent, AboutContent,
  ExperienceContent, EducationContent, ProjectsTriggerContent,
  TestimonialsContent, BlogContent, GitHubContent,
} from "../components/CardContents";
import { ConnectionHub } from "@/components/ConnectionHub";
import { person } from "@/data/siteConfig";

const MapContent = dynamic(
  () => import("@/components/GlobeClient").then((m) => m.MapContent),
  { ssr: false, loading: () => <div className="h-full w-full bg-card/20 animate-pulse" /> }
);

interface BentoItem {
  id: string;
  colSpan: string;
  mobileOrder: number;
  hasArrow?: boolean;
  bgImage?: string;
  noPadding?: boolean;
  onClickModal?: DetailType;
}

const BENTO_ITEMS: BentoItem[] = [
  { id: "intro", colSpan: "col-span-2 lg:col-span-2", mobileOrder: 1 },
  { id: "photo", colSpan: "col-span-1 lg:col-span-1", mobileOrder: 2, bgImage: "/vighnesh1.webp" },
  { id: "socials", colSpan: "col-span-1 lg:col-span-1", mobileOrder: 3 },
  { id: "about", colSpan: "col-span-1 lg:col-span-1", mobileOrder: 4, hasArrow: true, onClickModal: "about" },
  { id: "experience", colSpan: "col-span-1 lg:col-span-1", mobileOrder: 5, hasArrow: true, onClickModal: "experience" },
  { id: "education", colSpan: "col-span-1 lg:col-span-1", mobileOrder: 7, hasArrow: true, onClickModal: "education" },
  { id: "featured projects", colSpan: "col-span-1 lg:col-span-1", mobileOrder: 8, hasArrow: true },
  { id: "stack", colSpan: "col-span-2 lg:col-span-2", mobileOrder: 6, hasArrow: true, onClickModal: "stack" },
  { id: "blog", colSpan: "col-span-1 lg:col-span-1", mobileOrder: 9, hasArrow: true, onClickModal: "blog" },
  { id: "testimonials", colSpan: "col-span-1 lg:col-span-1", mobileOrder: 10, hasArrow: true, onClickModal: "testimonials" },
  { id: "github", colSpan: "col-span-2 lg:col-span-2", mobileOrder: 11 },
  { id: "map", colSpan: "col-span-2 lg:col-span-1", mobileOrder: 12, noPadding: true },
];

const NO_TITLE_CARDS = new Set(["intro", "socials", "photo", "map", "github", "testimonials"]);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<DetailType | null>(null);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const loader = document.getElementById("initial-loader");
    if (loader) loader.classList.add("loaded");
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeModal || isConnectOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [activeModal, isConnectOpen]);

  const handleCardClick = useCallback((item: BentoItem) => {
    if (item.onClickModal) return () => setActiveModal(item.onClickModal!);
    if (item.id === "featured projects") return () => router.push("/projects");
    return undefined;
  }, [router]);

  const renderCardContent = useCallback((id: string) => {
    switch (id) {
      case "intro": return <IntroContent />;
      case "socials": return <SocialsContent onOpenConnect={() => setIsConnectOpen(true)} />;
      case "stack": return <TechStackContent />;
      case "about": return <AboutContent />;
      case "experience": return <ExperienceContent />;
      case "education": return <EducationContent />;
      case "featured projects": return <ProjectsTriggerContent />;
      case "testimonials": return <TestimonialsContent />;
      case "blog": return <BlogContent />;
      case "github": return <GitHubContent />;
      case "map": return <MapContent theme={resolvedTheme} />;
      default: return null;
    }
  }, [resolvedTheme]);

  return (
    <main className="min-h-screen bg-page">
      <div className="flex flex-col items-center p-3 sm:p-4 md:p-4 md:pt-7 pt-6 sm:pt-8 pb-8">
        <AnimatePresence>
          {activeModal && (
            <DetailView onClose={() => setActiveModal(null)} type={activeModal} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isConnectOpen && (
            <ConnectionHub layoutId="connect-hub" onClose={() => setIsConnectOpen(false)} />
          )}
        </AnimatePresence>

        <div className="w-full max-w-[90vw] mx-auto">
          {/* <div className="w-full max-w-7xl mx-auto"> */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5 md:gap-4 auto-rows-[24vh] sm:auto-rows-[26vh] md:auto-rows-[27vh] lg:auto-rows-[28vh]">
            {/* className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5 md:gap-4auto-rows-[152px] sm:auto-rows-[175px] md:auto-rows-[200px] lg:auto-rows-[195px]" >  */}
            {BENTO_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`${item.colSpan} lg:order-0`}
                style={{ order: item.mobileOrder }}
                layout
              >
                <BentoCard
                  layoutId={item.id}
                  dataId={item.id}
                  className="h-full w-full"
                  title={NO_TITLE_CARDS.has(item.id) ? undefined : item.id}
                  backgroundImage={item.bgImage}
                  hasArrow={item.hasArrow}
                  isVisible={activeModal !== item.id}
                  noPadding={item.noPadding}
                  onClick={handleCardClick(item)}
                >
                  {renderCardContent(item.id)}
                </BentoCard>
              </motion.div>
            ))}
          </motion.div>

        <footer className="mt-5 flex flex-row justify-between items-center text-muted text-[0.65rem] font-medium uppercase tracking-wider opacity-40">
          <p>© {person.year} {person.name}</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <p>{person.role}</p>
          </div>
        </footer>
      </div>
    </div>
    </main >
  );
}