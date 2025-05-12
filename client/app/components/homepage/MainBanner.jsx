// app/components/MainBanner.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import img1 from "../../../public/images/side.jpg";
import img2 from "../../../public/images/Seleukeia.jpg";

export default function MainBanner() {
  const [active, setActive] = useState(1);

  const slides = [
    {
      id: 1,
      img: img1,
      alt: "Banner 1",
      title: "Transforming Spaces\nwith Exquisite Natural Stone.",
      description:
        "Marbléo Natural Stone is an innovative marble supplier known for its exceptional quality and distinctive designs featured in our extensive portfolio of over 40 products. With our diverse range of more than 500 material references.",
      buttonText: "Get in touch →",
      buttonLink: "#contact",
    },
    {
      id: 2,
      img: img2,
      alt: "Banner 2",
      title: "Elevate Your Projects\nwith Timeless Elegance.",
      description:
        "From classic to contemporary, our hand-picked selection of natural stones adds unparalleled beauty and durability to every design. Explore our complete catalog and find the perfect match for your vision.",
      buttonText: "View portfolio →",
      buttonLink: "#portfolio",
    },
  ];

  return (
    <section className="relative max-w-screen h-screen overflow-hidden">
      {slides.map((slide) => {
        const isActive = active === slide.id;
        return (
          <div
            key={slide.id}
            className={`
              absolute inset-0
              transition-transform duration-700 ease-in-out
              ${isActive
                ? "translate-y-0 z-20"
                : slide.id < active
                ? "-translate-y-full z-10"
                : "translate-y-full z-10"}
            `}
          >
            {/* Arka plan görseli */}
            <Image
              src={slide.img}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={slide.id === 1}
            />

            {/* Yarı saydam karartma */}
            <div className="absolute inset-0 bg-black/35 z-10" />

            {/* İçerik: metin bloğu */}
            <div className="absolute inset-0 flex items-center z-20 pointer-events-none">
              <div
                className={`
                  ml-[16%] mt-[10%] max-w-lg lg:max-w-[780px]
                  text-white pointer-events-auto
                  transform transition-all duration-700 ease-in-out
                  ${isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"}
                `}
              >
                <h1 className="whitespace-pre-wrap text-4xl md:text-5xl lg:text-[60px] font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="mt-4 text-base md:text-lg leading-relaxed">
                  {slide.description}
                </p>
                <a
                  href={slide.buttonLink}
                  className="inline-block mt-6 px-3 py-1 hover:bg-white hover:text-gray-900 transition text-[20px] font-semibold"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        );
      })}

      {/* Kontroller */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 flex flex-col space-y-4 z-30">
        {slides.map(({ id }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`
              text-xl font-medium transition-colors
              ${active === id ? "text-white underline" : "text-gray-300 hover:text-white"}
            `}
          >
            {id < 10 ? `0${id}` : id}
          </button>
        ))}
      </div>
    </section>
  );
}
