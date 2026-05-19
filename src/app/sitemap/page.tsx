import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "خريطة الموقع - فاطمة أبو عيشة",
  description: "خريطة موقع مكتب المحامية فاطمة أبو عيشة",
  openGraph: { locale: "ar_AR" },
};

const LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن المحامية" },
  { href: "/services", label: "الخدمات القانونية" },
  { href: "/articles", label: "المكتبة القانونية" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/privacy", label: "سياسة الخصوصية" },
  { href: "/terms", label: "الشروط والأحكام" },
];

export default function Sitemap() {
  return (
    <div className="flex flex-col">
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto max-w-2xl">
          <Link
            href="/"
            className="font-tajawal text-sm text-on-surface-variant hover:text-brand-navy flex items-center gap-2 mb-8 transition-colors duration-200 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            <ArrowRight className="w-4 h-4" /> العودة للرئيسية
          </Link>

          <h1 className="font-tajawal text-4xl md:text-5xl font-bold text-brand-navy mb-12">
            خريطة الموقع
          </h1>

          <div className="space-y-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-5 rounded-xl card-flat hover:border-brand-gold transition-shadow duration-300 ease-[var(--ease-out)] group"
              >
                <span className="font-tajawal text-lg text-brand-navy font-bold group-hover:text-brand-gold transition-colors">
                  {link.label}
                </span>
                <span className="font-tajawal text-sm text-on-surface-variant block mt-1" dir="ltr">
                  {link.href}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
