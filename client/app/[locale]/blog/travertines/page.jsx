// app/en/travertine/page.jsx
import Image from "next/image";
import Link from "next/link";
import QuestionsSection from "../../components/generalcomponent/QuestionsSection";
import { getTranslations } from "next-intl/server";
import TravertineBlog from "./components/TravertineBlog";

export const metadata = {
  title: "Travertine – Premium Turkish Travertine Supplier | Majen",
  description:
    "Premium quality Turkish Travertine direct from quarry. Tiles, slabs, blocks, pavers, mosaics. Multiple colors & finishes. Global export, fast lead times.",
  alternates: { canonical: "https://majen.com.tr/en/travertine" },
  openGraph: {
    type: "website",
    url: "https://majen.com.tr/en/travertine",
    title: "Travertine – Premium Turkish Travertine Supplier | Majen",
    description:
      "Turkish Travertine in tiles, slabs, blocks, pavers & mosaics. Colors: Ivory, Silver, Noce, Walnut and more. Finishes: Polished, Honed, Tumbled. Global shipping.",
    images: [{ url: "/assets/images/travertine/hero.jpg" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
};

export default async function Page({ params }) {
  const { locale } = await params;
        const isTR = locale === "tr";

         const t  = await getTranslations({ locale, namespace: "BlogPost.Questions" });

           const items = [
        { q: t("q1"), a: t("answer1") },
        { q: t("q2"), a: t("answer2") },
        { q: t("q3"), a: t("answer3") },
        { q: t("q4"), a: t("answer4") }
      ];


      

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Breadcrumb */}
      <div className="mx-auto w-[92%] max-w-[1160px] py-3 text-sm text-slate-500">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2">
          <Link href="/en" className="hover:underline">Home</Link>
          <span aria-hidden>›</span>
          <span>Travertine</span>
        </nav>
      </div>

      <TravertineBlog/>

      {/* SUPPLY & EXPORT */}
      <section id="supply" className="py-14">
        <div className="mx-auto grid w-[92%] max-w-[1160px] items-center gap-7 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Supply & Export from Turkey</h2>
            <p className="mt-2 text-slate-700">
              We supply travertine directly from Turkish quarries with strict grading and packaging standards. Our logistics team ships globally with optimized transit times and Incoterms (FOB, CIF, EXW) depending on destination.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              <li>Bulk & wholesale pricing</li>
              <li>Custom sizes and surface selections</li>
              <li>Crate and palletized packaging for safety</li>
            </ul>
          </div>
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold">Request Samples</h3>
            <p className="mt-2 text-slate-600">Sample boards available for colors and finishes. Lead time typically 3–7 days.</p>
            <Link href="#get-quote" className="mt-3 inline-block rounded-full bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800">Request Now</Link>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <QuestionsSection span="Blog Travertine" items={items} />

      {/* CTA */}
      <section id="get-quote" className="py-14">
        <div className="mx-auto w-[92%] max-w-[1400px]">
          <div className="grid items-center gap-3 rounded-2xl border border-slate-200 bg-indigo-50/40 p-6 md:grid-cols-[1fr_auto_auto]">
           <div className="flex flex-col">
             <h3 className="text-xl font-semibold">Get the Best Turkish Travertine for Your Project</h3>
            <p className="text-slate-600">Send us your required colors, sizes, finishes and destination. We’ll reply with pricing and lead times.</p>
           </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/en/contact" className="rounded-full bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800">Get a Quote</Link>
              <Link href="https://wa.me/" target="_blank" className="rounded-full border border-teal-700 px-5 py-3 font-semibold text-teal-700 hover:bg-teal-50">WhatsApp</Link>
              <Link href="mailto:info@majen.com.tr" className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-white">sales@majen.com.tr</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal nav */}
      <footer className="py-10">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <nav className="flex flex-wrap gap-3">
            {[
              ["/en/travertine/tiles", "Travertine Tiles"],
              ["/en/travertine/slabs", "Travertine Slabs"],
              ["/en/travertine/blocks", "Travertine Blocks"],
              ["/en/travertine/pavers", "Travertine Pavers"],
              ["/en/travertine/mosaics", "Travertine Mosaics"],
              ["/en/travertine/ivory", "Ivory Travertine"],
              ["/en/travertine/silver", "Silver Travertine"],
              ["/en/travertine/noce", "Noce Travertine"],
              ["/en/travertine/polished", "Polished Travertine"],
              ["/en/travertine/honed", "Honed Travertine"],
              ["/en/travertine/tumbled", "Tumbled Travertine"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="text-teal-700 hover:underline">{label}</Link>
            ))}
          </nav>
        </div>
      </footer>

      {/* JSON-LD (Breadcrumb + FAQ) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Travertine – Premium Turkish Travertine Supplier",
            url: "https://majen.com.tr/en/travertine",
            description:
              "Premium quality Turkish Travertine direct from quarry. Tiles, slabs, blocks, pavers, mosaics. Multiple colors and finishes. Global export.",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://majen.com.tr/en" },
                { "@type": "ListItem", position: 2, name: "Travertine", item: "https://majen.com.tr/en/travertine" },
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What makes Turkish Travertine unique?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Turkey offers high-density travertine with rich color variety such as Ivory, Silver and Noce. Competitive pricing and strong supply chain make it ideal for global projects.",
                },
              },
              {
                "@type": "Question",
                name: "Where is travertine mostly used?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Travertine is widely used for flooring, wall cladding, facades, pool surrounds, bathrooms and gardens.",
                },
              },
              {
                "@type": "Question",
                name: "What are the differences between filled and unfilled travertine?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Filled travertine has pores filled with resin or cement for a smoother surface, while unfilled keeps its natural cavities for a rustic, textured appearance.",
                },
              },
              {
                "@type": "Question",
                name: "How do I maintain travertine?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Seal the surface periodically, clean with pH-neutral products, and avoid harsh acids. Outdoor pavers may require re-sealing depending on climate and usage.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
