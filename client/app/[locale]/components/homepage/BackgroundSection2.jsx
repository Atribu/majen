import Image from 'next/image'
import React from 'react'
import blandos from "@/public/images/homepage/panaromik.webp"
import blandosMobile from "@/public/images/homepage/tab.webp"
import { useTranslations, useLocale } from "next-intl";

const BackgroundSection = () => {
    const t =useTranslations("BlaundosIntro")
  return (
    <div className='flex w-screen justify-end items-center relative z-[9] lg:-mt-56'>
      <div className='hidden md:flex w-[100%]'>
        <Image
        src={blandos}
        alt='blandos'
        width={blandos.width}
        height={blandos.height}
        className='bg-contain '
        />
      </div>

      <div className='flex md:hidden w-[100%] mt-32 md:mt-10'>
        <Image
        src={blandosMobile}
        alt='blandosMobile'
        width={blandosMobile.width}
        height={blandosMobile.height}
        className='bg-contain '
        />
      </div>


    </div>
  )
}

export default BackgroundSection
