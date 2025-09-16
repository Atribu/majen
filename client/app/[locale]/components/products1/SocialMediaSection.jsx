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
    <div className="w-full flex flex-col gap-5 items-center justify-center text-center mt-20">
      <h5 className="text-[18px] lg:text-[20px] text-semibold text-black">More Information</h5>
      <div className="flex flex-col md:flex-row items-center justify-center  gap-8 md:gap-12  w-full">
        <div className='flex gap-8 md:gap-12 items-center justify-center'>
           <a
                              href="https://en.wikipedia.org/wiki/Travertine"
                              aria-label="wikipedia"
                               target="_blank"
                              rel="noopener noreferrer"
                              className="p-5 md:p-6 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                            >
                              <FaWikipediaW size={35} />
                            </a>
                            <a
                              href="https://www.youtube.com/"
                              aria-label="twitter"
                                target="_blank"
                              rel="noopener noreferrer"
                              className="p-5 md:p-6 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                            >
                              <FaYoutube size={35} />
                            </a>
                          
                            <a
                              href={whatsappHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="whatsapp"
                              className="p-5 md:p-6 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                            >
                              <FaWhatsapp size={35} />
                            </a>
        </div>
    
                             <div className='flex items-center justify-center  gap-8 md:gap-12'>
                               <a
                              href="https://www.instagram.com/p/DOn657JjD08/"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="whatsapp"
                              className="p-5 md:p-6 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5">
                              <FaInstagram size={35} />
                            </a>

                              <a
                              href="mailto:info@majen.com.tr"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="whatsapp"
                              className="p-5 md:p-6 rounded-full ring-1 ring-black/10 hover:ring-black/20 transition hover:-translate-y-0.5"
                            >
                              <MdOutlineEmail size={35} />
                            </a>
                             </div>
                          </div>
    
    </div>
  )
}

export default SocialMediaSection
