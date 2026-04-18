import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import LenisProvider from "@/components/providers/LenisProvider";
import Footer from "@/components/layout/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "LIC Recruitment Portal | Build Your Future",
  description: "Join LIC as an agent, development officer, or Bima Sakhi through a professional mentorship-led recruitment platform.",
  keywords: ["LIC Agent Chandigarh", "LIC Career", "LIC Recruitment", "Bima Sakhi", "Insurance Agent Jobs", "Work from Home", "Financial Advisor"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${sora.variable}`}>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <LenisProvider>
          <GoogleAnalytics />
          <Header />
          <div className="flex min-h-0 flex-1 flex-col pt-[var(--site-header-offset)]">
            {children}
          </div>
          <Footer />
          <BottomNav />
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
