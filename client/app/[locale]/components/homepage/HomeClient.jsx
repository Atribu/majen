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

const HomeClient = () => {
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
      <QuestionsSection color="#000000"/>
      <BackgroundSection2/>
    </div>
  );
}

export default HomeClient
