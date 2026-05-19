"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewArticle() {
  const router = useRouter();
  const createArticle = useMutation(api.articles.create);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("فاطمة أبو عيشة");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !slug || !content) {
      setError("يرجى تعبئة الحقول المطلوبة");
      return;
    }

    try {
      await createArticle({
        title,
        slug,
        content,
        excerpt,
        author,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        published,
      });
      router.push("/admin/articles");
    } catch {
      setError("حدث خطأ أثناء الحفظ");
    }
  };

  return (
    <div className="py-section-padding px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto max-w-3xl">
        <Link
          href="/admin/articles"
          className="font-tajawal text-sm text-on-surface-variant hover:text-brand-navy flex items-center gap-2 mb-8 transition-colors duration-200 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <ArrowLeft className="w-4 h-4" /> العودة للمقالات
        </Link>

        <h1 className="font-tajawal text-3xl md:text-4xl font-bold text-brand-navy mb-12">
          مقال جديد
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
            >
              العنوان *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
            >
              الرابط (Slug) *
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              dir="ltr"
              className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal text-left"
              placeholder="article-title-in-english"
            />
          </div>

          <div>
            <label
              htmlFor="excerpt"
              className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
            >
              الملخص
            </label>
            <textarea
              id="excerpt"
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
            >
              المحتوى *
            </label>
            <textarea
              id="content"
              rows={15}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="author"
                className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
              >
                الكاتب
              </label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
              />
            </div>
            <div>
              <label
                htmlFor="tags"
                className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
              >
                الوسوم (مفصولة بفاصلة)
              </label>
              <input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
                placeholder="قانون, محاماة, استشارات"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="published"
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-5 h-5 rounded border-brand-gray text-brand-gold focus:ring-brand-gold"
            />
            <label
              htmlFor="published"
              className="font-tajawal text-sm text-brand-navy"
            >
              نشر فوراً
            </label>
          </div>

          {error && (
            <p className="font-tajawal text-sm text-red-600">{error}</p>
          )}

          <button type="submit" className="btn-primary px-8 py-3">
            <Save className="w-4 h-4" /> حفظ المقال
          </button>
        </form>
      </div>
    </div>
  );
}
