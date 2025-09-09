import clsx from "clsx";
import React from "react";
import ItIcon from "./BlockIcons/ItIcon";
import {
  FaRulerCombined,
  FaPalette,
  FaCubes,
  FaLeaf,
  FaUserTie,
} from "react-icons/fa";

function Block5({ gradient, ...props }) {
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
          <g id={5}>
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
            
            <defs>
              <linearGradient
                id="paint0_linear_2095_13768"
                x1={628.037}
                y1={-10.104}
                x2={439.633}
                y2={124.31}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#54B9CF" />
                <stop offset={0.409548} stopColor="#547CCF" />
                <stop offset={1} stopColor="#A754CF" />
              </linearGradient>
            </defs>
          </g>
        </svg>
         <FaRulerCombined
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
    </div>
  );
}

export default Block5;