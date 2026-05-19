"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { FileText, ArrowLeft, Plus, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function AdminArticles() {
  const articles = useQuery(api.articles.getAll);

  return (
    <div className="py-section-padding px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link
              href="/admin"
              className="font-tajawal text-sm text-on-surface-variant hover:text-brand-navy flex items-center gap-2 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> العودة للوحة الإدارة
            </Link>
            <h1 className="font-tajawal text-3xl md:text-4xl font-bold text-brand-navy">
              المقالات
            </h1>
          </div>
          <Link
            href="/admin/articles/new"
            className="btn-gold px-6 py-3 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> مقال جديد
          </Link>
        </div>

        {articles === undefined ? (
          <p className="font-tajawal text-on-surface-variant">
            جاري التحميل...
          </p>
        ) : articles.length === 0 ? (
          <div className="card-flat p-12 rounded-xl text-center">
            <FileText className="w-16 h-16 text-brand-gold/30 mx-auto mb-6" />
            <p className="font-tajawal text-on-surface-variant mb-4">
              لا توجد مقالات بعد
            </p>
            <Link href="/admin/articles/new" className="btn-gold px-6 py-3">
              إنشاء أول مقال
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={article._id}
                className="card-flat p-6 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-tajawal font-bold text-brand-navy">
                        {article.title}
                      </p>
                      <p className="font-tajawal text-sm text-on-surface-variant">
                        {article.slug} — {article.publishedDate?.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {article.published ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-bold font-tajawal">
                        <CheckCircle className="w-4 h-4" /> منشور
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600 text-sm font-bold font-tajawal">
                        <XCircle className="w-4 h-4" /> مسودة
                      </span>
                    )}
                    <Link
                      href={`/admin/articles/${article._id}/edit`}
                      className="text-brand-gold text-sm font-bold hover:text-brand-navy transition-colors"
                    >
                      تعديل
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
