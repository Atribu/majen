"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import bannerImg from "@/public/images/homepage/kesim.webp"
import bannerImg2 from "@/public/images/homepage/antikarkaplan2.webp"
import tilesIvory from "@/public/images/tiles/Ivorykesim.webp";
import tilesLight from "@/public/images/homepage/kesim.webp";
import tilesAntik from "@/public/images/tiles/antikokesim.webp";
import QuestionsSection from "@/app/[locale]/components/generalcomponent/QuestionsSection";

export default function TravertineTilesPage() {
  // --------- CONTENT DATA (edit safely) ---------------------------------
  const meta = {
    title:
      "Travertine Tiles | Turkish Ivory, Light & Antico – Finishes, Uses, FAQ",
    description:
      "Explore Turkish Travertine Tiles in Ivory, Light & Antico. Compare polished, honed & tumbled finishes, see specs, gallery, installation tips and FAQs.",
    canonical: "https://majen.com.tr/en/blog/travertine-tiles",
  };

  const breadcrumbs = [
    { name: "Home", href: "/en" },
    { name: "Blog", href: "/en/blog" },
    { name: "Travertines", href: "/en/blog/travertines" },
    { name: "Travertine Tiles", href: "/en/blog/travertine-tiles" },
  ];

  const colors = useMemo(
    () => [
      {
        title: "Ivory Travertine Tiles",
        href: "/en/blog/travertine-tiles/ivory",
        img: "/images/tiles/Ivorykesim.webp",
        alt: "Ivory travertine tiles used on a bright bathroom floor",
        blurb:
          "Bright, elegant and versatile; ideal for bathrooms, kitchens and luxury interiors where a clean, spacious feel is desired.",
      },
      {
        title: "Light Travertine Tiles",
        href: "/en/blog/travertine-tiles/light",
        img: "/images/homepage/kesim.webp",
        alt: "Light beige travertine tiles in a modern living room",
        blurb:
          "Warm beige tone that blends with both modern and classic schemes; perfect for large-format floors and wall cladding.",
      },
      {
        title: "Antico Travertine Tiles",
        href: "/en/blog/travertine-tiles/antico",
        img: "/images/tiles/antikokesim.webp",
        alt: "Antico travertine tiles with rustic texture",
        blurb:
          "Earthy, antique character suited to Mediterranean aesthetics; great for courtyards, feature walls and outdoor transitions.",
      },
    ],
    []
  );

  const finishes = useMemo(
    () => [
      {
        title: "Polished",
        href: "/en/blog/travertine-tiles/polished",
        img: "/images/blog/polished.jpg",
        alt: "Polished travertine tile reflecting light",
        blurb:
          "Glossy, reflective surface that highlights veining—best for luxury interiors and statement areas.",
      },
      {
        title: "Honed",
        href: "/en/blog/travertine-tiles/honed",
        img: "/images/blog/honed.jpg",
        alt: "Honed travertine tile with matte finish",
        blurb:
          "Smooth, matte surface offering a contemporary look with comfortable slip performance.",
      },
      {
        title: "Tumbled",
        href: "/en/blog/travertine-tiles/tumbled",
        img: "/images/blog/Tumbled.webp",
        alt: "Tumbled travertine tile with rounded edges",
        blurb:
          "Rounded edges and antique texture for rustic style—popular for patios and pool surrounds.",
      },
      {
        title: "Brushed",
        href: "/en/blog/travertine-tiles/brushed",
        img: "/images/blog/Brushed.jpg",
        alt: "Brushed travertine tile texture close-up",
        blurb:
          "Subtly textured surface that adds grip and visual warmth for indoor/outdoor continuity.",
      },
    ],
    []
  );

  const gallery = [
    {
      src: "/images/homepage/Light/Lighttasarim1.webp",
      alt: "Travertine tile floor in a sunlit kitchen",
      w: 1280,
      h: 853,
    },
    {
      src: "/images/homepage/Ivory/Ivorytasarim1.webp",
      alt: "Ivory travertine bathroom with walk-in shower",
      w: 1280,
      h: 853,
    },
    {
      src: "/images/homepage/Antik/Antiktasarim4.webp",
      alt: "Outdoor terrace with tumbled travertine tiles",
      w: 1280,
      h: 853,
    },
  ];

  const faq = [
    {
      q: "Are travertine tiles good for flooring?",
      a: "Yes. Travertine tiles are durable and handle daily foot traffic well. With proper sealing and care, they offer long service life and timeless aesthetics in residential and commercial spaces.",
    },
    {
      q: "Which finishes work best for bathrooms?",
      a: "Honed and tumbled finishes are popular in bathrooms thanks to their slip comfort and natural feel, while polished is preferred for dry vanity areas and walls.",
    },
    {
      q: "Do travertine tiles require sealing?",
      a: "We recommend sealing on installation and re-sealing every 12–24 months depending on use. This helps prevent staining and makes regular cleaning easier.",
    },
    {
      q: "Can I use travertine tiles outdoors?",
      a: "Absolutely. Tumbled or brushed finishes are common for patios, pool decks and pathways, offering grip and weather resistance when installed correctly.",
    },
  ];

  // --------- JSON-LD SCHEMA ---------------------------------------
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Travertine Tiles – Colors, Finishes, Uses & FAQ',
    description: meta.description,
    mainEntityOfPage: meta.canonical,
    author: { '@type': 'Organization', name: 'Majen Natural Stone' },
    publisher: {
      '@type': 'Organization',
      name: 'Majen',
      logo: { '@type': 'ImageObject', url: 'https://majen.com.tr/logo.png' },
    },
    inLanguage: 'en',
  } 
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  } 

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.name,
      item: `https://majen.com.tr${b.href}`,
    })),
  } 

  // --------- REUSABLE UI ------------------------------------------
  const Container = ({ children }) => (
    <div className="mx-auto max-w-6xl px-4">{children}</div>
  );

  const Section = ({ id, title, children }) => (
    <section id={id} className="scroll-mt-28 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-6 text-neutral-700 leading-relaxed">{children}</div>
    </section>
  );

  const Card = ({ href, img, alt, title, blurb }) => (
    <Link
      href={href}
      className="group rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-44 w-full">
        <Image src={img} alt={alt} fill className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold group-hover:underline underline-offset-4">
          {title}
        </h3>
        <p className="mt-2 text-sm text-neutral-700">{blurb}</p>
        <span className="mt-3 inline-block text-sm">Read more →</span>
      </div>
    </Link>
  );

      const items = [
      { q: "", a: "" },
    { q: "", a: "" },
       { q: "", a: "" },
     { q: "", a: "" },
      
      
    ];

  // --------- PAGE --------------------------------------------------
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        {/* Open Graph / Twitter */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={meta.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
      </Head>

      {/* BREADCRUMBS */}
      <div className="bg-neutral-50 border-b">
        <Container>
          <nav className="text-sm py-3 flex flex-wrap gap-2">
            {breadcrumbs.map((b, i) => (
              <span key={b.href} className="flex items-center gap-2">
                {i > 0 && <span className="text-neutral-400">/</span>}
                <Link href={b.href} className="hover:underline">
                  {b.name}
                </Link>
              </span>
            ))}
          </nav>
        </Container>
      </div>

      {/* HERO */}
      <header className="relative">
        <div className="relative h-60 md:h-80">
          <Image
            src={bannerImg}
            alt="Travertine tile close-up hero"
            fill
            className="object-contain"
            priority
          />
        </div>
        <Container>
          <div className="py-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Travertine Tiles
            </h1>
            <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-neutral-700">
              Travertine tiles are among the most versatile natural stone solutions for floors and walls. Combining durability, unique veining and timeless style, Turkish travertine tiles suit modern and classic designs—from bright Ivory to rustic Antico—with finishes tailored to performance and aesthetics.
            </p>
          </div>
        </Container>
      </header>

      {/* LAYOUT: TOC + CONTENT */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* TOC */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 h-max rounded-2xl border p-5">
            <h2 className="text-base font-semibold">On this page</h2>
            <nav className="mt-3 space-y-2 text-sm">
              <a href="#colors" className="block hover:underline">Colors</a>
              <a href="#finishes" className="block hover:underline">Finishes</a>
              <a href="#applications" className="block hover:underline">Applications</a>
              <a href="#specs" className="block hover:underline">Specifications</a>
              <a href="#install" className="block hover:underline">Installation & Care</a>
              <a href="#proscons" className="block hover:underline">Pros & Cons</a>
              <a href="#gallery" className="block hover:underline">Gallery</a>
              <a href="#faq" className="block hover:underline">FAQ</a>
            </nav>
          </aside>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-9">
            {/* COLORS */}
            <Section id="colors" title="Travertine Tile Colors">
              <p>
                Travertine tiles come in natural shades that shape the feel of a space. Ivory, Light and Antico are our most requested colors, each offering a distinct mood—from airy minimalism to earthy, antique character. Explore each color guide for best use cases, sample photos and pairing tips.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {colors.map((c) => (
                  <Card key={c.href} {...c} />
                ))}
              </div>
            </Section>

            {/* FINISHES */}
            <Section id="finishes" title="Travertine Tile Finishes">
              <p>
                Finish defines both look and performance. Polished reflects light and elevates veining; honed delivers a smooth, modern feel; tumbled adds rustic charm; brushed provides gentle texture and grip. Dive into dedicated finish pages to select the right balance of style and safety.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {finishes.map((f) => (
                  <Card key={f.href} {...f} />
                ))}
              </div>
            </Section>

            {/* APPLICATIONS */}
            <Section id="applications" title="Applications">
              <p>
                Travertine tiles perform across residential and commercial projects. Popular uses include indoor flooring, bathroom and kitchen walls, backsplashes and outdoor terraces or pool decks. Select color and finish by slip comfort, maintenance expectations and design intent.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="rounded-2xl border p-5">
                  <h3 className="text-base font-semibold">Flooring</h3>
                  <p className="mt-2">Durable, timeless surfaces for living rooms, corridors and hotel lobbies. Pairs well with underfloor heating.</p>
                  <Link href="/en/blog/travertine-flooring" className="mt-3 inline-block underline">Learn more</Link>
                </div>
                <div className="rounded-2xl border p-5">
                  <h3 className="text-base font-semibold">Bathrooms</h3>
                  <p className="mt-2">Spa‑like warmth and texture in showers, vanities and feature walls. Choose honed or tumbled for comfort.</p>
                  <Link href="/en/blog/travertine-bathroom" className="mt-3 inline-block underline">Learn more</Link>
                </div>
                <div className="rounded-2xl border p-5">
                  <h3 className="text-base font-semibold">Kitchens & Outdoors</h3>
                  <p className="mt-2">Backsplashes and counters indoors; patios and pool decks outside with brushed/tumbled textures for grip.</p>
                  <Link href="/en/blog/travertine-kitchen" className="mt-3 inline-block underline">Learn more</Link>
                </div>
              </div>
            </Section>

            {/* SPECS TABLE */}
            <Section id="specs" title="Specifications">
              <p>
                Typical sizes include 300×300, 400×400, 600×600 mm and rectangular planks; custom cuts available upon request. Standard thickness is 10–12 mm for interiors and 30 mm for exterior pavers. Water absorption averages 0.4–0.8%, with compressive strength suitable for high‑traffic areas.
              </p>
              <div className="overflow-auto mt-4">
                <table className="min-w-[640px] w-full text-sm border rounded-2xl overflow-hidden">
                  <thead>
                    <tr className="bg-neutral-50 text-left">
                      <th className="p-3">Property</th>
                      <th className="p-3">Typical Value</th>
                      <th className="p-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3">Thickness</td>
                      <td className="p-3">10–12 mm (indoor), 30 mm (outdoor)</td>
                      <td className="p-3">Custom options available</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">Absorption</td>
                      <td className="p-3">0.4–0.8%</td>
                      <td className="p-3">Seal on install + 12–24 months</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">Finish options</td>
                      <td className="p-3">Polished / Honed / Tumbled / Brushed</td>
                      <td className="p-3">Match slip needs to area</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">Standard sizes</td>
                      <td className="p-3">300, 400, 600 mm squares; planks</td>
                      <td className="p-3">Cut‑to‑size on demand</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* HOW-TO */}
            <Section id="install" title="Installation & Care">
              <p>
                Use a cement‑based adhesive on stable substrates, with movement joints as per standards. Back‑butter large formats, grout with suitable fillers, then seal after curing. Clean with pH‑neutral agents, avoid acids; re‑seal every 12–24 months depending on exposure and traffic.
              </p>
            </Section>

            {/* PROS & CONS */}
            <Section id="proscons" title="Pros & Cons">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="rounded-2xl border p-5">
                  <h3 className="text-base font-semibold">Pros</h3>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Timeless natural look adds property value</li>
                    <li>Multiple colors and finishes for every design</li>
                    <li>Durable, repairable and replaceable units</li>
                  </ul>
                </div>
                <div className="rounded-2xl border p-5">
                  <h3 className="text-base font-semibold">Cons</h3>
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>Requires sealing and pH‑neutral cleaning</li>
                    <li>Polished finish may be slippery when wet</li>
                    <li>Natural variation needs batch coordination</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* GALLERY */}
            <Section id="gallery" title="Gallery">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((g) => (
                  <div key={g.src} className="relative h-56 w-full rounded-2xl overflow-hidden">
                    <Image src={g.src} alt={g.alt} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </Section>

            {/* FAQ */}
           <QuestionsSection span="Blog Travertine Tiles" items={items}/>

            {/* RELATED LINKS */}
            <Section id="related" title="Related Guides">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <Link href="/en/blog/travertine-tiles/ivory" className="underline">
                    Ivory Travertine Tiles
                  </Link>
                </li>
                <li>
                  <Link href="/en/blog/travertine-tiles/honed" className="underline">
                    Honed Travertine Tiles
                  </Link>
                </li>
                <li>
                  <Link href="/en/blog/travertines" className="underline">
                    Travertine Blog Hub
                  </Link>
                </li>
              </ul>
            </Section>

            {/* CTA */}
            <div className="my-10 rounded-2xl border p-6 md:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold">Request Samples or Pricing</h2>
                <p className="mt-2 text-sm text-neutral-700">
                  Tell us color, finish, size and quantity. Our team will confirm availability, lead times and logistics terms for your project.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/en/contact" className="px-4 py-2 rounded-xl border hover:bg-neutral-50">
                  Contact Us
                </Link>
                <Link href="/en/catalog" className="px-4 py-2 rounded-xl border hover:bg-neutral-50">
                  Download Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}