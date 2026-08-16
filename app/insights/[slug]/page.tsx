import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { posts, getPost } from "@/lib/insights";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/insights/${post.slug}`,
  };

  return (
    <PageShell>
      <article className="relative overflow-hidden pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 grid-lines mask-fade-b opacity-50" />
          <div className="absolute left-1/2 top-0 h-[320px] w-[560px] -translate-x-1/2 rounded-full bg-brand-violet/10 blur-[120px]" />
        </div>

        <div className="shell max-w-2xl pb-20">
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Insights
          </Link>

          <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
            <span>{fmt(post.date)}</span>
            <span>·</span>
            <span>{post.readMinutes} min read</span>
          </div>

          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-secondary">
            {post.description}
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {post.body.map((block, i) => {
              if (block.type === "h2")
                return (
                  <h2
                    key={i}
                    className="mt-4 text-xl font-semibold tracking-tight text-ink"
                  >
                    {block.text}
                  </h2>
                );
              if (block.type === "ul")
                return (
                  <ul key={i} className="flex flex-col gap-2.5">
                    {block.items.map((it) => (
                      <li
                        key={it}
                        className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-secondary"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-violet" />
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              return (
                <p key={i} className="text-[15px] leading-relaxed text-ink-secondary">
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="mt-12 surface flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-secondary">
              Have a workflow like this? We&apos;ll tell you what can be automated.
            </p>
            <GradientButton href="/#contact" variant="outline">
              Get a Free AI Audit <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </PageShell>
  );
}
