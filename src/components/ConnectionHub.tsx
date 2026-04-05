"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Github, Linkedin, Send, ArrowUpRight, Terminal, FileText, Twitter, Copy, Check } from 'lucide-react';
import { person, socials, resume } from '@/data/siteConfig';

export const ConnectionHub = ({ onClose, layoutId }: { onClose: () => void; layoutId?: string }) => {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() =>
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
      60000
    );
    return () => clearInterval(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(person.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 bg-black/20 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-110 flex items-center justify-center p-4 pointer-events-none">
        {/* HUB WINDOW */}
        <motion.div
          layoutId={layoutId}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            opacity: { duration: 0.2 },
          }}
          className="relative w-full max-w-lg bg-card backdrop-blur-2xl border border-custom dark:border-white/5 rounded-4xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
        >
          {/* HEADER */}
          <div className="p-7 pb-6 flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-muted uppercase">Sync_Active</span>
              </div>
              <p className="text-[0.55rem] text-muted opacity-50 font-bold uppercase tracking-widest">
                {time} • {person.location.split(',')[0].toUpperCase()} • {person.year}
              </p>
            </div>

            <motion.button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-card-hover border border-custom flex items-center justify-center transition-all active:scale-90"
              whileHover={{ backgroundColor: "var(--text-main)", color: "var(--bg-page)" }}
              style={{ color: "var(--text-muted)" }}
            >
              <X size={18} color="currentColor" />
            </motion.button>
          </div>

          {/* BENTO GRID */}
          <div className="p-5 pt-0 pb-8 grid grid-cols-4 grid-rows-4 gap-3">

            {/* CV CARD */}
            <a
              href={resume.url}
              target="_blank"
              className="col-span-3 row-span-2 group relative overflow-hidden rounded-3xl bg-text-main text-page p-6 flex flex-col justify-between transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-page/20 flex items-center justify-center">
                  <FileText size={20} strokeWidth={1.5} />
                </div>
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-45 group-hover:shadow-lg bg-white/50 dark:bg-white/5 border-custom text-muted group-hover:border-primary/20 group-hover:text-primary">
                  <ArrowUpRight size={14} className="sm:w-4 sm:h-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase italic tracking-tighter leading-none">View Resume</h3>
                <p className="text-[0.65rem] opacity-60 uppercase tracking-widest mt-3 font-bold">PDF • {person.year} Edition</p>
              </div>
            </a>

            {/* GITHUB */}
            <a
              href={socials.github}
              target="_blank"
              className="col-span-1 row-span-1 group rounded-3xl bg-card-hover border border-custom flex items-center justify-center transition-all hover:bg-text-main"
            >
              <Github size={22} className="text-muted group-hover:text-(--text-inverse) transition-colors" />
            </a>

            {/* LINKEDIN */}
            <a
              href={socials.linkedin}
              target="_blank"
              className="col-span-1 row-span-1 group rounded-3xl bg-card-hover border border-custom flex items-center justify-center transition-all hover:bg-[#0077b5]"
            >
              <Linkedin size={22} className="text-muted group-hover:text-white transition-colors" />
            </a>

            {/* TWITTER */}
            <a
              href={socials.twitter}
              target="_blank"
              className="col-span-2 row-span-1 group rounded-3xl bg-card-hover border border-custom flex items-center justify-center gap-3 transition-all hover:border-[#1DA1F2]/30"
            >
              <Twitter size={20} className="text-muted group-hover:text-[#1DA1F2] transition-colors" />
              <span className="text-[0.65rem] font-black uppercase tracking-widest group-hover:text-[#1DA1F2]">Twitter</span>
            </a>

            {/* LEETCODE */}
            <a
              href={socials.leetcode}
              target="_blank"
              className="col-span-2 row-span-1 group rounded-3xl bg-card-hover border border-custom flex items-center justify-center gap-3 transition-all hover:border-[#FFA116]/30"
            >
              <Terminal size={20} className="text-muted group-hover:text-[#FFA116] transition-colors" />
              <span className="text-[0.65rem] font-black uppercase tracking-widest group-hover:text-[#FFA116]">LeetCode</span>
            </a>

            {/* EMAIL */}
            <div className="col-span-4 row-span-1 group flex items-center justify-between p-2 pl-6 rounded-3xl bg-card border border-custom hover:border-emerald-500/30 transition-all shadow-sm">
              <a href={`mailto:${person.email}`} className="flex items-center gap-4 flex-1">
                <Send size={18} className="text-emerald-500" strokeWidth={2} />
                <div className="flex flex-col">
                  <span className="text-main font-bold text-xs uppercase tracking-tight italic leading-none">Drop Inquiry</span>
                  <span className="text-muted text-[0.65rem] font-bold uppercase truncate mt-1 opacity-70">{person.email}</span>
                </div>
              </a>
              <button
                onClick={copyEmail}
                className="w-14 h-14 rounded-[20px] bg-card-hover border border-custom flex items-center justify-center text-muted hover:text-main transition-all active:scale-90"
              >
                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
};