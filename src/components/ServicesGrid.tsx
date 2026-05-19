"use client";

import {
  Scale,
  Users,
  Store,
  MessageSquare,
  FileText,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";

const SERVICES = [
  {
    title: "قانون مدني",
    description:
      "تمثيل العملاء في المنازعات المدنية، قضايا التعويضات، الملكية العقارية، والنزاعات التعاقدية بدقة ومهنية عالية لضمان استرداد الحقوق.",
    icon: Scale,
  },
  {
    title: "الأحوال الشخصية",
    description:
      "معالجة قضايا الأسرة بحساسية وسرية تامة، بما يشمل قضايا الطلاق، النفقة، الحضانة، والمواريث وفقاً للأحكام الشرعية والقانونية.",
    icon: Users,
  },
  {
    title: "قانون تجاري",
    description:
      "تأسيس الشركات، صياغة اللوائح الداخلية، تسجيل العلامات التجارية، ومتابعة المنازعات التجارية وحقوق الملكية الفكرية.",
    icon: Store,
  },
  {
    title: "استشارات قانونية",
    description:
      "تقديم المشورة القانونية الدقيقة والسريعة للأفراد والشركات في مختلف القضايا والقرارات المصيرية، مع تحليل المخاطر وتقديم الحلول الاستباقية.",
    icon: MessageSquare,
    featured: true,
  },
  {
    title: "مراجعة عقود",
    description:
      "صياغة ومراجعة كافة أنواع العقود والاتفاقيات بدقة لضمان توافقها مع الأنظمة والقوانين، وحماية مصالحك من أي ثغرات قانونية.",
    icon: FileText,
  },
  {
    title: "الجرائم المعلوماتية",
    description:
      "الدفاع في قضايا النشر والابتزاز الإلكتروني وقضايا الاحتيال المالي عبر الإنترنت وحماية السمعة الرقمية.",
    icon: ShieldAlert,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export default function ServicesGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6"
    >
      {SERVICES.map((service, i) => {
        const Icon = service.icon;
        const isFeatured = service.featured;
        const isWide = i === 0 || i === 3;

        return (
          <motion.div
            key={service.title}
            variants={itemVariants}
            className={`card-flat p-8 rounded-xl group ${
              isFeatured
                ? "md:col-span-7 md:flex-row md:items-center md:gap-10"
                : isWide
                  ? "md:col-span-7 flex flex-col items-start"
                  : "md:col-span-5 flex flex-col items-start"
            }`}
          >
            <div
              className={`shrink-0 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300 ease-[var(--ease-out)] ${
                isFeatured ? "w-20 h-20 md:w-24 md:h-24 md:mb-0" : "w-16 h-16"
              }`}
            >
              <Icon
                className={isFeatured ? "w-10 h-10" : "w-8 h-8"}
              />
            </div>
            <div className="flex-grow">
              <h2 className={`font-tajawal font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors duration-200 ease-[var(--ease-out)] ${isFeatured ? "text-3xl" : "text-2xl"}`}>
                {service.title}
              </h2>
              <p
                className={`font-tajawal text-on-surface-variant leading-relaxed mb-6 ${
                  isFeatured ? "max-w-xl text-lg" : ""
                }`}
              >
                {service.description}
              </p>
            </div>
            <div className={isFeatured ? "md:shrink-0" : "mt-auto"}>
              <button
                className={`${
                  isFeatured
                    ? "btn-gold px-8 py-3"
                    : "text-brand-gold font-bold flex items-center gap-2 hover:text-brand-navy transition-colors duration-200 ease-[var(--ease-out)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                }`}
              >
                <span>
                  {isFeatured ? "احجز استشارة" : "التفاصيل"}
                </span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
