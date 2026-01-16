"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface BentoCardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  hasArrow?: boolean;
  backgroundImage?: string;
  layoutId?: string;
  dataId?: string;
  isVisible?: boolean;
  noPadding?: boolean;
  index?: number; 
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = "",
  onClick,
  title,
  hasArrow = false,
  backgroundImage,
  layoutId,
  dataId,
  isVisible = true,
  noPadding = false,
  index = 0,
}) => {
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const baseClasses = `relative overflow-hidden rounded-[20px] sm:rounded-[28px] md:rounded-[32px] text-left transition-[background-color,box-shadow,border-color,transform] duration-300 group select-none
      bg-card backdrop-blur-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-transparent dark:border-white/5 hover:border-primary/10
      ${onClick ? "cursor-pointer hover:bg-card-hover hover:-translate-y-1" : ""}
  `;

  return (
    <motion.div
      ref={cardRef}
      layoutId={layoutId}
      layout
      data-bento-id={dataId}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{
        opacity: isVisible && isInView ? 1 : 0,
        y: isInView ? 0 : 30,
        scale: isInView ? 1 : 0.95,
      }}
      whileHover={
        onClick
          ? {
            y: -6,
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 25 },
          }
          : undefined
      }
      whileTap={
        onClick
          ? { scale: 0.98, transition: { type: "spring", stiffness: 500, damping: 30 } }
          : undefined
      }
      transition={{
        opacity: { duration: 0.5, delay: isInView ? index * 0.06 : 0, ease: "easeOut" },
        y: { duration: 0.5, delay: isInView ? index * 0.06 : 0, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.4, delay: isInView ? index * 0.06 : 0, ease: "easeOut" },
        layout: { type: "spring", stiffness: 200, damping: 28, mass: 0.8 },
      }}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          role="img"
          aria-label={
            dataId === "photo" ? "Profile photo of the developer" : "Background image"
          }
        />
      )}

      <div
        className={`relative h-full flex flex-col z-10 w-full ${noPadding ? "p-0" : "p-4 sm:p-6 md:p-7"
          } ${backgroundImage ? "text-white" : ""}`}
      >
        {title && (
          <h3
            className={`text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-auto flex items-center gap-2 ${backgroundImage ? "text-white/70" : "text-muted"
              } ${noPadding ? "absolute top-4 left-4 sm:top-6 sm:left-6 md:top-7 md:left-7 z-20" : ""
              }`}
          >
            {title}
          </h3>
        )}

        {children}

        {hasArrow && (
          <div
            className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-45 group-hover:shadow-lg ${backgroundImage
              ? "bg-white/10 border-white/20 text-white"
              : "bg-white/50 dark:bg-white/5 border-custom text-muted group-hover:border-primary/20 group-hover:text-primary"
              }`}
          >
            <ArrowUpRight
              size={14}
              className="sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110"
              strokeWidth={2.5}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
