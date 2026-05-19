"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Calendar, ArrowLeft, Check, X } from "lucide-react";
import Link from "next/link";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: "قيد الانتظار", color: "text-yellow-600 bg-yellow-50" },
  confirmed: { label: "مؤكد", color: "text-green-600 bg-green-50" },
  cancelled: { label: "ملغي", color: "text-red-600 bg-red-50" },
};

export default function AdminAppointments() {
  const appointments = useQuery(api.appointments.getAll);
  const updateStatus = useMutation(api.appointments.updateStatus);

  const handleStatus = async (
    id: Id<"appointments">,
    status: "confirmed" | "cancelled",
  ) => {
    await updateStatus({ appointmentId: id, status });
  };

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
          إدارة المواعيد
        </h1>

        {appointments === undefined ? (
          <p className="font-tajawal text-on-surface-variant">
            جاري التحميل...
          </p>
        ) : appointments.length === 0 ? (
          <div className="card-flat p-12 rounded-xl text-center">
            <Calendar className="w-16 h-16 text-brand-gold/30 mx-auto mb-6" />
            <p className="font-tajawal text-on-surface-variant">
              لا توجد مواعيد بعد
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => {
              const status = STATUS_MAP[apt.status] || STATUS_MAP.pending;
              return (
                <div
                  key={apt._id}
                  className="card-flat p-6 rounded-xl"
                >
                  <div className="flex items-center justify-between">
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
                        <p className="font-tajawal text-xs text-on-surface-variant">
                          معرف المستخدم: {apt.userId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-4 py-1 rounded text-sm font-bold font-tajawal ${status.color}`}
                      >
                        {status.label}
                      </span>
                      {apt.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatus(apt._id, "confirmed")}
                            className="w-8 h-8 rounded bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors"
                            aria-label="تأكيد الموعد"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatus(apt._id, "cancelled")}
                            className="w-8 h-8 rounded bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                            aria-label="إلغاء الموعد"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
