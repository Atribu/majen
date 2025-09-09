import clsx from "clsx";
import React from "react";
import WebIcon from "./BlockIcons/WebIcon";
import logoWhite from "@/public/images/logobeyaz.webp";

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
  opacity="0.4" 
/>
            <path
              id="top"
              d="M640.36 62.0005L595.36 0.000379136L550.36 62.0005L595.36 124.001L640.36 62.0005Z"
             fill="url(#bgPattern)" 
            />
            <g
              style={{
                mixBlendMode: "screen",
              }}
              className={clsx(
                "transition-all duration-500",
                gradient && gradient == "true" ? "opacity-100" : "opacity-0",
              )}
            >
              <path
                d="M595.372 -0.000234566L639.873 61.9999L595.372 124L6.10352e-05 124L5.56149e-05 -0.000208541L595.372 -0.000234566Z"
                fill="url(#paint0_linear_2095_13768)"
              />
            </g>
          </g>
         <defs>
  {/* Eski gradient tanımı kalabilir */}
  <linearGradient
    id="paint0_linear_76_17332"
    x1={418.037}
    y1={-10.1037}
    x2={229.633}
    y2={124.31}
    gradientUnits="userSpaceOnUse"
  >
    <stop stopColor="#54B9CF" />
    <stop offset={0.409548} stopColor="#547CCF" />
    <stop offset={1} stopColor="#A754CF" />
  </linearGradient>

  {/* Yeni pattern tanımı */}
  <pattern
    id="bgPattern"
    patternUnits="objectBoundingBox"
    width={1}
    height={1}
  >
    <image
      href="/images/slabs/antik.webp"  // public klasöründen gelecek (örn: /public/images/my-background.jpg)
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
      <img
  src="/images/logobeyaz.webp"
  alt="Logo"
  className={clsx(
    "absolute transition-all duration-500 ease-in-out rotate-90", // buraya ekledik
    gradient && gradient == "true"
      ? "right-[-45px] top-[15px] w-32 h-32"
      : "right-[15px] top-[39px] w-[100px] h-auto"
  )}
/>
    </div>
  );
}

export default Block8;