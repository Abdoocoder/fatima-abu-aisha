"use client";

import { motion } from "motion/react";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { ASSETS } from "@/constants";

const ARTICLES = [
  {
    title: "آليات فض المنازعات العقارية وفق النظام المحدث",
    excerpt:
      "نظرة تفصيلية على الإجراءات الجديدة المتبعة في لجان فض المنازعات العقارية وكيف تساهم في تسريع التقاضي وحفظ الحقوق للمستثمرين والأفراد.",
    category: "العقارات",
    date: "١٢ مايو ٢٠٢٤",
    image: ASSETS.BLOG_2,
  },
  {
    title: "دليل الحضانة والنفقة بعد الطلاق",
    excerpt:
      "شرح مبسط للإجراءات القانونية المتبعة لتحديد الحضانة وتقدير النفقة بما يحفظ حقوق الأبناء وفقاً لأحدث التشريعات.",
    category: "الأحوال الشخصية",
    date: "٠٥ مايو ٢٠٢٤",
  },
  {
    title: "الحوكمة في الشركات العائلية: ضرورة أم خيار؟",
    excerpt:
      "أهمية تطبيق مبادئ الحوكمة في الشركات العائلية لضمان استمراريتها وتجنب النزاعات المستقبلية بين الورثة والشركاء.",
    category: "الشركات",
    date: "٢٨ أبريل ٢٠٢٤",
    image: ASSETS.BLOG_3,
  },
  {
    title: "الاحتيال المالي الإلكتروني وكيفية الحماية القانونية",
    excerpt:
      "خطوات عملية وقانونية يجب اتخاذها فور التعرض لمحاولات الاحتيال المالي عبر الإنترنت والجهات المختصة لتلقي البلاغات.",
    category: "الجرائم المعلوماتية",
    date: "١٥ أبريل ٢٠٢٤",
  },
];

