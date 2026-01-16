"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const name = "VIGHNESH GADDAM";
  const letters = Array.from(name);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Name */}
        <div className="flex mb-4">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xl md:text-2xl font-bold tracking-[0.3em] text-main"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Progress Container */}
        <div className="w-48 h-[2px] bg-primary/10 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute h-full bg-primary"
          />
        </div>

        {/* Percentage Counter */}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-[10px] font-mono tracking-widest text-muted"
        >
          {progress}%
        </motion.span>
      </div>

      {/* Background Decorative Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-primary rounded-full blur-[120px] -z-10"
      />
    </motion.div>
  );
};