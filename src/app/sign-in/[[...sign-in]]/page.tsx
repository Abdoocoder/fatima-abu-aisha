"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <section className="min-h-[85dvh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">تسجيل الدخول</h1>
        <p className="text-gray-500 mb-8">تسجيل الدخول إلى حسابك للوصول إلى لوحة التحكم</p>
        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "rounded-lg border-gray-200 hover:border-gold text-sm",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-400 text-sm",
                formFieldLabel: "text-gray-700 text-sm font-medium",
                formFieldInput: "rounded-lg border-gray-200 focus:border-gold focus:ring-gold",
                formButtonPrimary: "bg-gold hover:bg-gold/90 text-black rounded-lg text-sm font-medium",
                footerActionLink: "text-gold hover:text-gold/80",
              },
            }}
            signUpUrl="/sign-up"
          />
        </div>
        <p className="mt-6 text-sm text-gray-500">
          ليس لديك حساب؟{" "}
          <Link href="/sign-up" className="text-gold hover:text-gold/80 font-medium">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </section>
  );
}
