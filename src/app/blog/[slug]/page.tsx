import { blogPosts } from "@/data/siteConfig";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";

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
  return { title: `${post.title} — Blog`, description: post.description };
}

async function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "src", "content", "blog", `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(raw);
    return { content, frontmatter: data };
  } catch (err) {
    console.error("[Blog] Error:", err);
    return null;
  }
}

// Extract h2 headings for TOC
function extractToc(content: string): { id: string; text: string }[] {
  const matches = [...content.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((m) => {
    const text = m[1].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    return { id, text };
  });
}

const mdxComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-3xl sm:text-4xl font-black text-main tracking-tight leading-[1.1] mt-14 mb-6 first:mt-0">
      {children}
    </h1>
  ),

  h2: ({ children }: { children?: React.ReactNode }) => {
    const text = typeof children === "string" ? children : "";
    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    return (
      <h2 id={id} className="scroll-mt-28 text-xl sm:text-2xl font-bold text-main tracking-tight leading-snug mt-14 mb-4 pb-3">
        {children}
      </h2>
    );
  },

  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-base sm:text-lg font-bold text-main tracking-tight mt-10 mb-3">
      {children}
    </h3>
  ),

  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-sm sm:text-base font-bold text-main uppercase tracking-widest mt-8 mb-2">
      {children}
    </h4>
  ),

  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-muted leading-[1.9] my-5 text-[15px] sm:text-base">
      {children}
    </p>
  ),

  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="my-8 space-y-3 pl-6 text-[15px] sm:text-base leading-8 text-muted marker:text-primary list-disc">
      {children}
    </ul>
  ),

  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="my-8 space-y-3 pl-6 text-[15px] sm:text-base leading-8 text-muted marker:font-semibold marker:text-primary list-decimal">
      {children}
    </ol>
  ),

  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="pl-1 text-muted">
      {children}
    </li>
  ),

  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="text-main font-semibold">{children}</strong>
  ),

  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="text-muted/80 italic">{children}</em>
  ),

  code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    const isInline = !className;

    if (isInline) {
      return (
        <code className="rounded-md border border-custom bg-card-hover px-1.5 py-0.5 font-mono text-[0.85em] text-main">
          {children}
        </code>
      );
    }

    return (
      <code className={`${className} font-mono text-sm leading-7 text-main`}>
        {children}
      </code>
    );
  },

  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="my-10 overflow-x-auto rounded-[28px] border border-custom bg-card-hover px-5 py-5 sm:px-6 sm:py-6 shadow-sm text-[13px] leading-[1.8] text-main font-mono">
      {children}
    </pre>
  ),

  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (

    <a href={href}
      className="font-medium text-main underline decoration-border underline-offset-4 transition-colors hover:text-primary"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  ),

  hr: () => (
    <hr className="my-12 border-custom/80" />
  ),

  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="my-10 rounded-[28px] border border-custom bg-card/75 px-6 py-5 text-lg leading-8 text-main backdrop-blur-xl">
      {children}
    </blockquote>
  ),

  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-10 overflow-x-auto rounded-3xl border border-custom bg-card/70 backdrop-blur-xl">
      <table className="min-w-full border-collapse text-left text-sm text-muted">
        {children}
      </table>
    </div>
  ),

  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] bg-card-hover text-main">
      {children}
    </th>
  ),

  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="border-t border-custom px-4 py-3 align-top leading-7 text-muted">
      {children}
    </td>
  ),

  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-8">
      <Image src={src || "/placeholder.jpg"} alt={alt || ""} className="w-full rounded-[20px] border border-custom" width={800} height={600} />
      {alt && (
        <figcaption className="mt-3 text-center text-xs text-muted/60 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, meta] = await Promise.all([
    getPost(slug),
    Promise.resolve(blogPosts.find((p) => p.slug === slug)),
  ]);

  if (!post || !meta) notFound();

  const toc = extractToc(post.content);

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sorted.findIndex((p) => p.slug === slug);
  const newerPost = sorted[currentIndex - 1] ?? null;
  const olderPost = sorted[currentIndex + 1] ?? null;

  return (
    <main className="min-h-screen bg-page">
      <ReadingProgress />

      {/* Back button */}
      <Link
        href="/blog"
        className="fixed top-6 left-6 z-40 w-10 h-10 flex items-center justify-center rounded-2xl bg-card border border-custom shadow-sm hover:-translate-y-0.5 transition-all group active:scale-95"
        aria-label="Back to blog"
      >
        <ArrowLeft size={18} className="text-main group-hover:-translate-x-0.5 transition-transform" />
      </Link>

      <div className="max-w-330 mx-auto px-6 py-16 sm:py-24 pb-24">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">

          {/* ── Main content ── */}
          <div>
            {/* Header card */}
            <header className="relative overflow-hidden rounded-4xl bg-card border border-custom p-8 sm:p-10 mb-5">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="flex items-center gap-1.5 text-xs text-muted font-medium">
                    <Calendar size={11} />
                    {new Date(meta.date).toLocaleDateString("en-IN", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </span>
                  <span className="text-muted/30">·</span>
                  <span className="flex items-center gap-1.5 text-xs text-muted font-medium">
                    <Clock size={11} />
                    {meta.readTime} read
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-main tracking-tight leading-[1.1] mb-4">
                  {meta.title}
                </h1>

                {meta.description && (
                  <p className="text-muted text-base leading-7 mb-6">{meta.description}</p>
                )}

                <div className="flex flex-wrap gap-1.5 pt-5 border-t border-custom/60">
                  {meta.tags?.map((tag: string) => (
                    <span key={tag} className="text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-page border border-custom text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </header>

            {/* Article body */}
            <article className="rounded-4xl bg-card border border-custom px-8 sm:px-10 py-8 sm:py-10 mb-5">
              <MDXRemote source={post.content} components={mdxComponents} />
            </article>

            {/* Footer nav */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {olderPost ? (
                <Link
                  href={`/blog/${olderPost.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-[20px] bg-card border border-custom [@media(hover:hover)]:hover:border-primary/30 [@media(hover:hover)]:hover:-translate-y-0.5 transition-all"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-page border border-custom [@media(hover:hover)]:group-hover:bg-primary/10 transition-colors shrink-0">
                    <ArrowLeft size={14} className="text-main" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.6rem] font-bold uppercase tracking-widest text-muted mb-0.5">Older</p>
                    <p className="text-xs font-bold text-main truncate">{olderPost.title}</p>
                  </div>
                </Link>
              ) : <div />}

              {newerPost ? (
                <Link
                  href={`/blog/${newerPost.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-[20px] bg-card border border-custom [@media(hover:hover)]:hover:border-primary/30 [@media(hover:hover)]:hover:-translate-y-0.5 transition-all flex-row-reverse text-right"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-page border border-custom [@media(hover:hover)]:group-hover:bg-primary/10 transition-colors shrink-0">
                    <ArrowUpRight size={14} className="text-main" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.6rem] font-bold uppercase tracking-widest text-muted mb-0.5">Newer</p>
                    <p className="text-xs font-bold text-main truncate">{newerPost.title}</p>
                  </div>
                </Link>
              ) : <div />}
            </div>

            <div className="flex justify-center">
              <Link href="/blog" className="text-xs text-muted hover:text-main transition-colors font-medium tracking-wide">
                ← All posts
              </Link>
            </div>
          </div>

          {/* ── Sticky TOC sidebar ── */}
          {toc.length > 0 && (
            <aside className="hidden xl:block">
              <div className="sticky top-24 rounded-[28px] border border-custom bg-card/75 p-6 backdrop-blur-xl">
                <p className="text-[0.55rem] font-bold uppercase tracking-[0.24em] text-muted mb-4">
                  On this page
                </p>
                <nav>
                  <ul className="space-y-3">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-xs leading-6 text-muted hover:text-main transition-colors block"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="mt-6 pt-5 border-t border-custom space-y-3">
                  <p className="text-[0.55rem] font-bold uppercase tracking-[0.24em] text-muted mb-3">
                    More posts
                  </p>
                  {sorted
                    .filter(p => p.slug !== slug)
                    .slice(0, 3)
                    .map(p => (
                      <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                        <p className="text-xs text-muted group-hover:text-main transition-colors leading-snug line-clamp-2">
                          {p.title}
                        </p>
                        <p className="text-[0.55rem] font-mono text-muted/40 mt-0.5">
                          {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </Link>
                    ))
                  }
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}