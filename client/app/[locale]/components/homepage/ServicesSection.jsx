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
const GAP = 90;

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
        }, 3000);
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
                <p className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">{t("explore")}</p>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-[120%] -tracking-[0.82px]">
                 {t("items.design.title")}
              </span>
              
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
               <div className="lg:w-[500px] justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-[140%]">
                 {t("items.design.description")}
              </div>
              <div className="px-8 py-2 rounded-[10px] outline  outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">{t("explore")}</div>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-[120%] -tracking-[0.82px]">
             {t("items.range.title")}
              </span>
             
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
               <div className="lg:w-[500px] justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-[140%]">
           {t("items.range.description")}
              </div>
              <div className="px-8 py-2 rounded-[10px] outline  outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">{t("explore")}</div>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-[120%] -tracking-[0.82px]">
             {t("items.custom.title")}
              </span>
             
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
              <div className="lg:w-[500px] justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-[140%]">
              {t("items.custom.description")}
              </div>
              <div className="px-8 py-2 rounded-[10px] outline  outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">{t("explore")}</div>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-[120%] -tracking-[0.82px]">
                {t("items.sustain.title")}
              </span>
              
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
              <div className="lg:w-[500px] opacity-75 justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-tight">
                 {t("items.sustain.description")}
              </div>
              <div className="px-8 py-2 rounded-[10px] outline  outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]"> {t("explore")}</div>
              </div>
            </div>
          </div>
        ),
        (
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="justify-center">
              <span className="text-Main-White text-[20px] lg:text-[24px] font-bold font-inter leading-[120%] -tracking-[0.82px]">
                   {t("items.expert.title")}
              </span>
             
            </div>
            <div className="flex flex-col justify-center items-start gap-3">
               <div className="lg:w-[500px] justify-center text-Main-White text-[12px] md:text-[14px] lg:text-[16px] font-normal font-inter leading-[140%]">
             {t("items.expert.description")}
              </div>
              <div className="px-8 py-2 rounded-[10px] outline  outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">{t("explore")}</div>
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
              <div className="px-8 py-2 rounded-[10px] outline  outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">{t("explore")}</div>
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
              <div className="px-8 py-2 rounded-[10px] outline  outline-offset-[-1px]  inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-black text-[14px] font-bold font-inter leading-[120%] -tracking-[0.24px]">  {t("explore")}</div>
              </div>
            </div>
          </div>
        ),
      ];


      const [activeIndex, setActiveIndex] = useState(0);
    
      // Drag kontrolü için state'ler:
      const [dragStartY, setDragStartY] = useState(null);
      const [dragging, setDragging] = useState(false);
      const containerRef = useRef();
       const itemRefs = useRef([]); // her item için ref
  const setItemRef = (el, i) => (itemRefs.current[i] = el);
  const [containerH, setContainerH] = useState(0);
  const [itemHeights, setItemHeights] = useState([]);
    
      const threshold = 50; // Yeterli kaydırma mesafesi (piksel cinsinden)
    
      const handleMouseDown = (e) => {
        pause();  
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
         setActiveIndex((prev) =>
  prev === 0 ? items.length - 1 : prev - 1
);
          setDragging(false);
          setDragStartY(null);
          
        } else if (deltaY < -threshold) {
          // Yukarı sürüklendiğinde sonraki slide
          setActiveIndex((prev) =>
  prev === items.length - 1 ? 0 : prev + 1
);
          setDragging(false);
          setDragStartY(null);
        }
      };
    
      const handleMouseUp = () => {
        setDragging(false);
        setDragStartY(null);
        resume(1200);  
      };
    
      const handleMouseLeave = () => {
        // Fare container dışına çıkarsa drag iptal edilir.
        setDragging(false);
        setDragStartY(null);
         resume(800);  
      };
    
      // Alternatif navigasyon butonları
      const handlePrev = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      };
    
      const handleNext = () => {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
      };

       useEffect(() => {
    const measure = () => {
      setContainerH(containerRef.current?.clientHeight || 0);
      setItemHeights(itemRefs.current.map((el) => el?.offsetHeight || 0));
    };
    measure();

    // ResizeObserver ile canlı takip
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    itemRefs.current.forEach((el) => el && ro.observe(el));

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  // items veya dil değişince metin boyu değişebilir
  }, [/* items, t vb. bu bileşende değişen bağımlılıklar varsa ekle */]);

  // aktif item’i merkeze getiren offset
  const tops = React.useMemo(() => {
    const t = [];
    let acc = 0;
    for (let i = 0; i < itemHeights.length; i++) {
      t.push(acc);
      acc += itemHeights[i] + GAP;
    }
    return t;
  }, [itemHeights]);

  const currentH = itemHeights[activeIndex] || 0;
  const yTop = tops[activeIndex] || 0;
  const offsetY = -(yTop) + (containerH - currentH) / 2;
  
 //Mobile
 // --- state üstlerine ekle:
