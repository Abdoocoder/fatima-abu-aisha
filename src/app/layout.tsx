import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "فاطمة أبو عيشة للمحاماة — استشارات قانونية مهنية",
  description:
    "نقدم خدمات قانونية متكاملة بمهنية عالية لضمان أفضل النتائج لعملائنا في مختلف القضايا القانونية.",
  openGraph: {
    locale: "ar_AR",
    siteName: "فاطمة أبو عيشة للمحاماة",
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
        <ClerkProvider>
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
