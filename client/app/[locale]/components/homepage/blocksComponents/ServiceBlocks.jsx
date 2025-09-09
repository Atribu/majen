import React from "react";
// import noiseImage from "@/public/noise.png";
import Block8 from "./Icons/Block8";
import Block7 from "./Icons/Block7";
import Block1 from "./Icons/Block1";
import Block6 from "./Icons/Block6";
import Block2 from "./Icons/Block2";
import Orta from "./Icons/Orta";
import Block3 from "./Icons/Block3";
import Block5 from "./Icons/Block5";
import Block4 from "./Icons/Block4";
import clsx from "clsx";
import Image from "next/image";

function ServiceBlocks({ blocksOrder, blockPositions, mobile, rotate }) {
  return (
    <div
      className= {`w-full opacity-100 lg:col-span-1 lg:flex relative col-span-2 flex h-[500px] -rotate-90 overflow-hidden ${rotate ? "lg:rotate-0":"lg:-rotate-90"}`}>
      {/* <Image
        src={noiseImage}
        width={noiseImage.width}
        height={noiseImage.height}
        alt="Noise Image"
        className="absolute inset-0 z-[110] h-full mix-blend-multiply"
      /> */}
      <div className="relative h-full w-full lg:min-h-[515px] lg:overflow-hidden ">
        <div className={`ml-[-350px] h-full w-full  ${rotate ? "lg:ml-[-315px] xl:ml-[-175px]  2xl:ml-[-40px] 3xl:ml-[50px] 4xl:ml-[25px]":"lg:ml-[-315px]"}`}>
          <Block3
            gradient={blocksOrder[0] == "1" ? "true" : "false"}
            // className="absolute top-1/2 z-[20] -translate-y-[calc(50%+80px)] transition-all duration-500"
            className={clsx(
              "absolute top-1/2 transition-all duration-500",
              blockPositions[blocksOrder[7]],
            )}
          />
          <Block2
            gradient={blocksOrder[0] == "2" ? "true" : "false"}
            // className="absolute top-1/2 z-[40]  -translate-y-[calc(50%+160px)] transition-all duration-500"
            className={clsx(
              "absolute top-1/2 transition-all duration-500",
              blockPositions[blocksOrder[6]],
            )}
          />
          <Block1
            gradient={blocksOrder[0] == "3" ? "true" : "false"}
            // className="absolute top-1/2 z-[60] -translate-x-[146px] -translate-y-[calc(50%+80px)] transition-all duration-500"
            className={clsx(
              "absolute top-1/2 transition-all duration-500",
              blockPositions[blocksOrder[5]],
            )}
          />
          <Orta className="absolute top-1/2 z-[30] -translate-x-[82px] -translate-y-1/2 transition-all duration-500" />
          <Block8
            gradient={blocksOrder[0] == "4" ? "true" : "false"}
            // className="absolute top-1/2 z-[80] -translate-x-[210px] -translate-y-1/2 transition-all duration-500"
            className={clsx(
              "absolute top-1/2 transition-all duration-500",
              blockPositions[blocksOrder[4]],
            )}
          />
          <Block7
            gradient={blocksOrder[0] == "5" ? "true" : "false"}
            // className="absolute top-1/2 z-[70] -translate-x-[146px] -translate-y-[calc(50%-80px)] transition-all duration-500"
            className={clsx(
              "absolute top-1/2 transition-all duration-500",
              blockPositions[blocksOrder[3]],
            )}
          />
          <Block6
            gradient={blocksOrder[0] == "6" ? "true" : "false"}
            // className="absolute top-1/2 z-[50] -translate-x-[82px] -translate-y-[calc(50%-160px)] transition-all duration-500"
            className={clsx(
              "absolute top-1/2 transition-all duration-500",
              blockPositions[blocksOrder[2]],
            )}
          />
          <Block5
            gradient={blocksOrder[0] == "7" ? "true" : "false"}
            // className="absolute top-1/2 z-[10] -translate-x-[18px] -translate-y-[calc(50%-80px)] transition-all duration-500"
            className={clsx(
              "absolute top-1/2 transition-all duration-500",
              blockPositions[blocksOrder[1]],
            )}
          />
          <Block4
            gradient={blocksOrder[0] == "0" ? "true" : "false"}
            className={clsx(
              "absolute top-1/2 transition-all duration-500",
              blockPositions[blocksOrder[0]],
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceBlocks;