import React from 'react'
import GalleryBanner from './components/GalleryBanner'
import mainImg from "@/public/images/homepage/antikarkaplan2.webp"
import GalleryScrollSection from './components/GalleryScrollSection'
import {useTranslations} from 'next-intl';

const page = () => {
  const t = useTranslations('Gallery');

  return (
    <div className='flex flex-col items-center justify-center overflow-hidden gap-[100px] bg-[#fbfbfb]'>
     <div className='flex flex-col items-center justify-center'>
     <GalleryBanner img={mainImg} span={t("subtitle")} header={t("title")}/>
     <GalleryScrollSection/>
     </div>
    </div>
  )
}

export default page
