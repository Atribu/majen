import Image from 'next/image'
import React from 'react'
import blandos from "@/public/images/homepage/Blaundos.webp"
import { useTranslations, useLocale } from "next-intl";

const BackgroundSection = () => {
    const t =useTranslations("BlaundosIntro")
  return (
    <div className='flex w-screen justify-end items-center max-h-[500px] relative z-[9]'>
      <div className='flex w-[100%]'>
        <Image
        src={blandos}
        alt='blandos'
        width={blandos.width}
        height={blandos.height}
        />
      </div>

      <div className='absolute flex flex-col w-[90%] lg:w-[35%] lg:mr-[5%] gap-2 mb-[30%] md:mb-[11%] lg:mb-[6%] left-[50%] -translate-1/2 text-center lg:left-none lg:translate-0'>
        <h3 className='text-[16px] md:text-[28px] lg:text-[32px] font-bold drop-shadow-lg'>{t("title")}</h3>
        <p className='flex text-[12px] md:text-[14px] xl:text-[16px] leading-[120%] lg:leading-normal drop-shadow-lg'>{t("paragraph")}</p>
      </div>

    </div>
  )
}

export default BackgroundSection
