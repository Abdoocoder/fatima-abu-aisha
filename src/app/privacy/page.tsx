import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة الخصوصية - فاطمة أبو عيشة",
  description: "سياسة الخصوصية لمكتب المحامية فاطمة أبو عيشة للاستشارات القانونية",
  openGraph: { locale: "ar_AR" },
};

export default function Privacy() {
  return (
    <div className="flex flex-col">
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max mx-auto max-w-4xl">
          <Link
            href="/"
            className="font-tajawal text-sm text-on-surface-variant hover:text-brand-navy flex items-center gap-2 mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4" /> العودة للرئيسية
          </Link>

          <h1 className="font-tajawal text-4xl md:text-5xl font-bold text-brand-navy mb-6">
            سياسة الخصوصية
          </h1>
          <p className="font-tajawal text-sm text-on-surface-variant mb-12">
            آخر تحديث: يناير 2026
          </p>

          <div className="prose prose-lg font-tajawal max-w-none space-y-6 text-on-surface-variant leading-relaxed">
            <p>
              نحن في مكتب المحامية فاطمة أبو عيشة نلتزم بحماية خصوصية زوار موقعنا
              الإلكتروني وعملائنا. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية
              المعلومات الشخصية التي تقدمها لنا.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              المعلومات التي نجمعها
            </h2>
            <p>
              قد نجمع المعلومات التالية عند استخدامك للموقع أو التواصل معنا: الاسم
              الكامل، عنوان البريد الإلكتروني، رقم الهاتف، ومحتوى الرسالة التي ترسلها
              عبر نموذج الاتصال.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              كيفية استخدام المعلومات
            </h2>
            <p>
              نستخدم المعلومات التي نجمعها للأغراض التالية: الرد على استفساراتك
              القانونية، تقديم الخدمات القانونية المطلوبة، تحسين خدماتنا وتجربة
              المستخدم، والتواصل معك بخصوص استشاراتك.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              حماية المعلومات
            </h2>
            <p>
              نتخذ الإجراءات الأمنية المناسبة لحماية معلوماتك الشخصية من الوصول غير
              المصرح به أو التعديل أو الإفصاح أو الإتلاف. نستخدم تشفير SSL وحماية
              قواعد البيانات بمعايير أمان عالية.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              حقوقك
            </h2>
            <p>
              لك الحق في طلب الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها في أي
              وقت. يمكنك التواصل معنا عبر صفحة الاتصال لممارسة هذه الحقوق.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              التعديلات على سياسة الخصوصية
            </h2>
            <p>
              قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإخطارك بأي
              تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة.
            </p>

            <h2 className="font-tajawal text-2xl font-bold text-brand-navy mt-10 mb-4">
              اتصل بنا
            </h2>
            <p>
              إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا من
              خلال صفحة{" "}
              <Link
                href="/contact"
                className="text-brand-gold hover:underline font-bold"
              >
                الاتصال
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
