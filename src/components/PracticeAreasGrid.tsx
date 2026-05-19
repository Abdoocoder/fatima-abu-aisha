"use client";

import { Gavel, Users, Briefcase, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { PRACTICE_AREAS } from "@/constants";

const ICON_MAP: Record<string, typeof Gavel> = {
  gavel: Gavel,
  users: Users,
  briefcase: Briefcase,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export default function PracticeAreasGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6"
    >
      {PRACTICE_AREAS.map((service, i) => {
        const Icon = ICON_MAP[service.icon] || Gavel;
        const span = i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12";
        return (
          <motion.div
            key={service.id}
            variants={itemVariants}
            className={`${span} card-flat p-8 rounded-lg group flex ${i === 2 ? "md:flex-row items-center gap-8" : "flex-col h-full"}`}
          >
            <div className={`${i === 2 ? "w-16 h-16 shrink-0" : "w-14 h-14"} bg-brand-gray rounded-full flex items-center justify-center text-brand-gold mb-6 ${i === 2 ? "md:mb-0" : ""} group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300 ease-[var(--ease-out)]`}>
              <Icon className="w-7 h-7" />
            </div>
            <div className="flex-grow">
              <h3 className="font-tajawal text-2xl font-bold text-brand-navy mb-3">
                {service.title}
              </h3>
              <p className="font-tajawal text-on-surface-variant leading-relaxed mb-6">
                {service.description}
              </p>
              <Link
                href="/services"
                className="text-brand-gold font-tajawal text-sm font-bold flex items-center gap-2 group-hover:text-brand-navy transition-colors duration-200 ease-[var(--ease-out)]"
              >
                اقرأ المزيد <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
