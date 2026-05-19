"use client";

import { useState } from "react";
import { Phone, MapPin, Send } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import MagneticButton from "@/components/MagneticButton";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submitContact = useMutation(api.contacts.submit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !phone || !message) {
      setError("يرجى تعبئة جميع الحقول");
      return;
    }

    setLoading(true);
    try {
      await submitContact({ name, email, phone, message });
      setSubmitted(true);
    } catch {
      setError("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface border-b border-brand-gray">
        <div className="max-w-container-max mx-auto">
          <h1 className="font-tajawal text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            اتصل بنا
          </h1>
          <p className="font-tajawal text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            نرحب باستفساراتكم. يمكنكم التواصل معنا عبر النموذج أدناه أو من خلال
            معلومات الاتصال المباشرة.
          </p>
        </div>
      </section>

      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-white">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5 space-y-8">
              <div className="space-y-6">
                <h2 className="font-tajawal text-2xl font-bold text-brand-navy">
                  معلومات التواصل
                </h2>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="font-tajawal text-on-surface-variant leading-relaxed">
                    عمان / شارع الامير حسين / مجمع فراج سنتر 2
                    <br />
                    الطابق الرابع / مكتب (407)
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-tajawal text-on-surface-variant" dir="ltr">
                      0789865794
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-gray">
                  <h3 className="font-tajawal text-sm font-bold text-brand-navy mb-3">
                    تابعنا على
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href="https://web.facebook.com/profile.php?id=100087941926865"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-colors duration-200 ease-[var(--ease-out)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                      aria-label="فيسبوك"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a
                      href="https://jo.linkedin.com/in/fatima-abu-aisha-b4a56818b"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-colors duration-200 ease-[var(--ease-out)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                      aria-label="لينكد إن"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
          </div>

          <div className="md:col-span-7">
            {submitted ? (
              <div className="bg-brand-gray/50 border border-brand-gray rounded-xl p-12 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mx-auto">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="font-tajawal text-2xl font-bold text-brand-navy">
                  تم إرسال رسالتك بنجاح
                </h3>
                <p className="font-tajawal text-on-surface-variant">
                  سنتواصل معك في أقرب وقت ممكن. شكراً لتواصلك.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label
                        htmlFor="name"
                        className="block font-tajawal text-sm font-bold text-brand-navy"
                      >
                        الاسم الكامل <span className="text-red-600" aria-hidden="true">*</span>
                      </label>
                    </div>
                    <input
                      id="name"
                      type="text"
                      required
                      aria-required="true"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
                      placeholder="الاسم"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label
                        htmlFor="email"
                        className="block font-tajawal text-sm font-bold text-brand-navy"
                      >
                        البريد الإلكتروني <span className="text-red-600" aria-hidden="true">*</span>
                      </label>
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      aria-required="true"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="phone"
                      className="block font-tajawal text-sm font-bold text-brand-navy"
                    >
                      رقم الهاتف <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    required
                    aria-required="true"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
                    placeholder="0789865794"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="message"
                      className="block font-tajawal text-sm font-bold text-brand-navy"
                    >
                      الرسالة <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <span className={`text-xs font-tajawal ${message.length > 900 ? 'text-red-600' : 'text-on-surface-variant'}`}>
                      {message.length}/1000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    aria-required="true"
                    maxLength={1000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                {error && (
                  <p className="font-tajawal text-sm text-red-600">{error}</p>
                )}

                <MagneticButton className="w-full sm:w-auto">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full sm:w-auto px-8 py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "جاري الإرسال..." : "إرسال الرسالة"}{" "}
                    <Send className={`w-5 h-5 ${loading ? "animate-pulse" : ""}`} />
                  </button>
                </MagneticButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
