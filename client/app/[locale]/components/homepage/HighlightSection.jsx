// app/components/HighlightSection.jsx
"use client";

import Image from "next/image";
import img from "@/public/images/tekli.webp"

export default function HighlightSection() {
  return (
    <section className="relative w-full">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center">
        {/* Sol Görsel */}
        <div className="w-full lg:w-[96%]">
          <div className="relative w-full h-80 sm:h-96 lg:h-[600px]">
            <Image
              src={img}
              alt="Marble Kitchen"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Sağ Card */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="
              bg-white shadow-xl p-8
              -mt-12 sm:-mt-16 lg:mt-0
              lg:-translate-x-16 xl:-translate-x-24
              max-w-md
              ">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight text-black">
              Combine a Passion for Natural Beauty with a Commitment to Exceptional Quality
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              What sets us apart is our extensive global network of partners, enabling us to cater to the demands and specifications of various projects. From prominent hotel chains to expansive palaces and mosques, we have the capabilities to meet the requirements of any project, irrespective of size or complexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
