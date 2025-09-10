// app/components/KeyFeatures.jsx
"use client";
import React, {useState, useEffect, useRef} from "react";
import { useTranslations } from "next-intl";
import {
  FaRulerCombined,
  FaPalette,
  FaCubes,
  FaLeaf,
  FaUserTie,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import light from "@/public/images/slabs/light.webp";
import ServiceBlocks from "./blocksComponents/ServiceBlocks";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ICONS = {
  quality: FaRulerCombined,
  design: FaPalette,
  range: FaCubes,
  custom: FiSettings,
  sustain: FaLeaf,
  expert: FaUserTie,
};

// Sıra/öğe sayısını buradan yönetebilirsin
const FEATURE_KEYS = ["quality", "design", "range", "custom", "sustain", "expert"];

export default function KeyFeatures() {
  const t = useTranslations("KeyFeatures");

   const [blocksOrder, setBlocksOrder] = useState([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
      ]);

       useEffect(() => {
        const interval = setInterval(() => {
          // setGradientIndex((prev) => (prev === 7 ? 0 : prev + 1));
          // set blocks order
          // after one full cyle stop the interval
    
          setBlocksOrder((prev) => {
            // if (prev[0] == 1) {
            //   clearInterval(interval);
            //   return prev;
            // }
            const newOrder = [...prev];
            newOrder.unshift(newOrder.pop());
            return newOrder;
          });
        }, 1500);
        return () => clearInterval(interval);
      }, []);

          
      const blockPositions = {
        0: "-translate-y-1/2 z-[5] translate-x-[43px]",
        1: "-translate-y-[calc(50%-80px)] z-[10] -translate-x-[18px]",
        2: "-translate-y-[calc(50%-160px)] z-[50] -translate-x-[82px]",
        3: "-translate-y-[calc(50%-80px)] z-[70] -translate-x-[146px]",
        4: "-translate-y-1/2 z-[80] -translate-x-[210px]",
        5: "-translate-y-[calc(50%+80px)] z-[60]  -translate-x-[146px]",
        6: "-translate-y-[calc(50%+160px)] z-[40] -translate-x-[82px]",
        7: "-translate-y-[calc(50%+80px)] z-[20]  -translate-x-[18px]",
      };

            const items = [
        // Her eleman, verilen JSX içeriğinizden bir kopya olabilir.
        (
          <div className="flex flex-col justify-center items-start gap-2 ">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-[120%] -tracking-[0.82px]">
              {t("items.quality.title")}
              </span>
              
            </div>
            <div className="flex flex-col justify-center items-start gap-6  max-w-[90vw]">
              <div className="lg:w-[500px] justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-[140%]">
             {t("items.quality.description")}
              </div>
              <div className="px-8 py-2 rounded-2xl outline outline-2 outline-offset-[-2px] inline-flex justify-center items-center ">
                <p className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">servicesvertical_item8_header</p>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-[120%] -tracking-[0.82px]">
                Lorem Lorem
              </span>
              
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
               <div className="lg:w-[500px] justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-[140%]">
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic odit voluptas consectetur omnis eos tempora dolores repellendus quasi magnam nesciunt consequatur debitis doloremque quia dolorum dicta saepe aut eius!
              </div>
              <div className="px-7 py-3.5 rounded-[10px] outline outline-1 outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">servicesvertical_item8_header</div>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-[120%] -tracking-[0.82px]">
            Lorem Lorem
              </span>
             
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
               <div className="lg:w-[500px] justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-[140%]">
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic odit voluptas consectetur omnis eos tempora dolores repellendus quasi magnam nesciunt consequatur debitis doloremque quia dolorum dicta saepe aut eius!
              </div>
              <div className="px-7 py-3.5 rounded-[10px] outline outline-1 outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">servicesvertical_item8_header</div>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-[120%] -tracking-[0.82px]">
              servicesvertical_item8_header
              </span>
             
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
              <div className="lg:w-[500px] justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-[140%]">
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic odit voluptas consectetur omnis eos tempora dolores repellendus quasi magnam nesciunt consequatur debitis doloremque quia dolorum dicta saepe aut eius!
              </div>
              <div className="px-7 py-3.5 rounded-[10px] outline outline-1 outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">servicesvertical_item8_header</div>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-[120%] -tracking-[0.82px]">
                 Lorem Lorem
              </span>
              
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
              <div className="lg:w-[500px] opacity-75 justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-tight">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae similique quidem reprehenderit dicta velit praesentium possimus quod sequi dolorum officiis. Cum ratione, saepe atque nulla modi incidunt ipsum porro deleniti?
              </div>
              <div className="px-7 py-3.5 rounded-[10px] outline outline-1 outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]"> servicesvertical_item8_header</div>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-[120%] -tracking-[0.82px]">
                  Lorem Lorem
              </span>
             
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
               <div className="lg:w-[500px] justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-[140%]">
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic odit voluptas consectetur omnis eos tempora dolores repellendus quasi magnam nesciunt consequatur debitis doloremque quia dolorum dicta saepe aut eius!
              </div>
              <div className="px-7 py-3.5 rounded-[10px] outline outline-1 outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">servicesvertical_item8_header</div>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-10">
               Lorem Lorem
              </span>
             
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
              <div className="lg:w-[500px] justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-[140%]">
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic odit voluptas consectetur omnis eos tempora dolores repellendus quasi magnam nesciunt consequatur debitis doloremque quia dolorum dicta saepe aut eius!
              </div>
              <div className="px-7 py-3.5 rounded-[10px] outline outline-1 outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">servicesvertical_item8_header</div>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-10">
                Lorem Lorem
              </span>
              
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
               <div className="lg:w-[500px] justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-[140%]">
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita, hic odit voluptas consectetur omnis eos tempora dolores repellendus quasi magnam nesciunt consequatur debitis doloremque quia dolorum dicta saepe aut eius!
              </div>
              <div className="px-7 py-3.5 rounded-[10px] outline outline-1 outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">  servicesvertical_item8_header</div>
              </div>
            </div>
          </div>
        ),
      ];

      const itemHeight = 300;
      const gap = 20;
      const totalItemHeight = itemHeight + gap;
      const [activeIndex, setActiveIndex] = useState(0);
    
      // Drag kontrolü için state'ler:
      const [dragStartY, setDragStartY] = useState(null);
      const [dragging, setDragging] = useState(false);
      const containerRef = useRef();
    
      const threshold = 50; // Yeterli kaydırma mesafesi (piksel cinsinden)
    
      const handleMouseDown = (e) => {
        setDragStartY(e.clientY);
        setDragging(true);
      };
    
      const handleMouseMove = (e) => {
        if (!dragging || dragStartY === null) return;
        // Delta hesapla
        const deltaY = e.clientY - dragStartY;
        // Eğer delta eşik değerini aştıysa, slide değiştir.
        if (deltaY > threshold) {
          // Aşağı sürüklendiğinde önceki slide
          setActiveIndex((prev) => Math.max(prev - 1, 0));
          setDragging(false);
          setDragStartY(null);
        } else if (deltaY < -threshold) {
          // Yukarı sürüklendiğinde sonraki slide
          setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
          setDragging(false);
          setDragStartY(null);
        }
      };
    
      const handleMouseUp = () => {
        setDragging(false);
        setDragStartY(null);
      };
    
      const handleMouseLeave = () => {
        // Fare container dışına çıkarsa drag iptal edilir.
        setDragging(false);
        setDragStartY(null);
      };
    
      // Alternatif navigasyon butonları
      const handlePrev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      };
    
      const handleNext = () => {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
      };
    

  return (
    <section className="relative overflow-hidden  text-black py-16 sm:py-20 lg:py-2 lg:h-[550px] w-screen  items-center justify-center"  style={{
    backgroundImage: "url('/images/homepage/anasayfa2.webp')",
    backgroundSize: "cover",       // resmi kırpmadan kaplar
    backgroundPosition: "center",  // ortalar
    backgroundRepeat: "no-repeat", // tekrar etmez
  }}>
      

      <div className='flex w-full md:w-[80%] lg:w-[95%] h-full gap-[64px] items-center justify-center text-black'>
        <div className='flex flex-col w-[90%] lg:w-[52%] ml-0 lg:ml-[8%] items-center justify-center lg:items-start lg:justify-start text-start relative gap-10'>
            <h2 className='text-[20px] md:text-[24px] lg:text-[36px] font-bold leading-[110%] -tracking-[1.12px] mt-28 text-black'> {t("titlePrefix")} {""} {t("titleAccent")}</h2>
            {/* slider */}
            <div className="relative  overflow-y-scroll md:overflow-y-hidden h-[300px] w-[350px] md:w-[550px] lg:w-full md:h-[450px] bg-black/10" ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}>
      {/* Carousel container */}
      <div
        className="absolute left-0 transition-transform duration-700 "
        style={{
          transform: `translateY(${
            -activeIndex * totalItemHeight + (500 - itemHeight) / 2.5
          }px)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`
                md:h-[300px] flex justify-start items-center 
                transition-opacity transition-transform duration-700 ease-in-out ml-10
                ${activeIndex === index 
                  ? "opacity-100 scale-100" 
                  : "opacity-50 scale-90"
                }
              `}
           
          >
            {item}
          </div>
        ))}
      </div>

     
      
    </div>
     {/* Navigasyon butonları (örnek, isteğe bağlı) */}
     <div className="hidden lg:flex flex-col absolute top-[60%] -left-20 transform -translate-y-1/2">
        <button onClick={handlePrev} className="p-2  text-black "><IoIosArrowUp size={32} color="#000"/></button>
        <button onClick={handleNext} className="p-2 text-black "><IoIosArrowDown size={32} color="#000"/></button>
        </div>

        </div>



         <div className='hidden md:flex h-full lg:w-[40%] items-center justify-start -mt-[8%] '>
           <ServiceBlocks blocksOrder={blocksOrder} rotate={false}
          blockPositions={blockPositions}/>
        </div>
      </div>
      
      
      
    </section>
  );
}


  //  <div className='hidden md:flex h-full min-h-[600px] lg:w-[28%] items-center justify-center '>
  //          <ServiceBlocks blocksOrder={blocksOrder} rotate={false}
  //         blockPositions={blockPositions}/>
  //       </div>