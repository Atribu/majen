// app/components/ContactSection.jsx
"use client";

import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
  botField: "", // honeypot
};

const fieldClass =
  "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-[15px] outline-none focus:border-black focus:ring-1 focus:ring-black transition";

const labelClass = "block text-sm font-medium text-neutral-800 mb-1";
const errorClass = "mt-1 text-xs text-red-600";
const helpClass = "mt-1 text-xs text-neutral-500";

export default function ContactSection() {
  const t = useTranslations("ContactForm");
    const locale = useLocale();
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ loading: false, ok: false, error: "" });
  
    const base = locale?.startsWith("tr") ? {
      privacy: "/tr/gizlilik",
      terms: "/tr/kosullar",
    } : {
      privacy: "/en/privacy",
      terms: "/en/terms",
    };
  
    function validate(v) {
      const e = {};
      if (!v.name.trim()) e.name = t("errors.required");
      if (!v.email.trim() || !/^\S+@\S+\.\S+$/.test(v.email)) e.email = t("errors.email");
      if (!v.message.trim() || v.message.trim().length < 10) e.message = t("errors.message");
      if (!v.consent) e.consent = t("errors.consent");
      return e;
      }
  
    async function onSubmit(e) {
      e.preventDefault();
      const eMap = validate(values);
      setErrors(eMap);
      if (Object.keys(eMap).length > 0) return;
  
      // honeypot (botField doluysa post etme)
      if (values.botField) return;
  
      setStatus({ loading: true, ok: false, error: "" });
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.phone,
            subject: values.subject,
            message: values.message,
            locale,
          }),
        });
  
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error || "Request failed");
        }
  
        setStatus({ loading: false, ok: true, error: "" });
        setValues(initialState);
      } catch (err) {
        setStatus({ loading: false, ok: false, error: t("errors.submit") });
      }
    }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-[88vh] items-center text-center lg:text-start lg:items-start gap-5 lg:gap-12 justify-center my-5">
        <h1 className="text-[30px] text-6xl font-bold mt-14">{t("title")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div>
          <h2 className="mt-0 lg:mt-4 text-2xl font-semibold">{t("getintouch")}</h2>
          <p className="mt-2 text-[14px] lg:text-base text-gray-700">
         {t("text")}
          </p>

          <div className="mt-8 space-y-6 flex flex-col items-center justify-center text-center lg:items-start lg:justify-start">
            <div className="flex items-start">
              <FaEnvelope className="text-2xl text-green-900 mt-1" />
              <div className="ml-4">
                <h3 className="text-sm font-semibold uppercase"> {t("emailaddress")}</h3>
                <p className="mt-1 text-gray-700 text-[14px] lg:text-base">info@majen.com.tr</p>
              </div>
            </div>

            <div className="flex items-start">
              <FaPhone className="text-2xl text-green-900 mt-1" />
              <div className="ml-4">
                <h3 className="text-sm font-semibold uppercase"> {t("phonenumber")}</h3>
                <p className="mt-1 text-gray-700 text-[14px] lg:text-base">+90 533 556 10 92</p>
              </div>
            </div>

            <div className="flex items-center lg:items-start text-center lg:text-start">
              <FaMapMarkerAlt className="text-2xl text-green-900 mt-1" />
              <div className="ml-4">
                <h3 className="text-sm font-semibold uppercase"> {t("ouraddress")}</h3>
                <p className="mt-1 text-gray-700 text-[14px] lg:text-base">Fener Mah. Lara Cad. F Blok Muhsin Adıyaman Sitesi No:110 F/5 Muratpaşa/ANTALYA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div>
          <form onSubmit={onSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t("fields.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                value={values.name}
                onChange={(e) => setValues((s) => ({ ...s, name: e.target.value }))}
                placeholder={t("placeholders.name")}
                  className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t("fields.phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={values.phone}
                onChange={(e) => setValues((s) => ({ ...s, phone: e.target.value }))}
                placeholder={t("placeholders.phone")}
                inputMode="tel"
                  className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t("fields.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                   value={values.email}
                onChange={(e) => setValues((s) => ({ ...s, email: e.target.value }))}
                placeholder={t("placeholders.email")}
                  className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    {t("fields.subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={values.subject}
                onChange={(e) => setValues((s) => ({ ...s, subject: e.target.value }))}
                placeholder={t("placeholders.subject")}
                  className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
               {t("fields.message")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                 value={values.message}
      onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
      placeholder={t("placeholders.message")}
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
                {t("labelText")}
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="lg:min-w-[150px] inline-flex justify-center bg-green-900 text-white py-2 lg:py-3 px-5 lg:px-6 rounded-md hover:bg-green-800 transition whitespace-nowrap"
              >
                {t("getintouch")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
