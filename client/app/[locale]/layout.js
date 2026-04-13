// app/[locale]/layout.js
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GoogleTagManager } from "@next/third-parties/google";

import Header from "./components/generalcomponent/Header";
import Footer from "./components/generalcomponent/Footer";
import BookSection from "./components/generalcomponent/BookSection";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

// Fontlar
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-K6B63C3S";

/* -------------------------------------------------------------------------- */
/*                          🔹 METADATA / SEO AYARI 🔹                        */
/* -------------------------------------------------------------------------- */
export async function generateMetadata({ params }) {
  const { locale } = await params;

  const isEN = locale === "en";
  const title = isEN
    ? "Wholesale Travertine From Turkey | Blocks, Slabs, Tiles – Majen Quarry"
    : "Toptan Traverten Türkiye'den | Bloklar, Plakalar, Karolar – Majen Quarry";

  const description = isEN
    ? "Majen supplies Wholesale Travertine From Turkey directly from our Uşak–Ulubey quarry. Export-ready travertine blocks, slabs, tiles, and custom designs in Blaundos Antiko, Light & Ivory with FOB/CIF worldwide shipping."
    : "Majen, Türkiye Uşak–Ulubey ocağından doğrudan toptan traverten tedarik eder. Blaundos Antiko, Light ve Ivory seçeneklerinde blok, plaka, karo ve özel tasarımlar dünya çapında FOB/CIF sevkiyatla sunulur.";

  const url = `${SITE_URL}/${locale}`;

  const languages = routing.locales.reduce((acc, loc) => {
    acc[loc] = `${SITE_URL}/${loc}`;
    return acc;
  }, {});

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      languages,
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
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/majen.ico",
      shortcut: "/majen.ico",
      apple: "/majen.ico",
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                             🔹 STATIC PARAMS 🔹                             */
/* -------------------------------------------------------------------------- */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* -------------------------------------------------------------------------- */
/*                              🔹 ROOT LAYOUT 🔹                              */
/* -------------------------------------------------------------------------- */
export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const isProd = process.env.NODE_ENV === "production";
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      {isProd && GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
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

// // app/[locale]/layout.js
// import { NextIntlClientProvider } from "next-intl";
// import { getMessages, setRequestLocale } from "next-intl/server";
// import { notFound } from "next/navigation";
// import { routing } from "@/i18n/routing";
// import Script from "next/script";
// import { Suspense } from "react";

// import Header from "./components/generalcomponent/Header";
// import Footer from "./components/generalcomponent/Footer";
// import BookSection from "./components/generalcomponent/BookSection";
// import GaPageView from "./components/GaPageView";

// import { Geist, Geist_Mono } from "next/font/google";
// import "../globals.css";

// // Fontlar
// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

// /* -------------------------------------------------------------------------- */
// /*                          🔹 METADATA / SEO AYARI 🔹                        */
// /* -------------------------------------------------------------------------- */
// export async function generateMetadata({ params }) {
//   const { locale } = await params;

//   const isEN = locale === "en";
//   const title = isEN
//     ? "Wholesale Travertine From Turkey | Blocks, Slabs, Tiles – Majen Quarry"
//     : "Toptan Traverten Türkiye'den | Bloklar, Plakalar, Karolar – Majen Quarry";

//   const description = isEN
//     ? "Majen supplies Wholesale Travertine From Turkey directly from our Uşak–Ulubey quarry. Export-ready travertine blocks, slabs, tiles, and custom designs in Blaundos Antiko, Light & Ivory with FOB/CIF worldwide shipping."
//     : "Majen, Türkiye Uşak–Ulubey ocağından doğrudan toptan traverten tedarik eder. Blaundos Antiko, Light ve Ivory seçeneklerinde blok, plaka, karo ve özel tasarımlar dünya çapında FOB/CIF sevkiyatla sunulur.";

//   const url = `${SITE_URL}/${locale}`;

//   // routing.locales listesini kullanarak diller arası alternates üret
//   const languages = routing.locales.reduce((acc, loc) => {
//     acc[loc] = `${SITE_URL}/${loc}`;
//     return acc;
//   }, {});

//   return {
//     metadataBase: new URL(SITE_URL),
//     title,
//     description,
//     alternates: {
     
//       languages,
//     },
//     openGraph: {
//       url,
//       type: "website",
//       title,
//       description,
//       images: [`${SITE_URL}/og/cover-${locale}.jpg`],
//       locale,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [`${SITE_URL}/og/cover-${locale}.jpg`],
//     },
//     robots: {
//       index: true,
//       follow: true,
//     },
//     icons: {
//       icon: "/majen.ico",
//       shortcut: "/majen.ico",
//       apple: "/majen.ico",
//     },
//   };
// }

// /* -------------------------------------------------------------------------- */
// /*                             🔹 STATIC PARAMS 🔹                             */
// /* -------------------------------------------------------------------------- */
// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

// /* -------------------------------------------------------------------------- */
// /*                              🔹 ROOT LAYOUT 🔹                              */
// /* -------------------------------------------------------------------------- */
// export default async function RootLayout({ children, params }) {
//   const { locale } = await params;

//   if (!routing.locales.includes(locale)) {
//     notFound();
//   }

//   setRequestLocale(locale);

//   const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
//   const isProd = process.env.NODE_ENV === "production";
//   const messages = (await import(`../../messages/${locale}.json`)).default;

//   return (
//     <html lang={locale}>
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
//         {/* ✅ Google Analytics yalnızca production ortamında yüklenir */}
//         {isProd && GA_ID && (
//           <>
//             <Script
//               src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
//               strategy="afterInteractive"
//             />
//             <Script id="ga-init" strategy="afterInteractive">
//               {`
//                 window.dataLayer = window.dataLayer || [];
//                 function gtag(){dataLayer.push(arguments);}
//                 gtag('js', new Date());
//                 gtag('config', '${GA_ID}', {
//                   anonymize_ip: true,
//                   page_path: window.location.pathname + window.location.search
//                 });
//               `}
//             </Script>

//             {/* SPA route tracking */}
//             <Suspense fallback={null}>
//               <GaPageView />
//             </Suspense>
//           </>
//         )}

//         <NextIntlClientProvider locale={locale} messages={messages}>
//           <Header />
//           <BookSection />
//           {children}
//           <Footer />
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }
