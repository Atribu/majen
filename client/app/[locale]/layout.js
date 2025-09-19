// app/[locale]/layout.js (sizin dosyanız)

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server'   
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import Header from "./components/generalcomponent/Header";
import Footer from "./components/generalcomponent/Footer";
import BookSection from "./components/generalcomponent/BookSection";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// İsterseniz bu statik bloğu kaldırın; generateMetadata zaten hepsini döndürecek.
// export const metadata = { ... }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

// ✅ JS uyumlu generateMetadata (TS types yok)
export async function generateMetadata({ params }) {
  const { locale } = await params; // Next 14: params async okunmalı

  const title =
    locale === "en"
      ? "Travertine Supplier from Turkey | Wholesale Blocks, Slabs & Tiles – Majen"
      : "Türkiye Traverten Üreticisi | Toptan Blok, Plaka & Karo – Majen";

  const description =
    locale === "en"
      ? "Majen supplies wholesale travertine from Uşak–Ulubey, Turkey: blocks, slabs & tiles in Blaundos Antiko, Light, Ivory. FOB/CIF worldwide shipping with full documentation."
      : "Majen, Uşak–Ulubey’den toptan traverten: blok, plaka & karo (Blaundos Antiko, Light, Ivory). FOB/CIF dünya geneli sevkiyat, tam dokümantasyon.";

  const url = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE_URL}/en`, tr: `${SITE_URL}/tr` },
    },
    openGraph: {
      url,
      type: "website",
      title,
      description,
      images: [`${SITE_URL}/og/cover-${locale}.jpg`],
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og/cover-${locale}.jpg`],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: '/majen.ico',
      shortcut: '/majen.ico',
      apple: '/majen.ico',
    },
  };
}


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale)

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <BookSection />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}