const [isMobile, setIsMobile] = useState(false);
const [viewportH, setViewportH] = useState(0);
const [gap, setGap] = useState(90); // eskiden sabit GAP=90 idi

useEffect(() => {
  const onResize = () => {
    const m = window.matchMedia("(max-width: 640px)").matches;
    setIsMobile(m);
    setViewportH(window.innerHeight || 0);
    setGap(m ? 40 : 90); // mobilde aralığı küçült
  };
  onResize();
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);

// ölçümler değişince container yüksekliğini “hedef” olarak belirle:
const activeH = itemHeights[activeIndex] || 0;
// Mobilde: ekranın %80'ini geçmesin, min 360px; Desktop: %70, min 450px
const desiredH = Math.min(
  Math.max(activeH + 24, isMobile ? 360 : 450),
  Math.floor((viewportH || 1000) * (isMobile ? 0.8 : 0.7))
);

// containerH’yi DOM’dan okumak yerine “desiredH”’yi temel al:
useEffect(() => {
  setContainerH(desiredH);
}, [desiredH]);



// --- touch swipe ekle:
const touchStartYRef = useRef(null);
const TOUCH_THRESHOLD = 40;

const handleTouchStart = (e) => {
   pause();  
  touchStartYRef.current = e.touches?.[0]?.clientY ?? null;
};
const handleTouchMove = (e) => {
  const start = touchStartYRef.current;
  if (start == null) return;
  const dy = e.touches?.[0]?.clientY - start;
  if (dy > TOUCH_THRESHOLD) {
    setActiveIndex((p) => Math.max(p - 1, 0));
    touchStartYRef.current = null;
  } else if (dy < -TOUCH_THRESHOLD) {
    setActiveIndex((p) => Math.min(p + 1, items.length - 1));
    touchStartYRef.current = null;
  }
};
const handleTouchEnd = () => {
  touchStartYRef.current = null;
  resume(1200);            // <<< ekle
};

// === AUTOPLAY: state & refs
const AUTOPLAY_MS = 2870;
const [isPaused, setIsPaused] = useState(false);
const autoplayRef = useRef(null);
const resumeTimeoutRef = useRef(null);

const clearTimers = () => {
  if (autoplayRef.current) clearInterval(autoplayRef.current);
  if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
};

const pause = () => {
  setIsPaused(true);
  clearTimers();
};

const resume = (delay = 0) => {
  clearTimers();
  resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), delay);
};

// === AUTOPLAY: interval
useEffect(() => {
  clearTimers();
  if (!isPaused && items.length > 0) {
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, AUTOPLAY_MS);
  }
  return clearTimers;
}, [isPaused, items.length]);

// === AUTOPLAY: tab görünürlüğü
useEffect(() => {
  const onVis = () => (document.hidden ? pause() : resume(500));
  document.addEventListener("visibilitychange", onVis);
  return () => document.removeEventListener("visibilitychange", onVis);
}, []);



  return (
    <section className="relative overflow-hidden  text-black py-1 sm:py-2  lg:h-[550px] w-screen  items-center justify-center"  style={{
    backgroundImage: "url('/images/homepage/anasayfa3.webp')",
    backgroundSize: "cover",       // resmi kırpmadan kaplar
    backgroundPosition: "center",  // ortalar
    backgroundRepeat: "no-repeat", // tekrar etmez
  }}>
      

      <div className='flex w-full md:w-[80%] lg:w-[95%] h-full gap-[64px] items-center justify-center text-black'>
        <div className='flex flex-col w-[90%] lg:w-[52%] ml-0 lg:ml-[4%]  xl:ml-[10%] items-center justify-center lg:items-start lg:justify-start text-start relative gap-10'>
            <h2 className='text-[20px] md:text-[24px] lg:text-[36px] font-bold leading-[110%] -tracking-[1.12px] mt-28 text-black'> {t("titlePrefix")} {""} {t("titleAccent")}</h2>
            {/* slider */}
            <div
  ref={containerRef}
  className="relative overflow-hidden w-[350px] md:w-[550px] lg:w-full select-none"
  style={{ height: desiredH }}                       // <<< dinamik yükseklik
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseLeave}
  onTouchStart={handleTouchStart}                    // <<< touch
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>

      {/* Carousel container */}
      <div
  className="absolute left-0 transition-transform duration-700 will-change-transform"
  style={{ transform: `translateY(${offsetY}px)` }}
>
  {items.map((item, index) => (
    <div
      key={index}
      ref={(el) => setItemRef(el, index)}           // ölçüm şart
      style={{ marginBottom: GAP }}                 // aralık dinamik
      className={`
         flex justify-start items-center ml-10
        transition-[opacity,transform] duration-700 ease-in-out
        ${activeIndex === index ? "opacity-100 scale-100" : "opacity-50 scale-95"}
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
         <div className='hidden lg:flex h-full lg:w-[40%] items-center justify-start mt-[8%] xl:-mt-[8%] '>
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