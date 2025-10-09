import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import { getLanguageFromServer } from "@/lib/i18n/detect-language";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lockerlink",
  description: "Lockerlink keeps travellers moving with premium luggage storage and transfer across Asia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = getLanguageFromServer();

  return (
    <html lang={language}>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white text-neutral-900 antialiased`}>
        <LanguageProvider initialLanguage={language}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
