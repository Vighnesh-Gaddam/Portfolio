'use client';

import React, { useEffect, useRef } from 'react';
import { X, Building2, GraduationCap, Award, BookOpen, Database, ShieldCheck, BookMarked, Quote, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials, experiences, education, techStack, blogPosts } from '@/data/siteConfig';
import { useRouter } from 'next/navigation';


export type DetailType = 'about' | 'experience' | 'education' | 'stack' | 'testimonials' | 'blog';

interface DetailViewProps {
  onClose: () => void;
  type: DetailType;
}

// Map color keys to Tailwind classes
const colorMap = {
  primary: {
    bg: 'bg-primary/5',
    border: 'border-primary/10',
    text: 'text-primary',
    badge: 'text-primary bg-primary/10',
    hover: 'hover:border-primary/20',
  },
  blue: {
    bg: 'bg-blue-500/5',
    border: 'border-blue-500/10',
    text: 'text-blue-500',
    badge: 'text-blue-500 bg-blue-500/10',
    hover: 'hover:border-blue-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/10',
    text: 'text-emerald-500',
    badge: 'text-emerald-500 bg-emerald-500/10',
    hover: 'hover:border-emerald-500/20',
  },
  muted: {
    bg: 'bg-muted/5',
    border: 'border-custom',
    text: 'text-muted',
    badge: 'text-muted bg-muted/10',
    hover: 'hover:opacity-100',
  },
};

const educationIcons = {
  primary: GraduationCap,
  blue: BookOpen,
  emerald: Award,
  muted: BookMarked,
};

