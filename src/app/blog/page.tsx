"use client";

import { blogPosts } from "@/data/siteConfig";
import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { usePageLoading } from "@/components/PageLoadingContext";
import { useRouter } from "next/navigation";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: cubicBezier(0.22, 1, 0.36, 1) } },
};

export default function BlogPage() {
    const featured = blogPosts[0];
    const rest = blogPosts.slice(1);
    const { start } = usePageLoading();
    const router = useRouter();

    const navigate = (href: string) => {
        start();
        router.push(href);
    };

    return (
        <main className="min-h-screen bg-page">
            <div className="max-w-225 mx-auto px-6 py-16 sm:py-24 pb-24">

                {/* Back button */}
                <Link
                    href="/"
                    className="fixed top-6 left-6 z-40 w-10 h-10 flex items-center justify-center rounded-2xl bg-card border border-custom shadow-sm [@media(hover:hover)]:hover:-translate-y-0.5 transition-all group active:scale-95"
                    aria-label="Back to portfolio"
                >
                    <ArrowLeft size={18} className="text-main group-hover:-translate-x-0.5 transition-transform" />
                </Link>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-5"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-2">
                        <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-muted mb-2">Writing</p>
                        <h1 className="text-4xl sm:text-5xl font-black text-main tracking-tight">Blog</h1>
                    </motion.div>

                    {/* Featured post */}
                    {featured && (
                        <motion.article variants={itemVariants}>
                            <button
                                onClick={() => navigate(`/blog/${featured.slug}`)}
                                className="group relative overflow-hidden rounded-4xl bg-card border border-custom p-8 sm:p-10 flex flex-col gap-5 [@media(hover:hover)]:hover:border-primary/30 transition-all duration-300 [@media(hover:hover)]:hover:-translate-y-0.5 w-full text-left"
                            >
                                {/* Top gradient line */}
                                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
                                {/* Glow */}
                                <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-transform duration-500 group-hover:scale-125 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex flex-wrap items-center gap-3 mb-5">
                                        <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                            Featured
                                        </span>
                                        <span className="text-xs text-muted font-medium">
                                            {new Date(featured.date).toLocaleDateString("en-IN", {
                                                year: "numeric", month: "long", day: "numeric",
                                            })}
                                        </span>
                                        <span className="text-muted/30">·</span>
                                        <span className="text-xs text-muted/70">{featured.readTime} read</span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-black text-main tracking-tight leading-tight mb-3 [@media(hover:hover)]:group-hover:text-primary transition-colors">
                                        {featured.title}
                                    </h2>

                                    {featured.description && (
                                        <p className="text-sm leading-7 text-muted max-w-xl">{featured.description}</p>
                                    )}

                                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-custom/60">
                                        <div className="flex flex-wrap gap-1.5">
                                            {featured.tags?.map((tag) => (
                                                <span key={tag} className="text-[0.6rem] font-bold uppercase tracking-[0.12em] px-2 py-0.5 rounded-md bg-page border border-custom text-muted">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <ArrowUpRight
                                            size={18}
                                            className="text-muted [@media(hover:hover)]:group-hover:text-primary [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5 transition-all shrink-0"
                                        />
                                    </div>
                                </div>
                            </button>
                        </motion.article>
                    )}

                    {/* Rest of posts */}
                    {rest.length > 0 && (
                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {rest.map((post) => (
                                <article key={post.slug}>
                                    <button
                                        onClick={() => navigate(`/blog/${post.slug}`)}
                                        className="group relative overflow-hidden rounded-[28px] bg-card border border-custom p-6 flex flex-col justify-between gap-4 [@media(hover:hover)]:hover:border-primary/30 transition-all duration-300 [@media(hover:hover)]:hover:-translate-y-0.5 w-full text-left min-h-50"
                                    >
                                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/4 blur-2xl transition-transform duration-500 group-hover:scale-150 pointer-events-none" />

                                        <div className="relative z-10 flex flex-col gap-3 flex-1">
                                            <div className="flex items-center gap-2 text-xs text-muted">
                                                <span>
                                                    {new Date(post.date).toLocaleDateString("en-IN", {
                                                        year: "numeric", month: "short", day: "numeric",
                                                    })}
                                                </span>
                                                <span className="text-muted/30">·</span>
                                                <span>{post.readTime} read</span>
                                            </div>

                                            <h3 className="text-sm font-bold text-main leading-snug [@media(hover:hover)]:group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h3>

                                            {post.description && (
                                                <p className="text-xs leading-6 text-muted line-clamp-2">{post.description}</p>
                                            )}
                                        </div>

                                        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-custom/50">
                                            <div className="flex flex-wrap gap-1">
                                                {post.tags?.slice(0, 2).map((tag) => (
                                                    <span key={tag} className="text-[0.55rem] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-page border border-custom text-muted/70">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <ArrowUpRight
                                                size={14}
                                                className="text-muted/40 [@media(hover:hover)]:group-hover:text-primary [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5 transition-all shrink-0"
                                            />
                                        </div>
                                    </button>
                                </article>
                            ))}
                        </motion.div>
                    )}

                    {/* Empty state */}
                    {blogPosts.length === 0 && (
                        <motion.div variants={itemVariants} className="rounded-[28px] bg-card border border-custom p-12 text-center">
                            <p className="text-muted text-sm">No posts yet. Check back soon.</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </main>
    );
}