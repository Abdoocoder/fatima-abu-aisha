/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "motion/react";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-brand-navy focus:text-white focus:rounded-lg focus:outline-none">
        تخطى إلى المحتوى الرئيسي
      </a>
      <Header />
      <motion.main 
        id="main-content"
        className="flex-grow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
