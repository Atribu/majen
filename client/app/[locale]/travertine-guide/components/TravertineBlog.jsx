"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import StickySectionNav from "./StickySectionNav";

const TOP_OFFSET = 80; // header yüksekliğine göre ayarla

// Sayfanda zaten varsa bu listeyi oradan da verebilirsin
const tocItems = [
  { id: "types",         label: "Product Types" },
  { id: "finishes",      label: "Finishes" },
  { id: "colors",        label: "Colors" },
  { id: "applications",  label: "Applications" },
  { id: "business",      label: "Supply & Business" },
];


export default function TravertineBlog() {
  // DATA ------------------------------------------------------------
  const productTypes = useMemo(
    () => [
      {
        title: "Travertine Tiles",
        slug: "/travertine-tiles-guide",
        img: "/images/homepage/kesim.webp",
        alt: "Travertine tiles for floors and walls – Turkey supplier",
        excerpt:
          "Travertine tiles are widely used in flooring and wall coverings, combining natural aesthetics with durability. Available in multiple finishes, they suit modern and traditional designs in residential and commercial spaces.",
      },
      {
        title: "Travertine Slabs",
        slug: "/travertine-slabs-guide",
        img: "/images/homepage/slabler2.webp",
        alt: "Large travertine slabs for countertops and facades",
        excerpt:
          "Travertine slabs are ideal for large-scale projects requiring seamless surfaces like countertops and facades. Their wide dimensions highlight natural patterns, delivering a luxurious look for interiors and architecture.",
      },
      {
        title: "Travertine Blocks",
        slug: "/travertine-blocks-guide",
        img: "/images/homepage/Ivoryblok.webp",
        alt: "Travertine blocks from Turkish quarries",
        excerpt:
          "Travertine blocks are the raw form extracted from quarries, then cut and processed into tiles or slabs. Valued by manufacturers and exporters, they are the base material for large projects and custom stonework.",
      },
      {
        title: "Travertine Pavers",
        slug: "/travertine-pavers-guide",
        img: "/images/newblog/travertinepavers.webp",
        alt: "Outdoor travertine pavers for patios and pools",
        excerpt:
          "Travertine pavers are durable outdoor solutions for paths, driveways, patios, and pool decks. Their slip-resistant surface and weather endurance make them a preferred choice for landscaping and exterior projects.",
      },
      {
        title: "Travertine Mosaics",
        slug: "/travertine-mosaics-guide",
        img: "/images/homepage/antikarkaplan4.webp",
        alt: "Travertine mosaics for bathrooms and kitchens",
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
        slug: "/polished-travertine-guide",
        img: "/images/newblog/Polishedtravertine.webp",
        alt: "Polished travertine surface",
        excerpt:
          "Polished travertine offers a glossy, reflective surface ideal for luxury interiors. It enhances the stone’s natural patterns while creating a modern, elegant atmosphere in residential and commercial spaces.",
      },
      {
        title: "Honed Travertine",
        slug: "/honed-travertine-guide",
        img: "/images/blog/honed.jpg",
        alt: "Honed travertine surface",
        excerpt:
          "Honed travertine has a smooth, matte surface that provides a softer, more natural look. Perfect for indoor floors, walls, and countertops where a subtle and contemporary appearance is preferred.",
      },
      {
        title: "Tumbled Travertine",
        slug: "/tumbled-travertine-guide",
        img: "/images/newblog/travertinetumbled.webp",
        alt: "Tumbled travertine edges",
        excerpt:
          "Tumbled travertine features a weathered, rustic texture that adds character to spaces. Common in outdoor areas, patios, and pool surrounds, it creates a classic Mediterranean or antique style.",
      },
      {
        title: "Brushed Travertine",
        slug: "/brushed-travertine-guide",
        img: "/images/blog/Brushed.jpg",
        alt: "Brushed travertine texture",
        excerpt:
          "Brushed travertine has a gently textured surface achieved through special treatment. Suitable for both interior and exterior designs, it offers added grip and visual warmth.",
      },
      {
        title: "Filled Travertine",
        slug: "/filled-travertine-guide",
        img: "/images/newblog/Filledtravertine.webp",
        alt: "Filled travertine pores",
        excerpt:
          "Filled travertine has natural pores sealed with resin or cement, creating a smoother surface. Often paired with polished finishes for modern interiors where a clean and refined look is desired.",
      },
      {
        title: "Unfilled Travertine",
        slug: "/unfilled-travertine-guide",
        img: "/images/blog/unfilled.jpg",
        alt: "Polished travertine slab close-up",
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
        slug: "/ivory-travertine-guide",
        img: "/images/homepage/Ivory/ivory.webp",
        alt: "Ivory travertine tile – bright modern interior",
        excerpt:
          "Ivory travertine is bright and elegant, a favorite for luxury interiors. Its light shade creates a spacious, airy feeling, ideal for bathrooms, kitchens, and pool surroundings across contemporary projects.",
      },
      {
        title: "Light Travertine",
        slug: "/light-travertine-guide",
        img: "/images/homepage/Light/light.webp",
        alt: "Light travertine tile – bright modern interior",
        excerpt:
          "Light travertine offers warm beige tones that blend seamlessly with modern and classic schemes. Versatile for flooring, wall cladding, and outdoor landscaping across residential and commercial spaces.",
      },
      {
        title: "Antico Travertine",
        slug: "/antico-travertine-guide",
        img: "/images/homepage/antik/antik.webp",
        alt: "Antico travertine tile – bright modern interior",
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
        slug: "/travertine-flooring-guide",
          img: "/images/homepage/Light/lighttasarim3.webp",
        alt: "Travertine floor detail",
        excerpt:
          "Travertine flooring is prized for durability and natural beauty. With varied finishes and colors, it enhances modern and classic interiors and withstands daily use in homes and commercial spaces.",
      },
      {
        title: "Travertine Cladding",
        slug: "/travertine-cladding-guide",
        img: "/images/homepage/Light/lighttasarim4.webp",
        alt: "Travertine wall cladding",
        excerpt:
          "Travertine cladding adds elegance to walls and facades, delivering natural insulation and timeless style. A popular choice for residential projects and commercial architecture alike.",
      },
      {
        title: "Travertine Facade",
        slug: "/travertine-facade-guide",
        img: "/images/homepage/Antik/Antiktasarim4.webp",
        alt: "Building facade with travertine",
        excerpt:
          "Travertine facades create strong, stylish exteriors. Weather resistance and natural variation make them ideal for modern buildings and restoration work seeking authentic stone character.",
      },
      {
        title: "Travertine Bathroom",
        slug: "/travertine-bathroom-guide",
          img: "/images/homepage/Ivory/Ivorytasarim1.webp",
        alt: "Bathroom with travertine",
        excerpt:
          "Travertine bathrooms evoke luxury and calm. Used in tiles, mosaics, and vanity tops, the stone brings spa-like warmth and texture to contemporary and classic spaces.",
      },
      {
        title: "Travertine Kitchen",
        slug: "/travertine-kitchen-guide",
       img: "/images/homepage/Antik/Antiktasarim2.webp",
        alt: "Kitchen with travertine surfaces",
        excerpt:
          "In kitchens, travertine works for countertops, backsplashes, and floors. Its natural tones pair beautifully with wood, metal, and minimalist cabinetry for enduring design.",
      },
      {
        title: "Travertine Pool",
        slug: "/travertine-pool-guide",
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
        slug: "/travertine-turkey",
         img: "/images/blogs/TravertineTurkey.webp",
        alt: "Travertine quarry in Turkey",
        excerpt:
          "Travertine Turkey is synonymous with quality and scale. Vast reserves and skilled craftsmanship position the country as a top global source for natural stone products.",
      },
      {
        title: "Turkish Travertine",
        slug: "/turkish-travertine",
        img: "/images/blogs/TurkishTravertine.webp",
        alt: "Turkish travertine close-up",
        excerpt:
          "Turkish travertine is globally recognized for color diversity and durability. Exported to major markets, it’s a leading material for construction and design projects worldwide.",
      },
      {
        title: "Travertine Quarry",
        slug: "/travertine-quarry",
        img: "/images/blogs/TravertineQuarry.webp",
        alt: "Travertine quarry blocks",
        excerpt:
          "Travertine quarries in Turkey produce high-quality blocks at scale. These raw materials are processed into tiles, slabs, and custom products for global distribution.",
      },
      {
        title: "Travertine Supplier",
        slug: "/travertine-supplier",
        img: "/images/blogs/Travertinesupplier.webp",
        alt: "Warehouse of travertine tiles",
        excerpt:
          "A travertine supplier delivers ready-to-use tiles and slabs to buyers worldwide. Reliable partners ensure consistent quality assurance and on-time delivery.",
      },
      {
        title: "Travertine Exporter",
        slug: "/travertine-exporter",
        img: "/images/blogs/travertineexporter.webp",
        alt: "Container shipping travertine",
        excerpt:
          "Travertine exporters connect Turkish stone with international markets, managing logistics, documentation, and quality control throughout the supply chain.",
      },
      {
        title: "Travertine Manufacturer",
        slug: "/travertine-manufacturer",
         img: "/images/blogs/Travertinemanufacturer.webp",
        alt: "Factory processing travertine slabs",
        excerpt:
          "Travertine manufacturers process raw blocks into finished products with advanced machinery. Precision cutting, polishing, and customization meet project demands.",
      },
      {
        title: "Travertine Distributor",
        slug: "/travertine-distributor",
         img: "/images/blogs/travertinedistributor.webp",
        alt: "Distribution center with stone pallets",
        excerpt:
          "Travertine distributors supply natural stone to contractors, retailers, and wholesalers, ensuring availability and after-sales support across regions.",
      },
    ],
    []
  );

  // HELPERS ---------------------------------------------------------
  // Section.jsx
const Section = ({ id, title, intro, children }) => (
  <section id={id} className="mx-auto max-w-6xl px-4 py-10 items-center justify-center text-center flex flex-col">
    <div className="flex items-end justify-between gap-4">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>

    {/* intro string veya JSX olabilir */}
    {intro && (
      <div className="mt-2 lg:mt-4 text-[12px] md:text-[14px] lg:text-[16px] leading-[120%] lg:leading-relaxed text-neutral-700 space-y-4">
        {intro}
      </div>
    )}

    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </section>
);


  const Card = ({ title, slug, img, alt, excerpt }) => (
    <article className="group rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={slug} className="block">
        <div className="relative h-48 lg:h-64 w-full">
          <Image src={img} alt={alt} fill className="object-cover" loading="lazy" />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold group-hover:underline underline-offset-4">{title}</h3>
          <p className="mt-2 text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed text-neutral-700">{excerpt}</p>
          <span className="mt-4 inline-block text-sm font-medium">Read more →</span>
        </div>
      </Link>
    </article>
  );



  const [active, setActive] = React.useState(tocItems[0].id);
  
   React.useEffect(() => {
  const sections = tocItems
    .map((x) => document.getElementById(x.id))
    .filter(Boolean);

  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;

    window.requestAnimationFrame(() => {
      const viewportCenter = window.innerHeight / 2;

      // viewport merkezine en yakın section'ı bul
      let bestId = sections[0]?.id;
      let bestDist = Infinity;

      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const dist = Math.abs(sectionCenter - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.id;
        }
      });

      if (bestId) setActive(bestId);
      ticking = false;
    });
  };

  // ilk durumda da hesapla
  onScroll();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}, []);

