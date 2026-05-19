import Link from "next/link";
import { Gavel } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t-4 border-brand-gold">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 flex-row-reverse"
            >
              <Gavel className="text-brand-gold w-8 h-8" />
              <span className="font-tajawal text-2xl font-bold text-white">
                فاطمة أبو عيشة
              </span>
            </Link>
            <p className="font-tajawal text-sm text-white/60">
              محاماة واستشارات قانونية
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-8">
            <Link
              href="/privacy"
              className="text-sm font-tajawal text-white/70 hover:text-brand-gold transition-colors"
            >
              الخصوصية
            </Link>
            <Link
              href="/terms"
              className="text-sm font-tajawal text-white/70 hover:text-brand-gold transition-colors"
            >
              الشروط والأحكام
            </Link>
            <Link
              href="/sitemap"
              className="text-sm font-tajawal text-white/70 hover:text-brand-gold transition-colors"
            >
              خريطة الموقع
            </Link>
          </nav>

          <div className="text-center md:text-right font-tajawal text-sm text-white/50">
            © {currentYear} المحامية فاطمة أبو عيشة. جميع الحقوق محفوظة.
          </div>
        </div>
      </div>
    </footer>
  );
}
