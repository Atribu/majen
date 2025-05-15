import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import Header from "./components/generalcomponent/Header";
import Footer from "./components/generalcomponent/Footer";
import BookSection from "./components/generalcomponent/BookSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Majen",
  description: "Majen Madencilik",

  icons: {
    icon: '/majen.svg',      
    shortcut: '/majen.svg',  
    apple: '/majen.svg'     
  }
};


export default async function RootLayout({ children, params}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header/>
        <BookSection/>
        {children}
        <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
