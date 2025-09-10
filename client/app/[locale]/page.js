import Image from "next/image";
import MainBanner from "./components/homepage/MainBanner";
import InfoSection from "./components/homepage/InfoSection";
import ServicesSection from "./components/homepage/ServicesSection";
import CollectionsSection from "./components/homepage/CollectionsSection";
import HighlightSection from "./components/homepage/HighlightSection";
import StatsSection from "./components/homepage/StatsSection";
import NewestArrivals from "./components/homepage/NewestArrivals";
import BackgroundSection from "./components/homepage/BackgroundSection";
import BackgroundSection2 from "./components/homepage/BackgroundSection2";

export default function Home() {
  return (
    <div className="bg-white overflow-hidden">
      <MainBanner/>
      <InfoSection/>
       <BackgroundSection/>
      <CollectionsSection/>
      <ServicesSection/>
      <HighlightSection/>
      <BackgroundSection2/>
    </div>
  );
}
