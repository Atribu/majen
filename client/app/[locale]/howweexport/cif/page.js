import React from 'react'
import IntroSection from '../IntroSection'
import { useTranslations } from 'next-intl'
import img1 from "@/public/images/export/CIF.webp"
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import QuestionsSection from "../../components/generalcomponent/QuestionsSection";
import ContactFrom from '../../components/generalcomponent/ContactFrom';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://majen.com.tr";
const OG_IMAGE = `${SITE_URL}/images/export/fob.jpg`;

export const metadata = {
  title: "CIF Travertine Export From Turkey | Majen Quarry Supplier",
  description:
    "Majen exports travertine with CIF terms from Turkey. Learn how Cost, Insurance & Freight works for blocks, slabs and tiles: process, documents, packaging, ports and timelines.",
  alternates: { canonical: "https://majen.com.tr/en/export/cif-travertine" },
  openGraph: {
    title: "CIF Travertine Export From Turkey | Majen",
    description:
      "CIF shipping for travertine: we manage freight, insurance and documentation to your destination port.",
    url: "https://majen.com.tr/en/export/cif-travertine",
    type: "article",
    images: ["/images/export/CIF.webp"],
  },
  twitter: { card: "summary_large_image" },
};

export default async function Page({ params }) {
     const { locale } = await params;
        const isTR = locale === "tr";
      const homeUrl = isTR ? `${SITE_URL}/tr` : `${SITE_URL}/en`;
      const pageUrl = isTR ? `${SITE_URL}/tr/howweexport` : `${SITE_URL}/en/howweexport`;
    
      const t  = await getTranslations({ locale, namespace: "Cif" });
      const t2  = await getTranslations({ locale, namespace: "Cif.Questions" });
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
          src="/images/export/CIF.webp"
          alt="CIF Travertine Export From Turkey – containerized shipment with insurance and freight"
          width={1920}
          height={900}
          priority
          sizes="(max-width: 768px) 100vw, 1920px"
          className="h-[46vh] md:h-[60vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold">
              CIF Travertine Export From Turkey – Cost, Insurance & Freight
            </h1>
            <p className="mt-4 text-base md:text-lg leading-relaxed">
              Majen supplies <strong>CIF Travertine Export From Turkey</strong>
              — we manage ocean freight, cargo insurance and export paperwork to
              your destination port. Importers benefit from a hassle-free flow
              for slabs, tiles, blocks and custom pieces, backed by reinforced
              packaging, certified quality and predictable lead times.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contactus"
                className="rounded-2xl bg-amber-600 px-5 py-3 font-semibold text-white shadow"
              >
                Get a Quote
              </Link>
              <Link
                href="/en/how-we-export"
                className="rounded-2xl bg-white px-5 py-3 font-semibold text-neutral-900 shadow"
              >
                How We Export
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS CIF */}
      <section className="max-w-[1200px] mx-auto px-5 py-10 items-center justify-center flex flex-col text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
          What Is CIF in International Trade?
        </h2>
        <p className="mt-3 text-neutral-700 leading-relaxed">
          CIF (Cost, Insurance & Freight) is an Incoterm where the seller
          arranges ocean freight, cargo insurance and export documentation until
          the goods arrive at the buyer’s destination port. Under{" "}
          <strong>CIF Travertine Export From Turkey</strong>, Majen covers
          origin handling, loading, freight and insurance; the importer manages
          local charges and customs clearance on arrival.
        </p>

        {/* WHY CIF – 3 cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Hassle-Free Logistics",
              d: "We book vessels, arrange insurance and deliver to your destination port.",
            },
            {
              t: "Predictable Costs",
              d: "Freight + insurance included in our quote; fewer surprises in total landed cost.",
            },
            {
              t: "Great for Slabs & Tiles",
              d: "Ideal when you prefer one point of contact for export and transport.",
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
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
            The CIF Travertine Export Process With Majen
          </h2>
          <ol className="relative mt-6 border-l pl-6">
            {[
              {
                s: "Pro-Forma & Confirmation",
                d: "We confirm items, destination port and shipping window; CIF quote includes freight + insurance.",
              },
              {
                s: "Production & QC",
                d: "Blocks, slabs, tiles manufactured and inspected at Uşak–Ulubey; reports on request.",
              },
              {
                s: "Packaging",
                d: "Blocks: reinforced frames; slabs: A-frames with edge protection; tiles/custom: labeled wooden crates with foam.",
              },
              {
                s: "Freight Booking",
                d: "Majen books vessel space, issues booking confirmation and estimated schedule.",
              },
              {
                s: "Export Clearance",
                d: "Customs paperwork, certificate of origin and insurance arranged by Majen.",
              },
              {
                s: "Sailing & Arrival",
                d: "Containers depart Turkey; on arrival the importer handles local charges and customs clearance.",
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

      {/* DOCUMENTS + PORTS GRID */}
      <section className="max-w-[1200px] mx-auto px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl bg-white p-6 ring-1 ring-neutral-200 shadow">
            <h2 className="text-xl md:text-2xl font-bold">
              Documentation Provided Under CIF
            </h2>
            <h4 className="mt-2 font-semibold">Included Documents</h4>
            <ul className="mt-2 list-disc pl-5 text-neutral-700">
              <li>Commercial invoice & packing list</li>
              <li>Certificate of origin</li>
              <li>Export clearance documents</li>
              <li>Insurance policy / certificate</li>
              <li>Third-party inspection (SGS etc., if requested)</li>
            </ul>
          </article>

          <article className="rounded-2xl bg-white p-6 ring-1 ring-neutral-200 shadow">
            <h2 className="text-xl md:text-2xl font-bold">
              Ports, Lead Times & MOQs (CIF)
            </h2>
            <h4 className="mt-2 font-semibold">Turkish Ports of Departure</h4>
            <p className="text-neutral-700">
              İzmir Alsancak • Aliağa Nemrut • Gemlik
            </p>
            <h4 className="mt-4 font-semibold">Typical Lead Times</h4>
            <p className="text-neutral-700">
              Production & packing: 10–20 business days • Ocean transit time
              depends on destination route.
            </p>
            <h4 className="mt-4 font-semibold">Minimum Order Quantities</h4>
            <p className="text-neutral-700">
              Blocks: 1 piece • Slabs: by bundle • Tiles: by crate or m²
            </p>
          </article>
        </div>
      </section>

      {/* USE CASE + H5 KEY TAKEAWAYS */}
      <section className="bg-neutral-50 py-12">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
            CIF Export in Action 
          </h2>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            A European distributor orders mixed containers of travertine tiles
            and custom copings. Majen produces, packs, books freight and
            insurance, then ships CIF to the destination port. The importer only
            manages local clearance and delivery—logistics burden is minimized
            while timelines stay predictable.
          </p>
          <h5 className="mt-6 text-lg font-semibold">
            Key Takeaways for CIF Travertine Export From Turkey
          </h5>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2 text-neutral-700">
            <li>End-to-end ocean logistics handled by Majen</li>
            <li>Freight + insurance included in pricing</li>
            <li>Ideal for slabs, tiles and mixed containers</li>
            <li>Importer handles local port charges & customs</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <QuestionsSection span="CIF Travertine Export" items={items}/>
      {/* RELATED LINKS */}
      <section className="max-w-[1200px] mx-auto px-5 py-10">
        <nav
          aria-label="Related links"
          className="text-sm text-neutral-600 text-center gap-3 flex items-center justify-center"
        >
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
        id="jsonld-cif-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "CIF Travertine Export From Turkey",
            description:
              "Majen exports travertine with CIF terms from Turkey. Process, documents, insurance, ports and timelines.",
            publisher: { "@type": "Organization", name: "Majen", url: "https://majen.com.tr" },
            mainEntityOfPage: "https://majen.com.tr/en/export/cif-travertine",
          }),
        }}
      />
      <Script
        id="jsonld-cif-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What does CIF include for travertine exports?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Ocean freight, cargo insurance, export documentation and origin handling up to the destination port.",
                },
              },
              {
                "@type": "Question",
                name: "Who handles local charges and customs at destination?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "The importer manages destination port fees, import duties/taxes and local delivery.",
                },
              },
              {
                "@type": "Question",
                name: "Is CIF suitable for mixed containers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. We frequently ship slabs, tiles and custom parts together if weight/volume allows.",
                },
              },
              {
                "@type": "Question",
                name: "Which documents are provided under CIF?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Commercial invoice, packing list, certificate of origin, export clearance and insurance policy; optional SGS inspection.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
