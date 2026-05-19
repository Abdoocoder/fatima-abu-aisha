import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PracticeAreasGrid from "@/components/PracticeAreasGrid";
import { ASSETS } from "@/constants";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[85dvh] flex items-center pt-20 pb-section-padding overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-brand-gray/30 -z-10" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-brand-gray/30 -skew-x-12 origin-top-right -z-10" />

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 flex flex-col gap-8 order-2 md:order-1">
            <div className="space-y-4">
              <span className="text-brand-gold font-tajawal text-sm font-bold tracking-wider">
                للمحاماة والاستشارات القانونية
              </span>
              <h1 className="font-tajawal text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy leading-tight">
                حماية حقوقك، <br />
                <span className="text-brand-gold">بخبرة وثقة.</span>
              </h1>
              <p className="font-tajawal text-lg text-on-surface-variant max-w-md">
                نقدم خدمات قانونية متكاملة بمهنية عالية لضمان أفضل النتائج
                لعملائنا في مختلف القضايا القانونية.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary px-8 py-4 text-lg">
                احجز استشارة{" "}
                <ArrowLeft className="w-5 h-5 rtl:rotate-0" />
              </button>
              <Link
                href="/services"
                className="btn-secondary px-8 py-4 text-lg"
              >
                تعرف على خدماتنا
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center items-center order-1 md:order-2">
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center bg-white rounded-full shadow-sm border border-brand-gray p-8">
              <div className="absolute inset-0 border-2 border-brand-gold/10 rounded-full scale-105 motion-safe:animate-pulse" />
              <Image
                src={ASSETS.LOGO}
                alt="شعار المحامية فاطمة أبو عيشة"
                fill
                className="object-contain"
                loading="eager"
                sizes="(max-width: 768px) 100vw, 400px"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-padding bg-white relative">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-16 space-y-4">
            <span className="text-brand-gold font-tajawal text-sm font-bold tracking-widest">
              مجالات الاختصاص
            </span>
            <h2 className="font-tajawal text-3xl md:text-4xl font-bold text-brand-navy">
              خدمات قانونية متكاملة
            </h2>
            <div className="w-24 h-1 bg-brand-gold mt-4" />
            <p className="font-tajawal text-on-surface-variant max-w-2xl leading-relaxed">
              نقدم مجموعة متكاملة من الخدمات القانونية تغطي مختلف مجالات القانون،
              لضمان حماية حقوقك وتحقيق أفضل النتائج.
            </p>
          </div>

          <PracticeAreasGrid />
        </div>
      </section>
    </div>
  );
}
