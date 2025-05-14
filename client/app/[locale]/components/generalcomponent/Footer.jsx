// app/components/Footer.jsx
"use client";

import Link from "next/link";
import {
  FaYoutube,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#F4E1C5] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center justify-center items-center lg:items-start lg:justify-start lg:text-start">
          {/* Logo & Sosyal */}
          <div>
            <h2 className="text-2xl font-serif">Majen</h2>
            <div className="flex space-x-4 mt-4 text-center justify-center items-center lg:items-start lg:justify-start lg:text-start">
              <Link href="#"><FaYoutube size={20} /></Link>
              <Link href="#"><FaTwitter size={20} /></Link>
              <Link href="#"><FaFacebook size={20} /></Link>
              <Link href="#"><FaLinkedin size={20} /></Link>
              <a
    href="https://api.whatsapp.com/send?phone=905335561092&text=Merhaba%20Majen%20ekibi!"
    target="_blank"
    rel="noopener noreferrer"
    className="whitespace-nowrap hidden sm:inline hover:underline"
  >
   <FaWhatsapp size={20}/>
  </a>
            </div>
            <p className="mt-6"> MAJEN MADENCİLİK ENERJİ SAN. VE TİC. A.Ş.</p>
          </div>

          {/* Adresler */}
          <div>
            <h3 className="text-base font-semibold uppercase">Address</h3>
            <p className="mt-2">
        
Fener Mah. Lara Cad. F Blok Muhsin Adıyaman Sitesi No:110 F/5 Muratpaşa/ANTALYA  <br/>
ANTALYA KURUMLAR V.D. 6101419027
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