export default function Articles() {
  return (
    <div className="flex flex-col">
      <section className="pt-20 pb-10 px-margin-mobile md:px-margin-desktop bg-white border-b border-brand-gray">
        <div className="max-w-container-max mx-auto">
          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-tajawal text-4xl md:text-5xl font-bold text-brand-navy mb-4"
          >
            المكتبة القانونية
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-tajawal text-lg text-on-surface-variant max-w-3xl leading-relaxed"
          >
            مقالات وتحليلات قانونية متخصصة تهدف إلى نشر الوعي القانوني وتوضيح
            المستجدات في التشريعات والأنظمة.
          </motion.p>
        </div>
      </section>

      <section className="py-12 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row gap-6 mb-12 bg-white p-4 border border-brand-gray rounded-xl">
            <div className="relative flex-grow">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
              <label htmlFor="search-articles" className="sr-only">
                ابحث في المقالات القانونية
              </label>
              <input
                id="search-articles"
                type="text"
                placeholder="ابحث في المقالات القانونية..."
                className="w-full pr-12 pl-4 py-3 bg-brand-gray border-none rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar rtl:flex-row-reverse">
              {[
                "الكل",
                "الشركات",
                "العمل والعمال",
                "العقارات",
                "الأحوال الشخصية",
              ].map((cat, i) => (
                <button
                  key={cat}
                  className={`whitespace-nowrap px-6 py-2 rounded font-tajawal text-sm font-bold transition-all ${
                    i === 0
                      ? "bg-brand-navy text-white"
                      : "bg-brand-gray text-on-surface-variant hover:bg-brand-gold hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="md:col-span-8 group relative aspect-[16/9] md:aspect-auto md:h-[450px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={ASSETS.BLOG_1}
                alt="مقال مميز: تأثير التعديلات الأخيرة على نظام الشركات"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                <span className="inline-block px-4 py-1 bg-brand-gold text-brand-navy text-xs font-bold rounded mb-4 w-max">
                  مقال مميز
                </span>
                <h2 className="font-tajawal text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  تأثير التعديلات الأخيرة على نظام الشركات وكيفية توفيق الأوضاع
                </h2>
                <p className="font-tajawal text-white/80 line-clamp-2 md:text-lg mb-6 max-w-2xl">
                  قراءة تحليلية معمقة في أبرز التغييرات التي طرأت على نظام
                  الشركات الجديد، والخطوات العملية التي يجب على مجالس الإدارات
                  اتخاذها.
                </p>
                <div className="flex items-center text-white/60 text-sm gap-6">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> ١٥ مايو ٢٠٢٤
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> قراءة ٧ دقائق
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="bg-brand-navy text-white p-8 rounded-2xl flex-1 flex flex-col justify-center group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-brand-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <h3 className="font-tajawal text-xl font-bold mb-4">
                  دليل صياغة العقود التجارية الموحدة
                </h3>
                <p className="font-tajawal text-white/60 text-sm mb-6 flex-grow">
                  أهم البنود التي يجب تضمينها لحماية حقوق الأطراف في العقود
                  طويلة الأجل.
                </p>
                <button className="text-brand-gold font-bold text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform rtl:group-hover:-translate-x-2">
                  اقرأ المزيد{" "}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
              <div className="card-flat p-8 rounded-2xl flex-1 flex flex-col justify-center group cursor-pointer">
                <h3 className="font-tajawal text-xl font-bold text-brand-navy mb-4">
                  حقوق العامل عند إنهاء الخدمات
                </h3>
                <p className="font-tajawal text-on-surface-variant text-sm mb-6 flex-grow">
                  مراجعة شاملة لنظام العمل فيما يخص مكافأة نهاية الخدمة
                  والتعويضات.
                </p>
                <button className="text-brand-navy font-bold text-sm flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                  اقرأ المزيد{" "}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-brand-gray pb-6 mb-10 flex justify-between items-end">
            <h3 className="font-tajawal text-3xl font-bold text-brand-navy">
              أحدث المقالات
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-flat rounded-xl overflow-hidden group flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden bg-brand-gray relative">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-navy/10 animate-pulse">
                      <span className="text-6xl font-bold">L</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold text-brand-gold uppercase tracking-widest">
                    {article.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-xs text-on-surface-variant font-tajawal mb-3 block">
                    {article.date}
                  </span>
                  <h4 className="font-tajawal text-xl font-bold text-brand-navy mb-4 line-clamp-2 group-hover:text-brand-gold transition-colors">
                    {article.title}
                  </h4>
                  <p className="font-tajawal text-sm text-on-surface-variant line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {article.excerpt}
                  </p>
                  <button className="text-brand-navy font-bold text-sm flex items-center gap-2 group-hover:text-brand-gold transition-colors">
                    قراءة المقال{" "}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 flex justify-center items-center gap-3">
            <button className="w-10 h-10 rounded border border-brand-gray flex items-center justify-center text-on-surface-variant hover:bg-brand-gray transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded bg-brand-navy text-white flex items-center justify-center font-bold">
              ١
            </button>
            <button className="w-10 h-10 rounded border border-brand-gray flex items-center justify-center text-brand-navy hover:bg-brand-gray transition-colors font-bold">
              ٢
            </button>
            <button className="w-10 h-10 rounded border border-brand-gray flex items-center justify-center text-brand-navy hover:bg-brand-gray transition-colors font-bold">
              ٣
            </button>
            <button className="w-10 h-10 rounded border border-brand-gray flex items-center justify-center text-on-surface-variant hover:bg-brand-gray transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-brand-gray/30 border-t border-brand-gray">
        <div className="max-w-container-max mx-auto">
          <div className="bg-white border border-brand-gray rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-4">
              <h3 className="font-tajawal text-3xl font-bold text-brand-navy">
                النشرة القانونية
              </h3>
              <p className="font-tajawal text-lg text-on-surface-variant leading-relaxed">
                اشترك ليصلك أحدث المقالات والتحليلات القانونية والتحديثات
                التشريعية مباشرة إلى بريدك الإلكتروني.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-4">
              <label htmlFor="newsletter-email" className="sr-only">
                البريد الإلكتروني للنشرة القانونية
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="البريد الإلكتروني"
                className="flex-grow px-6 py-4 border border-brand-gray rounded-lg focus:ring-2 focus:ring-brand-gold outline-none font-tajawal"
              />
              <button className="btn-primary py-4 px-8 whitespace-nowrap">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
