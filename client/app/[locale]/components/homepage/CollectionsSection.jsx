// app/components/CollectionsSection.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import img1 from "@/public/images/figure1.webp"
import img2 from "@/public/images/figre2.webp"
import img3 from "@/public/images/figure3.webp"
import img4 from "@/public/images/figure4.webp"

const collections = [
  {
    title: "LIMESTONE",
    src: img1,
    alt: "Limestone collection",
    href: "/collections/limestone",
  },
  {
    title: "MARBLE",
    src: img2,
    alt: "Marble collection",
    href: "/collections/marble",
  },
  {
    title: "GLACIER SPLIT FACE CLADDING",
    src: img3,
    alt: "Glacier Split Face Cladding",
    href: "/collections/glacier",
  },
  {
    title: "DECORATIVE & MOSAIC TILES",
    src: img4,
    alt: "Decorative and Mosaic Tiles",
    href: "/collections/mosaic",
  },
];

export default function CollectionsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-32">
      {/* Subtitle */}
      <p className="text-[12px] lg:text-sm uppercase tracking-wider text-gray-500">
        Unveiling the Epitome of Luxury
      </p>
      {/* Heading */}
      <h2 className="mt-2 text-[28px] sm:text-4xl md:text-5xl font-bold text-gray-900">
        Discover Our Collections
      </h2>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map(({ title, src, alt, href }) => (
          <Link
            key={title}
            href={href}
            className="block group overflow-hidden rounded-lg"
          >
            <div className="relative w-full h-60 sm:h-72 lg:h-64 xl:h-72">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <h3 className="mt-4 text-[14px] lg:text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