const handleClick = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;

  // merkeze hizala
  el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
};

  // RENDER ----------------------------------------------------------
  return (
    <main className="pt-3 md:pt-5 lg:pt-10 flex flex-col items-center justify-center w-screen">
      {/* HERO */}
      <header className="relative isolate flex flex-col w-full">
        <div className="mx-auto max-w-6xl px-4 pt-4 pb-10 items-center justify-center text-center flex flex-col">
          <h1 className="font-bold tracking-tight text-[28px] md:text-[36px] lg:text-[40px]">Travertine</h1>
          <p className="mt-1 md:mt-2 lg:mt-4 max-w-3xl text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed text-neutral-700">
            Travertine is one of the most sought-after natural stones in architecture and design, valued for its durability, unique patterns, and timeless beauty. This blog explores product types, finishes, colors, applications, and the Turkish supply chain — guiding you from specification to sourcing.
          </p>
        </div>
        {/* Decorative banner image */}
        <div className="relative h-56 md:h-72 ">
          <Image
            src="/images/homepage/antikarkaplan4.webp"
            alt="Turkish travertine blocks, slabs and tiles supplier – Majen"
            fill
            className="object-cover opacity-95"
            priority
          />
        </div>
      </header>

      {/* NAVIGATION TABS */}
       <nav
      className="sticky z-20 mt-5 w-[95%] lg:w-[80%] rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)]"
      style={{ top: TOP_OFFSET }}
      aria-label="On this page"
    >
      {/* Başlık + ilerleme çubuğu */}
      <div className="px-2 lg:px-4 pt-2 lg:pt-3 pb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-800">On this page</h2>
        <div className="ml-3 h-1 flex-1 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-800/70 transition-all"
            style={{
              width: `${
                ((Math.max(0, tocItems.findIndex((i) => i.id === active)) + 1) /
                  tocItems.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Pills */}
      <div className="px-2 pb-3">
        {/* Tek satır, taşarsa sağa kaydırmalı */}
        <ol className="flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar px-2 py-1">
          {tocItems.map((x) => {
            const isActive = active === x.id;
            return (
              <li key={x.id} className="inline-block">
                <a
                  href={`#${x.id}`}        
                  onClick={(e) => handleClick(e, x.id)}
                  className={[
                    "inline-flex items-center gap-2 text-xs md:text-sm px-3 py-1.5 rounded-full border transition",
                    isActive
                      ? "bg-neutral-900 text-white border-neutral-900"
                      : "bg-white/80 hover:bg-neutral-100 border-neutral-200 text-neutral-700",
                  ].join(" ")}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive ? "bg-white" : "bg-neutral-400"
                    }`}
                  />
                  {x.label}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
    
      {/* PRODUCT TYPES */}
      <Section
        id="types"
        title="Travertine Product Types"
        intro={
    <>
      <p>
        Travertine can be processed into different products to meet design and
        construction needs. From tiles and slabs to blocks, pavers, and mosaics,
        each serves a specific purpose—delivering versatile, elegant, and
        durable solutions across project scales.
      </p>

      <p>
        Turkish travertine comes in multiple product formats to match design
        intent and installation scale.{" "}
        <a
          href="/en/blog/travertines/travertine-tiles"
          className="text-teal-700 hover:underline"
        >
          Travertine tiles
        </a>{" "}
        suit floors and walls, while{" "}
        <a
          href="/en/blog/travertines/travertine-slabs"
          className="text-teal-700 hover:underline"
        >
          large-format slabs
        </a>{" "}
        deliver seamless surfaces for kitchens and facades. Raw{" "}
        <a
          href="/en/blog/travertines/travertine-blocks"
          className="text-teal-700 hover:underline"
        >
          travertine blocks
        </a>{" "}
        feed manufacturing lines;{" "}
        <a
          href="/en/blog/travertines/travertine-pavers"
          className="text-teal-700 hover:underline"
        >
          pavers
        </a>{" "}
        and{" "}
        <a
          href="/en/blog/travertines/travertine-mosaics"
          className="text-teal-700 hover:underline"
        >
          mosaics
        </a>{" "}
        cover outdoor paths and decorative patterns.
      </p>

      <p>
        For <strong>wholesale travertine</strong> projects, selecting the right
        product type reduces waste and improves lead times. Our quarry-backed
        inventory helps contractors and distributors balance aesthetics, slip
        resistance, thickness, and budget.
      </p>
    </>
  }
        
      >
        {productTypes.map((item) => (
          <Card key={item.slug} {...item} />
        ))}
      </Section>

      {/* FINISHES */}
      <Section
        id="finishes"
        title="Travertine Finishes"
        intro={
    <>
      <p>
        Surface finish defines the appearance and performance of travertine.
        Polished, honed, tumbled, brushed, filled, and unfilled create distinct
        looks tailored to interior elegance or outdoor practicality—expanding
        both aesthetic and functional possibilities.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Polished vs. Honed</h3>
      <p>
        <a
          href="/en/blog/travertines/polished-travertine"
          className="text-teal-700 hover:underline"
        >
          Polished travertine
        </a>{" "}
        highlights veining with a glossy surface—ideal for luxury interiors and
        feature walls. Honed travertine offers a matte, contemporary look with
        comfortable slip characteristics for floors and bathrooms.
      </p>

      <h3 className="mt-6 text-lg font-semibold">
        Tumbled &amp; Brushed for Outdoors
      </h3>
      <p>
        Tumbled and brushed finishes introduce texture and grip, making them
        favorites for <strong>outdoor travertine</strong> applications such as
        terraces, pathways and pool surrounds. When safety and natural character
        matter, these finishes balance performance with style.
      </p>
    </>
  }
      >
        {finishes.map((item) => (
          <Card key={item.slug} {...item} />
        ))}
      </Section>

      {/* COLORS */}
      <Section
        id="colors"
        title="Travertine Colors & Variations"
        intro={
    <>
      <p>
        Natural shades such as Ivory, Light, and Antico complement a wide range
        of styles. From bright contemporary schemes to antique rustic charm,
        these tones elevate modern and classic projects indoors and out.
      </p>

      <p>
        Ivory, Light and Antico are the most requested{" "}
        <strong>Turkish travertine colors</strong>. Ivory brightens bathrooms
        and kitchens; Light blends with modern beige palettes; Antico delivers
        rustic depth for Mediterranean design. Request{" "}
        <strong>sample boards</strong> to compare batches—natural variation is
        part of travertine’s charm.
      </p>
    </>
  }
      >
        {colors.map((item) => (
          <Card key={item.slug} {...item} />
        ))}
      </Section>

      {/* APPLICATIONS */}
      <Section
        id="applications"
        title="Travertine Applications"
        intro={
    <>
      <p>
        Thanks to its strength and beauty, travertine performs across flooring,
        cladding, facades, bathrooms, kitchens, and pools. Its durability
        ensures long service life, while design flexibility suits homes and
        commercial projects worldwide.
      </p>

      <p>
        Match application with finish and thickness: polished/honed for
        interiors; tumbled/brushed for exteriors; filled for smooth modern
        looks; unfilled for rustic character. For{" "}
        <strong>travertine flooring</strong>, check thickness and sealing
        schedule; for <strong>facades</strong>, align anchoring and panel
        sizing; for <strong>bathrooms/kitchens</strong>, plan slip comfort and
        maintenance.
      </p>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <strong>Need project-specific guidance?</strong> Share drawings or a
        BOQ—our team will map products, finishes and lead times for your site
        conditions.
      </div>
    </>
  }
      >
        {applications.map((item) => (
          <Card key={item.slug} {...item} />
        ))}
      </Section>

      {/* SUPPLY & BUSINESS */}
      <Section
        id="business"
        title="Travertine Supply & Business"
        intro={
    <>
      <p>
        Turkey leads global travertine production with rich quarries, advanced
        processing, and robust export networks. Learn how suppliers, exporters,
        manufacturers, and distributors move stone from quarry to project with
        assured quality.
      </p>

      <p>
        Turkey leads global travertine supply thanks to rich quarries and
        advanced processing. As a quarry-backed{" "}
        <strong>travertine supplier in Turkey</strong>, we stock tiles, slabs
        and blocks with strict grading. For international buyers, we coordinate
        export documents and logistics, providing dependable{" "}
        <strong>travertine export from Turkey</strong>.
      </p>

      <p>
        See how we ship under{" "}
        <a href="/en/how-we-export" className="text-teal-700 hover:underline">
          FOB, CIF and EXW
        </a>{" "}
        terms—including reinforced packaging, seal-number photos and complete
        documentation.
      </p>
    </>
  }
      >
        {business.map((item) => (
          <Card key={item.slug} {...item} />
        ))}
      </Section>

      {/* FOOTER CTA */}
      
    </main>
  );
}
