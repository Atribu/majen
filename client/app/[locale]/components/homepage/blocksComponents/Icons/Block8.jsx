import clsx from "clsx";
import React from "react";
import WebIcon from "./BlockIcons/WebIcon";
import { FiSettings } from "react-icons/fi";

function Block8({ gradient, ...props }) {
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
          <g id={8}>
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
  opacity="0.4"   // = bg-black/30
/>
            <path
              id="top"
              d="M640.36 62.0005L595.36 0.000379136L550.36 62.0005L595.36 124.001L640.36 62.0005Z"
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
      </div>
       <FiSettings
        className={clsx(
          "absolute transition-all duration-500 ease-in-out",
          gradient && gradient == "true"
            ? "right-[-45px] top-[15px]"
            : "right-[45px] top-[35px]"
        )}
        size={gradient && gradient == "true" ? 80 : 44} 
        color="#fff"
      />
    </div>
  );
}

export default Block8;