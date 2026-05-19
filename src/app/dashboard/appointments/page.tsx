"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: "قيد الانتظار", color: "text-yellow-600 bg-yellow-50" },
  confirmed: { label: "مؤكد", color: "text-green-600 bg-green-50" },
  cancelled: { label: "ملغي", color: "text-red-600 bg-red-50" },
};

export default function Appointments() {
  const appointments = useQuery(api.appointments.getMyAppointments);

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
          المواعيد
        </h1>

        {appointments === undefined ? (
          <p className="font-tajawal text-on-surface-variant">
            جاري التحميل...
          </p>
        ) : appointments.length === 0 ? (
          <div className="card-flat p-12 rounded-xl text-center">
            <Calendar className="w-16 h-16 text-brand-gold/30 mx-auto mb-6" />
            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mb-4">
              لا توجد مواعيد
            </h2>
            <p className="font-tajawal text-on-surface-variant mb-8">
              لم تقم بحجز أي موعد استشارة بعد.
            </p>
            <button className="btn-gold px-8 py-3">احجز موعد استشارة</button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => {
              const status = STATUS_MAP[apt.status] || STATUS_MAP.pending;
              return (
                <div
                  key={apt._id}
                  className="card-flat p-6 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-tajawal text-brand-navy font-bold">
                        {apt.dateTime}
                      </p>
                      {apt.notes && (
                        <p className="font-tajawal text-sm text-on-surface-variant">
                          {apt.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`px-4 py-1 rounded text-sm font-bold font-tajawal ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
