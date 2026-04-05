import { blogPosts } from '@/data/siteConfig';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import type { Metadata } from 'next';
import ReadingProgress from '@/components/ReadingProgress';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

async function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(raw);
    return { content, frontmatter: data };
  } catch (err) {
    console.error('[Blog] Error:', err);
    return null;
  }
}

const mdxComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-2xl font-black text-main tracking-tight mt-10 mb-4">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-xl font-bold text-main tracking-tight mt-10 mb-4 pb-2 border-b border-custom">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-base font-bold text-main mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-muted leading-relaxed my-4 text-sm sm:text-base">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="my-4 space-y-2 list-none pl-0">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="my-4 space-y-2 list-decimal pl-5">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-muted text-sm sm:text-base leading-relaxed flex gap-2 items-start mb-1">
      <span className="text-primary shrink-0">–</span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="text-main font-bold">{children}</strong>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="text-primary bg-card border border-custom px-1.5 py-0.5 rounded text-xs font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-card border border-custom rounded-2xl p-5 overflow-x-auto my-6 text-xs font-mono text-muted leading-relaxed">
      {children}
    </pre>
  ),
  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a href={href} className="text-primary hover:underline">{children}</a>
  ),
  hr: () => <hr className="border-custom my-8" />,
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-primary/30 pl-4 my-6 text-muted italic">{children}</blockquote>
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, meta] = await Promise.all([
    getPost(slug),
    Promise.resolve(blogPosts.find((p) => p.slug === slug)),
  ]);

  if (!post || !meta) notFound();

  // Sort by date — independent of array order in siteConfig
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sorted.findIndex((p) => p.slug === slug);
  const newerPost = sorted[currentIndex - 1] ?? null;
  const olderPost = sorted[currentIndex + 1] ?? null;

  return (
    <main className="min-h-screen bg-page">

      {/* Reading progress bar — 2px primary line at very top */}
      <ReadingProgress />

      {/* Fixed back button */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-40 w-12 h-12 flex items-center justify-center rounded-[20px] bg-card border border-custom shadow-sm hover:-translate-y-1 transition-all group active:scale-95"
        aria-label="Go back"
      >
        <ArrowLeft size={20} className="text-main group-hover:-translate-x-1 transition-transform" />
      </Link>

      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24">

        {/* ── Header ── */}
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-black text-main tracking-tight leading-tight mb-3">
            {meta.title}
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-5">{meta.description}</p>
          <div className="flex flex-wrap items-center gap-3 pb-8 border-b-4 border-custom">
            <span className="flex items-center gap-1.5 text-xs text-muted font-medium">
              <Calendar size={12} />
              {new Date(meta.date).toLocaleDateString('en-IN', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted font-medium">
              <Clock size={12} />
              {meta.readTime} read
            </span>
            <span className="text-muted/30">·</span>
            {meta.tags.map(tag => (
              <span key={tag} className="text-[0.65rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-card border border-custom text-muted">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* ── Article ── */}
        <article className="mt-8 space-y-2">
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>

        {/* ── Footer ── */}
        <footer className="mt-10 pt-6 border-t border-custom space-y-3">

          {/* ← Older | Newer → */}
          <div className="grid grid-cols-2 gap-3">

            {olderPost ? (
              <Link
                href={`/blog/${olderPost.slug}`}
                className="group flex items-center gap-3 p-4 rounded-2xl bg-card border border-custom hover:border-primary/40 hover:-translate-y-0.5 transition-all"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-page border border-custom group-hover:bg-primary/10 transition-colors shrink-0">
                  <ArrowLeft size={14} className="text-main" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted mb-0.5">Older</p>
                  <p className="text-sm font-bold text-main truncate">{olderPost.title}</p>
                </div>
              </Link>
            ) : (
              <div /> /* keeps grid balanced when no older post */
            )}

            {newerPost ? (
              <Link
                href={`/blog/${newerPost.slug}`}
                className="group flex items-center gap-3 p-4 rounded-2xl bg-card border border-custom hover:border-primary/40 hover:-translate-y-0.5 transition-all flex-row-reverse text-right"
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-page border border-custom group-hover:bg-primary/10 transition-colors shrink-0">
                  <ArrowLeft size={14} className="text-main rotate-180" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted mb-0.5">Newer</p>
                  <p className="text-sm font-bold text-main truncate">{newerPost.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Quiet centered back link */}
          <div className="flex justify-center pt-1 pb-2">
            <Link
              href="/"
              className="text-xs text-muted hover:text-main transition-colors font-medium tracking-wide"
            >
              ← All posts
            </Link>
          </div>

        </footer>
      </div>
    </main>
  );
}