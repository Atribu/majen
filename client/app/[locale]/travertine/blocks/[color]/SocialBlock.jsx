import Link from 'next/link'
import React from 'react'
import {
  FaWhatsapp,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useTranslations } from 'next-intl';

const whatsappText = encodeURIComponent("Merhaba Majen ekibi!");
const whatsappHref = `https://api.whatsapp.com/send?phone=905335561092&text=${whatsappText}`;

const SocialBlock = () => {
  const t = useTranslations("Footer.social");
  return (
     <div className='w-full'>
      <div className=" ">
         <div className="flex justify-around text-[14px] lg:text-[16px]">
       <Link className="flex gap-2 px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 hover:scale-110 ease-in-out duration-500 text-center rounded-md" aria-label={t("emailAction")} href="mailto:info@majen.com.tr"><MdOutlineEmail size={20}/> {t("emailAction")}</Link>
       <Link className="flex gap-2 px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 text-center rounded-md hover:scale-110 ease-in-out duration-500 " aria-label={t("whatsappAction")} href={whatsappHref}> <FaWhatsapp size={20}/> {t("whatsappAction")}</Link>
      </div>
       </div>
     </div>
  )
}

export default SocialBlock
