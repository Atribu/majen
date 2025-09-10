import React from "react";
import AnalysisIcon from "./BlockIcons/AnalysisIcon";
import clsx from "clsx";
import { FiSettings } from "react-icons/fi";

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
           <defs>
            {/* Sol taraf için pattern */}
            <pattern id="bgLeft" patternUnits="userSpaceOnUse" width="124" height="595.36">
              <image
                 href="/images/slabs/antik.webp"
                width="124"
                height="595.36"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>

            {/* Sağ taraf için pattern */}
            <pattern id="bgRight" patternUnits="userSpaceOnUse" width="62" height="595.36">
              <image
                 href="/images/slabs/antik.webp"
                width="62"
                height="595.36"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>

            {/* Üst path için pattern */}
            <pattern id="bgTop" patternUnits="objectBoundingBox" width="1" height="1">
              <image
                  href="/images/slabs/antik.webp"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>

          <g id={4}>
            <rect
              id="left"
              width={124}
              height={595.36}
              transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 595.36 165)"
                fill={gradient && gradient == "true" ? "url(#bgLeft)" : "url(#bgRight)"}
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
                fill={gradient && gradient == "true" ? "url(#bgTop)" : "url(#bgRight)"}
            />
            
          </g>
         
        </svg>
        <FiSettings
                          className={clsx(
                            "absolute transition-all duration-500 ease-in-out rotate-20",
                            gradient && gradient == "true"
                              ? "right-[-45px] top-[60px]"
                              : "right-[40px] top-[78px]"
                          )}
                          size={gradient && gradient == "true" ? 72 : 40}
                          color="#fff"
                        />
      </div>
    </div>
  );
}

export default Block4;