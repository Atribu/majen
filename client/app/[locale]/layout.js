// app/[locale]/layout.js

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from "next/script";
import { Suspense } from "react";

import Header from "./components/generalcomponent/Header";
import Footer from "./components/generalcomponent/Footer";
import BookSection from "./components/generalcomponent/BookSection";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

// GA: SPA pageview helper
import GaPageView from "./components/GaPageView";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

// ✅ JS uyumlu generateMetadata
export async function generateMetadata({ params }) {
  const { locale } = await params;

  const title =
    locale === "en"
      ? "Wholesale Travertine From Turkey | Blocks, Slabs, Tiles – Majen Quarry"
      : "Wholesale Travertine From Turkey | Blocks, Slabs, Tiles – Majen Quarry";

  const description =
    locale === "en"
      ? "Majen supplies Wholesale Travertine From Turkey directly from our Uşak–Ulubey quarry. Export-ready travertine blocks, slabs, tiles, and custom designs in Blaundos Antiko, Light & Ivory with FOB/CIF worldwide shipping."
      : "Majen supplies Wholesale Travertine From Turkey directly from our Uşak–Ulubey quarry. Export-ready travertine blocks, slabs, tiles, and custom designs in Blaundos Antiko, Light & Ivory with FOB/CIF worldwide shipping.";

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
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const isProd = process.env.NODE_ENV === "production";

  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // const messages = await getMessages();
    const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        {/* GA4: yalnızca prod + id varsa yükle */}
        {isProd && GA_ID && (
          <>
            {/* (Opsiyonel) Consent Mode örneği
            <Script id="ga-consent" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'granted' });
              `}
            </Script>
            */}

            {/* gtag.js dosyası */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />

            {/* Başlatma + ilk pageview */}
            <Script id="ga-gtag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  anonymize_ip: true,
                  page_path: window.location.pathname + window.location.search
                });
              `}
            </Script>

        
    <Suspense fallback={null}>
      <GaPageView />
    </Suspense>
          </>
        )}
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
