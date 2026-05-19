"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Doc, Id } from "@convex/_generated/dataModel";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditArticle() {
  const params = useParams();
  const articleId = params.id as string;

  const article = useQuery(api.articles.getAll);

  const current = article?.find((a) => a._id === articleId);

  if (!current && article !== undefined) {
    return (
      <div className="py-section-padding px-margin-mobile md:px-margin-desktop">
        <p className="font-tajawal text-on-surface-variant">
          المقال غير موجود
        </p>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="py-section-padding px-margin-mobile md:px-margin-desktop">
        <p className="font-tajawal text-on-surface-variant">
          جاري التحميل...
        </p>
      </div>
    );
  }

  return (
    <EditArticleForm
      key={current._id}
      article={current}
      articleId={current._id}
    />
  );
}

function EditArticleForm({
  article,
  articleId,
}: {
  article: Doc<"articles">;
  articleId: Id<"articles">;
}) {
  const router = useRouter();
  const updateArticle = useMutation(api.articles.update);
  const deleteArticle = useMutation(api.articles.remove);

  const [title, setTitle] = useState(article.title);
  const [slug, setSlug] = useState(article.slug);
  const [content, setContent] = useState(article.content);
  const [excerpt, setExcerpt] = useState(article.excerpt || "");
  const [author, setAuthor] = useState(article.author);
  const [tags, setTags] = useState(article.tags.join(", "));
  const [published, setPublished] = useState(article.published);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !slug || !content) {
      setError("يرجى تعبئة الحقول المطلوبة");
      return;
    }

    try {
      await updateArticle({
        articleId,
        title,
        slug,
        content,
        excerpt,
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

  const handleDelete = async () => {
    if (!confirm("هل أنت متأكد من حذف هذا المقال؟")) return;
    try {
      await deleteArticle({ articleId });
      router.push("/admin/articles");
    } catch {
      setError("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <div className="py-section-padding px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto max-w-3xl">
        <Link
          href="/admin/articles"
          className="font-tajawal text-sm text-on-surface-variant hover:text-brand-navy flex items-center gap-2 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> العودة للمقالات
        </Link>

        <div className="flex items-center justify-between mb-12">
          <h1 className="font-tajawal text-3xl md:text-4xl font-bold text-brand-navy">
            تعديل المقال
          </h1>
          <button
            onClick={handleDelete}
            className="text-red-600 text-sm font-bold flex items-center gap-2 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> حذف
          </button>
        </div>

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
              منشور
            </label>
          </div>

          {error && (
            <p className="font-tajawal text-sm text-red-600">{error}</p>
          )}

          <button type="submit" className="btn-primary px-8 py-3">
            <Save className="w-4 h-4" /> حفظ التغييرات
          </button>
        </form>
      </div>
    </div>
  );
}
