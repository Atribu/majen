// app/components/MainBanner.jsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function MainBanner() {
  const [active, setActive] = useState(1);

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {/* ---- SLIDES CONTAINER ---- */}
      <div className="absolute inset-0">
        {/* Slide 1 */}
        <img
          src="https://placehold.co/600x400"
          alt="Banner 1"
          fill
          className={`
            object-cover
            transition-transform duration-700 ease-in-out
            ${active === 1 ? "translate-y-0" : "-translate-y-full"}
          `}
        />

        {/* Slide 2 */}
        <img
          src="https://placehold.co/1000x600"
          alt="Banner 2"
          fill
          className={`
            object-cover
            transition-transform duration-700 ease-in-out
            ${active === 2 ? "translate-y-0" : "translate-y-full"}
          `}
        />
      </div>

      {/* ---- CONTROLS ---- */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 flex flex-col space-y-4 z-10">
        {[1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`
              text-xl font-medium
              transition-colors
              ${active === i ? "text-white underline" : "text-gray-300 hover:text-white"}
            `}
          >
            {i < 10 ? `0${i}` : i}
          </button>
        ))}
      </div>
    </section>
  );
}
