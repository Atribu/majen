import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import img from "../../../public/images/500material.png"

const InfoSection = () => {
  return (
    <div className='flex w-screen h-[70vh] items-center justify-center'>
      <div className='flex flex-col lg:flex-row w-[90%] md:w-[80%] lg:w-[75%] gap-[5%]'>
        <div className='flex flex-col items-start justify-center gap-[10px] md:gap-[18px] lg:gap-[25px] text-start'>
            <span className='text-[#6b7177] font-medium text-[16px] uppercase'>Unveiling the Epitome of Luxury</span>
            <h3 className='text-[32px] md:text-[40px] lg:text-[52px] text-[#0C1A13] leading-[110%]'>Marble supplier and natural stone projects</h3>
            <p className='text-black text-[16px] lg:text-[18px]'>Marbléo Natural Stone is an innovative marble supplier known for its exceptional quality and distinctive designs featured in our extensive portfolio of over 40 products. With our diverse range of more than 500 material references, we provide our clients with a wide array of options to fulfill their design visions.</p>
            <div className='flex gap-[10px] items-start justify-center'>
                <Link href="" className="flex bg-black px-[16px] py-[8px] text-white text-[16px] border-[2px] border-black rounded-sm">Explore Products</Link>
                <Link href="" className="flex bg-white border-[2px] border-black px-[16px] py-[8px] text-black text-[16px] rounded-sm">Contact Us</Link>
            </div>
        </div>
        <Image src={img} alt='material' width={img.width} height={img.height}/>
      </div>
    </div>
  )
}

export default InfoSection
