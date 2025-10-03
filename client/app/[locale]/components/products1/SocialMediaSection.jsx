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
  
const SocialMediaSection = () => {
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center text-center mt-10 lg:mt-20">
      <span className="text-[18px] lg:text-[20px] text-semibold text-black">More Information</span>
      <div className="flex flex-col md:flex-row items-center justify-center  gap-8 md:gap-12  w-full">
        <div className='flex gap-8 md:gap-12 items-center justify-center'>
           <a
                              href="https://en.wikipedia.org/wiki/Travertine"
                              aria-label="wikipedia"
                               target="_blank"
                              rel="noopener noreferrer"
                              className="p-4 md:p-5 lg:p-6 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                            >
                               <FaWikipediaW size={30} className='flex md:hidden'/>
                              <FaWikipediaW size={35} className='hidden md:flex'/>
                            </a>
                            <a
                              href="https://www.youtube.com/@MajenMadencilik"
                              aria-label="twitter"
                                target="_blank"
                              rel="noopener noreferrer"
                              className="p-4 md:p-5 lg:p-6 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                            >
                               <FaYoutube size={30} className='flex md:hidden'/>
                              <FaYoutube size={35} className='hidden md:flex'/>
                             
                            </a>
                          
                            <a
                              href={whatsappHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="whatsapp"
                              className="p-4 md:p-5 lg:p-6 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                            >
                               <FaWhatsapp size={30} className='flex md:hidden'/>
                              <FaWhatsapp size={35} className='hidden md:flex'/>
                              
                            </a>
        </div>
    
                             <div className='flex items-center justify-center  gap-8 md:gap-12'>
                               <a
                              href="https://www.instagram.com/p/DOn657JjD08/"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="whatsapp"
                              className="p-4 md:p-5 lg:p-6 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5">
                              
                               <FaInstagram size={30} className='flex md:hidden'/>
                              <FaInstagram size={35} className='hidden md:flex'/>
                            </a>

                              <a
                              href="mailto:info@majen.com.tr"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="whatsapp"
                              className="p-4 md:p-5 lg:p-6 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                            >
                               <MdOutlineEmail size={30} className='flex md:hidden'/>
                              <MdOutlineEmail size={35} className='hidden md:flex'/>
                             
                            </a>
                             </div>
                          </div>
    
    </div>
  )
}

export default SocialMediaSection
