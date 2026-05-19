/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, Gavel, Users, Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ASSETS, PRACTICE_AREAS } from "@/src/constants";

const ICON_MAP = {
  gavel: Gavel,
  users: Users,
  briefcase: Briefcase,
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-20 pb-section-padding overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-surface-container-low/50 -z-10" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-brand-gray/30 -skew-x-12 origin-top-right -z-10" />
        
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid md:grid-cols-12 gap-12 items-center">
          {/* Content */}
          <div className="md:col-span-6 flex flex-col gap-8 order-2 md:order-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <span className="text-brand-gold font-tajawal text-sm font-bold tracking-wider">محاماة واستشارات قانونية</span>
              <h1 className="font-tajawal text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy leading-tight">
                حماية حقوقك، <br />
                <span className="text-brand-gold">بخبرة وثقة.</span>
              </h1>
              <p className="font-tajawal text-lg text-on-surface-variant max-w-md">
                نقدم خدمات قانونية متكاملة بمهنية عالية لضمان أفضل النتائج لعملائنا في مختلف القضايا القانونية.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="btn-primary px-8 py-4 text-lg">
                احجز استشارة <ArrowLeft className="w-5 h-5 rtl:rotate-0" />
              </button>
              <Link to="/practice-areas" className="btn-secondary px-8 py-4 text-lg">
                تعرف على خدماتنا
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 flex justify-center items-center order-1 md:order-2"
          >
            <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center bg-white rounded-full shadow-sm border border-brand-gray p-8">
              <div className="absolute inset-0 border-2 border-brand-gold/10 rounded-full scale-105 animate-pulse" />
              <img 
                src={ASSETS.LOGO} 
                alt="شعار المحامية فاطمة أبو عيشة" 
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-section-padding bg-white relative">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-gold font-tajawal text-sm font-bold uppercase tracking-widest">مجالات الاختصاص</span>
            <h2 className="font-tajawal text-3xl md:text-4xl font-bold text-brand-navy">خدمات قانونية متكاملة</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRACTICE_AREAS.map((service, index) => {
              const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP] || Gavel;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-flat p-8 rounded-lg group flex flex-col h-full"
                >
                  <div className="w-16 h-16 bg-brand-gray rounded-full flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-tajawal text-2xl font-bold text-brand-navy mb-4">{service.title}</h3>
                  <p className="font-tajawal text-on-surface-variant flex-grow mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link 
                    to="/practice-areas" 
                    className="text-brand-gold font-tajawal text-sm font-bold flex items-center gap-2 group-hover:text-brand-navy transition-colors"
                  >
                    اقرأ المزيد <ArrowLeft className="w-4 h-4 ml-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
