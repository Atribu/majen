import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import img from "@/public/images/500material.png"
import { useTranslations } from 'next-intl';

const InfoSection = () => {
  const t = useTranslations('InfoSection');

  return (
    <div className='flex w-screen py-5 lg:h-[70vh] items-center justify-center'>
      <div className='flex flex-col lg:flex-row w-[90%] md:w-[80%] lg:w-[75%] gap-[5%]'>
        <div className='flex flex-col items-start justify-center gap-[10px] md:gap-[18px] lg:gap-[25px] text-start'>
            <span className='text-[#6b7177] font-medium text-[14px] lg:text-[16px] uppercase'>{t("subtitle")}</span>
            <h3 className='text-[28px] md:text-[36px] lg:text-[48px] text-[#0C1A13] leading-[110%]'>{t("heading")}</h3>
            <p className='text-black text-[14px] md:text-[16px] lg:text-[18px]'>{t("description")}</p>
            <div className='flex gap-[10px] items-start justify-center'>
                <Link href="" className="flex bg-black px-[16px] py-[8px] text-white text-[14px] lg:text-[16px] border-[2px] border-black rounded-sm">{t("explore")}</Link>
                <Link href="" className="flex bg-white border-[2px] border-black px-[16px] py-[8px] text-black text-[14px] lg:text-[16px] rounded-sm">{t("contact")}</Link>
            </div>
        </div>
        <Image src={img} alt={t("alt")} width={img.width} height={img.height}/>
      </div>
    </div>
  )
}

export default InfoSection
