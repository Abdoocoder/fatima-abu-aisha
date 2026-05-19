import ServicesGrid from "@/components/ServicesGrid";

export default function Services() {
  return (
    <div className="flex flex-col">
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface border-b border-brand-gray">
        <div className="max-w-container-max mx-auto">
          <h1 className="font-tajawal text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            مجالات الاختصاص القانوني
          </h1>
          <p className="font-tajawal text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            نقدم خدمات قانونية شاملة ومتخصصة تلبي احتياجات عملائنا بأعلى
            معايير الدقة والاحترافية، مع التركيز على حماية حقوقكم وتحقيق أفضل
            النتائج.
          </p>
        </div>
      </section>

      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-white">
        <div className="max-w-container-max mx-auto">
          <ServicesGrid />
        </div>
      </section>
    </div>
  );
}
