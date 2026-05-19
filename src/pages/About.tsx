/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { History, GraduationCap, ShieldCheck, Award } from "lucide-react";
import { motion } from "motion/react";
import { ASSETS } from "@/src/constants";

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Intro Section */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="font-tajawal text-xl font-bold text-brand-gold">عن المحامية</h2>
              <h1 className="font-tajawal text-4xl md:text-5xl font-bold text-brand-navy">فاطمة عبد الرحيم أبو عيشة</h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-tajawal text-lg text-on-surface-variant leading-loose max-w-2xl"
            >
              نلتزم بتقديم استشارات قانونية دقيقة وتمثيل قضائي رصين، مستندين إلى سنوات من الخبرة والفهم العميق للأنظمة القانونية. نسعى دائماً لتحقيق العدالة وحماية حقوق موكلينا بأعلى درجات المهنية والسرية.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-brand-gray">
              <img 
                src={ASSETS.HERO_OFFICE} 
                alt="Law Office" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-brand-navy/10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bio & Education (Bento) */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-white">
        <div className="max-w-container-max mx-auto space-y-12">
          <div className="border-b border-brand-gray pb-6">
            <h3 className="font-tajawal text-3xl font-bold text-brand-navy">السيرة الذاتية والتعليم</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bio Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 card-flat p-10 space-y-6"
            >
              <div className="w-14 h-14 bg-brand-gray rounded-full flex items-center justify-center text-brand-gold">
                <History className="w-8 h-8" />
              </div>
              <h4 className="font-tajawal text-2xl font-bold text-brand-navy">مسيرة مهنية متميزة</h4>
              <p className="font-tajawal text-on-surface-variant leading-loose text-lg">
                تتمتع المحامية فاطمة أبو عيشة بمسيرة حافلة في تقديم الدعم القانوني للشركات والأفراد. بدأت رحلتها المهنية بشغف حقيقي لإرساء مبادئ العدالة، وتدرجت في العمل بالمحاكم بمختلف درجاتها، مما أكسبها قدرة استثنائية على تحليل القضايا المعقدة وإيجاد حلول قانونية مبتكرة وفعالة.
              </p>
            </motion.div>

            {/* Education Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-brand-gray/50 border border-brand-gray p-10 rounded-xl space-y-8"
            >
              <div className="flex items-center gap-4">
                <GraduationCap className="text-brand-gold w-8 h-8" />
                <h4 className="font-tajawal text-2xl font-bold text-brand-navy">الخلفية الأكاديمية</h4>
              </div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-brand-gold shrink-0" />
                  <div className="space-y-1">
                    <span className="font-tajawal font-bold text-brand-navy block">درجة الماجستير في القانون التجاري</span>
                    <span className="font-tajawal text-sm text-on-surface-variant">جامعة القدس، ٢٠١٨</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full border border-brand-gold shrink-0" />
                  <div className="space-y-1">
                    <span className="font-tajawal font-bold text-brand-navy block">بكالوريوس في الحقوق</span>
                    <span className="font-tajawal text-sm text-on-surface-variant">جامعة القدس، مع مرتبة الشرف، ٢٠١٥</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-container-max mx-auto relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h3 className="font-tajawal text-3xl font-bold text-brand-gold">القيم المهنية</h3>
            <p className="font-tajawal text-white/70 max-w-2xl mx-auto">نلتزم في مكتبنا بمجموعة من المبادئ الراسخة التي تشكل أساس تعاملنا مع كل موكل وكل قضية.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h4 className="font-tajawal text-2xl font-bold">النزاهة والشفافية</h4>
              <p className="font-tajawal text-white/60 leading-loose">
                نؤمن بأن الثقة هي حجر الزاوية في العلاقة بين المحامي والموكل. نتعامل بمنتهى الشفافية والصدق في تقييم المواقف القانونية وتقديم المشورة، مع الحفاظ التام على سرية المعلومات.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <Award className="w-10 h-10" />
              </div>
              <h4 className="font-tajawal text-2xl font-bold">التميز والاحترافية</h4>
              <p className="font-tajawal text-white/60 leading-loose">
                نسعى دائماً للتميز في كل ما نقدمه، من خلال البحث القانوني المستفيض، ومواكبة أحدث التشريعات، والدقة المتناهية في صياغة العقود والمذكرات لضمان أفضل النتائج.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
