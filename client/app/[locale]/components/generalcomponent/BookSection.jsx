"use client"
import React from 'react';
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import Link from 'next/link';
import Script from 'next/script';

const BookSection = () => {
  return (
    <div className='fixed flex bottom-4 left-0 lg:left-4 md:bottom-6 lg:bottom-7 z-[980] max-w-screen'>
      <div className='flex justify-between items-center w-screen'>
        <Link href="https://api.whatsapp.com/send?phone=905335561092&text=Merhaba%20Majen%20ekibi!"
    target="_blank" className='flex w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] relative rounded-full border-white border ml-6 lg:ml-7 text-white bg-black/70 hover:bg-white hover:border-black hover:text-[#f5e1c6] items-center justify-center animate-zoom cursor-pointer'>
            <LiaPhoneVolumeSolid className="z-[9999] wiggle-phone" size={36} />
          <div className="absolute w-[51px] h-[51px] lg:w-[61px] lg:h-[61px] bg-transparent border border-white rounded-full pulse-ring"></div>
        </Link>


        <div className="flex">
        {/* <Script
          src="https://cdn.livechat.connexease.com/embed.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (window.ConnexeaseWebMessenger) {
              window.ConnexeaseWebMessenger.Init('188913a5-5fcf-4de1-b6a5-711e8fd4ea8e');
            } else {
              console.warn('ConnexeaseWebMessenger yüklenemedi.');
            }
          }}
        /> */}
        </div>
      </div>
    </div>
  );
};

export default BookSection;

