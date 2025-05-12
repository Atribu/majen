// app/components/Footer.jsx
"use client";

import Link from "next/link";
import {
  FaYoutube,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#F4E1C5] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Sosyal */}
          <div>
            <h2 className="text-2xl font-serif">Majen</h2>
            <div className="flex space-x-4 mt-4">
              <Link href="#"><FaYoutube size={20} /></Link>
              <Link href="#"><FaTwitter size={20} /></Link>
              <Link href="#"><FaFacebook size={20} /></Link>
              <Link href="#"><FaLinkedin size={20} /></Link>
            </div>
          </div>

          {/* Adresler */}
          <div>
            <h3 className="text-base font-semibold uppercase">Casablanca</h3>
            <p className="mt-2">
              685 Saadien Ave, 2th Floor<br/>
              Casablanca, 1240 Morocco
            </p>

            <h3 className="text-base font-semibold uppercase mt-6">Marrakech</h3>
            <p className="mt-2">
              685 Happiness Ave, 6th Floor<br/>
              Marrakech, 6030 Morocco
            </p>
          </div>

          {/* Footer Menu 1 */}
          <div>
            <h3 className="text-base font-semibold uppercase">Footer Menu</h3>
            <ul className="mt-4 space-y-2">
              {["Home","Blog","About","Contact us"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:underline">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Menu 2 */}
          <div>
            <h3 className="text-base font-semibold uppercase">Footer Menu</h3>
            <ul className="mt-4 space-y-2">
              {["Home","Blog","About","Contact us"].map((item) => (
                <li key={item}>
                  <Link href="#"  className="hover:underline">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
