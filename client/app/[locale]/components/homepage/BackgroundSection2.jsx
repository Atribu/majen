import Image from 'next/image'
import React from 'react'
import blandos from "@/public/images/homepage/panaromik.webp"
import blandosMobile from "@/public/images/homepage/tab2.webp"

const BackgroundSection = () => {
  return (
    <div className='relative z-[9] flex w-full max-w-full items-center justify-end overflow-hidden lg:-mt-[22%]'>
      <div className='hidden w-full md:flex'>
        <Image
          src={blandos}
          alt='blandos'
          width={blandos.width}
          height={blandos.height}
          className='min-h-[400px] w-full bg-cover'
        />
      </div>

      <div className='mt-32 flex w-full md:mt-10 md:hidden'>
        <Image
          src={blandosMobile}
          alt='blandosMobile'
          width={blandosMobile.width}
          height={blandosMobile.height}
          className='min-h-[200px] w-full bg-contain'
        />
      </div>


    </div>
  )
}

export default BackgroundSection
