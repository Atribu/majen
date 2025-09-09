
import clsx from "clsx";
import React from "react";

function VerticalBlock({ gradient, middle, children, parentClass, ...props }) {
  return (
    <div {...props}>
      <div
        className={clsx(
          "relative flex h-full w-[27px] items-end pb-[50px] lg:w-[54px]",
          parentClass,
        )}
      >
        <svg
          viewBox="0 0 54 281"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=" h-full w-full transition-all duration-500 ease-in-out"
        >
          <g id={3}>
            <rect
              id="Rectangle 87"
              x={0.52832}
              y={27.23}
              width={52.6524}
              height={252.799}
              fill={middle == "true" ? "#0D0918" : "#2B2455"}
            />
            <rect
              id="Rectangle 88"
              x={0.52832}
              y={27.23}
              width={26.3262}
              height={252.799}
              fill={middle == "true" ? "#1C1533" : "#140F25"}
            />
            <path
              id="Rectangle 87_2"
              d="M26.8545 8.32964L53.1807 27.2305L26.8545 46.1314L0.528273 27.2305L26.8545 8.32964Z"
              fill={middle == "true" ? "#140F25" : "#7268AE"}
            />

            <g
              id="gradient"
              style={{
                mixBlendMode: "screen",
              }}
              className={clsx(
                "transition-all duration-500",
                gradient && gradient == "true" ? "opacity-100" : "opacity-0",
              )}
            >
              <path
                d="M53.1808 27.2248L26.8545 8.3291L0.52832 27.2248V280.029H53.1808V27.2248Z"
                fill="url(#paint0_linear_2233_14908)"
              />
            </g>
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_2233_14908"
              x1={57.471}
              y1={13.355}
              x2={0.396658}
              y2={93.3541}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#54B9CF" />
              <stop offset={0.409548} stopColor="#547CCF" />
              <stop offset={1} stopColor="#A754CF" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </div>
    </div>
  );
}

export default VerticalBlock;
