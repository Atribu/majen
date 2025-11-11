import React from 'react'
import IntroSection from '../IntroSection'
import { useTranslations } from 'next-intl'
import img1 from "@/public/images/export/FOB.webp"
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import QuestionsSection from "../../components/generalcomponent/QuestionsSection";
import ContactFrom from '../../components/generalcomponent/ContactFrom';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";

// ❌ BU SATIRI SİLİN - Static metadata kullanmayın!
// export const metadata = { ... }

// ✅ YENİ: Dynamic generateMetadata ekleyin
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isTR = locale === "tr";

  // URL slug'ları locale'e göre
  const slugPath = isTR 
    ? "nasil-ihracat-yapiyoruz/fob" 
    : "how-we-export/fob";

  const canonicalUrl = `${SITE_URL}/${locale}/${slugPath}`;

  const title = isTR
    ? "Türkiye'den FOB Traverten İhracatı | Majen Ocak Tedarikçisi"
    : "FOB Travertine Export From Turkey | Majen Quarry Supplier";

  const description = isTR
    ? "Majen, Türkiye'den FOB şartlarıyla traverten blok, plaka ve karo ihraç eder. Free On Board süreci, dokümanlar, paketleme ve limanlar."
    : "Majen exports travertine blocks, slabs and tiles with FOB shipping from Turkey. Learn how Free On Board works, container loading, documents, ports and why importers choose FOB.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/en/how-we-export/fob`,
        tr: `${SITE_URL}/tr/nasil-ihracat-yapiyoruz/fob`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      locale,
      images: [{ url: `${SITE_URL}/images/export/FOB.webp` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/export/FOB.webp`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }) {
  const { locale } = await params;
    const isTR = locale === "tr";
  const homeUrl = isTR ? `${SITE_URL}/tr` : `${SITE_URL}/en`;
  const pageUrl = isTR ? `${SITE_URL}/tr/howweexport` : `${SITE_URL}/en/howweexport`;

  const t  = await getTranslations({ locale, namespace: "Fob" });
  const t2  = await getTranslations({ locale, namespace: "Fob.Questions" });
      const items = [
    { q: t2("q1"), a: t2("answer1") },
    { q: t2("q2"), a: t2("answer2") },
    { q: t2("q3"), a: t2("answer3") },
    { q: t2("q4"), a: t2("answer4") }
  ];

  return (
    <main className="mt-16">
      {/* HERO */}
      
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/export/FOB.webp"
          alt="FOB Travertine Export From Turkey – container loading at Izmir Alsancak port"
          width={1920}
          height={900}
          priority
          sizes="(max-width: 768px) 100vw, 1920px"
          className="h-[46vh] md:h-[60vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center text-white">
            <h1 className="text-[24px] md:text-[28px] lg:text-[30px] font-bold leading-[120%]">
              FOB Travertine Export From Turkey – Direct Quarry Supplier
            </h1>
            <p className="mt-4 text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed">
              Majen supplies <strong>FOB Travertine Export From Turkey</strong>,
              covering blocks, slabs, tiles and custom designs. We load
              containers at Turkish ports, handle export clearance and provide
              full documentation; importers arrange ocean freight and insurance.
              FOB is the most popular option for bulk block & slab orders thanks
              to cost control and flexibility.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/en/contactus"
                className="rounded-2xl bg-amber-600 px-4 lg:px-5 py-2 lg:py-3 text-[14px] lg:text-[16px] font-semibold text-white shadow">
                Get a Quote
              </Link>
              <Link
                href="/en/how-we-export"
                className="rounded-2xl bg-white px-4 lg:px-5 py-2 lg:py-3 text-[14px] lg:text-[16px] font-semibold text-neutral-900 shadow"
              >
                How We Export
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS FOB */}
      <section className="max-w-[1200px] mx-auto px-5 py-10 items-center justify-center flex flex-col text-center">
        <h2 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold text-neutral-900">
          What Is FOB in International Trade?
        </h2>
        <p className="mt-3 text-neutral-800 leading-[135%] lg:leading-relaxed text-[12px] md:text-[14px] lg:text-[16px]">
          FOB (Free On Board) is an Incoterm that splits responsibilities
          clearly. Under FOB, Majen delivers goods to the port, clears them for
          export and loads them onto the buyer’s nominated vessel. From that
          moment, the buyer takes responsibility for freight, insurance and
          destination fees. This clarity is why{" "}
          <strong>FOB Travertine Export From Turkey</strong> is efficient and
          transparent for importers.
        </p>

        {/* WHY FOB – 3 cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Cost Transparency",
              d: "Origin costs handled by Majen; importers control freight, insurance and destination charges.",
            },
            {
              t: "Flexible Shipping",
              d: "Choose carriers and negotiate rates directly; keep logistics partners you trust.",
            },
            {
              t: "Industry Standard",
              d: "Widely used for natural stone; ideal for large travertine block and slab consignments.",
            },
          ].map((c) => (
            <article
              key={c.t}
              className="rounded-2xl bg-white p-5 ring-1 ring-neutral-200 shadow"
            >
              <h3 className="mb-1 font-semibold text-[18px] md:text-[20px]">{c.t}</h3>
              <p className="text-neutral-700 text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed" >{c.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="bg-neutral-50 py-12">
        <div className="max-w-[1000px] mx-auto px-5">
          <h2 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold text-neutral-900">
            The FOB Travertine Export Process With Majen
          </h2>
          <ol className="relative mt-6 border-l pl-6">
            {[
              {
                s: "Pro-Forma & Confirmation",
                d: "We issue a pro-forma invoice confirming product details, quantities and terms; buyer approves.",
              },
              {
                s: "Production & QC",
                d: "Blocks, slabs and tiles produced at Uşak–Ulubey quarry; inspections and reports on request.",
              },
              {
                s: "Packaging",
                d: "Blocks: reinforced frames; slabs: A-frames, edge protectors; tiles/custom: labeled crates with foam.",
              },
              {
                s: "Inland Transport",
                d: "Domestic trucking to major Turkish ports coordinated with your vessel schedule.",
              },
              {
                s: "Export Clearance",
                d: "Customs declarations, certificate of origin and paperwork handled by Majen.",
              },
              {
                s: "Vessel Loading",
                d: "Containers loaded at İzmir Alsancak / Aliağa Nemrut / Gemlik; photos & seal numbers shared.",
              },
            ].map((it, i) => (
              <li key={i} className="mb-6 ml-2">
                <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-teal-700" />
                <h3 className="font-semibold">{it.s}</h3>
                <p className="text-neutral-700 text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed">{it.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DOCUMENTS + PORTS GRID */}
      <section className="max-w-[1200px] mx-auto px-5 py-12 text-[12px] md:text-[14px] lg:text-[16px]">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl bg-white p-6 ring-1 ring-neutral-200 shadow">
            <h2 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold">
              Documentation Provided Under FOB
            </h2>
            <h4 className="mt-2 font-semibold">Essential Export Documents</h4>
            <ul className="mt-2 list-disc pl-5 text-neutral-700">
              <li>Commercial invoice</li>
              <li>Packing list</li>
              <li>Certificate of origin</li>
              <li>Export clearance papers</li>
            </ul>
            <h4 className="mt-4 font-semibold">Optional Documentation</h4>
            <ul className="mt-2 list-disc pl-5 text-neutral-700">
              <li>Third-party inspection (SGS, etc.)</li>
              <li>Quality certificates & HS code details</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-6 ring-1 ring-neutral-200 shadow">
            <h2 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold">
              Ports & Lead Times (FOB)
            </h2>
            <h4 className="mt-2 font-semibold">Major Export Ports</h4>
            <p className="text-neutral-700 text-[12px] md:text-[14px] lg:text-[16px]">
              İzmir Alsancak • Aliağa Nemrut • Gemlik
            </p>
            <h4 className="mt-4 font-semibold">Typical Lead Times</h4>
            <p className="text-neutral-700 text-[12px] md:text-[14px] lg:text-[16px]">
              Production & packaging: 10–20 business days • Port handling &
              loading: 3–5 days
            </p>
            <h4 className="mt-4 font-semibold">Minimum Order Quantities</h4>
            <p className="text-neutral-700 text-[12px] md:text-[14px] lg:text-[16px]">
              Blocks: 1 piece • Slabs: by bundle • Tiles: by crate or m²
            </p>
          </article>
        </div>
      </section>

      {/* CASE + H5 KEY TAKEAWAYS */}
      <section className="bg-neutral-50 py-9 lg:py-12">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold text-neutral-900">
            FOB Export in Action 
          </h2>
          <p className="mt-3 text-neutral-700 leading-relaxed text-[12px] md:text-[14px] lg:text-[16px]">
            A US importer orders 5 containers of travertine blocks. Majen
            manages production, packaging, trucking, export clearance and vessel
            loading at İzmir Alsancak. The buyer books freight and insurance.
            Photos of loaded containers and seal numbers are shared. The result:
            cost control, predictable timelines and safe delivery.
          </p>
          <h5 className="mt-6 text-lg font-semibold">
            Key Takeaways for FOB Travertine Export From Turkey
          </h5>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2 text-neutral-700 text-[12px] md:text-[14px] lg:text-[16px]">
            <li>Ideal for large block/slab orders</li>
            <li>Buyer controls freight & insurance</li>
            <li>Majen handles quarry-to-port with documentation</li>
            <li>Reinforced packaging reduces risks</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
    <QuestionsSection span="FOB Travertine Export" items={items} />

      {/* RELATED LINKS */}
      <section className="max-w-[1200px] mx-auto px-3 lg:px-5 py-10">
        <nav
          aria-label="Related links"
          className="text-[12px] md:text-sm text-neutral-600 text-center gap-1 md:gap-2 lg:gap-3 flex items-center justify-center">
          <Link href="/en/export/fob-travertine">FOB Export</Link> {" • "}
          <Link href="/en/export/cif-travertine">CIF Export</Link> {" • "}
          <Link href="/en/export/exw-travertine">EXW Export</Link> {" • "}
          <Link href="/en/how-we-export">How We Export</Link> {" • "}
          <Link href="/en/travertine">Travertine</Link>
        </nav>
      </section>

      <ContactFrom/>

      {/* JSON-LD (invisible, SEO) */}
      <Script
        id="jsonld-fob-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "FOB Travertine Export From Turkey",
            description:
              "Majen exports travertine with FOB terms from Turkey. Process, documents, packaging, ports and timelines.",
            publisher: { "@type": "Organization", name: "Majen", url: "https://majen.com.tr" },
            mainEntityOfPage: "https://majen.com.tr/en/export/fob-travertine",
          }),
        }}
      />
      <Script
        id="jsonld-fob-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Why choose FOB for travertine export?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "FOB offers cost transparency and flexibility. Majen handles origin costs and vessel loading; importers manage ocean freight, insurance and destination charges.",
                },
              },
              {
                "@type": "Question",
                name: "Which Turkish ports are used for FOB?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Izmir Alsancak, Aliağa Nemrut and Gemlik are our main ports depending on vessel schedules and routes.",
                },
              },
              {
                "@type": "Question",
                name: "What documents are included with FOB?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Commercial invoice, packing list, certificate of origin and export clearance papers. Optional SGS or third-party inspections on request.",
                },
              },
              {
                "@type": "Question",
                name: "Can slabs and tiles be shipped FOB or only blocks?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "All product types can ship FOB: blocks, slabs, tiles and custom designs. We combine items when weight/volume allows.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}



