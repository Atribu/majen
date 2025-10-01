import React from 'react'
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation"; 

const LogisticSection = () => {
   const t =useTranslations("LogisticSection")
  return (
    <div className='flex w-screen items-center justify-center lg:mt-10 mb-20 lg:mb-0 z-[99]'>
      <div className='flex flex-col max-w-[1400px] items-center justify-center text-center'>
        <h3 className='text-[24px] md:text-[26px] lg:text-[30px] font-bold'>{t("header")}</h3>
        <p className='text-[12px] md:text-[11px] lg:text-[14px] w-[76.8%]'> {t.rich("text", {
                    fob: (chunks) => (
                      <Link href="/how-we-export/fob" className="underline underline-offset-4">
                        {chunks}
                      </Link>
                    ),
                    cif: (chunks) => (
                      <Link href="/how-we-export/cif" className="underline underline-offset-4">
                        {chunks}
                      </Link>
                    ),
                  })}</p>
      </div>
    </div>
  )
}

export default LogisticSection
