"use client";

import { blogPosts, blogCategories } from "@/data/siteConfig";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ChevronDown, FileText } from "lucide-react";
import { usePageLoading } from "@/components/PageLoadingContext";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

export default function BlogPage() {
    const { start } = usePageLoading();
    const router = useRouter();

    const [activeCategory, setActiveCategory] = useState("all");
    const [filterOpen, setFilterOpen] = useState(false);

    const navigate = (href: string) => {
        start();
        router.push(href);
    };

    const categoriesWithCount = useMemo(() => {
        return blogCategories.map((cat) => ({
            ...cat,
            count: blogPosts.filter((post) => post.category === cat.id).length,
        }));
    }, []);

    const filteredPosts = useMemo(() => {
        if (activeCategory === "all") return blogPosts;

        return blogPosts.filter((post) => post.category === activeCategory);
    }, [activeCategory]);

    const activeCategoryLabel =
        activeCategory === "all"
            ? "Category: All"
            : `Category: ${blogCategories.find((c) => c.id === activeCategory)?.label
            }`;

    return (
        <main className="min-h-screen bg-page text-main overflow-hidden">
            {/* Back Button */}
            <Link
                href="/"
                className=" fixed top-5 left-5 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-card border border-custom flex items-center justify-center backdrop-blur-xl transition-all hover:border-primary/20 active:scale-95"
            >
                <ArrowLeft size={15} className="text-muted" />
            </Link>

            <div className="max-w-6xl mx-auto px-6 sm:px-6 pt-16 lg:pt-14 pb-10">
                {/* ================================= */}
                {/* MOBILE */}
                {/* ================================= */}

                <div className="lg:hidden relative">
                    {/* Header */}
                    <div className="mb-5">
                        {/* Top Row */}
                        <div className="flex items-center justify-between gap-3 mb-3">
                            {/* Title */}
                            <div className="min-w-0">
                                <h1 className="text-2xl font-black tracking-tight">Blog</h1>
                            </div>

                            {/* Feed Selector */}
                            <div className="relative shrink-0">
                                <button
                                    onClick={() => setFilterOpen((p) => !p)}
                                    className=" h-10 px-3.5 rounded-2xl bg-card border border-custom flex items-center gap-2 text-main active:scale-95 transition-all"
                                >
                                    {/* Text */}
                                    <span className="text-[11px] font-medium whitespace-nowrap">
                                        {activeCategory === "all"
                                            ? "Category: All"
                                            : activeCategoryLabel}
                                    </span>

                                    {/* Arrow */}
                                    <motion.div
                                        animate={{
                                            rotate: filterOpen ? 180 : 0,
                                        }}
                                        transition={{
                                            duration: 0.2,
                                        }}
                                    >
                                        <ChevronDown size={13} className="text-muted/60" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {filterOpen && (
                                        <>
                                            {/* Overlay */}
                                            <div
                                                className="fixed inset-0 z-30"
                                                onClick={() => setFilterOpen(false)}
                                            />

                                            {/* Dropdown */}
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    y: -6,
                                                    scale: 0.96,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -6,
                                                    scale: 0.96,
                                                }}
                                                transition={{
                                                    duration: 0.15,
                                                }}
                                                className=" absolute top-12 right-0 z-40 w-72 rounded-3xl border border-custom bg-card/95 backdrop-blur-2xl shadow-2xl p-2"
                                            >
                                                {/* Header */}
                                                <div className="px-3 py-2">
                                                    <p className="text-[0.55rem] uppercase tracking-[0.18em] text-muted font-bold mb-1">
                                                        Select Blog Category
                                                    </p>
                                                </div>

                                                {/* All Posts */}
                                                <button
                                                    onClick={() => {
                                                        setActiveCategory("all");
                                                        setFilterOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-3 py-3 rounded-2xl transition-all ${activeCategory === "all"
                                                            ? "bg-card-hover text-main"
                                                            : "text-muted"
                                                        }`}
                                                >
                                                    <div className="flex flex-col items-start">
                                                        <span className="text-sm font-semibold">All</span>

                                                        <span className="text-[11px] text-muted/50">
                                                            Complete writing feed
                                                        </span>
                                                    </div>

                                                    <span className="text-[11px] font-mono text-muted/40">
                                                        {blogPosts.length}
                                                    </span>
                                                </button>

                                                {/* Categories */}
                                                {categoriesWithCount.map((cat) => (
                                                    <button
                                                        key={cat.id}
                                                        onClick={() => {
                                                            setActiveCategory(cat.id);
                                                            setFilterOpen(false);
                                                        }}
                                                        className={`w-full flex items-center justify-between px-3 py-3 rounded-2xl transition-all ${activeCategory === cat.id
                                                                ? "bg-card-hover text-main"
                                                                : "text-muted"
                                                            }`}
                                                    >
                                                        <div className="flex flex-col items-start">
                                                            <span className="text-sm font-semibold">
                                                                {cat.label}
                                                            </span>

                                                            <span className="text-[11px] text-muted/50">
                                                                {cat.count} published Blogs
                                                            </span>
                                                        </div>

                                                        <span className="text-[11px] font-mono text-muted/40">
                                                            {cat.count}
                                                        </span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-[13px] text-muted leading-5 pr-2">
                            Thoughts on systems, frontend engineering, motion, and scalable
                            architecture.
                        </p>
                    </div>

                    {/* Empty State */}
                    {filteredPosts.length === 0 ? (
                        <div className=" rounded-[28px] bg-card border border-custom p-8 text-center">
                            <div className=" w-14 h-14 mx-auto mb-4 rounded-2xl bg-card-hover border border-custom flex items-center justify-center">
                                <FileText size={22} className="text-muted/50" />
                            </div>

                            <h2 className="text-base font-bold mb-2">No posts yet</h2>

                            <p className="text-[13px] text-muted leading-6 max-w-60 mx-auto">
                                Nothing has been published in this category yet. More writing
                                coming soon.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {filteredPosts.map((post, i) => (
                                <motion.button
                                    key={post.slug}
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        delay: i * 0.03,
                                    }}
                                    onClick={() => navigate(`/blog/${post.slug}`)}
                                    className=" group relative rounded-[22px] bg-card border border-custom p-4 text-left transition-all active:scale-[0.99]"
                                >
                                    {/* Arrow */}
                                    <div className=" absolute top-3.5 right-3.5 w-6 h-6 rounded-full flex items-center justify-center border border-custom bg-card-hover text-muted/50">
                                        <ArrowUpRight size={11} strokeWidth={2.5} />
                                    </div>

                                    {/* Meta */}
                                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                                        <span className="text-[0.45rem] uppercase tracking-[0.12em] text-primary/70 font-bold">
                                            {
                                                blogCategories.find((c) => c.id === post.category)
                                                    ?.label
                                            }
                                        </span>

                                        <span className="text-muted/20">·</span>

                                        <span className="text-[0.5rem] font-mono text-muted/40">
                                            {post.readTime}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="pr-9">
                                        <h2 className="text-xs font-bold tracking-tight leading-snug mb-1.5">
                                            {post.title}
                                        </h2>

                                        <p className="text-[10px] text-muted/70 leading-5">
                                            {post.description}
                                        </p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ================================= */}
                {/* DESKTOP */}
                {/* ================================= */}

                <div className="hidden lg:grid grid-cols-[240px_1fr] gap-6 items-start">
                    {/* Sidebar */}
                    <aside className="sticky top-12 self-start">
                        {/* Intro */}
                        <div className="rounded-[28px] bg-card border border-custom p-5 mb-3">
                            <h1 className="text-3xl font-black tracking-tight mb-3">Blog</h1>

                            <p className="text-sm text-muted leading-6">
                                Thoughts on systems, frontend engineering, motion, and scalable
                                architecture.
                            </p>
                        </div>

                        {/* Categories */}
                        <div className="rounded-[28px] bg-card border border-custom p-2.5">
                            <div className="flex flex-col gap-0.5">

                                {/* Header */}
                                <div className="flex items-center justify-between px-3 pt-3 pb-3 border-b border-custom/80 mb-1">

                                    <h2 className="text-[12px] font-semibold tracking-tight">
                                        Categories
                                    </h2>

                                    <span className="text-[9px] font-mono text-muted/35">
                                        {blogPosts.length} total
                                    </span>
                                </div>

                                {/* All */}
                                <button
                                    onClick={() => setActiveCategory("all")}
                                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${activeCategory === "all"
                                            ? "bg-card-hover text-main"
                                            : "text-muted hover:text-main"
                                        }`}
                                >
                                    <span className="text-[12px] font-medium">
                                        All Blogs
                                    </span>

                                    <span className="text-[9px] font-mono text-muted/35">
                                        {blogPosts.length}
                                    </span>
                                </button>

                                {/* Categories */}
                                {blogCategories.map((cat) => {
                                    const count = blogPosts.filter(
                                        (post) => post.category === cat.id
                                    ).length;

                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${activeCategory === cat.id
                                                    ? "bg-card-hover text-main"
                                                    : "text-muted hover:text-main"
                                                }`}
                                        >
                                            <span className="text-[12px] font-medium">
                                                {cat.label}
                                            </span>

                                            <span className="text-[9px] font-mono text-muted/35">
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* Feed */}
                    <section className="sticky top-12 self-start h-[calc(100vh-6rem)]">
                        <div className="h-full rounded-4xl bg-card border border-custom overflow-hidden flex flex-col">
                            {/* Feed Header */}
                            <div className="px-6 py-5 border-b border-custom bg-card/80 backdrop-blur-xl shrink-0">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[0.55rem] uppercase tracking-[0.2em] text-muted font-bold mb-1">
                                            Feed
                                        </p>

                                        <h2 className="text-sm font-semibold">Latest Writing</h2>
                                    </div>

                                    <span className="text-[0.55rem] font-mono text-muted/40">
                                        {filteredPosts.length} posts
                                    </span>
                                </div>
                            </div>

                            {/* Scroll Area */}
                            <div className="flex-1 overflow-y-auto p-3">
                                {filteredPosts.length === 0 ? (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <div className=" w-16 h-16 mx-auto mb-4 rounded-2xl bg-card-hover border border-custom flex items-center justify-center">
                                                <FileText size={24} className="text-muted/50" />
                                            </div>

                                            <h2 className="text-lg font-bold mb-2">No posts yet</h2>

                                            <p className="text-sm text-muted max-w-sm leading-6">
                                                This category does not have any published articles right
                                                now.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        {filteredPosts.map((post, i) => (
                                            <motion.button
                                                key={post.slug}
                                                initial={{
                                                    opacity: 0,
                                                    y: 8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                    delay: i * 0.03,
                                                }}
                                                onClick={() => navigate(`/blog/${post.slug}`)}
                                                className=" group relative overflow-hidden rounded-[26px] bg-card-hover/40 border border-custom p-5 text-left hover:border-primary/20 hover:bg-card-hover transition-all"
                                            >
                                                {/* Floating Arrow */}
                                                <div className=" absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center border border-custom bg-card/80 backdrop-blur-xl text-muted/50 transition-all duration-300 group-hover:text-primary group-hover:border-primary/20 group-hover:rotate-45 group-hover:scale-110">
                                                    <ArrowUpRight size={13} strokeWidth={2.5} />
                                                </div>

                                                {/* Meta */}
                                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                    <span className="text-[0.5rem] uppercase tracking-[0.15em] text-primary/70 font-bold">
                                                        {
                                                            blogCategories.find((c) => c.id === post.category)
                                                                ?.label
                                                        }
                                                    </span>

                                                    <span className="text-muted/20">·</span>

                                                    <span className="text-[0.55rem] font-mono text-muted/40">
                                                        {post.readTime}
                                                    </span>
                                                </div>

                                                {/* Content */}
                                                <div className="pr-10">
                                                    <h2 className="text-lg font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h2>

                                                    <p className="text-sm text-muted/70 leading-6">
                                                        {post.description}
                                                    </p>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
