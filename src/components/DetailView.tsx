'use client';

import React, { useEffect, useRef } from 'react';
import {
  X,
  Building2,
  GraduationCap,
  Award,
  BookOpen,
  Database,
  ShieldCheck,
  BookMarked,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DetailViewProps {
  onClose: () => void;
  type: 'about' | 'experience' | 'education' | 'stack';
  layoutId?: string;
}

export const DetailView: React.FC<DetailViewProps> = ({
  onClose,
  type,
  layoutId,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus management
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    return () => previousFocus?.focus();
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 bg-overlay "
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center pt-4 pb-4 sm:pb-2 px-3 sm:px-8 pointer-events-none overflow-y-auto">
        <motion.div
          ref={modalRef}
          layoutId={layoutId}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-5xl my-auto bg-card rounded-[24px] sm:rounded-[40px] border border-custom overflow-hidden flex flex-col shadow-2xl pointer-events-auto ring-1 ring-white/10 max-h-[calc(100vh-8rem)] sm:max-h-[85vh]"
          initial={{ scale: 0.92, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{
            layout: { type: 'spring', stiffness: 200, damping: 28, mass: 0.8 },
            scale: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
            opacity: { duration: 0.3 },
          }}
        >
          {/* Close */}
          <motion.button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-card/90 backdrop-blur-md flex items-center justify-center transition-all active:scale-90 border border-custom shadow-md"
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
            whileHover={{
              backgroundColor: "var(--text-main)",
              color: "var(--bg-page)"
            }}
            style={{
              color: "var(--text-main)"
            }}
          >
            <X size={20} color="currentColor" />
          </motion.button>

          {/* Content */}
          <motion.div
            className="flex flex-col w-full h-full overflow-y-auto overscroll-contain modal-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >

            {/* ================= ABOUT ================= */}
            {type === 'about' && (
              <div className="flex flex-col md:flex-row min-h-full">
                {/* Left Column: Profile */}
                <div className="w-full md:w-2/5 p-6 sm:p-8 md:p-12 flex flex-col justify-center bg-card-hover md:border-r border-b md:border-b-0 border-custom">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-6 sm:mb-8 opacity-60 mt-6 sm:mt-0">
                    Profile
                  </h4>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-main mb-4 sm:mb-6 leading-tight tracking-tight uppercase">
                    Fullstack <br />
                    <span className="text-muted opacity-60">
                      Scalable <br /> Architect
                    </span>
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {['Modular', 'Type-Safe', 'Optimized'].map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-xl bg-card text-main text-xs font-medium border border-custom shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Bio & Approach */}
                <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12 pb-8 sm:pb-10 bg-card">
                  <div className="space-y-8 sm:space-y-10">
                    {/* Bio Section */}
                    <div>
                      <h3 className="text-muted text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">
                        Bio
                      </h3>
                      <p className="text-main leading-relaxed sm:leading-loose text-base sm:text-lg font-light">
                        I’m a developer who bridges the gap between complex backends and sharp frontends.
                        I spend my time in <strong>React and NestJS</strong>, ensuring data flows correctly from
                        PostgreSQL to the user's screen. I build tools that work—no fluff, just functional code.
                      </p>
                    </div>

                    {/* Approach Section */}
                    <div>
                      <h3 className="text-muted text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">
                        The Approach
                      </h3>
                      <div className="grid gap-3 sm:gap-4 pb-2 sm:pb-4">
                        {/* Item 1 - Execution */}
                        <div className="group flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-card-hover/40 hover:bg-card-hover border border-custom hover:border-blue-500/20 transition-all duration-300">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-105 transition-transform">
                            <ShieldCheck size={20} />
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                            <h4 className="text-main font-bold text-sm sm:text-base mb-1">Execution</h4>
                            <p className="text-muted text-xs sm:text-sm">
                              Secure auth and payment flows via Clerk and Razorpay—built to be reliable.
                            </p>
                          </div>
                        </div>

                        {/* Item 2 - Structure */}
                        <div className="group flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-card-hover/40 hover:bg-card-hover border border-custom hover:border-amber-500/20 transition-all duration-300">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:scale-105 transition-transform">
                            <Database size={20} />
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
                            <h4 className="text-main font-bold text-sm sm:text-base mb-1">Structure</h4>
                            <p className="text-muted text-xs sm:text-sm">
                              Predictable, type-safe architecture using strict TypeScript and Prisma schemas.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EXPERIENCE */}
            {type === 'experience' && (
              <div className="p-6 sm:p-8 md:p-12 pb-8 sm:pb-10 bg-card min-h-full overflow-y-auto no-scrollbar">
                <div className="max-w-4xl mx-auto">
                  {/* Header Section */}
                  <div className="mb-8 sm:mb-10 mt-6 sm:mt-0">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-main mb-3 sm:mb-4 tracking-tight">
                      Work Experience
                    </h2>
                    <p className="text-muted text-base sm:text-lg">
                      Currently open to freelance projects and high-impact engineering roles.
                    </p>
                  </div>

                  {/* Timeline Container */}
                  <div className="space-y-6 sm:space-y-10 pb-4 sm:pb-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[var(--text-muted)] before:via-[var(--text-main)] before:to-transparent before:opacity-10">

                    {/* Job 1 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-gray-500 bg-text-main text-page shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-100">
                        <Building2 size={18} strokeWidth={2} />
                      </div>

                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 sm:p-8 rounded-[20px] sm:rounded-[32px] bg-card-hover border border-custom hover:border-primary/30 transition-all shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                          <h3 className="font-bold text-main text-base sm:text-xl tracking-tight uppercase">
                            Available for Hire
                          </h3>
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase text-primary bg-primary/10 px-2.5 sm:px-3 py-1 rounded-full w-fit">
                            Current
                          </span>
                        </div>
                        <div className="text-muted font-bold mb-3 sm:mb-4 text-sm sm:text-base flex items-center gap-2">
                          Freelance & Full-time
                        </div>
                        <p className="text-main/80 text-xs sm:text-sm leading-relaxed">
                          Actively seeking new challenges in Software Engineering or System Architecture. Open to freelance projects, contract work, or full-time roles where I can build scalable, high-performance solutions.
                        </p>
                      </div>
                    </div>

                    {/* Job 2 */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-card bg-card-hover text-primary border-custom shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <Building2 size={18} strokeWidth={1.5} />
                      </div>

                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 sm:p-8 rounded-[20px] sm:rounded-[32px] bg-card-hover border border-custom hover:border-muted/30 transition-all shadow-sm opacity-85 group-hover:opacity-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                          <h3 className="font-bold text-main text-base sm:text-xl tracking-tight uppercase">
                            Full Stack Developer
                          </h3>
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase text-muted bg-card px-2.5 sm:px-3 py-1 rounded-full w-fit border border-custom">
                            2024 — 2025
                          </span>
                        </div>
                        <div className="text-muted font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                          TechieBears Pvt. Ltd.
                        </div>
                        <p className="text-main/80 text-xs sm:text-sm leading-relaxed">
                          Engineered high-performance web platforms with a focus on GSAP animations and IndexedDB for offline persistence. Managed the end-to-end SDLC using React, Node.js, and TypeScript to build responsive, robust systems.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* EDUCATION MODAL */}
            {type === 'education' && (
              <div className="p-6 sm:p-8 md:p-12 pb-8 sm:pb-10 bg-card min-h-full">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-8 sm:mb-10 mt-6 sm:mt-0">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-main mb-3 sm:mb-4 tracking-tight">
                      Education
                    </h2>
                    <p className="text-muted text-base sm:text-lg">
                      My academic journey and professional qualifications.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:gap-6 pb-4 sm:pb-6">

                    {/* Master's - Current */}
                    <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover border border-custom hover:border-primary/20 transition-all group shadow-sm">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
                          <GraduationCap size={24} className="sm:hidden" />
                          <GraduationCap size={32} className="hidden sm:block" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className="text-lg sm:text-2xl font-bold text-main">
                              Master of Computer Applications (MCA)
                            </h3>
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase text-primary bg-primary/10 px-2.5 sm:px-3 py-1 rounded-full w-fit animate-pulse">
                              Current • Sem 1
                            </span>
                          </div>
                          <p className="text-main font-medium text-sm sm:text-base mb-1">
                            Manipal University Jaipur
                          </p>
                          <p className="text-muted text-xs sm:text-sm">
                            Postgraduate Degree • Online/Jaipur, India
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bachelor's */}
                    <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover border border-custom hover:border-blue-500/20 transition-all group shadow-sm">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                          <BookOpen size={24} className="sm:hidden" />
                          <BookOpen size={32} className="hidden sm:block" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className="text-lg sm:text-2xl font-bold text-main">
                              B.Sc. Information Technology
                            </h3>
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase text-blue-500 bg-blue-500/10 px-2.5 sm:px-3 py-1 rounded-full w-fit">
                              8.02 cgpa • 2021 — 2024
                            </span>
                          </div>
                          <p className="text-main font-medium text-sm sm:text-base mb-1">
                            University of Mumbai
                          </p>
                          <p className="text-muted text-xs sm:text-sm">
                            Undergraduate Degree • Mumbai, India
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Junior College (12th) */}
                    <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover border border-custom hover:border-emerald-500/20 transition-all group shadow-sm">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                          <Award size={24} className="sm:hidden" />
                          <Award size={32} className="hidden sm:block" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className="text-lg sm:text-2xl font-bold text-main">
                              HSC (12th Grade)
                            </h3>
                            {/* Added whitespace-nowrap */}
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase text-emerald-500 bg-emerald-500/10 px-2.5 sm:px-3 py-1 rounded-full w-fit whitespace-nowrap">
                              79% • 2021
                            </span>
                          </div>
                          <p className="text-main font-medium text-sm sm:text-base mb-1">
                            The Scholars English High School and Jr. College
                          </p>
                          <p className="text-muted text-xs sm:text-sm">
                            Maharashtra State Board • 2019 — 2021
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* School (10th) */}
                    <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-card-hover border border-custom transition-all group shadow-sm opacity-80 hover:opacity-100">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-muted/5 border border-custom flex items-center justify-center text-muted shrink-0">
                          <BookMarked size={24} className="sm:hidden" />
                          <BookMarked size={32} className="hidden sm:block" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className="text-lg sm:text-2xl font-bold text-main">
                              SSC (10th Grade)
                            </h3>
                            {/* Removed border-custom and added whitespace-nowrap to match the others */}
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase text-muted bg-muted/10 px-2.5 sm:px-3 py-1 rounded-full w-fit whitespace-nowrap">
                              66.20% • 2019
                            </span>
                          </div>
                          <p className="text-main font-medium text-sm sm:text-base mb-1">
                            The Scholars English High School
                          </p>
                          <p className="text-muted text-xs sm:text-sm">
                            Maharashtra State Board • 2018 — 2019
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* STACK MODAL  */}
            {type === 'stack' && (
              <div className="w-full px-4 pt-8 pb-4 md:pb-8 bg-card max-w-7xl mx-auto flex flex-col items-center overflow-visible">

                {/* Header Section */}
                <div className="text-center mb-8 px-2">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight mb-4 leading-tight">Technical Arsenal</h2>
                  <p className="text-muted max-w-2xl mx-auto text-center text-base sm:text-lg font-light leading-relaxed">
                    A strategic selection of technologies for building scalable, high-performance web applications.
                  </p>
                </div>

                {/* The Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full">

                  {/* 1. Frontend */}
                  <div className="md:col-span-4 p-6 sm:p-8 rounded-[24px] md:rounded-[32px] bg-card-hover border border-custom flex flex-col justify-between group relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0"></div>
                        <h3 className="text-xl md:text-2xl font-bold text-main truncate">Frontend Engineering</h3>
                      </div>
                      <p className="text-muted text-xs md:text-sm mb-6 md:mb-8 max-w-md leading-relaxed">
                        Architecting pixel-perfect, responsive interfaces with a focus on UX and performance.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['Next.js', 'React', 'TS', 'Tailwind', 'Framer', 'Shadcn'].map(name => (
                          <span key={name} className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-card border border-custom text-muted text-[11px] md:text-sm transition-all duration-300 hover:text-main hover:border-cyan-500/50 hover:scale-105 cursor-default">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 2. Database */}
                  <div className="md:col-span-2 p-6 sm:p-8 rounded-[24px] md:rounded-[32px] bg-card-hover border border-custom flex flex-col justify-center overflow-hidden">
                    <h3 className="text-lg md:text-xl font-bold text-main mb-6 flex items-center gap-3 shrink-0">
                      <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
                      Database
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['PostgreSQL', 'MongoDB', 'Prisma', 'Redis'].map(name => (
                        <span key={name} className="px-2.5 py-1.5 rounded-lg bg-card text-muted text-[11px] border border-custom hover:border-orange-500/50 transition-colors">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 3. Deployment */}
                  <div className="md:col-span-2 p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-neutral-900/50 border border-blue-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-blue-400 mb-5 relative z-10 flex items-center gap-2">
                      Deployment
                    </h3>
                    <div className="relative z-10 space-y-5">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-card text-main text-[11px] font-medium border border-blue-500/30">
                          Git & Version Control
                        </span>
                      </div>
                      <div className="pt-4 border-t border-blue-500/10">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-blue-500/80 block mb-2">Learning Path</span>
                        <p className="text-muted text-[11px] italic">Currently mastering <span className="text-main/80 font-medium font-sans">Docker</span> & <span className="text-main/80 font-medium font-sans">CI/CD</span> to bridge the gap to cloud.⚡</p>
                      </div>
                    </div>
                  </div>

                  {/* 4. Backend */}
                  <div className="md:col-span-4 p-6 sm:p-8 rounded-[24px] md:rounded-[32px] bg-card-hover border border-custom flex flex-col justify-between group overflow-hidden">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-main mb-4 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
                        Robust Backend
                      </h3>
                      <p className="text-muted text-xs md:text-sm mb-6 md:mb-8 max-w-md leading-relaxed">
                        Developing secure, scalable logic and APIs that power complex business workflows.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['NestJS', 'Node.js', 'Express', 'Java', 'Python'].map(name => (
                          <span key={name} className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-card border border-custom text-muted text-[11px] md:text-sm transition-all duration-300 hover:text-main hover:border-emerald-500/50 hover:scale-105 cursor-default">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
