// app/components/ContactSection.jsx
"use client";

import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-[88vh] items-start gap-5 lg:gap-12 justify-center">
        <h1 className="text-6xl font-bold">Contact Us</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div>
          <h2 className="mt-4 text-2xl font-semibold">Get in touch</h2>
          <p className="mt-2 text-base text-gray-700">
            Thank you for your interest in our services! If you have any questions 
            or would like to book a service, please don’t hesitate to contact us. 
            Our team is dedicated to providing you with the highest level of service 
            and support, and we are committed to working with you to make your business a success.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start">
              <FaEnvelope className="text-2xl text-green-900 mt-1" />
              <div className="ml-4">
                <h3 className="text-sm font-semibold uppercase">Email Address</h3>
                <p className="mt-1 text-gray-700">info@majen.com.tr</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaPhone className="text-2xl text-green-900 mt-1" />
              <div className="ml-4">
                <h3 className="text-sm font-semibold uppercase">Phone Number</h3>
                <p className="mt-1 text-gray-700">+90 533 556 10 92</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaMapMarkerAlt className="text-2xl text-green-900 mt-1" />
              <div className="ml-4">
                <h3 className="text-sm font-semibold uppercase">Our Address</h3>
                <p className="mt-1 text-gray-700">Fener Mah. Lara Cad. F Blok Muhsin Adıyaman Sitesi No:110 F/5 Muratpaşa/ANTALYA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name (required)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="your name..."
                  className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Your Phone (required)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="Phone"
                  className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Your E-mail (required)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your E-mail..."
                  className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject..."
                  className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message (required)
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Your Message"
                className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>

            <div className="flex items-center">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                className="h-4 w-4 text-green-900 focus:ring-green-700 border-gray-300 rounded"
              />
              <label htmlFor="consent" className="ml-2 text-sm text-gray-700">
                I consent to email tracking for a better experience.
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-[150px] inline-flex justify-center bg-green-900 text-white py-3 px-6 rounded-md hover:bg-green-800 transition"
              >
                Get in touch
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
