// app/components/CollectionsSection.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "LIMESTONE",
    src: "/images/collections/limestone.jpg",
    alt: "Limestone collection",
    href: "/collections/limestone",
  },
  {
    title: "MARBLE",
    src: "/images/collections/marble.jpg",
    alt: "Marble collection",
    href: "/collections/marble",
  },
  {
    title: "GLACIER SPLIT FACE CLADDING",
    src: "/images/collections/glacier.jpg",
    alt: "Glacier Split Face Cladding",
    href: "/collections/glacier",
  },
  {
    title: "DECORATIVE & MOSAIC TILES",
    src: "/images/collections/mosaic.jpg",
    alt: "Decorative and Mosaic Tiles",
    href: "/collections/mosaic",
  },
];

export default function CollectionsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      {/* Subtitle */}
      <p className="text-sm uppercase tracking-wider text-gray-500">
        Unveiling the Epitome of Luxury
      </p>
      {/* Heading */}
      <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
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
            <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
