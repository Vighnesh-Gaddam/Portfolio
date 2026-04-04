"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const name = "VIGHNESH GADDAM";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#080808]"
    >
      <div className="flex flex-col items-center">
        {/* 1. Typography Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white text-xl md:text-2xl font-bold tracking-[0.4em] leading-none"
          >
            {name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.25em] text-white mt-4 font-medium"
          >
            Portfolio 2026
          </motion.p>
        </div>

        {/* 2. Circle Progress */}
        <div className="relative flex items-center justify-center w-12 h-12">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-white/10"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-white"
              strokeDasharray="138.23"
              initial={{ strokeDashoffset: 138.23 }}
              animate={{ strokeDashoffset: 138.23 - (138.23 * progress) / 100 }}
              transition={{ ease: "linear" }}
            />
          </svg>

          <span className="text-[9px] font-mono text-white/60 tabular-nums">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};