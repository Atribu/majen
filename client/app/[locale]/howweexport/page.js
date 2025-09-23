// app/[locale]/howweexport/page.jsx
import { getTranslations } from "next-intl/server";
import Script from "next/script";

import IntroSection from "./IntroSection";
import QuestionsSection from "../components/generalcomponent/QuestionsSection";
import ContactFrom from "../components/generalcomponent/ContactFrom";
import CardsSection from "./CardsSection";
import TextSection from "../components/products1/TextSection";
import img1 from "@/public/images/export/fob.jpg"
import img2 from "@/public/images/export/cif.jpg"
import img3 from "@/public/images/export/exw.jpg"
import ThreeUpShowcase from "./ThreeUpShowcase";
import ExportMethodsShowcase from "./ExportMethodsShowcase";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";
const OG_IMAGE = `${SITE_URL}/images/export/export-hero.webp`;

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const title = locale === "tr"
    ? "Dünya Çapında Traverten İhracatı Nasıl Yapıyoruz | Majen Ocak Tedarikçisi"
    : "Travertine Export From Turkey | FOB CIF EXW Shipping – Majen";

  const description = locale === "tr"
    ? "Majen traverteni dünya geneline ihraç eder. FOB/CIF sevkiyat, ihracat dokümanları, güçlendirilmiş paketleme ve güvenilir teslimat."
    : "Majen exports travertine worldwide with FOB, CIF, EXW shipping options. From pro-forma to container loading: export documentation, reinforced packaging, and reliable delivery from Uşak–Ulubey.";

  const canonical = locale === "tr"
    ? `${SITE_URL}/tr/howweexport`
    : `${SITE_URL}/en/howweexport`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/howweexport`,
        tr: `${SITE_URL}/tr/howweexport`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      locale,
      images: [{ url: OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }) {
  const { locale } = await params;

  const t  = await getTranslations({ locale, namespace: "HowWeExportPage" });
  const tQ = await getTranslations({ locale, namespace: "HowWeExportPage.Questions" });
  const tS = await getTranslations({ locale, namespace: "HowWeExportPage.TextSection1" });
  const tS2 = await getTranslations({ locale, namespace: "HowWeExportPage.TextSection2" });
  const tS3 = await getTranslations({ locale, namespace: "HowWeExportPage.TextSection3" });
  const tS4 = await getTranslations({ locale, namespace: "HowWeExportPage.TextSection4" });

  const items = [
    { q: tQ("q1"), a: tQ("answer1") },
    { q: tQ("q2"), a: tQ("answer2") },
    { q: tQ("q3"), a: tQ("answer3") },
    { q: tQ("q4"), a: tQ("answer4") },
    { q: tQ("q5"), a: tQ("answer5") },
  ];

  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Travertine from Turkey",
    author: { "@type": "Organization", name: "Majen" },
    publisher: { "@type": "Organization", name: "Majen" },
  };

  const isTR = locale === "tr";
  const homeUrl = isTR ? `${SITE_URL}/tr` : `${SITE_URL}/en`;
  const pageUrl = isTR ? `${SITE_URL}/tr/howweexport` : `${SITE_URL}/en/howweexport`;

  // Breadcrumb JSON-LD
  const breadcrumbJSONLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isTR ? "Ana Sayfa" : "Home",
        item: homeUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isTR ? "İhracat Yöntemlerimiz" : "How We Export",
        item: pageUrl
      }
    ]
  };

  // WebPage JSON-LD
  const webPageJSONLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("title") || (isTR ? "Dünya Çapında Traverten İhracatı Nasıl Yapıyoruz" : "How We Export Travertine Worldwide"),
    description: isTR
      ? "Majen traverteni dünya geneline ihraç eder. FOB/CIF sevkiyat, dokümantasyon, paketleme ve güvenilir teslimat."
      : "Learn how Majen exports travertine worldwide. FOB/CIF shipping, documentation, packaging, and reliable delivery.",
    publisher: { "@type": "Organization", name: "Majen", url: SITE_URL },
    mainEntityOfPage: pageUrl
  };

  // FAQ JSON-LD
  const faqJSONLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a }
    }))
  };



  return (
   <section className="flex flex-col w-screen items-center justify-center overflow-hidden">
     <IntroSection
        title={t("title")}
        intro={t("intro")}
        title2={t("title2")}
        intro2={t("intro2")}
        heroSrc="/images/export/howweexport.jpg"
        bgMobile="/images/export/howweexport.jpg"
        bgDesktop="/images/homepage/antikarkaplan2.webp"
        bgPanel="/images/homepage/antikarkaplan4.webp"
        imageAlt={isTR ? "Traverten ihracat yöntemleri" : "Travertine export methods"}
        crumbHomeLabel={isTR ? "Ana Sayfa" : "Home"}
        crumbHomeHref={isTR ? "/tr" : "/en"}
        crumbSectionLabel={isTR ? "İhracat Yöntemlerimiz" : "Export Methods"}
        crumbSectionHref={isTR ? "/tr/howweexport" : "/en/howweexport"}
        showBreadcrumb={true}
      />

 
{/* <ExportMethodsShowcase
  heading="How We Export Travertine Worldwide"
  description="FOB/CIF sevkiyat, tam dokümantasyon ve güçlendirilmiş paketleme ile güvenli teslimat."
  defaultIndex={0}
  items={[
    {
      img: img1,
      alt: "Container loading at port (alt: FOB shipping for travertine from Turkey)",
      title: "FOB (Free on Board)",
      href: "/en/howweexport/fob",
      cta: "View details",
      text: "Majen loads travertine containers at Turkish ports. Buyers arrange international freight. Most common for bulk travertine block orders.",
      linkifyPatterns: [
        { pattern: "(FOB|Free on Board)", flags: "i", href: "/en/howweexport/fob" }
      ],
    },
    {
      img: img2,
      alt: "Ship at sea (alt: CIF shipment with insurance & freight included)",
      title: "CIF (Cost, Insurance, Freight)",
      href: "/en/howweexport/cif",
      cta: "See documents",
      text: "Majen manages shipping, insurance, and freight to buyer’s destination port. Importers prefer this hassle-free option for slabs and tiles.",
      linkifyPatterns: [
        { pattern: "(CIF|Cost, Insurance, Freight)", flags: "i", href: "/en/howweexport/cif" }
      ],
    },
    {
      img: img3,
      alt: "Export docs (alt: Export documents: invoice, packing list, certificate of origin)",
      title: "EXW (Ex Works)",
      href: "/en/howweexport/exw",
      cta: "How it works",
      text: "Buyers arrange pickup directly from our quarry/warehouse. Suitable for importers with their own freight partners.",
      linkifyPatterns: [
        { pattern: "(EXW|Ex Works)", flags: "i", href: "/en/howweexport/exw" }
      ],
    },
  ]}
/> */}


      <CardsSection />

      <ThreeUpShowcase
      heading="How We Export Travertine Worldwide"
      description="FOB/CIF sevkiyat, tam dokümantasyon ve güçlendirilmiş paketleme ile güvenli teslimat."
      items={[
        {
          img: img1,
          alt: "Container loading at port (alt: FOB shipping for travertine from Turkey)",
          title: "FOB Shipping",
          href: "/en/howweexport/fob",
          cta: "View details"
        },
        {
          img: img2,
          alt: "Ship at sea (alt: CIF shipment with insurance & freight included)",
          title: "CIF",
          href: "/en/howweexport/cif",
          cta: "See documents"
        },
        {
          img: img3,
          alt: "Export docs (alt: Export documents: invoice, packing list, certificate of origin)",
          title: "EXW",
          href: "/en/howweexport/exw",
          cta: "How it works"
        }
      ]}
    />

      {/* <div className="max-w-[1100px] w-[95%] md:w-[80%] grid grid-cols-1 sm:grid-cols-2 items-center justify-center"> */}
        <TextSection
        title={tS("title")}
        paragraphs={[tS("text"), tS("list1"), tS("list2"), tS("list3"), tS("list4"),tS("list5")]}
        schema={schemaArticle}
        className="flex flex-col w-1/2 "
        clampMobile={5}
        as="section"/>

      <TextSection
        title={tS2("title")}
        paragraphs={[tS2("text"), tS2("list1"), tS2("list2"), tS2("list3"), tS2("list4"),tS2("list5")]}
        schema={schemaArticle}
         className="w-1/2"
        clampMobile={5}
        as="section"/>

         <TextSection
        title={tS3("title")}
        paragraphs={[tS3("text"), tS3("list1"), tS3("list2"), tS3("list3"), tS3("list4"),tS3("list5"),tS3("list6")]}
        schema={schemaArticle}
        className="max-w-5xl mx-auto mt-12"
        clampMobile={5}
        as="section"
      />

        <TextSection
        title={tS4("title")}
        paragraphs={[tS4("text"), tS4("list1"), tS4("list2"), tS4("list3"), tS4("list4")]}
        schema={schemaArticle}
        className="max-w-5xl mx-auto mt-12"
        clampMobile={5}
        as="section"
      />
   

      <QuestionsSection items={items} span={isTR ? "İhracat" : "How We Export"} />
      <ContactFrom />

      <nav aria-label="Related links" className="text-sm text-neutral-600 my-8 text-center flex gap-3 items-center justify-center">
  <Link href="/en/travertine/blocks">Travertine Blocks</Link> •
  <Link href="/en/travertine/slabs">Travertine Slabs</Link> •
  <Link href="/en/travertine/tiles">Travertine Tiles</Link> •
  <Link href="/en/travertine/special-designs">Custom Designs</Link> •
  <Link href="/en/how-we-export">How We Export</Link>
</nav>


      {/* JSON-LD: Breadcrumb */}
      <Script
        id="jsonld-how-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />

      {/* JSON-LD: WebPage */}
      <Script
        id="jsonld-how-we-export"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJSONLD) }}
      />

      {/* JSON-LD: FAQ */}
      <Script
        id="jsonld-how-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJSONLD) }}
      />
   </section>
  );
}
