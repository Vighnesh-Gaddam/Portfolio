"use client";

import { useState, useEffect } from "react";
import { BentoCard } from "../components/BentoCard";
import { DetailView } from "../components/DetailView";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes"; // <--- ADD THIS LINE
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

export default function HomePage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  const { resolvedTheme } = useTheme();

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "";
  }, [activeModal]);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch {
      alert("Failed to copy to clipboard.");
    }
  };

  const items = [
    { id: "intro", colSpan: "col-span-2 sm:col-span-2" },
    { id: "photo", colSpan: "col-span-1", bgImage: "/vighnesh1.png" },
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
      case "intro":
        return <IntroContent />;
      case "socials":
        return <SocialsContent />;
      case "stack":
        return <TechStackContent />;
      case "about":
        return <AboutContent />;
      case "experience":
        return <ExperienceContent />;
      case "education":
        return <EducationContent />;
      case "featured projects":
        return <ProjectsTriggerContent />;
      case "contact":
        return (<ContactContent copyToClipboard={copyToClipboard} copiedText={copiedText} />);
      case 'map':
        return <MapContent time={time} theme={resolvedTheme}/>; 
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-page text-main p-4 pt-8 md:p-6 md:pt-12 md:pb-0 font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-hidden flex flex-col items-center">

      {/* Detail Overlay */}
      <AnimatePresence>
        {activeModal && (
          <DetailView
            onClose={() => setActiveModal(null)}
            type={activeModal}
            layoutId={activeModal}
          />
        )}
      </AnimatePresence>

      {/* Main Grid */}
      <div className="w-full max-w-7xl mx-auto pb-12 sm:pb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-[152px] sm:auto-rows-[190px] md:auto-rows-[237px] grid-flow-row-dense"
        >
          {items.map((item, index) => {
            const isExpanded = activeModal === item.id;

            return (
              <BentoCard
                key={item.id}
                layoutId={item.id}
                dataId={item.id}
                index={index}
                className={`${item.colSpan} h-full`}
                title={
                  ["intro", "socials", "photo"].includes(item.id)
                    ? undefined
                    : item.id
                }
                backgroundImage={item.bgImage}
                hasArrow={item.hasArrow}
                isVisible={!isExpanded}
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
            );
          })}
        </motion.div>

         {/* Footer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
  );
}