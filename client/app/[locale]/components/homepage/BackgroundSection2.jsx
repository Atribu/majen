import Image from 'next/image'
import React from 'react'
import blandos from "@/public/images/homepage/panaromik.webp"
import { useTranslations, useLocale } from "next-intl";

const BackgroundSection = () => {
    const t =useTranslations("BlaundosIntro")
  return (
    <div className='flex w-screen justify-end items-center relative z-[9]'>
      <div className='flex w-[100%]'>
        <Image
        src={blandos}
        alt='blandos'
        width={blandos.width}
        height={blandos.height}
        />
      </div>


    </div>
  )
}

export default BackgroundSection
