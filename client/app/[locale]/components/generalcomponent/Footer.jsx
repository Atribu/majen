// app/components/Footer.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaWikipediaW
} from "react-icons/fa";

import logoBlack from "@/public/images/majenlogo.webp";
import DgtlfaceSvg from "./DgtlfaceSvg";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const prefix = `/${locale}`;
  const L = (tr, en) => (locale === "tr" ? tr : en);

  const navPrimary = [
    { label: t("nav.primary.home"), href: `${prefix}` },
    { label: t("nav.primary.blog"), href: `${prefix}${L("/blog", "/blog")}` },
    { label: t("nav.primary.about"), href: `${prefix}${L("/hakkimizda", "/aboutus")}` },
    { label: t("nav.primary.contact"), href: `${prefix}${L("/iletisim", "/contactus")}` },
  ];

  const navSecondary = [
    { label: t("nav.secondary.product"), href: `${prefix}${L("/travertine", "/travertine")}` },
    { label: t("nav.secondary.shop"), href: `${prefix}${L("/magaza", "/howweexport")}` },
    { label: t("nav.secondary.privacy"), href: `${prefix}${L("/kvkk", "/privacy")}` },
  ];

  const whatsappText = encodeURIComponent(t("whatsappText"));
  const whatsappHref = `https://api.whatsapp.com/send?phone=905335561092&text=${whatsappText}`;

  const addressLines = t.raw("address.lines"); // array

  return (
    <footer className="relative text-neutral-800">
      {/* ==== MERMER DOKU (Çizgisel damarlar) ==== */}
<div className="absolute inset-0 -z-10">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
    <defs>
      <filter id="marble-streaks">
        {/* 1) Gürültü: X frekansı küçük, Y frekansı büyük => çizgiler uzar */}
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.003 0.06"  /* ← X: düşük, Y: yüksek  */
          numOctaves="3"
          seed="7"
          stitchTiles="stitch"
          result="noise"
        />
        {/* 2) Yönlü blur: X’te yüksek, Y’de düşük => çizgisel yayılma */}
        <feGaussianBlur in="noise" stdDeviation="7 0.4" result="smeared" />
        {/* 3) Siyah-beyaz + kontrast */}
        <feColorMatrix in="smeared" type="saturate" values="0" result="mono" />
        <feComponentTransfer in="mono" result="veins">
          {/* exponent↓ => daha koyu/kalın damarlar */}
          <feFuncR type="gamma" amplitude="1" exponent="0.65" offset="0" />
          <feFuncG type="gamma" amplitude="1" exponent="0.65" offset="0" />
          <feFuncB type="gamma" amplitude="1" exponent="0.65" offset="0" />
        </feComponentTransfer>
        {/* 4) İncelik için hafif erozyon (opsiyonel) */}
        <feMorphology in="veins" operator="erode" radius="0.01" result="thinVeins" />
      </filter>
    </defs>

    {/* Beyaz zemin */}
    <rect width="100%" height="100%" fill="#fff" />

    {/* İsteğe bağlı: damarları hafif çapraz yapmak istersen, aşağıdaki <g>’ye rotate ekle */}
    {/* <g transform="rotate(-10 0 0)"> */}
      {/* Çizgisel damarlar */}
      <rect width="100%" height="100%" filter="url(#marble-streaks)" opacity="0.99" />
    {/* </g> */}
  </svg>
</div>


      {/* İçeriğin okunurluğu için hafif cam efekti */}
      <div className="backdrop-blur-sm supports-[backdrop-filter]:bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:pb-8 pt-11">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand + Social */}
            <div className="text-center lg:text-left">
              <Link
                href={prefix}
                aria-label={t("brand")}
                className="inline-flex items-center justify-center lg:justify-start"
              >
                <Image
                  src={logoBlack}
                  alt={`${t("brand")} logo`}
                  width={logoBlack.width}
                  height={logoBlack.height}
                  className="h-10 w-auto sm:h-12"
                  priority
                />
              </Link>

              <p className="mt-4 text-sm/6 text-neutral-700">{t("company")}</p>

              <div className="mt-5 flex items-center justify-center lg:justify-start gap-4">
                <a
                  href="https://www.youtube.com/@MajenMadencilik"
                   target="_blank"
                              rel="noopener noreferrer"
                  aria-label={t("social.youtube")}
                  className="p-2 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                >
                  <FaYoutube size={18} />
                </a>
                <a
                  href="https://www.instagram.com/p/DOn657JjD08/"
                   target="_blank"
                              rel="noopener noreferrer"
                  aria-label={t("social.instagram")}
                  className="p-2 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="#"
                   target="_blank"
                              rel="noopener noreferrer"
                  aria-label={t("social.facebook")}
                  className="p-2 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="https://en.wikipedia.org/wiki/Travertine"
                   target="_blank"
                              rel="noopener noreferrer"
                  aria-label={t("social.facebook")}
                  className="p-2 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                >
                  <FaWikipediaW size={18} />
                </a>
                {/* <a
                  href="#"
                   target="_blank"
                              rel="noopener noreferrer"
                  aria-label={t("social.linkedin")}
                  className="p-2 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                >
                  <FaLinkedin size={18} />
                </a> */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("social.whatsapp")}
                  className="p-2 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                >
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="text-center lg:text-left">
              <span className="text-sm font-semibold uppercase tracking-wide">
                {t("address.title")}
              </span>
              <address className="not-italic mt-3 text-sm text-neutral-700">
                {addressLines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </address>

              <div className="mt-3 space-y-1 text-sm">
                <a
                  href="tel:+905335561092"
                  className="underline underline-offset-2 hover:opacity-80"
                >
                  +90 533 556 10 92
                </a>
              </div>
            </div>

            {/* Footer Menu 1 */}
            <div className="flex flex-row items-center lg:items-start justify-around">
              <div className="text-center lg:text-left">
              <span className="text-sm font-semibold uppercase tracking-wide">
                {t("nav.title")}
              </span>
              <ul className="mt-4 space-y-2 text-sm">
                {navPrimary.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 hover:underline underline-offset-4 hover:opacity-80"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Menu 2 */}
            <div className="text-center lg:text-left flex lg:hidden flex-col">
              <span className="text-sm font-semibold uppercase tracking-wide">
                {t("nav.more")}
              </span>
              <ul className="mt-4 space-y-2 text-sm">
                {navSecondary.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 hover:underline underline-offset-4 hover:opacity-80"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            </div>
            {/* Footer Menu 2 */}
            <div className="text-center lg:text-left hidden lg:flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-wide">
                {t("nav.more")}
              </span>
              <ul className="mt-4 space-y-2 text-sm">
                {navSecondary.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 hover:underline underline-offset-4 hover:opacity-80"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-12 border-t border-black/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-700">
            <p>© {year} {t("brand")}. {t("rights")}</p>
            <div className="inline-flex items-center gap-1">
           
              <Link href="https://dgtlface.com"   rel="norefferer nofollower"
                  target="_blank" className="flex w-full text-[12px] font-normal leading-normal font-jost tracking-[0.56px] md:py-[1.8%] text-center justify-center items-center gap-[9.13px] text-neutral-700">
            Powered by <DgtlfaceSvg className="flex" width={104} height={27} />
      </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
