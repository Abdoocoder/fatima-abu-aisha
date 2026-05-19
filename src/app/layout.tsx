import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "المحامية فاطمة أبو عيشة | للمحاماة والاستشارات القانونية",
  description:
    "مكتب المحامية فاطمة أبو عيشة للمحاماة والاستشارات القانونية في عمان، الأردن. نقدم خدمات قانونية متكاملة في القانون المدني والتجاري وقضايا الأسرة.",
  openGraph: {
    locale: "ar_AR",
    siteName: "المحامية فاطمة أبو عيشة",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          signInFallbackRedirectUrl="/dashboard"
          signUpFallbackRedirectUrl="/dashboard"
        >
          <ConvexClientProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
