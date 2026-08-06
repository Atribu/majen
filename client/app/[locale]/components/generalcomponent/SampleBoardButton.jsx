"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const CONTACT_EMAIL = "info@majen.com.tr";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr").replace(/\/$/, "");

function buildMailContent({ isTurkish, pageLabel, pageUrl }) {
  if (isTurkish) {
    return {
      subject: `Numune Panosu Talebi - ${pageLabel}`,
      body: [
        "Merhaba Majen Ekibi,",
        "",
        "Aşağıdaki ürün için numune panosu talep ediyorum.",
        "",
        `Ürün / Sayfa: ${pageLabel}`,
        `Sayfa bağlantısı: ${pageUrl}`,
        "Firma:",
        "Teslimat ülkesi:",
        "Tahmini miktar:",
        "Tercih edilen renk / yüzey:",
        "Proje detayları:",
        "",
        "Ad Soyad:",
        "Telefon:",
        "",
        "Saygılarımla,",
      ].join("\n"),
    };
  }

  return {
    subject: `Sample Board Request - ${pageLabel}`,
    body: [
      "Hello Majen Team,",
      "",
      "I would like to request a sample board for the product below.",
      "",
      `Product / Page: ${pageLabel}`,
      `Page URL: ${pageUrl}`,
      "Company:",
      "Delivery country:",
      "Estimated quantity:",
      "Preferred color / finish:",
      "Project details:",
      "",
      "Full name:",
      "Phone:",
      "",
      "Best regards,",
    ].join("\n"),
  };
}

export default function SampleBoardButton({ productTitle = "" }) {
  const t = useTranslations("SampleBoard");
  const locale = useLocale();
  const pathname = usePathname();
  const isTurkish = locale?.startsWith("tr");
  const pageLabel = productTitle || (isTurkish ? "Majen ürün sayfası" : "Majen product page");
  const pageUrl = `${SITE_URL}${pathname}`;
  const { subject, body } = buildMailContent({ isTurkish, pageLabel, pageUrl });
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <a
      href={mailtoHref}
      className="inline-flex items-center justify-center rounded-full bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 sm:text-sm"
    >
      {t("button")}
    </a>
  );
}