export const DetailView: React.FC<DetailViewProps> = ({ onClose, type }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    return () => previousFocus?.focus();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 bg-overlay backdrop-blur-md"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center pt-4 pb-4 sm:pb-2 px-3 sm:px-8 pointer-events-none">
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-3xl my-auto bg-card rounded-3xl sm:rounded-[36px] border border-custom overflow-hidden flex flex-col shadow-2xl pointer-events-auto ring-1 ring-white/10 max-h-[calc(100vh-4rem)] sm:max-h-[88vh]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
        >
          {/* Close */}
          <motion.button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-card/90 backdrop-blur-md flex items-center justify-center transition-all active:scale-90 border border-custom shadow-md"
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
            whileHover={{ backgroundColor: "var(--text-main)", color: "var(--bg-page)" }}
            style={{ color: "var(--text-main)" }}
          >
            <X size={16} color="currentColor" />
          </motion.button>

          <motion.div
            className="flex flex-col w-full h-full overflow-y-auto overscroll-contain modal-scroll"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >

            {/* ===== ABOUT ===== */}
            {type === 'about' && (
              <div className="flex flex-col md:flex-row min-h-full">
                <div className="w-full md:w-2/5 p-5 sm:p-7 md:p-10 flex flex-col justify-center bg-card-hover md:border-r border-b md:border-b-0 border-custom">
                  <h4 className="text-[0.65rem] font-bold text-primary uppercase tracking-widest mb-5 opacity-60 mt-5 sm:mt-0">Profile</h4>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-main mb-4 leading-tight tracking-tight uppercase">
                    Fullstack <br />
                    <span className="text-muted opacity-60">Scalable <br /> Architect</span>
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {['Modular', 'Type-Safe', 'Optimized'].map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-lg bg-card text-main text-[0.7rem] font-medium border border-custom shadow-sm">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-3/5 p-5 sm:p-7 md:p-10 pb-7 bg-card">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-muted text-[0.65rem] font-bold uppercase tracking-widest mb-3">Bio</h3>
                      <p className="text-main leading-relaxed text-sm font-light">
                        I&apos;m a developer who bridges the gap between complex backends and sharp frontends.
                        I spend my time in <strong>React and NestJS</strong>, ensuring data flows correctly from
                        PostgreSQL to the user&apos;s screen. I build tools that work — no fluff, just functional code.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-muted text-[0.65rem] font-bold uppercase tracking-widest mb-3">The Approach</h3>
                      <div className="grid gap-2.5 pb-2">
                        <div className="group flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-card-hover/40 hover:bg-card-hover border border-custom hover:border-blue-500/20 transition-all duration-300">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-105 transition-transform">
                            <ShieldCheck size={15} />
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <h4 className="text-main font-bold text-xs mb-1">Execution</h4>
                            <p className="text-muted text-[0.7rem]">Secure auth and payment flows via Clerk and Razorpay — built to be reliable.</p>
                          </div>
                        </div>
                        <div className="group flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-card-hover/40 hover:bg-card-hover border border-custom hover:border-amber-500/20 transition-all duration-300">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:scale-105 transition-transform">
                            <Database size={15} />
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <h4 className="text-main font-bold text-xs mb-1">Structure</h4>
                            <p className="text-muted text-[0.7rem]">Predictable, type-safe architecture using strict TypeScript and Prisma schemas.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== EXPERIENCE ===== */}
            {type === 'experience' && (
              <div className="p-5 sm:p-7 md:p-10 pb-7 bg-card min-h-full">
                <div className="max-w-3xl mx-auto">
                  <div className="mb-5 sm:mb-7 mt-5 sm:mt-0">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-main mb-1.5 tracking-tight">Work Experience</h2>
                    <p className="text-muted text-xs sm:text-sm">Currently open to freelance projects and high-impact engineering roles.</p>
                  </div>
                  <div className="space-y-4 pb-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-(--text-muted) before:via-(--text-main) before:to-transparent before:opacity-10">
                    {experiences.map((exp) => (
                      <div key={exp.company} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-4 shadow shrink-0 md:order-1 md:group-odd:-translate-x-6 md:group-even:translate-x-6 z-10 ${exp.current
                          ? "border-gray-500 bg-text-main text-page shadow-lg"
                          : "border-card bg-card-hover text-primary border-custom"
                          }`}>
                          <Building2 size={13} strokeWidth={exp.current ? 2 : 1.5} />
                        </div>
                        <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-3.5 sm:p-4 rounded-[14px] sm:rounded-[18px] bg-card-hover border border-custom transition-all shadow-sm ${exp.current ? "hover:border-primary/30" : "opacity-85 group-hover:opacity-100 hover:border-muted/30"
                          }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1.5 gap-1">
                            <h3 className="font-bold text-main text-sm tracking-tight uppercase">
                              {exp.current ? "Available for Hire" : exp.role}
                            </h3>
                            <span className={`text-[0.55rem] font-bold uppercase px-2 py-0.5 rounded-full w-fit whitespace-nowrap ${exp.current ? "text-primary bg-primary/10" : "text-muted bg-card border border-custom"
                              }`}>{exp.period}</span>
                          </div>
                          <div className="text-muted font-semibold mb-1.5 text-[0.7rem] sm:text-xs">
                            {exp.current ? "Freelance & Full-time" : exp.company}
                          </div>
                          <p className="text-main/80 text-[0.7rem] leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===== EDUCATION ===== */}
            {type === 'education' && (
              <div className="p-5 sm:p-7 md:p-10 pb-7 bg-card min-h-full">
                <div className="max-w-3xl mx-auto">
                  <div className="mb-5 sm:mb-7 mt-5 sm:mt-0">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-main mb-1.5 tracking-tight">Education</h2>
                    <p className="text-muted text-xs sm:text-sm">My academic journey and professional qualifications.</p>
                  </div>
                  <div className="grid gap-2.5 sm:gap-3 pb-4">
                    {education.map((edu) => {
                      const colors = colorMap[edu.color];
                      const Icon = educationIcons[edu.color];
                      return (
                        <div key={edu.institution + edu.period}
                          className={`p-3.5 sm:p-4 rounded-2xl sm:rounded-[20px] bg-card-hover border border-custom ${colors.hover} transition-all shadow-sm ${edu.color === 'muted' ? 'opacity-80 hover:opacity-100' : ''}`}>
                          <div className="flex gap-3 items-center">
                            <div className={`w-9 h-9 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} shrink-0`}>
                              <Icon size={17} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-0.5">
                                <h3 className="text-sm font-bold text-main leading-tight">
                                  {edu.degree.join(' ')}
                                </h3>
                                <span className={`text-[0.55rem] font-bold uppercase px-2 py-0.5 rounded-full w-fit whitespace-nowrap ${colors.badge} ${edu.status === 'current' ? 'animate-pulse' : ''}`}>
                                  {edu.grade ? `${edu.grade} • ${edu.period}` : edu.period}
                                </span>
                              </div>
                              <p className="text-main font-medium text-[0.7rem] mb-0.5">{edu.institution}</p>
                              <p className="text-muted text-[0.65rem]">{edu.location}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ===== STACK ===== */}
            {type === 'stack' && (
              <div className="w-full px-4 sm:px-6 pt-6 pb-5 bg-card max-w-5xl mx-auto flex flex-col items-center">
                <div className="text-center mb-5 px-2 mt-2">
                  <h2 className="text-xl sm:text-3xl font-bold text-main tracking-tight mb-2 leading-tight">Technical Arsenal</h2>
                  <p className="text-muted max-w-2xl mx-auto text-center text-xs sm:text-sm font-light leading-relaxed">
                    A strategic selection of technologies for building scalable, high-performance web applications.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-2.5 sm:gap-3 w-full">

                  {/* Frontend */}
                  <div className="md:col-span-4 p-4 sm:p-5 rounded-[18px] sm:rounded-[22px] bg-card-hover border border-custom flex flex-col group">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-main">Frontend Engineering</h3>
                    </div>
                    <p className="text-muted text-xs mb-4 leading-relaxed">
                      Architecting pixel-perfect, responsive interfaces with a focus on UX and performance.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Shadcn'].map(name => (
                        <span key={name} className="py-1.5 px-2.5 rounded-xl bg-card border border-custom text-muted text-[0.65rem] transition-all duration-300 hover:text-main hover:border-cyan-500/50 hover:scale-105 cursor-default">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Database */}
                  <div className="md:col-span-2 p-4 sm:p-5 rounded-[18px] sm:rounded-[22px] bg-card-hover border border-custom flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      <h3 className="text-base font-bold text-main">Database</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.row1.filter(t => ['PostgreSQL'].includes(t.label)).concat(
                        [{ label: 'MongoDB', hoverColor: '#00ED64' }, { label: 'Prisma', hoverColor: '#DC382D' }, { label: 'Redis', hoverColor: '#DC382D' }]
                      ).map(({ label }) => (
                        <span key={label} className="px-2 py-1.5 rounded-lg bg-card text-muted text-[0.65rem] border border-custom hover:border-orange-500/50 transition-colors">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deployment */}
                  <div className="md:col-span-2 p-4 sm:p-5 rounded-[18px] sm:rounded-[22px] bg-card border border-custom relative overflow-hidden transition-all duration-500 hover:border-blue-500/30 group">
                    <div className="absolute top-4 right-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                    <h3 className="text-sm font-bold mb-3 relative z-10 text-blue-500">Deployment</h3>
                    <div className="relative z-10 space-y-3">
                      <span className="px-2.5 py-1 rounded-lg bg-page text-main text-[0.7rem] font-bold border border-custom inline-block">
                        Git & Version Control
                      </span>
                      <div className="pt-2.5 border-t border-custom">
                        <span className="text-[0.55rem] uppercase tracking-widest font-bold text-blue-500 block mb-1.5">Learning Path</span>
                        <p className="text-muted text-[0.7rem] italic leading-relaxed">
                          Currently mastering <span className="text-main font-semibold not-italic">Docker</span> & <span className="text-main font-semibold not-italic">CI/CD</span> to bridge the gap to cloud. ⚡
                        </p>
                      </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full pointer-events-none" />
                  </div>

                  {/* Backend */}
                  <div className="md:col-span-4 p-4 sm:p-5 rounded-[18px] sm:rounded-[22px] bg-card-hover border border-custom flex flex-col group">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-main">Robust Backend</h3>
                    </div>
                    <p className="text-muted text-[0.65rem] mb-3.5 leading-relaxed">
                      Developing secure, scalable logic and APIs that power complex business workflows.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['NestJS', 'Node.js', 'Express', 'Java', 'Python'].map(name => (
                        <span key={name} className="py-1.5 px-2.5 rounded-xl bg-card border border-custom text-muted text-[0.65rem] transition-all duration-300 hover:text-main hover:border-emerald-500/50 hover:scale-105 cursor-default">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ===== TESTIMONIALS ===== */}
            {type === 'testimonials' && (
              <div className="p-5 sm:p-7 md:p-10 pb-7 bg-card min-h-full">
                <div className="max-w-3xl mx-auto">
                  <div className="mb-5 sm:mb-7 mt-5 sm:mt-0">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-main mb-1.5 tracking-tight">Testimonials</h2>
                    <p className="text-muted text-xs sm:text-sm">What people I&apos;ve worked with have to say.</p>
                  </div>
                  <div className="grid gap-2.5 sm:gap-3 pb-4">
                    {testimonials.map((t) => (
                      <div key={t.id} className="p-4 sm:p-5 rounded-2xl sm:rounded-[20px] bg-card-hover border border-custom hover:border-primary/20 transition-all shadow-sm">
                        <Quote size={18} className="text-primary/30 mb-3" strokeWidth={1.5} />
                        <p className="text-main text-sm leading-relaxed font-medium mb-4">&quot;{t.text}&quot;</p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-main font-bold text-xs">{t.name}</p>
                            <p className="text-muted text-[0.65rem] font-semibold uppercase tracking-wider mt-0.5">{t.role} · {t.company}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {type === 'blog' && (
              <div className="p-5 sm:p-7 md:p-10 pb-7 bg-card min-h-full">
                <div className="max-w-3xl mx-auto">
                  <div className="mb-5 sm:mb-7 mt-5 sm:mt-0">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-main mb-1.5 tracking-tight">
                      Writing
                    </h2>
                    <p className="text-muted text-xs sm:text-sm">
                      Thoughts on engineering, architecture, and building things that last.
                    </p>
                  </div>

                  <div className="grid gap-3 pb-4">
                    {blogPosts.map((post, i) => (
                      <button
                        key={post.slug}
                        onClick={() => {
                          router.push(`/blog/${post.slug}`);
                        }}
                        className="group w-full text-left p-4 sm:p-5 rounded-2xl sm:rounded-[20px] bg-card-hover border border-custom hover:border-primary/20 transition-all shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            {/* Number + tags row */}
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[0.55rem] font-mono text-muted/50">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <div className="flex gap-1">
                                {post.tags.slice(0, 2).map(tag => (
                                  <span key={tag} className="text-[0.55rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-card border border-custom text-muted">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-sm font-bold text-main leading-tight mb-1.5 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>

                            {/* Description */}
                            <p className="text-muted text-[0.7rem] leading-relaxed line-clamp-2">
                              {post.description}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center gap-3 mt-2.5">
                              <span className="flex items-center gap-1 text-[0.55rem] text-muted font-medium">
                                <Calendar size={9} />
                                {new Date(post.date).toLocaleDateString('en-IN', {
                                  year: 'numeric', month: 'short', day: 'numeric'
                                })}
                              </span>
                              <span className="flex items-center gap-1 text-[0.55rem] text-muted font-medium">
                                <Clock size={9} />
                                {post.readTime} read
                              </span>
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="w-7 h-7 rounded-full bg-card border border-custom flex items-center justify-center text-muted group-hover:border-primary/20 group-hover:text-primary transition-all shrink-0 group-hover:rotate-45 duration-300">
                            <ArrowUpRight size={13} />
                          </div>
                        </div>
                      </button>
                    ))}
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