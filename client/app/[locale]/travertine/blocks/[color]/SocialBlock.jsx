import Link from 'next/link'
import React from 'react'
import {
  FaYoutube,
  FaWhatsapp,
  FaWikipediaW,
  FaInstagram
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const whatsappText = encodeURIComponent("Merhaba Majen ekibi!");
const whatsappHref = `https://api.whatsapp.com/send?phone=905335561092&text=${whatsappText}`;

const SocialBlock = () => {
  return (
     <div className='w-full'>
      <div className=" ">
         <div className="flex justify-around text-[14px] lg:text-[16px]">
       <Link className="flex gap-2 px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 hover:scale-110 ease-in-out duration-500 text-center rounded-md"  href="mailto:info@majen.com.tr"><MdOutlineEmail size={20}/> Send mail</Link>
       <Link className="flex gap-2 px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 text-center rounded-md hover:scale-110 ease-in-out duration-500 " href={whatsappHref}> <FaWhatsapp size={20}/> Whatsapp</Link>
      </div>
       </div>
     </div>
  )
}

export default SocialBlock
