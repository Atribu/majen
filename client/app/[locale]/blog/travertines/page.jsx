// app/en/travertine/page.jsx
import Image from "next/image";
import Link from "next/link";
import QuestionsSection from "../../components/generalcomponent/QuestionsSection";
import { getTranslations } from "next-intl/server";
import TravertineBlog from "./components/TravertineBlog";

export const metadata = {
  title: "Travertine from Turkey | Complete Guide to Turkish Travertines",
  description:
    "Discover Turkish travertines: blocks, slabs, tiles & special designs. Learn types, colors & export details. Supplier guide for global buyers.",
  alternates: { canonical: "https://www.majen.com.tr/en/blog/travertines" },
  openGraph: {
    type: "website",
    url: "https://www.majen.com.tr/en/blog/travertines",
    title: "Travertine from Turkey | Complete Guide to Turkish Travertines",
    description:
      "Turkish travertine types, colors, finishes, applications and export (FOB/CIF/EXW).",
    images: [{ url: "/assets/images/travertine/hero.jpg" }],
  },
   twitter: {
    card: "summary_large_image",
    title: "Travertine from Turkey | Complete Guide",
    description: "Types, finishes, applications and export methods.",
    images: ["https://www.majen.com.tr/media/travertine-hero.webp"],
    creator: "@majenstone" // varsa Twitter handle burada ekleyebilirsin
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
        { q: t("q4"), a: t("answer4") },
          { q: t("q5"), a: t("answer5") },
            { q: t("q6"), a: t("answer6") }
      ];


        const baseUrl = "https://www.majen.com.tr";
  const path = `/${locale}/blog/travertines`; // bu sayfanın kanonik yolu
  const canonicalUrl = `${baseUrl}${path}`;

  // FAQ'ı items'tan üret (verdiğin 4 soru yapısına da uyumlu)
  const faqEntities = items.slice(0, 4).map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  }));

  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${canonicalUrl}#post`,
      headline:
        "Travertine from Turkey | Complete Guide to Turkish Travertines",
      description:
        "Guide to Turkish travertine: types, colors, finishes, applications and export (FOB/CIF/EXW).",
      inLanguage: locale,
      mainEntityOfPage: canonicalUrl,
      author: { "@type": "Organization", name: "Majen" },
      publisher: {
        "@type": "Organization",
        name: "Majen",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/media/logo.png`,
        },
      },
      image: `${baseUrl}/media/travertine-hero.webp`,
      datePublished: "2025-01-15",
      dateModified: "2025-09-25",
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqEntities,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/${locale}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/${locale}/blog` },
        { "@type": "ListItem", position: 3, name: "Travertine", item: canonicalUrl },
      ],
    },
  ];


  return (
    <main className="min-h-screen bg-white text-slate-900">
    
      <TravertineBlog/>

      {/* SUPPLY & EXPORT */}
      <section id="supply" className="py-14">
        <div className="mx-auto grid w-[92%] max-w-[1160px] items-center gap-7 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Supply & Export from Turkey</h2>
            <p className="mt-2 text-slate-700">
              We supply travertine directly from Turkish quarries with strict grading and packaging standards. Our logistics team ships globally with optimized transit times and Incoterms <Link href="/howweexport" className="hover:text-teal-700">(FOB, CIF, EXW)</Link> depending on destination.
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
              <Link href="/en/contactus" className="rounded-full bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800">Get a Quote</Link>
              <Link href="https://wa.me/" target="_blank" className="rounded-full border border-teal-700 px-5 py-3 font-semibold text-teal-700 hover:bg-teal-50">WhatsApp</Link>
              <Link href="mailto:info@majen.com.tr" className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-white">info@majen.com.tr</Link>
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
            "@graph": graph,
          }),
        }}
      />
    </main>
  );
}
