
import React from 'react'
import GalleryBanner from './components/GalleryBanner'
import mainImg from "@/public/images/homepage/antikarkaplan2.webp"
import GalleryScrollSection from './components/GalleryScrollSection'
import {useTranslations} from 'next-intl';
import ContactFrom from '../components/generalcomponent/ContactFrom';
import SocialMediaSection from '../components/products1/SocialMediaSection';

const Page = () => {
  const t = useTranslations('Gallery');

  return (
    <div className='flex flex-col items-center justify-center overflow-hidden gap-[100px] mb-12'>
     <div className='flex flex-col items-center justify-center'>
     <GalleryBanner img={mainImg} span={t("subtitle")} header={t("title")}/>
     <GalleryScrollSection/>
     <SocialMediaSection/>
     <ContactFrom/>
     </div>
    </div>
  )
}

export default Page
