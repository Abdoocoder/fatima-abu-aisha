"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminDocuments() {
  const documents = useQuery(api.documents.getAll);

  return (
    <div className="py-section-padding px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <Link
          href="/admin"
          className="font-tajawal text-sm text-on-surface-variant hover:text-brand-navy flex items-center gap-2 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> العودة للوحة الإدارة
        </Link>

        <h1 className="font-tajawal text-3xl md:text-4xl font-bold text-brand-navy mb-12">
          مستندات العملاء
        </h1>

        {documents === undefined ? (
          <p className="font-tajawal text-on-surface-variant">
            جاري التحميل...
          </p>
        ) : documents.length === 0 ? (
          <div className="card-flat p-12 rounded-xl text-center">
            <FileText className="w-16 h-16 text-brand-gold/30 mx-auto mb-6" />
            <p className="font-tajawal text-on-surface-variant">
              لا توجد مستندات مرفوعة بعد
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="card-flat p-4 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-brand-gold" />
                  <span className="font-tajawal text-brand-navy">
                    {doc.fileName}
                  </span>
                </div>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold text-sm font-bold hover:text-brand-navy transition-colors"
                >
                  عرض
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
