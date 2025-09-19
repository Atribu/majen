import React from 'react'
import { useTranslations, useLocale } from "next-intl";

const HomeMainSection = () => {
     const t =useTranslations("HomeMainSection")
  return (
    <div className='flex w-screen items-center justify-center mt-6 lg:mt-20'>
      <div className='flex flex-col max-w-[1400px] items-center justify-center text-center w-[95%] gap-2'>
       <div className="w-full">
  <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold leading-[110%]">
    {t("header")} - <span className="text-[#000]">{t("span")}</span>
  </h1>
</div>
        <p className='text-[12px] md:text-[14px] lg:text-[18px] w-[97%] lg:w-[70%]'>{t("text")}</p>
      </div>
    </div>
  )
}

export default HomeMainSection
