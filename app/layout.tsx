import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
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
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
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
    <html lang="en">
      <body className={`${manrope.variable} ${plusJakarta.variable} min-h-full flex flex-col`}>
        <LenisProvider>
          <GoogleAnalytics />
          <Header />
          {children}
          <Footer />
          <BottomNav />
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
