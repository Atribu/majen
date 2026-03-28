import Image from 'next/image'
import React from 'react'
import blandos from "@/public/images/homepage/Blaundos.webp"
import { useTranslations } from "next-intl";

const BackgroundSection = () => {
    const t = useTranslations("BlaundosIntro")
  return (
    <div className='relative z-[9]'>
      <div className='flex w-screen justify-end items-center max-h-[500px] relative'>
        <div className='flex w-[100%]'>
          <Image
            src={blandos}
            alt='Travertine Supplier from Turkey'
            width={blandos.width}
            height={blandos.height}
          />
        </div>

        <div className='absolute hidden lg:flex flex-col w-[35%] lg:mr-[5%] gap-2 mb-[6%] text-center left-[50%] lg:left-auto lg:right-0 lg:translate-x-0'>
          <h4 className='text-[20px] md:text-[24px] lg:text-[26px] font-bold drop-shadow-lg'>{t("title")}</h4>
          <p className='text-[12px] md:text-[14px] lg:text-[16px] leading-[120%] break-words [overflow-wrap:anywhere] lg:leading-normal drop-shadow-lg'>{t("paragraph")}</p>
        </div>
      </div>

      <div className='mx-auto flex w-[90%] max-w-[90%] flex-col gap-2 px-1 py-5 text-center lg:hidden'>
        <h4 className='text-[20px] md:text-[24px] lg:text-[26px] font-bold drop-shadow-lg'>{t("title")}</h4>
        <p className='text-[12px] md:text-[14px] lg:text-[16px] leading-[120%] break-words [overflow-wrap:anywhere] lg:leading-normal'>{t("paragraph")}</p>
      </div>
    </div>
  )
}

export default BackgroundSection
