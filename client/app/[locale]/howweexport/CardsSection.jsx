import React from 'react'
import { useLocale, useTranslations } from "next-intl";
import InfoCard from '../components/products1/InfoCard';
import InlineLinks from '../components/generalcomponent/InlineLinks';

const CardsSection = () => {
     const t = useTranslations("HowWeExportPage")
      
       const cards = [
        {
          title: t("cards.title1", { default: "FOB (Free on Board)" }),
          content: t("cards.text1", { default: "Majen loads travertine containers at Turkish ports. Buyers arrange international freight. Most common for bulk travertine block orders." }),
        },
        {
          title: t("cards.title2", { default: "CIF (Cost, Insurance, Freight)" }),
          content: t("cards.text2", { default: "Majen manages shipping, insurance, and freight to buyer’s destination port. Importers prefer this hassle-free option for slabs and tiles." }),
             linkify: true,
        },
        {
          title: t("cards.title3", { default: "EXW (Ex Works)" }),
          content: t("cards.text3", { default: "Buyers arrange pickup directly from our quarry/warehouse. Suitable for importers with their own freight partners." }),
        },
    
      ];
    
  return (
    <div className='flex flex-col items-center justify-center gap-3 lg:gap-8'>
      <h2 className='text-[24px] md:text-[28px] lg:text-[30px] font-semibold'>International Shipping Methods</h2>
      <section className="mb-8 md:mb-10 lg:mb-20 mt-5 lg:mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-[1200px] mx-auto w-[95%]">
              {cards.map((c, i) => (
                <InfoCard key={i} title={c.title}>
                  {/* Sadece 2. kart (applications) linkli olsun */}
                  {c.linkify ? (
                    <InlineLinks text={c.content} patterns="" />
                  ) : (
                    (typeof c.content === "string"
                      ? c.content
                      : Array.isArray(c.content)
                      ? c.content.join(", ")
                      : null)
                  )}
                </InfoCard>
              ))}
            </section>
    </div>
  )
}

export default CardsSection
