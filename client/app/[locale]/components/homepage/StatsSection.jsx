// app/components/StatsSection.jsx
"use client";

import { useState, useEffect } from "react";
import { FaProjectDiagram, FaSmile, FaUsers } from "react-icons/fa";
import { GrGroup } from "react-icons/gr"; //3.
import { GrDocumentText } from "react-icons/gr"; //1.
import { BsPersonRaisedHand, BsPersonArmsUp } from "react-icons/bs"; //2.

function Counter({ target, duration = 1500, className }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const next = Math.min(
        Math.floor((progress / duration) * target),
        target
      );
      setCount(next);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span className={className}>{count}</span>;
}

export default function StatsSection() {
  const stats = [
    { id: 1, icon: FaProjectDiagram, label: "Projects", value: 76 },
    { id: 2, icon: BsPersonArmsUp, label: "Happy clients", value: 362 },
    { id: 3, icon: FaUsers, label: "Team Members", value: 19 },
  ];

  return (
    <section className="bg-white py-16">
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 justify-center lg:justify-between">
        {/* Başlık */}
       <div className="w-[95%] items-center justify-center text-center lg:text-start lg:justify-start lg:items-start lg:w-[20%]">
       <h2 className="mt-1 text-3xl md:text-4xl lg:text-[48px] font-bold">
        Trusted by over 250{" "}
          <span className="relative inline-block">
            clients
            <span className="
              absolute left-0 -bottom-1
              w-full h-2
              bg-yellow-300
              skew-y-1
              -z-10
            " />
          </span>
        </h2>
        <p className="mt-4 text-gray-600">Experts to level up your business</p>
       </div>

        {/* İstatistikler */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 w-[95%] lg:w-[75%]">
          {stats.map(({ id, icon: Icon, label, value }) => (
            <div key={id} className="flex flex-col items-center">
              <Icon size={48} className="text-gray-700" />
              <Counter
                target={value}
                duration={1500}
                className="mt-4 text-3xl font-bold"
              />
              <span className="mt-1 text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
