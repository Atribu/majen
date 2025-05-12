// app/components/KeyFeatures.jsx
"use client";

import {
  FaRulerCombined,
  FaPalette,
  FaCubes,
  FaLeaf,
  FaUserTie,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const features = [
  {
    title: "Unmatched Quality",
    description:
      "Our team of professionals will help you plan, design, and install your dream kitchen.",
    icon: FaRulerCombined,
  },
  {
    title: "Unique Designs",
    description:
      "Experience the difference with our top-notch kitchen planning, custom design, and installation services.",
    icon: FaPalette,
  },
  {
    title: "Extensive Material Range",
    description:
      "Save time and effort with our efficient kitchen planning, custom design, and installation solutions.",
    icon: FaCubes,
  },
  {
    title: "Customization Options",
    description:
      "Our team of professionals will help you plan, design, and install your dream kitchen.",
    icon: FiSettings,
  },
  {
    title: "Sustainable Sourcing",
    description:
      "Experience the difference with our top-notch kitchen planning, custom design, and installation services.",
    icon: FaLeaf,
  },
  {
    title: "Expert Guidance",
    description:
      "Save time and effort with our efficient kitchen planning, custom design, and installation solutions.",
    icon: FaUserTie,
  },
];

export default function KeyFeatures() {
  return (
    <section className="relative bg-black bg-cover bg-center text-white py-20">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <p className="text-sm uppercase tracking-wider text-gray-300">
          Our Key Features
        </p>
        <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold">
          Professional {" "}
  <span className="service-underline inline-block">
    Services
  </span>
        </h2>

        {/* Feature grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex flex-col items-start">
              <Icon size={48} className="mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-200 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
