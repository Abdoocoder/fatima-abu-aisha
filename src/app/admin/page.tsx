"use client";

import Link from "next/link";
import { MessageSquare, FileText, Calendar, ArrowLeft } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export default function AdminDashboard() {
  const contacts = useQuery(api.contacts.getAll);
  const documents = useQuery(api.documents.getAll);
  const appointments = useQuery(api.appointments.getAll);

  const cards = [
    {
      href: "/admin/contacts",
      icon: MessageSquare,
      title: "رسائل التواصل",
      count: contacts?.length || 0,
      desc: "عرض وإدارة رسائل العملاء",
    },
    {
      href: "/admin/documents",
      icon: FileText,
      title: "المستندات",
      count: documents?.length || 0,
      desc: "إدارة مستندات العملاء",
    },
    {
      href: "/admin/appointments",
      icon: Calendar,
      title: "المواعيد",
      count: appointments?.length || 0,
      desc: "إدارة مواعيد الاستشارات",
    },
  ];

  return (
    <div className="py-section-padding px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <h1 className="font-tajawal text-3xl md:text-4xl font-bold text-brand-navy mb-12">
          لوحة الإدارة
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="card-flat p-8 rounded-xl group hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                  <card.icon className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-tajawal text-xl font-bold text-brand-navy">
                    {card.title}
                  </h2>
                  <p className="font-tajawal text-sm text-on-surface-variant">
                    {card.count} إجمالي
                  </p>
                </div>
              </div>
              <p className="font-tajawal text-on-surface-variant mb-4">
                {card.desc}
              </p>
              <span className="text-brand-gold font-bold text-sm flex items-center gap-2 group-hover:text-brand-navy transition-colors">
                عرض التفاصيل <ArrowLeft className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
