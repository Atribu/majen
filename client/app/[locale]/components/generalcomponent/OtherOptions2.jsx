// app/[locale]/components/products1/OtherOptions.js
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function OtherOptions2({
  heading = "Other Options",
  excludeProduct,
  productOrder = ["block", "slabs", "tiles", "special"],
  variantSlugs = ["antiko", "light", "ivory"],
  baseHref,
  productSegments = {},
  locale = "en",
  productImages = {},
  productHrefFor,
  currentVariantSlug = "blaundos-antiko" // şu anki varyant slug'ı
}) {
  
  // Mevcut varyant rengini slug'dan çıkar
  const getCurrentVariantKey = (slug) => {
    const slugMap = {
      'blaundos-antiko': 'antiko',
      'blaundos-light': 'light', 
      'blaundos-ivory': 'ivory'
    };
    return slugMap[slug] || 'antiko';
  };

  const currentVariantKey = getCurrentVariantKey(currentVariantSlug);

  // ExcludeProduct dışındaki ürünleri filtrele
  const filteredProducts = productOrder.filter(product => product !== excludeProduct);

  // Her ürün için link ve görsel oluştur
  const productCards = filteredProducts.map(productKey => {
    const productSlug = productSegments[productKey];
    if (!productSlug) return null;

    // Ürün adını düzenle
    const getProductTitle = (key) => {
      const titles = {
        block: locale === 'tr' ? 'Bloklar' : 'Blocks',
        slabs: locale === 'tr' ? 'Plakalar' : 'Slabs', 
        tiles: locale === 'tr' ? 'Karolar' : 'Tiles',
        special: locale === 'tr' ? 'Özel' : 'Special'
      };
      return titles[key] || key;
    };

    // Varyant adını düzenle
    const getVariantTitle = (key) => {
      const variants = {
        antiko: 'Blaundos Antiko',
        light: 'Blaundos Light',
        ivory: 'Blaundos Ivory'
      };
      return variants[key] || key;
    };

    const productTitle = getProductTitle(productKey);
    const variantTitle = getVariantTitle(currentVariantKey);
    
    // Link oluştur
    const href = `${baseHref}/${productSlug}/blaundos-${currentVariantKey}`;
    
    // Görsel al
    const productImg = productImages[productKey];
    let imageSrc;
    
    if (typeof productImg === 'object') {
      // Eğer object ise, mevcut varyant key'ine göre resim al
      imageSrc = productImg[currentVariantKey] || productImg.cover || Object.values(productImg)[0];
    } else if (typeof productImg === 'string') {
      imageSrc = productImg;
    } else {
      imageSrc = '/images/placeholder.jpg'; // fallback
    }

    return {
      key: productKey,
      title: productTitle,
      variantTitle,
      fullTitle: `${variantTitle} ${productTitle}`,
      href,
      imageSrc,
      alt: `${variantTitle} ${productTitle} from Turkey`
    };
  }).filter(Boolean);

  if (productCards.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 md:mt-20 lg:mt-24 max-w-[1200px] mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3">
          {heading}
        </h2>
        <p className="text-neutral-600 text-sm md:text-base">
          {locale === 'tr' 
            ? `Aynı renkte diğer ${getCurrentVariantKey(currentVariantSlug)} ürünlerimizi keşfedin`
            : `Explore our other ${getCurrentVariantKey(currentVariantSlug)} products in the same color`
          }
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {productCards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="group relative overflow-hidden "
          >
         {/* Dairesel görsel (gölge + ring) */}
<div className="pt-6 flex justify-center">
  <div
    className="
      relative w-[180px] h-[180px] md:w-[210px] md:h-[210px]
      rounded-full overflow-hidden
      ring-1 ring-neutral-200
      shadow-[0_16px_36px_-12px_rgba(0,0,0,0.35)]
      group-hover:shadow-[0_24px_50px_-14px_rgba(0,0,0,0.45)]
      transition-shadow duration-300
    "
  >
    <Image
      src={card.imageSrc}
      alt={card.alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 640px) 180px, (max-width: 1024px) 210px, 210px"
      priority={false}
      loading="lazy"
    />
   
    {/* Hover icon (opsiyonel) */}
    {/* <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
      <svg className="w-4 h-4 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div> */}
  </div>
</div>

{/* Metinler dairenin DIŞINDA, hemen altında */}
<div className="px-5 pb-5 pt-4 text-center">
  {/* İsterseniz sıralamayı değiştirin: varyant üstte, ürün altta gibi */}
  <h3 className="font-semibold text-neutral-900 text-base md:text-lg mb-1 group-hover:text-neutral-700 transition-colors">
    {card.variantTitle}
  </h3>
  <p className="text-neutral-600 text-sm">
    {card.title}
  </p>

  {/* Alt çizgi/CTA (aynı kalsın) */}
  <div className="mt-3 pt-3 border-t border-neutral-200">
    <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
      {locale === 'tr' ? 'Sayfaya git' : 'Go to page'}
      <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
    </span>
  </div>
</div>

          </Link>
        ))}
      </div>

      {/* Alt açıklama */}
      <div className="text-center mt-8 md:mt-10">
        <p className="text-sm text-neutral-500 max-w-2xl mx-auto">
          {locale === 'tr' 
            ? 'Tüm ürünlerimiz Uşak-Ulubey ocağımızdan direkt tedarik edilmekte ve A kalite standartlarında üretilmektedir.'
            : 'All our products are directly sourced from our Uşak-Ulubey quarry and produced to A-grade standards.'
          }
        </p>
      </div>
    </section>
  );
}