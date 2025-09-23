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
      {/* <section className="bg-gradient-to-b from-teal-50/80 to-transparent py-10">
        <div className="mx-auto grid w-[92%] max-w-[1160px] items-center gap-7 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500">Natural Stone • Quarry Direct</span>
            <h1 className="mt-3 text-3xl leading-tight md:text-5xl font-semibold">
              Travertine – Premium Quality Turkish Travertine Supplier
            </h1>
            <p className="mt-3 text-slate-600">
              Architectural-grade travertine from Turkey in tiles, slabs, blocks, pavers and mosaics. Multiple colors and finishes. Reliable export partner with fast lead times.
            </p>
            <div className="mt-4 flex flex-wrap gap-3" role="group" aria-label="Primary actions">
              <Link href="#get-quote" className="rounded-full bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800">Get a Quote</Link>
              <Link href="/en/contact" className="rounded-full border border-teal-700 px-5 py-3 font-semibold text-teal-700 hover:bg-teal-50">Contact</Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-4">
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 min-w-[160px]"><strong>Direct Quarry</strong><br/><span className="text-slate-500">Stable supply</span></div>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 min-w-[160px]"><strong>Global Shipping</strong><br/><span className="text-slate-500">40+ countries</span></div>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 min-w-[160px]"><strong>Color Variety</strong><br/><span className="text-slate-500">Ivory • Silver • Noce</span></div>
            </div>
          </div>
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl">
            <Image src="/images/homepage/antikarkaplan4.webp" alt="Premium Turkish Travertine tiles and slabs" fill priority className="object-cover"/>
          </div>
        </div>
      </section>

     
      <section id="about" className="py-14">
        <div className="mx-auto grid w-[92%] max-w-[1160px] items-start gap-7 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <h2 id="what-is-travertine" className="text-2xl font-semibold">What is Travertine?</h2>
            <p className="mt-2 text-slate-700">
              Travertine is a sedimentary natural stone formed by mineral springs. It is prized for its <strong>durability, thermal comfort and timeless elegance</strong>. Thanks to its porous structure, it can be finished from rustic to contemporary looks.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              <li>Formats: <Link href="/travertines/tiles">tiles</Link>, <Link href="/travertines/slabs">slabs</Link>, blocks, pavers, special design</li>
              <li>Finishes: polished, honed, tumbled, brushed, filled / unfilled</li>
              <li>Colors: ivory, silver, walnut/noce, yellow, red, classic</li>
            </ul>
          </div>
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold">Why Choose <em>Turkish</em> Travertine?</h3>
            <p className="mt-2 text-slate-600">Turkey is a world leader in travertine extraction and export, offering consistent quality and competitive pricing for large and boutique projects.</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              <li>High density, rich color selections</li>
              <li>Cost-effective sourcing and logistics</li>
              <li>Strict quality control & packaging</li>
            </ul>
          </aside>
        </div>
      </section>

      
      <section id="types" className="py-14">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <header className="mb-3">
            <h2 className="text-2xl font-semibold">Types of Travertine We Offer</h2>
            <p className="text-slate-600">Explore formats tailored for interior and exterior applications.</p>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {[
              { href: "/en/travertine/tiles", title: "Travertine Tiles", img: "/images/homepage/kesim.webp", desc: "Ideal for flooring and bathrooms. Standard sizes 30×60, 60×60, 60×90." },
              { href: "/en/travertine/slabs", title: "Travertine Slabs", img: "/images/homepage/slabler2.webp", desc: "For countertops and large surfaces. Thickness 2–3 cm; custom cuts available." },
              { href: "/en/travertine/blocks", title: "Travertine Blocks", img: "/images/homepage/Ivoryblok.webp", desc: "Quarry-direct blocks for bespoke production and projects." },
              { href: "/en/travertine/pavers", title: "Travertine Pavers", img: "/images/tiles/Ivorykesim.webp", desc: "Slip-resistant outdoor solution for pools, patios and gardens." },
              { href: "/en/travertine/mosaics", title: "Travertine Mosaics", img: "/images/homepage/antikarkaplan4.webp", desc: "Decorative patterns for walls, showers and feature areas." },
            ].map((p) => (
              <article key={p.title} className="flex flex-col gap-3">
                <Link href={p.href}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200">
                    <Image src={p.img} alt={p.title} fill className="object-cover" />
                  </div>
                </Link>
                <h3 className="text-lg font-semibold"><Link href={p.href} className="hover:underline">{p.title}</Link></h3>
                <p className="text-sm text-slate-600">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

     
      <section id="colors-finishes" className="py-14">
        <div className="mx-auto flex flex-col w-[92%] max-w-[1160px] gap-7 ">
          <div>
            <h2 className="text-2xl font-semibold">Travertine Colors</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { src: "/images/homepage/Ivory/ivory.webp", alt: "Ivory Travertine", cap: "Ivory Travertine" },
                { src: "/images/homepage/Light/light.webp", alt: "Light Travertine", cap: "Light Travertine" },
                { src: "/images/homepage/antik/antik.webp", alt: "Antiko Travertine", cap: "Antiko" },
              
              ].map((c) => (
                <figure key={c.alt} className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                    <Image src={c.src} alt={c.alt} fill className="object-cover" />
                  </div>
                  <figcaption className="mt-2 text-center text-sm text-slate-600">{c.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Finishes</h2>
            <ul className="mt-3 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <li><strong>Polished</strong> – glossy and reflective for premium interiors</li>
              <li><strong>Honed</strong> – smooth matte finish, versatile use</li>
              <li><strong>Tumbled</strong> – aged look with soft edges</li>
              <li><strong>Brushed</strong> – textured feel for grip and character</li>
              <li><strong>Filled / Unfilled</strong> – choose surface porosity as needed</li>
            </ul>
          </div>
        </div>
      </section>

      
      <section id="applications" className="py-14">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <h2 className="text-2xl font-semibold">Applications</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              { t: "Flooring", d: "Residential and commercial high-traffic zones." },
              { t: "Wall Cladding", d: "Interior & exterior vertical surfaces." },
              { t: "Facades", d: "Durable, elegant building envelopes." },
              { t: "Pools & Gardens", d: "Non-slip outdoor pavers and copings." },
              { t: "Bathrooms", d: "Moisture-friendly aesthetics for wet areas." },
              { t: "Kitchens", d: "Countertops and splashbacks with character." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold">{f.t}</h3>
                <p className="text-slate-600">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}


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
