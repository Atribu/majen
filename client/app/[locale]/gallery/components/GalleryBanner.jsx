import React from 'react'

const MainBanner2 = ({img, span, header, opacity}) => {
  return (
    <div className='flex w-screen items-center justify-center min-h-[calc(70vh)] bg-center bg-cover relative'  style={{ backgroundImage: `url(${img.src})` }} >
      {opacity && (
        <div className='absolute bg-lagoBlack/30 inset-0 z-[1]'></div>
      )}
      <div className='flex flex-col items-center justify-center w-[65%] text-center gap-[30px] lg:gap-[50px] text-black font-jost'>
         <div className="absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-white/100 to-transparent pointer-events-none" />
 <div className="absolute inset-y-0 right-0 w-[50%] bg-gradient-to-l from-white/100 to-transparent pointer-events-none" />
        <span className='text-[12px] md:text-[15px] font-medium uppercase tracking-[0.6px] leading-[14px] z-[99]'>{span}</span>
        <h1 className='text-[40px] md:text-[56px] lg:text-[80px] leading-[120%] -tracking-[0.48px] md:tracking-0 font-jost font-medium  lg:leading-[106px] capitalize capsizedText z-[99]'>{header}</h1>
       
      </div>
    </div>
  )
}

export default MainBanner2
