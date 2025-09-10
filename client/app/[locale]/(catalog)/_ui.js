"use client";
import Image from "next/image";

export function DetailBlock({ heading, items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-2">{heading}</h4>
      <ul className="text-sm text-neutral-700 list-disc pl-4 space-y-1">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}

export function HeroImage({ src, alt }) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"   // <— kırpmaz, komple gösterir
        sizes="(min-width:1024px) 1024px, 100vw"
        priority={false}
      />
    </div>
  );
}
