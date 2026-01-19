"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Github, Linkedin, Mail, FileText, Send, ArrowUpRight, MessageSquare, Code2, Terminal, PenTool } from 'lucide-react';

export const ConnectionHub = ({ onClose, layoutId }: { onClose: () => void, layoutId?: string }) => {
  
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalStyle; };
  }, []);

  const socialLinks = [
    { name: 'GitHub', icon: <Github />, url: 'https://github.com/Vighnesh-Gaddam', color: 'hover:text-[#2ea44f] hover:bg-[#2ea44f]/5', desc: 'Code' },
    { name: 'LinkedIn', icon: <Linkedin />, url: 'https://linkedin.com/in/vighnesh-gaddam', color: 'hover:text-[#0a66c2] hover:bg-[#0a66c2]/5', desc: 'Network' },
    { name: 'Email', icon: <Mail />, url: 'mailto:vgnshgdm@gmail.com', color: 'hover:text-primary hover:bg-primary/5', desc: 'Direct' },
    { name: 'X / Twitter', icon: <MessageSquare />, url: 'https://x.com/your-handle', color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5', desc: 'Social' },
    { name: 'LeetCode', icon: <Terminal />, url: 'https://leetcode.com/u/vgnshgdm', color: 'hover:text-[#FFA116] hover:bg-[#FFA116]/5', desc: 'DSA' },
    { name: 'CodeChef', icon: <Code2 />, url: 'https://www.codechef.com/users/your-handle', color: 'hover:text-[#5B4638] hover:bg-[#5B4638]/5', desc: 'Contests' },
    { name: 'Hashnode', icon: <PenTool />, url: 'https://vighnesh.hashnode.dev', color: 'hover:text-[#2962FF] hover:bg-[#2962FF]/5', desc: 'Blog' },
    { name: 'Resume', icon: <FileText />, url: '/resume.pdf', color: 'hover:text-amber-500 hover:bg-amber-500/5', desc: 'CV' },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-overlay/90 backdrop-blur-xl"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <motion.div
          layoutId={layoutId}
          className="relative w-full max-w-5xl bg-card rounded-[32px] md:rounded-[48px] border border-custom shadow-2xl pointer-events-auto flex flex-col md:flex-row max-h-[85vh] md:max-h-[min(800px,90vh)] overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          {/* Close Button - Sticky/Fixed Position */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/50 backdrop-blur-md border border-custom flex items-center justify-center text-main hover:bg-text-main hover:text-page transition-all active:scale-90"
          >
            <X size={20} />
          </button>

          {/* LEFT: CONTENT AREA */}
          <div className="w-full md:w-[40%] p-8 md:p-12 bg-card-hover border-b md:border-b-0 md:border-r border-custom flex flex-col">
            <div className="mt-auto md:mt-0">
              <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4">Connection</h4>
              <h2 className="text-3xl md:text-5xl font-bold text-main leading-tight tracking-tighter mb-6 uppercase">
                Ready to <br className="hidden md:block" />
                <span className="text-muted opacity-40 italic font-light">Sync?</span>
              </h2>
              <p className="text-muted text-sm md:text-base font-light leading-relaxed mb-8 max-w-[280px] md:max-w-none">
                Exploring 2026 roles. Let's build something exceptional together.
              </p>
              <a 
                href="mailto:vgnshgdm@gmail.com" 
                className="inline-flex items-center justify-between w-full p-4 bg-text-main text-page rounded-2xl font-bold text-sm group transition-transform active:scale-[0.98]"
              >
                Start Conversation
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* RIGHT: SCROLLABLE GRID AREA */}
          <div className="w-full md:w-[60%] overflow-y-auto p-6 md:p-12 bg-card scrollbar-hide">
            <h3 className="text-muted text-[10px] font-bold uppercase tracking-widest mb-8">Digital Footprint</h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-4 md:p-5 rounded-[24px] bg-card-hover/40 border border-custom flex flex-col justify-between h-28 md:h-36 transition-all duration-300 ${link.color}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="p-2 md:p-2.5 bg-card rounded-xl border border-custom group-hover:scale-110 transition-transform">
                      {React.cloneElement(link.icon as React.ReactElement, { size: 16 })}
                    </div>
                    <ArrowUpRight size={14} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h4 className="text-main font-bold text-xs md:text-sm">{link.name}</h4>
                    <p className="text-muted text-[8px] md:text-[9px] uppercase font-bold tracking-wider">{link.desc}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* BRANDING FOOTER */}
            <div className="mt-12 pt-8 border-t border-custom flex flex-row items-center justify-between gap-4">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-emerald-500 uppercase">2026 Active</span>
               </div>

               {/* Your requested circle element */}
               <div className="flex flex-col items-end opacity-40">
                  <span className="text-[9px] font-bold text-main uppercase tracking-widest">Vighnesh Gaddam</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-main">2026 Edition</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};