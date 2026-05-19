"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = useQuery(api.articles.getBySlug, { slug });
  const allArticles = useQuery(api.articles.getPublished);

  if (article === undefined) {
    return (
      <div className="py-section-padding px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <p className="font-tajawal text-on-surface-variant">
            جاري التحميل...
          </p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-section-padding px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center">
          <h1 className="font-tajawal text-3xl font-bold text-brand-navy mb-4">
            المقال غير موجود
          </h1>
          <Link
            href="/articles"
            className="text-brand-gold font-bold flex items-center gap-2 justify-center"
          >
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            العودة للمكتبة القانونية
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = allArticles
    ?.filter((a) => a._id !== article._id && a.published)
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      <article className="py-section-padding px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto max-w-4xl">
          <Link
            href="/articles"
            className="font-tajawal text-sm text-on-surface-variant hover:text-brand-navy flex items-center gap-2 mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            العودة للمكتبة القانونية
          </Link>

          <header className="mb-12">
            <h1 className="font-tajawal text-3xl md:text-5xl font-bold text-brand-navy mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-on-surface-variant">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {article.publishedDate?.slice(0, 10)}
              </span>
              <span className="font-tajawal">{article.author}</span>
            </div>
            {article.tags.length > 0 && (
              <div className="flex gap-2 mt-6">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-brand-gray rounded text-xs font-bold text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {article.excerpt && (
            <p className="font-tajawal text-xl text-on-surface-variant leading-relaxed mb-12 bg-brand-gray/30 border-r-2 border-brand-gold p-6 rounded-lg">
              {article.excerpt}
            </p>
          )}

          <div className="font-tajawal text-lg text-on-surface leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>
      </article>

      {relatedArticles && relatedArticles.length > 0 && (
        <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-brand-gray/30 border-t border-brand-gray">
          <div className="max-w-container-max mx-auto">
            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mb-8">
              مقالات ذات صلة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related._id}
                  href={`/articles/${related.slug}`}
                  className="card-flat p-6 rounded-xl group hover:shadow-md transition-all"
                >
                  <h3 className="font-tajawal text-lg font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors">
                    {related.title}
                  </h3>
                  {related.excerpt && (
                    <p className="font-tajawal text-sm text-on-surface-variant line-clamp-3">
                      {related.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
