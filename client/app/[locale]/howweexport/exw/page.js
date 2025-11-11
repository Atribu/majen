import React from 'react'
import IntroSection from '../IntroSection'
import { useTranslations } from 'next-intl'
import img1 from "@/public/images/export/EXW.webp"
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import QuestionsSection from "../../components/generalcomponent/QuestionsSection";
import ContactFrom from '../../components/generalcomponent/ContactFrom';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";
const OG_IMAGE = `${SITE_URL}/images/export/fob.jpg`;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isTR = locale === "tr";

  // URL slug'ları locale'e göre
  const slugPath = isTR
    ? "nasil-ihracat-yapiyoruz/exw"
    : "how-we-export/exw";

  const canonicalUrl = `${SITE_URL}/${locale}/${slugPath}`;

  const title = isTR
    ? "EXW Traverten İhracatı | Ocaktan Teslim – Majen"
    : "EXW Travertine Export From Turkey | Ex Works Pickup – Majen";

  const description = isTR
    ? "EXW (Ex Works) traverten: Alıcılar ürünü doğrudan Majen ocağından/deposundan teslim alır. Süreç, dokümanlar, paketleme, teslim noktaları ve terminler hakkında bilgi alın."
    : "EXW (Ex Works) travertine from Turkey: buyers pick up directly from Majen quarry/warehouse. Process, documents, packaging, pickup locations, lead times, and FAQs.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/en/how-we-export/exw`,
        tr: `${SITE_URL}/tr/nasil-ihracat-yapiyoruz/exw`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      locale,
      images: [{ url: `${SITE_URL}/images/export/EXW.webp` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/export/EXW.webp`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }) {
     const { locale } = await params;
        const isTR = locale === "tr";
      const homeUrl = isTR ? `${SITE_URL}/tr` : `${SITE_URL}/en`;
      const pageUrl = isTR ? `${SITE_URL}/tr/howweexport` : `${SITE_URL}/en/howweexport`;
    
      const t  = await getTranslations({ locale, namespace: "Exw" });
      const t2  = await getTranslations({ locale, namespace: "Exw.Questions" });
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
          src="/images/export/EXW.webp"
          alt="EXW Travertine Export From Turkey – pickup from Majen quarry warehouse"
          width={1920}
          height={900}
          priority
          sizes="(max-width: 768px) 100vw, 1920px"
          className="h-[46vh] md:h-[60vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center text-white">
            <h1 className="text-[24px] md:text-[28px] lg:text-[30px] font-bold">
              EXW Travertine Export From Turkey – Ex Works Pickup
            </h1>
            <p className="mt-4 text-[12px] md:text-[14px] lg:text-[16px] md:text-lg leading-relaxed">
              Under <strong>EXW Travertine Export From Turkey</strong>, buyers
              collect goods directly from Majen’s quarry/warehouse. We prepare
              products and packaging at origin; importers arrange trucking,
              export formalities, ocean freight, insurance and destination
              charges. EXW is ideal for importers with strong freight partners
              and negotiated rates.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contactus"
                className="rounded-2xl bg-amber-600 px-4 lg:px-5 py-2 lg:py-3 text-[14px] lg:text-[16px] font-semibold text-white shadow"
              >
                Get a Pickup Slot
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

      {/* WHAT IS EXW */}
      <section className="max-w-[1200px] mx-auto px-5 py-10 items-center justify-center flex flex-col text-center">
        <h2 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold text-neutral-900">
          What Is EXW (Ex Works) in International Trade?
        </h2>
        <p className="mt-3 text-neutral-700 leading-relaxed text-[12px] md:text-[14px] lg:text-[16px]">
          EXW (Ex Works) is an Incoterm where the seller makes goods available
          at their premises and the buyer takes over from that point. For{" "}
          <strong>EXW Travertine Export From Turkey</strong>, Majen prepares
          blocks, slabs, tiles and custom pieces for pickup; your forwarder
          handles loading, export clearance, freight, insurance and all costs to
          destination.
        </p>

        {/* WHY EXW – 3 cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Maximum Control",
              d: "Importers manage trucking, customs broker, freight and insurance with preferred rates.",
            },
            {
              t: "Cost Optimization",
              d: "Leverage your carrier network and consolidate with other shipments to reduce landed cost.",
            },
            {
              t: "Fast Dispatch",
              d: "When your forwarder is ready, goods are prepared for immediate pickup at origin.",
            },
          ].map((c) => (
            <article
              key={c.t}
              className="rounded-2xl bg-white p-5 ring-1 ring-neutral-200 shadow"
            >
              <h3 className="mb-1 font-semibold">{c.t}</h3>
              <p className="text-neutral-700 text-sm leading-relaxed">{c.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="bg-neutral-50 py-12">
        <div className="max-w-[1000px] mx-auto px-5">
          <h2 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold text-neutral-900">
            The EXW Travertine Export Process With Majen
          </h2>
        </div>
        <div className="max-w-[1000px] mx-auto px-5">
          <ol className="relative mt-6 border-l pl-6">
            {[
              {
                s: "Pro-Forma & Confirmation",
                d: "We confirm SKUs, quantities, finishes and pickup window; EXW quote covers product + packaging at origin.",
              },
              {
                s: "Production & QC",
                d: "Manufacturing and inspections at Uşak–Ulubey; reports on request.",
              },
              {
                s: "Staging & Packaging",
                d: "Blocks: reinforced frames; slabs: A-frames with edge protection; tiles/custom: labeled wooden crates with foam.",
              },
              {
                s: "Pickup by Buyer’s Forwarder",
                d: "Your truck arrives with proper gear; loading supervision available upon request.",
              },
              {
                s: "Export Formalities by Buyer",
                d: "Your broker files export declarations and obtains any permits required.",
              },
              {
                s: "Freight & Insurance by Buyer",
                d: "You book vessel/air/road freight and arrange cargo insurance to destination.",
              },
            ].map((it, i) => (
              <li key={i} className="mb-6 ml-2">
                <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-teal-700" />
                <h3 className="font-semibold">{it.s}</h3>
                <p className="text-neutral-700 text-sm leading-relaxed">{it.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DOCUMENTS + PICKUP GRID */}
      <section className="max-w-[1200px] mx-auto px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl bg-white p-6 ring-1 ring-neutral-200 shadow">
            <h2 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold">
              Documents Provided for EXW
            </h2>
            <h4 className="mt-2 font-semibold">Included at Origin</h4>
            <ul className="mt-2 list-disc pl-5 text-neutral-700 text-[12px] md:text-[14px] lg:text-[16px]">
              <li>Commercial invoice & packing list</li>
              <li>HS code & product specs (on invoice)</li>
              <li>Quality/inspection report (if requested)</li>
              <li>Load photos and package labels</li>
            </ul>
            <h4 className="mt-4 font-semibold">By Buyer / Broker</h4>
            <ul className="mt-2 list-disc pl-5 text-neutral-700 text-[12px] md:text-[14px] lg:text-[16px]">
              <li>Export declaration & permits</li>
              <li>Insurance certificate</li>
              <li>Freight booking & bill of lading/CMR/AWB</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-6 ring-1 ring-neutral-200 shadow text-[12px] md:text-[14px] lg:text-[16px]">
            <h2 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold">
              Pickup Locations, Lead Times & MOQs
            </h2>
            <h4 className="mt-2 font-semibold">Pickup Points</h4>
            <p className="text-neutral-700">
              Majen Quarry / Warehouse — Uşak–Ulubey (arranged time slots)
            </p>
            <h4 className="mt-4 font-semibold">Typical Lead Times</h4>
            <p className="text-neutral-700">
              Production & staging: 7–15 business days (size/finish dependent)
            </p>
            <h4 className="mt-4 font-semibold">Minimum Order Quantities</h4>
            <p className="text-neutral-700">
              Blocks: 1 piece • Slabs: by bundle • Tiles: by crate or m²
            </p>
          </article>
        </div>
      </section>

      {/* H5 RESPONSIBILITY CHECKLIST */}
      <section className="bg-neutral-50 py-12">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold text-neutral-900">
            Responsibilities Under EXW (At a Glance)
          </h2>
          <h5 className="mt-4 text-lg font-semibold">Seller (Majen)</h5>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2 text-neutral-700 text-[12px] md:text-[14px] lg:text-[16px]">
            <li>Produce & stage goods at origin</li>
            <li>Packaging suitable for international transport</li>
            <li>Provide invoice, packing list, specs, load photos</li>
          </ul>
          <h5 className="mt-6 text-lg font-semibold">Buyer / Forwarder</h5>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2 text-neutral-700 text-[12px] md:text-[14px] lg:text-[16px]">
            <li>Truck pickup & loading equipment</li>
            <li>Export clearance, permits & broker</li>
            <li>Freight booking, insurance & destination charges</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
     <QuestionsSection span="EXW Travertine Export" items={items}/>
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
      

      {/* JSON-LD (invisible) */}
      <Script
        id="jsonld-exw-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "EXW Travertine Export From Turkey",
            description:
              "Ex Works pickup for travertine from Turkey: how EXW works, documentation, packaging, pickup points and timelines.",
            publisher: { "@type": "Organization", name: "Majen", url: "https://majen.com.tr" },
            mainEntityOfPage: "https://majen.com.tr/en/export/exw-travertine",
          }),
        }}
      />
      <Script
        id="jsonld-exw-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who arranges loading and export clearance under EXW?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "The buyer/forwarder. Majen stages goods and provides documents; your broker handles export declaration and permits.",
                },
              },
              {
                "@type": "Question",
                name: "Can I combine EXW pickups with other suppliers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. EXW lets you consolidate cargo and use your preferred carriers to optimize cost.",
                },
              },
              {
                "@type": "Question",
                name: "What packaging is provided at origin?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Blocks in reinforced frames; slabs on A-frames; tiles/custom in labeled wooden crates with foam and strapping.",
                },
              },
              {
                "@type": "Question",
                name: "Which documents do I receive from Majen?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Commercial invoice, packing list, product specs/HS code on paperwork, optional QC/inspection report, and load photos.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
