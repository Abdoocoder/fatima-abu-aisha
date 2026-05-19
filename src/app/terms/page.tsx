import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "الشروط والأحكام - فاطمة أبو عيشة",
  description: "الشروط والأحكام لاستخدام موقع مكتب المحامية فاطمة أبو عيشة",
  openGraph: { locale: "ar_AR" },
};

export default function Terms() {
  return (
    <div className="flex flex-col">
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto max-w-4xl">
          <Link
            href="/"
            className="font-tajawal text-sm text-on-surface-variant hover:text-brand-navy flex items-center gap-2 mb-8 transition-colors duration-200 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            <ArrowRight className="w-4 h-4" /> العودة للرئيسية
          </Link>

          <h1 className="font-tajawal text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            الشروط والأحكام
          </h1>
          <p className="font-tajawal text-sm text-on-surface-variant mb-12">
            آخر تحديث: يناير 2026
          </p>

          <div className="prose prose-lg font-tajawal max-w-none space-y-6 text-on-surface-variant leading-relaxed">
            <p>
              باستخدامك هذا الموقع الإلكتروني لمكتب المحامية فاطمة أبو عيشة، فإنك
              توافق على الالتزام بالشروط والأحكام التالية. إذا كنت لا توافق على أي
              من هذه الشروط، يرجى عدم استخدام الموقع.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              المعلومات القانونية
            </h2>
            <p>
              المحتوى الموجود على هذا الموقع يقدم لأغراض إعلامية عامة فقط ولا يعتبر
              استشارة قانونية. لا تنشأ علاقة محامي-عميل بمجرد استخدام الموقع أو
              التواصل عبر نموذج الاتصال.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              استخدام الموقع
            </h2>
            <p>
              يحق لك استخدام الموقع للأغراض المشروعة فقط. يمنع استخدام الموقع
              بأي طريقة قد تسبب ضرراً للموقع أو تعطل الخدمة أو تتداخل مع استخدام
              الآخرين.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              الملكية الفكرية
            </h2>
            <p>
              جميع المحتويات المنشورة على هذا الموقع، بما في ذلك النصوص والصور
              والتصميم، هي ملك لمكتب المحامية فاطمة أبو عيشة ما لم يذكر خلاف ذلك،
              ومحمية بموجب قوانين الملكية الفكرية.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              إخلاء المسؤولية
            </h2>
            <p>
              نبذل قصارى جهدنا لضمان أن المعلومات على هذا الموقع دقيقة ومحدثة،
              ولكننا لا نقدم أي ضمانات فيما يتعلق باكتمال المعلومات أو دقتها. يتم
              استخدام الموقع على مسؤوليتك الشخصية.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              الروابط الخارجية
            </h2>
            <p>
              قد يحتوي الموقع على روابط لمواقع خارجية. نحن غير مسؤولين عن محتوى
              أو ممارسات الخصوصية لهذه المواقع الخارجية.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              تعديل الشروط
            </h2>
            <p>
              نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم نشر
              التعديلات على هذه الصفحة وتعتبر سارية المفعول فور نشرها.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              اتصل بنا
            </h2>
            <p>
              للاستفسارات المتعلقة بهذه الشروط، يرجى{" "}
              <Link
                href="/contact"
                className="text-brand-gold hover:underline font-bold transition-colors duration-200 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                التواصل معنا
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
