'use client';

import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Github, ExternalLink, Code2,
    Mail, Linkedin, Check
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BentoCard } from '@/components/BentoCard';

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    repo: string;
}

const ProjectVisual = memo(() => (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative rounded-lg border border-custom bg-card/30 group-hover:bg-card/50 transition-colors duration-500">
        <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
            style={{
                backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }}
        />
        <div className="relative z-10 text-text-muted group-hover:text-main transition-colors duration-500">
            <Code2 size={48} strokeWidth={1} />
        </div>
    </div>
));
ProjectVisual.displayName = 'ProjectVisual';

const TimelineItem = memo(({
    project,
    isLast,
    index
}: {
    project: Project;
    isLast: boolean;
    index: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.2) }}
        className="relative pl-8 sm:pl-12 py-2 group"
    >
        {!isLast && (
            <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-[-30px] w-px bg-text-muted/20 group-hover:bg-text-muted/50 transition-colors" />
        )}

        <div className="absolute left-0 sm:left-1 top-3 w-[22px] h-[22px] rounded-full border border-custom bg-page flex items-center justify-center z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-text-muted group-hover:bg-text-main transition-colors duration-300" />
        </div>

        <div className="flex flex-col gap-6 mb-20 sm:mb-28">
            <h3 className="text-2xl sm:text-3xl font-bold text-main tracking-tight">{project.title}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 flex flex-col justify-between gap-6">
                    <p className="text-base text-text-muted leading-relaxed">{project.description}</p>
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-medium text-text-muted px-2 py-1 rounded border border-custom uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-5 pt-2">
                            <a href={project.link} target="_blank" rel="noreferrer" className="text-xs font-bold text-main hover:opacity-70 flex items-center gap-2 transition-opacity uppercase tracking-wider">
                                <ExternalLink size={14} /> Live Demo
                            </a>
                            <a href={project.repo} target="_blank" rel="noreferrer" className="text-xs font-bold text-text-muted hover:text-main flex items-center gap-2 transition-colors uppercase tracking-wider">
                                <Github size={14} /> Source Code
                            </a>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 aspect-video w-full">
                    <ProjectVisual />
                </div>
            </div>
        </div>
    </motion.div>
));
TimelineItem.displayName = 'TimelineItem';

export default function ProjectsPage() {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const email = 'vgnshgdm@gmail.com';

    useEffect(() => {
        document.body.style.overflow = "unset";
    }, []);

    const projects = useMemo((): Project[] => [
        {
            id: '1',
            title: 'Genix AI SaaS Platform',
            description: 'A comprehensive MERN AI platform offering content generation, image manipulation, and resume reviewing.',
            tags: ['MERN Stack', 'AI Models', 'SaaS', 'Cloudinary'],
            link: 'https://github.com/Vighnesh-Gaddam/Genix---generate-anything',
            repo: 'https://github.com/Vighnesh-Gaddam/Genix---generate-anything'
        },
        {
            id: '2',
            title: 'Restaurant Management System',
            description: 'A freelance full-stack solution built in just one week. Features separate Client and Admin dashboards.',
            tags: ['MERN', 'Freelance', 'Tailwind CSS', 'Cloudinary'],
            link: 'https://restuarent-client-frontend.vercel.app/',
            repo: 'https://github.com/Vighnesh-Gaddam/Restuarent-Admin-Frontend'
        },
        {
            id: '3',
            title: 'Hirrd Job Portal',
            description: 'A modern job platform connecting recruiters and candidates. Built with Clerk for enterprise-grade authentication.',
            tags: ['React JS', 'Supabase', 'Clerk Auth', 'Shadcn UI'],
            link: 'https://hirrdjobs.vercel.app/',
            repo: 'https://github.com/Vighnesh-Gaddam/JobPortal'
        },
        {
            id: '4',
            title: 'Homyz Real Estate',
            description: 'Full-stack property marketplace featuring Auth0 security and Cloudinary image hosting.',
            tags: ['MongoDB', 'Express', 'Mantine UI', 'Auth0'],
            link: 'https://homyz-real-estate-project.vercel.app/',
            repo: 'https://github.com/Vighnesh-Gaddam/Real-Estate-Project'
        },
        {
            id: '5',
            title: 'Next.js & Prisma Learning Journal',
            description: 'A technical documentation project tracking 26+ modules of Next.js mastery.',
            tags: ['Next.js', 'Prisma', 'Server Actions', 'Documentation'],
            link: 'https://github.com/Vighnesh-Gaddam/NextJS-daily-learning-journal',
            repo: 'https://github.com/Vighnesh-Gaddam/NextJS-daily-learning-journal'
        }
    ], []);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="relative bg-page min-h-screen">
            <button
                onClick={() => router.back()}
                className="fixed top-6 left-6 z-[110] w-12 h-12 flex items-center justify-center rounded-[20px] bg-card border border-custom shadow-sm hover:-translate-y-1 transition-all group active:scale-95"
                aria-label="Go back"
            >
                <ArrowLeft size={20} className="text-main group-hover:-translate-x-1 transition-transform" />
            </button>

            <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
                <header className="mb-24 pl-8 sm:pl-12">
                    <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-main mb-6 leading-none">Projects</h2>
                    <p className="text-lg text-text-muted max-w-2xl font-medium">
                        A curated selection of projects showcasing my frontend and <span className="text-main font-semibold">full-stack work.</span>
                    </p>
                </header>

                <div className="relative will-change-transform">
                    {projects.map((project, i) => (
                        <TimelineItem
                            key={project.id}
                            index={i}
                            project={project}
                            isLast={i === projects.length - 1}
                        />
                    ))}
                </div>

                <section className="mt-20 pl-8 sm:pl-12">
                    <h3 className="text-4xl sm:text-6xl font-black text-main mb-12 tracking-tight">Let’s Connect</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <BentoCard onClick={handleCopyEmail}>
                            <div className="flex flex-col justify-between h-full p-2">
                                <div className="w-10 h-10 rounded-xl bg-card border border-custom flex items-center justify-center text-main">
                                    {copied ? <Check size={20} /> : <Mail size={20} />}
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-bold text-main">{copied ? 'Copied!' : 'Email Me'}</h4>
                                    <p className="text-xs text-text-muted">{email}</p>
                                </div>
                            </div>
                        </BentoCard>

                        <BentoCard onClick={() => window.open('https://linkedin.com/in/vighnesh-gaddam/', '_blank')}>
                            <div className="flex flex-col justify-between h-full p-2">
                                <div className="w-10 h-10 rounded-xl bg-card border border-custom flex items-center justify-center text-main">
                                    <Linkedin size={20} />
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-bold text-main">LinkedIn</h4>
                                    <p className="text-xs text-text-muted">@vighneshgd</p>
                                </div>
                            </div>
                        </BentoCard>
                    </div>
                </section>
            </div>
        </main>
    );
}