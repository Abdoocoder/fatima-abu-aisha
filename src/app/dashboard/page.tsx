"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FileText, Calendar, ArrowLeft } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export default function Dashboard() {
  const { user } = useUser();
  const documents = useQuery(api.documents.getMyDocuments);
  const appointments = useQuery(api.appointments.getMyAppointments);

  return (
    <div className="py-section-padding px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <h1 className="font-tajawal text-3xl md:text-4xl font-bold text-brand-navy mb-2">
          لوحة التحكم
        </h1>
        <p className="font-tajawal text-on-surface-variant mb-12">
          مرحباً، {user?.firstName || "عميلنا العزيز"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/dashboard/documents"
            className="card-flat p-8 rounded-xl group hover:shadow-md transition-shadow duration-300 ease-[var(--ease-out)]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300 ease-[var(--ease-out)]">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-tajawal text-xl font-bold text-brand-navy">
                  المستندات
                </h2>
                <p className="font-tajawal text-sm text-on-surface-variant">
                  {documents?.length || 0} مستند
                </p>
              </div>
            </div>
            <p className="font-tajawal text-on-surface-variant mb-4">
              رفع وعرض المستندات القانونية الخاصة بقضاياك.
            </p>
            <span className="text-brand-gold font-bold text-sm flex items-center gap-2 group-hover:text-brand-navy transition-colors">
              إدارة المستندات <ArrowLeft className="w-4 h-4" />
            </span>
          </Link>

          <Link
            href="/dashboard/appointments"
            className="card-flat p-8 rounded-xl group hover:shadow-md transition-shadow duration-300 ease-[var(--ease-out)]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300 ease-[var(--ease-out)]">
                <Calendar className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-tajawal text-xl font-bold text-brand-navy">
                  المواعيد
                </h2>
                <p className="font-tajawal text-sm text-on-surface-variant">
                  {appointments?.length || 0} موعد
                </p>
              </div>
            </div>
            <p className="font-tajawal text-on-surface-variant mb-4">
              عرض وإدارة مواعيد الاستشارات القادمة.
            </p>
            <span className="text-brand-gold font-bold text-sm flex items-center gap-2 group-hover:text-brand-navy transition-colors">
              عرض المواعيد <ArrowLeft className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
