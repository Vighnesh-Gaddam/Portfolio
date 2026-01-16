'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Github,
    ExternalLink,
    Code2,
    Mail,
    Linkedin,
    Check,
    Copy
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BentoCard } from '@/components/BentoCard';

/* ---------------- TYPES ---------------- */
interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    repo: string;
}

/* ---------------- PROJECT VISUAL ---------------- */
const ProjectVisual = () => (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative rounded-lg border border-custom bg-card/30 group-hover:bg-card/50 transition-colors duration-500">
        <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
                backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }}
        />
        <div className="relative z-10 text-text-muted group-hover:text-main transition-colors duration-500">
            <Code2 size={48} strokeWidth={1} />
        </div>
    </div>
);

/* ---------------- TIMELINE ITEM ---------------- */
const TimelineItem = ({
    project,
    isLast,
    index
}: {
    project: Project;
    isLast: boolean;
    index: number;
}) => (
    <div className="relative pl-8 sm:pl-12 py-2 group">
        {/* Vertical line */}
        {!isLast && (
            <div
                className="absolute left-[11px] sm:left-[15px] top-3 bottom-[-30px] w-px bg-text-muted/20 group-hover:bg-text-muted/50 transition-colors"
            ></div>
        )}

        {/* 2. Timeline Marker (Hollow Circle) */}
        <div
            className="absolute left-0 sm:left-1 top-3 w-[22px] h-[22px] rounded-full border bg-page flex items-center justify-center z-10"
            style={{ borderColor: 'rgba(102, 102, 102, 0.2)' }} 
        >
            {/* Inner Dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-text-muted group-hover:bg-text-main transition-colors duration-300"></div>
        </div>

        <div className="flex flex-col gap-6 mb-20 sm:mb-28">
            <h3 className="text-2xl sm:text-3xl font-bold text-main tracking-tight">
                {project.title}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 flex flex-col justify-between gap-6">
                    <p className="text-base text-text-muted leading-relaxed">
                        {project.description}
                    </p>

                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-medium text-text-muted px-2 py-1 rounded border border-custom bg-transparent uppercase tracking-wider"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-5 pt-2">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-bold text-main hover:opacity-70 flex items-center gap-2 transition-opacity uppercase tracking-wider"
                            >
                                <ExternalLink size={14} /> Live Demo
                            </a>

                            <a
                                href={project.repo}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-bold text-text-muted hover:text-main flex items-center gap-2 transition-colors uppercase tracking-wider"
                            >
                                <Github size={14} /> Source Code
                            </a>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="aspect-video w-full">
                        <ProjectVisual />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

/* ---------------- PAGE ---------------- */
export default function ProjectsPage() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const email = 'vgnshgdm@gmail.com';

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    /* ---------------- PROJECTS DATA ---------------- */
    const projects: Project[] = [
        {
            id: '1',
            title: 'Genix AI SaaS Platform',
            description: 'A comprehensive MERN AI platform offering content generation, image manipulation, and resume reviewing. Features include background removal, object deletion, and community sharing, leveraging modern AI models.',
            tags: ['MERN Stack', 'AI Models', 'SaaS', 'Cloudinary'],
            link: 'https://github.com/Vighnesh-Gaddam/Genix---generate-anything', // Update with live link if available
            repo: 'https://github.com/Vighnesh-Gaddam/Genix---generate-anything'
        },
        {
            id: '2',
            title: 'Restaurant Management System',
            description: 'A freelance full-stack solution built in just one week. Features separate Client and Admin dashboards, real-time menu updates, and image management via Cloudinary. Optimized for high-speed performance and reliability.',
            tags: ['MERN', 'Freelance', 'Tailwind CSS', 'Cloudinary'],
            link: 'https://restuarent-client-frontend.vercel.app/',
            repo: 'https://github.com/Vighnesh-Gaddam/Restuarent-Admin-Frontend'
        },
        {
            id: '3',
            title: 'Hirrd Job Portal',
            description: 'A modern job platform connecting recruiters and candidates. Built with Clerk for enterprise-grade authentication and Supabase for real-time database management. Includes role-based dashboards and job application tracking.',
            tags: ['React JS', 'Supabase', 'Clerk Auth', 'Shadcn UI'],
            link: 'https://hirrdjobs.vercel.app/',
            repo: 'https://github.com/Vighnesh-Gaddam/JobPortal'
        },
        {
            id: '4',
            title: 'Homyz Real Estate',
            description: 'Full-stack property marketplace featuring Auth0 security and Cloudinary image hosting. Users can search properties, view detailed analytics, and contact agents through a highly responsive Framer Motion-animated UI.',
            tags: ['MongoDB', 'Express', 'Mantine UI', 'Auth0'],
            link: 'https://homyz-real-estate-project.vercel.app/',
            repo: 'https://github.com/Vighnesh-Gaddam/Real-Estate-Project'
        },
        {
            id: '5',
            title: 'Next.js & Prisma Learning Journal',
            description: 'A technical documentation project tracking 26+ modules of Next.js mastery. Covers Server Actions, Prisma ORM integration, Parallel/Intercepting routes, and RESTful API architecture with comprehensive markdown guides.',
            tags: ['Next.js', 'Prisma', 'Server Actions', 'Documentation'],
            link: 'https://github.com/Vighnesh-Gaddam/NextJS-daily-learning-journal',
            repo: 'https://github.com/Vighnesh-Gaddam/NextJS-daily-learning-journal'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-page overflow-y-auto transition-colors duration-500 ease"
        >
            {/* Floating Back Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                onClick={() => router.back()}
                className="fixed top-6 left-6 z-[110] w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-[20px] sm:rounded-[28px] bg-card backdrop-blur-xl border border-transparent dark:border-white/5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30_px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30_px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-card-hover hover:-translate-y-1 transition-all duration-300 group"
                aria-label="Go back"
            >
                <ArrowLeft size={20} className="text-main group-hover:-translate-x-1 transition-transform" />
            </motion.button>

            <main className="relative max-w-4xl mx-auto px-6 py-16 sm:py-24">
                {/* Header Section */}
                <div className="relative z-10 mb-24 sm:mb-32 pl-8 sm:pl-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-main mb-6 leading-[0.9]">
                            Projects
                        </h2>
                        <p className="text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed font-medium">
                            A curated selection of projects showcasing my frontend and <span className="text-main font-semibold">full-stack work.</span>
                        </p>
                    </motion.div>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <TimelineItem
                                index={i}
                                project={project}
                                isLast={i === projects.length - 1}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Contact Section */}
                <motion.section
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-12 sm:mt-20 pl-8 sm:pl-12 relative"
                >
                    <div className="mb-16 pt-12">
                        <h3 className="text-4xl sm:text-6xl font-black text-main mb-6 tracking-tight">
                            Let’s Connect
                        </h3>
                        <p className="text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed">
                            I’m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <BentoCard className="group" onClick={handleCopyEmail}>
                            <div className="h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-card border border-custom flex items-center justify-center text-main shadow-sm group-hover:scale-110 group-hover:border-text-main/20 transition-all duration-500">
                                        {copied ? (
                                            <Check size={20} className="sm:w-6 sm:h-6 text-main" strokeWidth={2} />
                                        ) : (
                                            <Mail size={20} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
                                        )}
                                    </div>
                                    <div className="p-2 rounded-full bg-card border border-custom text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Copy size={14} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg sm:text-xl font-bold text-main mb-1 tracking-tight">
                                        {copied ? 'Copied to Clipboard' : 'Email Me'}
                                    </h4>
                                    <p className="text-xs sm:text-sm font-medium text-text-muted flex items-center gap-2 break-all">
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </BentoCard>

                        <BentoCard
                            className="group"
                            hasArrow={true}
                            onClick={() => window.open('https://www.linkedin.com/in/vighnesh-gaddam/', '_blank')}
                        >
                            <div className="h-full flex flex-col justify-between">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-card border border-custom flex items-center justify-center text-main shadow-sm group-hover:scale-110 group-hover:bg-[#0077b5] group-hover:text-white group-hover:border-[#0077b5]/30 transition-all duration-500">
                                    <Linkedin size={20} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-lg sm:text-xl font-bold text-main mb-1 tracking-tight transition-colors">
                                        LinkedIn
                                    </h4>
                                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-muted transition-colors flex items-center gap-2">
                                        @vighneshgd
                                    </p>
                                </div>
                            </div>
                        </BentoCard>
                    </div>
                </motion.section>
                <div className="h-16"></div>
            </main>
        </motion.div>
    );
}