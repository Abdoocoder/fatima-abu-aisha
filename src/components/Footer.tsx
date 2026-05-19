import Link from "next/link";
import { Gavel } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <Gavel className="text-brand-gold w-8 h-8" />
              <span className="font-tajawal text-2xl font-bold text-white">
                فاطمة أبو عيشة
              </span>
            </Link>
            <p className="font-tajawal text-sm text-white/60">
              للمحاماة والاستشارات القانونية
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
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="font-tajawal text-xs text-white/40">
            تصميم وتطوير بواسطة{" "}
            <a
              href="https://www.abdoocoder.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-white transition-colors"
            >
              Abdoo Coder
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
