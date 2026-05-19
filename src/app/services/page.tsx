import {
  Scale,
  Users,
  Store,
  MessageSquare,
  FileText,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className={`card-flat p-8 rounded-xl flex flex-col items-start group ${
                  service.featured
                    ? "lg:col-span-2 md:flex-row md:items-center md:gap-10"
                    : ""
                }`}
              >
                <div
                  className={`w-16 h-16 shrink-0 rounded-full bg-brand-gray flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform ${
                    service.featured ? "md:w-24 md:h-24 md:mb-0" : ""
                  }`}
                >
                  <service.icon
                    className={service.featured ? "w-12 h-12" : "w-8 h-8"}
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="font-tajawal text-2xl font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h2>
                  <p
                    className={`font-tajawal text-on-surface-variant leading-relaxed mb-6 ${
                      service.featured ? "max-w-xl" : ""
                    }`}
                  >
                    {service.description}
                  </p>
                </div>
                <div
                  className={`${service.featured ? "md:shrink-0" : "mt-auto"}`}
                >
                  <button
                    className={`${
                      service.featured
                        ? "btn-gold px-8 py-3"
                        : "text-brand-gold font-bold flex items-center gap-2 hover:text-brand-navy transition-colors duration-200 ease-[var(--ease-out)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                    }`}
                  >
                    <span>
                      {service.featured ? "احجز استشارة" : "التفاصيل"}
                    </span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
