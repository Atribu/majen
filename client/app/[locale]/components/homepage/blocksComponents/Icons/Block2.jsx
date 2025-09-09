import React from "react";
import SeoIcon from "./BlockIcons/SeoIcon";
import clsx from "clsx";
import {
  FaRulerCombined,
  FaPalette,
  FaCubes,
  FaLeaf,
  FaUserTie,
} from "react-icons/fa";

function Block2({ gradient, ...props }) {
  return (
    <div {...props}>
      <div className="relative h-full w-full">
        <svg
          width={658}
          height={124}
          viewBox="0 0 658 124"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            "transition-all duration-500",
            gradient && gradient == "true" ? "ml-[25px] xl:ml-[100px]" : "",
          )}
        >
          <g id={2}>
            <rect
    id="left"
    width={124}
    height={595.36}
    transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 595.36 124)"
    fill="url(#bgPattern)" 
  />
  <rect
  id="right-overlay"
  width={62.0001}
  height={595.36}
  transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 595.36 124)"
  fill="black"
  opacity="0.4"   
/>
            <path
              id="top"
              d="M640.36 62.0002L595.36 0.000134995L550.36 62.0003L595.36 124L640.36 62.0002Z"
             fill="url(#bgPattern)" 
            />
           
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
        <FaPalette
          className={clsx(
            "absolute transition-all duration-500 ease-in-out",
            gradient && gradient == "true"
              ? "right-[-45px] top-[15px]"
              : "right-[40px] top-[40px]"
          )}
          size={gradient && gradient == "true" ? 80 : 44} 
          color="#fff"
        />
      </div>
    </div>
  );
}

export default Block2;