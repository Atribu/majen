// app/components/NewestArrivals.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import img from "@/public/images/doku.webp"
import img2 from "@/public/images/doku2.webp"
import img3 from "@/public/images/doku3.webp"

const products = [
  {
    id: 1,
    title: "Bianco Rhino",
    category: "Black Series",
    imageSrc: img,
    href: "/product/bianco-rhino",
    isOnSale: true,
    priceBefore: "$99.00",
    price: "$89.00",
  },
  {
    id: 2,
    title: "Milano White",
    category: "Black Series",
    imageSrc: img2,
    href: "/product/milano-white",
    isOnSale: false,
    price: "$240.00 – $265.00",
  },
  {
    id: 3,
    title: "Calacatta Gold",
    category: "Black Series",
    imageSrc: img3,
    href: "/product/calacatta-gold",
    isOnSale: true,
    priceBefore: "$99.00",
    price: "$89.00",
  },
  {
    id: 5,
    title: "Bianco Rhino",
    category: "Black Series",
    imageSrc: img3,
    href: "/product/bianco-rhino",
    isOnSale: true,
    priceBefore: "$99.00",
    price: "$89.00",
  },
  {
    id: 6,
    title: "Milano White",
    category: "Black Series",
    imageSrc: img,
    href: "/product/milano-white",
    isOnSale: false,
    price: "$240.00 – $265.00",
  },
  {
    id: 7,
    title: "Calacatta Gold",
    category: "Black Series",
    imageSrc: img2,
    href: "/product/calacatta-gold",
    isOnSale: true,
    priceBefore: "$99.00",
    price: "$89.00",
  },
  // …daha fazla ürün
];

export default function NewestArrivals() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Başlık + Buton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <p className="text-[12px] lg:text-sm uppercase tracking-wider text-gray-500">
            Unveiling the epitome of luxury
          </p>
          <h2 className="mt-1 text-[26px] md:text-3xl lg:text-4xl font-bold text-gray-900">
            Our newest arrivals
          </h2>
        </div>
        <Link href="/products/new">
          <p className="mt-4 sm:mt-0 inline-block px-5 py-2 bg-green-900 text-white rounded-lg shadow hover:bg-green-800 transition">
            More new products
          </p>
        </Link>
      </div>

      {/* Ürün Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <Link key={p.id} href={p.href}>
            <div className="group block">
              <div className="relative w-full h-64 overflow-hidden rounded-lg">
                {/* Ürün Görseli */}
                <Image
                  src={p.imageSrc}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Sale Rozeti */}
                {p.isOnSale && (
                  <span className="absolute top-2 right-2 bg-green-900 text-white text-xs uppercase px-2 py-1 rounded">
                    Sale
                  </span>
                )}

                {/* Add to Cart Overlay */}
                <button
                  className="
                    absolute inset-x-0 bottom-0
                    bg-green-900 text-white
                    text-center py-3
                    opacity-0 group-hover:opacity-100
                    transition-opacity
                  "
                >
                  Add to cart
                </button>
              </div>

              {/* Ürün Bilgisi */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                <p className="text-sm text-gray-600">{p.category}</p>
                <div className="mt-1 text-gray-900">
                  {p.isOnSale ? (
                    <>
                      <span className="line-through text-gray-500 mr-2">
                        {p.priceBefore}
                      </span>
                      <span className="font-bold">{p.price}</span>
                    </>
                  ) : (
                    <span className="font-bold">{p.price}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
