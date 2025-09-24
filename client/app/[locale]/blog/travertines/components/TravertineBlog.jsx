"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function TravertineBlog() {
  // DATA ------------------------------------------------------------
  const productTypes = useMemo(
    () => [
      {
        title: "Travertine Tiles",
        slug: "/blog/travertines/travertine-tiles",
        img: "/images/homepage/kesim.webp",
        alt: "Travertine tiles close-up",
        excerpt:
          "Travertine tiles are widely used in flooring and wall coverings, combining natural aesthetics with durability. Available in multiple finishes, they suit modern and traditional designs in residential and commercial spaces.",
      },
      {
        title: "Travertine Slabs",
        slug: "/blog/travertines/travertine-slabs",
        img: "/images/homepage/slabler2.webp",
        alt: "Large travertine slabs",
        excerpt:
          "Travertine slabs are ideal for large-scale projects requiring seamless surfaces like countertops and facades. Their wide dimensions highlight natural patterns, delivering a luxurious look for interiors and architecture.",
      },
      {
        title: "Travertine Blocks",
        slug: "/blog/travertines/travertine-blocks",
        img: "/images/homepage/Ivoryblok.webp",
        alt: "Travertine quarry blocks",
        excerpt:
          "Travertine blocks are the raw form extracted from quarries, then cut and processed into tiles or slabs. Valued by manufacturers and exporters, they are the base material for large projects and custom stonework.",
      },
      {
        title: "Travertine Pavers",
        slug: "/blog/travertines/travertine-pavers",
        img: "/images/tiles/Ivorykesim.webp",
        alt: "Travertine pavers by a pool",
        excerpt:
          "Travertine pavers are durable outdoor solutions for paths, driveways, patios, and pool decks. Their slip-resistant surface and weather endurance make them a preferred choice for landscaping and exterior projects.",
      },
      {
        title: "Travertine Mosaics",
        slug: "/blog/travertines/travertine-mosaics",
        img: "/images/homepage/antikarkaplan4.webp",
        alt: "Travertine mosaic wall",
        excerpt:
          "Travertine mosaics combine small stone pieces into decorative patterns. Popular in bathrooms, kitchens, and feature walls, they add texture and style while maintaining the durability of natural stone.",
      },
    ],
    []
  );

  const finishes = useMemo(
    () => [
      {
        title: "Polished Travertine",
        slug: "/blog/travertines/polished-travertine",
        img: "/images/blog/polished.jpg",
        alt: "Polished travertine surface",
        excerpt:
          "Polished travertine offers a glossy, reflective surface ideal for luxury interiors. It enhances the stone’s natural patterns while creating a modern, elegant atmosphere in residential and commercial spaces.",
      },
      {
        title: "Honed Travertine",
        slug: "/blog/travertines/honed-travertine",
        img: "/images/blog/honed.jpg",
        alt: "Honed travertine surface",
        excerpt:
          "Honed travertine has a smooth, matte surface that provides a softer, more natural look. Perfect for indoor floors, walls, and countertops where a subtle and contemporary appearance is preferred.",
      },
      {
        title: "Tumbled Travertine",
        slug: "/blog/travertines/tumbled-travertine",
        img: "/images/blog/Tumbled.webp",
        alt: "Tumbled travertine edges",
        excerpt:
          "Tumbled travertine features a weathered, rustic texture that adds character to spaces. Common in outdoor areas, patios, and pool surrounds, it creates a classic Mediterranean or antique style.",
      },
      {
        title: "Brushed Travertine",
        slug: "/blog/travertines/brushed-travertine",
        img: "/images/blog/Brushed.jpg",
        alt: "Brushed travertine texture",
        excerpt:
          "Brushed travertine has a gently textured surface achieved through special treatment. Suitable for both interior and exterior designs, it offers added grip and visual warmth.",
      },
      {
        title: "Filled Travertine",
        slug: "/blog/travertines/filled-travertine",
        img: "/images/blog/filled.jpg",
        alt: "Filled travertine pores",
        excerpt:
          "Filled travertine has natural pores sealed with resin or cement, creating a smoother surface. Often paired with polished finishes for modern interiors where a clean and refined look is desired.",
      },
      {
        title: "Unfilled Travertine",
        slug: "/blog/travertines/unfilled-travertine",
        img: "/images/blog/unfilled.jpg",
        alt: "Unfilled travertine pores",
        excerpt:
          "Unfilled travertine retains its natural pores and raw texture. Preferred for traditional or outdoor settings where authenticity and a rugged, natural aesthetic are desired.",
      },
    ],
    []
  );

  const colors = useMemo(
    () => [
      {
        title: "Ivory Travertine",
        slug: "/blog/travertines/ivory-travertine",
        img: "/images/homepage/Ivory/ivory.webp",
        alt: "Ivory travertine tile",
        excerpt:
          "Ivory travertine is bright and elegant, a favorite for luxury interiors. Its light shade creates a spacious, airy feeling, ideal for bathrooms, kitchens, and pool surroundings across contemporary projects.",
      },
      {
        title: "Light Travertine",
        slug: "/blog/travertines/light-travertine",
        img: "/images/homepage/Light/light.webp",
        alt: "Light beige travertine",
        excerpt:
          "Light travertine offers warm beige tones that blend seamlessly with modern and classic schemes. Versatile for flooring, wall cladding, and outdoor landscaping across residential and commercial spaces.",
      },
      {
        title: "Antico Travertine",
        slug: "/blog/travertines/antico-travertine",
        img: "/images/homepage/antik/antik.webp",
        alt: "Antico travertine close-up",
        excerpt:
          "Antico travertine features rich, earthy hues with an antique effect. Perfect for rustic designs and Mediterranean-style architecture, adding timeless character indoors and outdoors.",
      },
    ],
    []
  );

  const applications = useMemo(
    () => [
      {
        title: "Travertine Flooring",
        slug: "/blog/travertines/travertine-flooring",
          img: "/images/homepage/Light/lighttasarim3.webp",
        alt: "Travertine floor detail",
        excerpt:
          "Travertine flooring is prized for durability and natural beauty. With varied finishes and colors, it enhances modern and classic interiors and withstands daily use in homes and commercial spaces.",
      },
      {
        title: "Travertine Cladding",
        slug: "/blog/travertines/travertine-cladding",
        img: "/images/homepage/Light/lighttasarim4.webp",
        alt: "Travertine wall cladding",
        excerpt:
          "Travertine cladding adds elegance to walls and facades, delivering natural insulation and timeless style. A popular choice for residential projects and commercial architecture alike.",
      },
      {
        title: "Travertine Facade",
        slug: "/blog/travertines/travertine-facade",
        img: "/images/homepage/Antik/Antiktasarim4.webp",
        alt: "Building facade with travertine",
        excerpt:
          "Travertine facades create strong, stylish exteriors. Weather resistance and natural variation make them ideal for modern buildings and restoration work seeking authentic stone character.",
      },
      {
        title: "Travertine Bathroom",
        slug: "/blog/travertines/travertine-bathroom",
          img: "/images/homepage/Ivory/Ivorytasarim1.webp",
        alt: "Bathroom with travertine",
        excerpt:
          "Travertine bathrooms evoke luxury and calm. Used in tiles, mosaics, and vanity tops, the stone brings spa-like warmth and texture to contemporary and classic spaces.",
      },
      {
        title: "Travertine Kitchen",
        slug: "/blog/travertines/travertine-kitchen",
       img: "/images/homepage/Antik/Antiktasarim2.webp",
        alt: "Kitchen with travertine surfaces",
        excerpt:
          "In kitchens, travertine works for countertops, backsplashes, and floors. Its natural tones pair beautifully with wood, metal, and minimalist cabinetry for enduring design.",
      },
      {
        title: "Travertine Pool",
        slug: "/blog/travertines/travertine-pool",
        img: "/images/homepage/Ivory/Ivorytasarim2.webp",
        alt: "Pool deck with travertine",
        excerpt:
          "Travertine pool surrounds are slip-resistant, heat-friendly, and refined. They provide a safe, elegant solution for outdoor leisure areas and resort-style landscapes.",
      },
    ],
    []
  );

  const business = useMemo(
    () => [
      {
        title: "Travertine Turkey",
        slug: "/blog/travertines/travertine-turkey",
         img: "/images/homepage/antikoarkplan.webp",
        alt: "Travertine quarry in Turkey",
        excerpt:
          "Travertine Turkey is synonymous with quality and scale. Vast reserves and skilled craftsmanship position the country as a top global source for natural stone products.",
      },
      {
        title: "Turkish Travertine",
        slug: "/blog/travertines/turkish-travertine",
        img: "/images/homepage/antikoarkplan.webp",
        alt: "Turkish travertine close-up",
        excerpt:
          "Turkish travertine is globally recognized for color diversity and durability. Exported to major markets, it’s a leading material for construction and design projects worldwide.",
      },
      {
        title: "Travertine Quarry",
        slug: "/blog/travertines/travertine-quarry",
        img: "/images/homepage/tab2.webp",
        alt: "Travertine quarry blocks",
        excerpt:
          "Travertine quarries in Turkey produce high-quality blocks at scale. These raw materials are processed into tiles, slabs, and custom products for global distribution.",
      },
      {
        title: "Travertine Supplier",
        slug: "/blog/travertines/travertine-supplier",
        img: "/images/homepage/antikoarkplan.webp",
        alt: "Warehouse of travertine tiles",
        excerpt:
          "A travertine supplier delivers ready-to-use tiles and slabs to buyers worldwide. Reliable partners ensure consistent quality assurance and on-time delivery.",
      },
      {
        title: "Travertine Exporter",
        slug: "/blog/travertines/travertine-exporter",
        img: "/images/homepage/antikoarkplan.webp",
        alt: "Container shipping travertine",
        excerpt:
          "Travertine exporters connect Turkish stone with international markets, managing logistics, documentation, and quality control throughout the supply chain.",
      },
      {
        title: "Travertine Manufacturer",
        slug: "/blog/travertines/travertine-manufacturer",
         img: "/images/homepage/antikoarkplan.webp",
        alt: "Factory processing travertine slabs",
        excerpt:
          "Travertine manufacturers process raw blocks into finished products with advanced machinery. Precision cutting, polishing, and customization meet project demands.",
      },
      {
        title: "Travertine Distributor",
        slug: "/blog/travertines/travertine-distributor",
         img: "/images/homepage/antikoarkplan.webp",
        alt: "Distribution center with stone pallets",
        excerpt:
          "Travertine distributors supply natural stone to contractors, retailers, and wholesalers, ensuring availability and after-sales support across regions.",
      },
    ],
    []
  );

  // HELPERS ---------------------------------------------------------
  const Section = ({ id, title, intro, children }) => (
    <section id={id} className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        <Link href={`#${id}`} className="text-sm underline underline-offset-4">
          #
        </Link>
      </div>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-neutral-700">
          {intro}
        </p>
      )}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );

  const Card = ({ title, slug, img, alt, excerpt }) => (
    <article className="group rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={slug} className="block">
        <div className="relative h-48 w-full">
          <Image src={img} alt={alt} fill className="object-cover" />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold group-hover:underline underline-offset-4">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">{excerpt}</p>
          <span className="mt-4 inline-block text-sm font-medium">Read more →</span>
        </div>
      </Link>
    </article>
  );

  // RENDER ----------------------------------------------------------
  return (
    <main className="pt-1 md:pt-5 lg:pt-14">
      {/* HERO */}
      <header className="relative isolate">
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Travertine</h1>
          <p className="mt-4 max-w-3xl text-base md:text-lg leading-relaxed text-neutral-700">
            Travertine is one of the most sought-after natural stones in architecture and design, valued for its durability, unique patterns, and timeless beauty. This blog explores product types, finishes, colors, applications, and the Turkish supply chain — guiding you from specification to sourcing.
          </p>
        </div>
        {/* Decorative banner image */}
        <div className="relative h-56 md:h-72 ">
          <Image
            src="/images/homepage/antikarkaplan4.webp"
            alt="Travertine hero image"
            fill
            className="object-cover opacity-95"
            priority
          />
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap gap-3 text-sm">
          <a href="#types" className="px-3 py-1 rounded-full border hover:bg-neutral-50">Product Types</a>
          <a href="#finishes" className="px-3 py-1 rounded-full border hover:bg-neutral-50">Finishes</a>
          <a href="#colors" className="px-3 py-1 rounded-full border hover:bg-neutral-50">Colors</a>
          <a href="#applications" className="px-3 py-1 rounded-full border hover:bg-neutral-50">Applications</a>
          <a href="#business" className="px-3 py-1 rounded-full border hover:bg-neutral-50">Supply &amp; Business</a>
        </div>
      </nav>

      {/* PRODUCT TYPES */}
      <Section
        id="types"
        title="Travertine Product Types"
        intro="Travertine can be processed into different products to meet design and construction needs. From tiles and slabs to blocks, pavers, and mosaics, each serves a specific purpose—delivering versatile, elegant, and durable solutions across project scales."
      >
        {productTypes.map((item) => (
          <Card key={item.slug} {...item} />
        ))}
      </Section>

      {/* FINISHES */}
      <Section
        id="finishes"
        title="Travertine Finishes"
        intro="Surface finish defines the appearance and performance of travertine. Polished, honed, tumbled, brushed, filled, and unfilled create distinct looks tailored to interior elegance or outdoor practicality—expanding both aesthetic and functional possibilities."
      >
        {finishes.map((item) => (
          <Card key={item.slug} {...item} />
        ))}
      </Section>

      {/* COLORS */}
      <Section
        id="colors"
        title="Travertine Colors & Variations"
        intro="Natural shades such as Ivory, Light, and Antico complement a wide range of styles. From bright contemporary schemes to antique rustic charm, these tones elevate modern and classic projects indoors and out."
      >
        {colors.map((item) => (
          <Card key={item.slug} {...item} />
        ))}
      </Section>

      {/* APPLICATIONS */}
      <Section
        id="applications"
        title="Travertine Applications"
        intro="Thanks to its strength and beauty, travertine performs across flooring, cladding, facades, bathrooms, kitchens, and pools. Its durability ensures long service life, while design flexibility suits homes and commercial projects worldwide."
      >
        {applications.map((item) => (
          <Card key={item.slug} {...item} />
        ))}
      </Section>

      {/* SUPPLY & BUSINESS */}
      <Section
        id="business"
        title="Travertine Supply & Business"
        intro="Turkey leads global travertine production with rich quarries, advanced processing, and robust export networks. Learn how suppliers, exporters, manufacturers, and distributors move stone from quarry to project with assured quality."
      >
        {business.map((item) => (
          <Card key={item.slug} {...item} />
        ))}
      </Section>

      {/* FOOTER CTA */}
      
    </main>
  );
}
