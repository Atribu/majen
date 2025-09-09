import React from "react";
import AnalysisIcon from "./BlockIcons/AnalysisIcon";
import clsx from "clsx";
import {
  FaRulerCombined,
  FaPalette,
  FaCubes,
  FaLeaf,
  FaUserTie,
} from "react-icons/fa";

function Block4({ gradient, ...props }) {

  return (
    <div {...props}>
      <div className="relative h-full w-full">
        <svg
          width={658}
          height={206}
          viewBox="0 0 658 206"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            "transition-all duration-500",
            gradient && gradient == "true" ? "ml-[25px] xl:ml-[100px]" : "",
          )}
        >
          <g id={4}>
            <rect
              id="left"
              width={124}
              height={595.36}
              transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 595.36 165)"
               fill="url(#bgPattern)" 
            />
            <rect
              id="right"
              width={62.0001}
              height={595.36}
              transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 595.36 165)"
              fill="black"
  opacity="0.4" 
            />
            <path
              id="top"
              d="M641 103L596 41.0004L551 103L596 165.001L641 103Z"
               fill="url(#bgPattern)" 
            />
            <g
              id="gradient"
              style={{
                mixBlendMode: "overlay",
              }}
              className={clsx(
                "transition-all duration-500",
                gradient && gradient == "true" ? "opacity-100" : "opacity-0",
              )}
            >
              <path
                d="M596.012 41L640.513 103L596.012 165L0.639709 165L0.639704 41L596.012 41Z"
                fill="url(#paint0_linear_76_17284)"
              />
            </g>
          </g>
         <defs>
  {/* Eski gradient tanımı kalabilir */}
  <pattern
  id="paint0_image"
  patternUnits="objectBoundingBox"
  width={1}
  height={1}
>
  <image
    href="/images/slabs/Ivory.webp"  
    x="0"
    y="0"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid slice"
  />
</pattern>

  {/* Yeni pattern tanımı */}
  <pattern
    id="bgPattern"
    patternUnits="objectBoundingBox"
    width={1}
    height={1}
  >
    <image
      href="/images/slabs/antik.webp"
      x="0"
      y="0"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    />
  </pattern>
</defs>
        </svg>
        <FaUserTie
                 className={clsx(
                   "absolute transition-all duration-500 ease-in-out rotation-90",
                   gradient && gradient == "true"
                     ? "right-[-45px] top-[75px]"
                     : "right-[45px] top-[80px]"
                 )}
                 size={gradient && gradient == "true" ? 80 : 44} 
                 color="#fff"
               />
      </div>
    </div>
  );
}

export default Block4;