"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const submitContact = useMutation(api.contacts.submit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !phone || !message) {
      setError("يرجى تعبئة جميع الحقول");
      return;
    }

    try {
      await submitContact({ name, email, phone, message });
      setSubmitted(true);
    } catch {
      setError("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
    }
  };

  return (
    <div className="flex flex-col">
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface border-b border-brand-gray">
        <div className="max-w-container-max mx-auto">
          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-tajawal text-4xl md:text-5xl font-bold text-brand-navy mb-4"
          >
            اتصل بنا
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-tajawal text-lg text-on-surface-variant max-w-2xl leading-relaxed"
          >
            نرحب باستفساراتكم. يمكنكم التواصل معنا عبر النموذج أدناه أو من خلال
            معلومات الاتصال المباشرة.
          </motion.p>
        </div>
      </section>

      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-white">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-6">
              <h2 className="font-tajawal text-2xl font-bold text-brand-navy">
                معلومات التواصل
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-tajawal text-on-surface-variant">
                    عمان، الأردن
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-tajawal text-on-surface-variant">
                    +962 7X XXX XXXX
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-tajawal text-on-surface-variant">
                    info@fatima-abu-aisha.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-brand-gray/50 border border-brand-gray rounded-xl p-12 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mx-auto">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="font-tajawal text-2xl font-bold text-brand-navy">
                  تم إرسال رسالتك بنجاح
                </h3>
                <p className="font-tajawal text-on-surface-variant">
                  سنتواصل معك في أقرب وقت ممكن. شكراً لتواصلك.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
                    >
                      الاسم الكامل
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
                      placeholder="الاسم"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
                    >
                      البريد الإلكتروني
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
                  >
                    رقم الهاتف
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
                    placeholder="+962 7X XXX XXXX"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-tajawal text-sm font-bold text-brand-navy mb-2"
                  >
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                {error && (
                  <p className="font-tajawal text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  className="btn-primary px-8 py-4 text-lg"
                >
                  إرسال الرسالة{" "}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
