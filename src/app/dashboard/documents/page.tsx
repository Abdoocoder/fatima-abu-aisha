"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { FileText, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Documents() {
  const documents = useQuery(api.documents.getMyDocuments);
  const uploadDocument = useMutation(api.documents.upload);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName || !fileUrl) return;

    await uploadDocument({ fileName, fileUrl });
    setFileName("");
    setFileUrl("");
  };

  return (
    <div className="py-section-padding px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <Link
          href="/dashboard"
          className="font-tajawal text-sm text-on-surface-variant hover:text-brand-navy flex items-center gap-2 mb-8 transition-colors duration-200 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          <ArrowLeft className="w-4 h-4" /> العودة للوحة التحكم
        </Link>

        <h1 className="font-tajawal text-3xl md:text-4xl font-bold text-brand-navy mb-12">
          المستندات
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-tajawal text-xl font-bold text-brand-navy mb-6">
              رفع مستند جديد
            </h2>
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <label
                  htmlFor="fileName"
                  className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
                >
                  اسم المستند
                </label>
                <input
                  id="fileName"
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
                  placeholder="اسم المستند"
                />
              </div>
              <div>
                <label
                  htmlFor="fileUrl"
                  className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
                >
                  رابط المستند
                </label>
                <input
                  id="fileUrl"
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
                  placeholder="https://..."
                />
              </div>
              <button
                type="submit"
                className="btn-primary px-6"
              >
                <Upload className="w-4 h-4" /> رفع المستند
              </button>
            </form>
          </div>

          <div>
            <h2 className="font-tajawal text-xl font-bold text-brand-navy mb-6">
              مستنداتي
            </h2>
            {documents === undefined ? (
              <p className="font-tajawal text-on-surface-variant">
                جاري التحميل...
              </p>
            ) : documents.length === 0 ? (
              <div className="card-flat p-8 rounded-xl text-center">
                <FileText className="w-12 h-12 text-brand-gold/30 mx-auto mb-4" />
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
                  className="text-brand-gold text-sm font-bold hover:text-brand-navy transition-colors duration-200 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                >
                  عرض
                </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
