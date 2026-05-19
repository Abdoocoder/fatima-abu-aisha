"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminContacts() {
  const contacts = useQuery(api.contacts.getAll);

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
          رسائل التواصل
        </h1>

        {contacts === undefined ? (
          <p className="font-tajawal text-on-surface-variant">
            جاري التحميل...
          </p>
        ) : contacts.length === 0 ? (
          <div className="card-flat p-12 rounded-xl text-center">
            <MessageSquare className="w-16 h-16 text-brand-gold/30 mx-auto mb-6" />
            <p className="font-tajawal text-on-surface-variant">
              لا توجد رسائل بعد
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="card-flat p-6 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-tajawal font-bold text-brand-navy">
                      {contact.name}
                    </p>
                    <p className="font-tajawal text-sm text-on-surface-variant">
                      {contact.email} — {contact.phone}
                    </p>
                  </div>
                </div>
                <p className="font-tajawal text-on-surface-variant pr-16">
                  {contact.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
