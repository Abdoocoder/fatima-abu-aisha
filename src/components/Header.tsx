"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gavel, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "الرئيسية", path: "/" },
  { name: "عن المحامية", path: "/about" },
  { name: "مجالات الاختصاص", path: "/services" },
  { name: "المكتبة القانونية", path: "/articles" },
  { name: "اتصل بنا", path: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-brand-gray sticky top-0 z-50">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Gavel className="text-brand-gold w-8 h-8" />
          <span className="font-tajawal text-xl font-bold text-brand-navy">
            فاطمة أبو عيشة للمحاماة
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-tajawal text-sm transition-all py-2 border-b-2 ${
                pathname === link.path
                  ? "text-brand-gold border-brand-gold font-bold"
                  : "text-on-surface-variant border-transparent hover:text-brand-navy"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:block btn-gold px-6">
            طلب استشارة
          </button>
          <button
            className="md:hidden p-2 text-brand-navy"
            onClick={() => setIsMenuOpen(true)}
            aria-label="فتح القائمة"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 z-[60] md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-72 bg-white shadow-xl z-[70] md:hidden flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-brand-gray">
                <span className="font-tajawal text-lg font-bold text-brand-navy">
                  القائمة
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-on-surface-variant"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 py-4 flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-6 py-4 flex items-center justify-between font-tajawal ${
                      pathname === link.path
                        ? "bg-brand-gray text-brand-gold font-bold"
                        : "text-on-surface-variant hover:bg-brand-gray"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-auto p-6">
                  <button className="w-full btn-gold">طلب استشارة</button>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
