import React from 'react'
import MainBanner from "./MainBanner";
import InfoSection from "./InfoSection";
import ServicesSection from "./ServicesSection";
import CollectionsSection from "./CollectionsSection";
import HighlightSection from "./HighlightSection";
import BackgroundSection from "./BackgroundSection";
import BackgroundSection2 from "./BackgroundSection2";
import ContactFrom from '../generalcomponent/ContactFrom';
import HomeMainSection from '../generalcomponent/HomeMainSection';
import LogisticSection from '../generalcomponent/LogisticsSection';
import QuestionsSection from '../generalcomponent/QuestionsSection';
import { useLocale, useTranslations } from "next-intl";

const HomeClient = () => {
  const t = useTranslations("QuestionsSection");
  const locale = useLocale();
  const safeLocale = locale || "en";
  const exportBase = `/${safeLocale}/${safeLocale === "tr" ? "nasil-ihracat-yapiyoruz" : "how-we-export"}`;
   const items = [
      { q: t("aboutpage_s4_faq1_header"), a: t("aboutpage_s4_faq1_text") },
      { q: t("aboutpage_s4_faq2_header"), a: t("aboutpage_s4_faq2_text") },
      { q: t("aboutpage_s4_faq3_header"), a: t("aboutpage_s4_faq3_text") },
      { q: t("aboutpage_s4_faq4_header"), a: t("aboutpage_s4_faq4_text") },
    ];
  
   return (
    <div className="bg-white overflow-hidden items-center justify-center flex flex-col">
      <MainBanner/>
      <HomeMainSection/>
      <InfoSection/>
      <LogisticSection/>
      <BackgroundSection/>
      <CollectionsSection/>
      <ContactFrom />
      <ServicesSection/>
      <HighlightSection/>
      <QuestionsSection color="#000000" span=" Wholesale Travertine From Turkey" items={items} linkMap={{
    FOB: `${exportBase}/fob`,
    CIF: `${exportBase}/cif`,
    EXW: `${exportBase}/exw`,
  }}/>
      <BackgroundSection2/>
    </div>
  );
}

export default HomeClient
