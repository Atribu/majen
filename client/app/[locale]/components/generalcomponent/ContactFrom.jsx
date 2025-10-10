"use client";

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

export default function ContactFrom() {
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
    <section className="relative mt-7 lg:mt-12 mb-12">
      <div className="max-w-[1200px] mx-auto p-6 md:p-8 bg-white/80 backdrop-blur-sm shadow-sm text-center lg:text-start ">
        <header className="mb-2 lg:mb-6">
          <span className="text-[20px] md:text-[24px] font-semibold tracking-tight">
            {t("title")}
          </span>
          <p className="mt-2 text-neutral-600 text-[12px] md:text-[14px] lg:text-[16px]">{t("subtitle")}</p>
        </header>

        <form onSubmit={onSubmit} noValidate className=" ">
          {/* Honeypot: gizli alan */}
          <input
            type="text"
            name="company"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
            value={values.botField}
            onChange={(e) => setValues((s) => ({ ...s, botField: e.target.value }))}
          />

     <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-6 w-full">
  {/* Sol kolon: kısa alanlar */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="name">{t("fields.name")}</label>
              <input
                id="name"
                type="text"
                className={fieldClass}
                value={values.name}
                onChange={(e) => setValues((s) => ({ ...s, name: e.target.value }))}
                placeholder={t("placeholders.name")}
              />
              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="email">{t("fields.email")}</label>
              <input
                id="email"
                type="email"
                className={fieldClass}
                value={values.email}
                onChange={(e) => setValues((s) => ({ ...s, email: e.target.value }))}
                placeholder={t("placeholders.email")}
                inputMode="email"
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">{t("fields.phone")}</label>
              <input
                id="phone"
                type="tel"
                className={fieldClass}
                value={values.phone}
                onChange={(e) => setValues((s) => ({ ...s, phone: e.target.value }))}
                placeholder="+90 555 555 55 55"
                inputMode="tel"
              />
              <p className={helpClass}>{t("helps.phone")}</p>
            </div>

            <div>
              <label className={labelClass} htmlFor="subject">{t("fields.subject")}</label>
              <input
                id="subject"
                type="text"
                className={fieldClass}
                value={values.subject}
                onChange={(e) => setValues((s) => ({ ...s, subject: e.target.value }))}
                placeholder={t("placeholders.subject")}
              />
            </div>
          </div>

          <div className="mt-4 lg:mt-0 lg:pl-6">
    <label className={labelClass} htmlFor="message">{t("fields.message")}</label>
    <textarea
      id="message"
      rows={5}
      className={fieldClass + " lg:min-h-[140px]"}
      value={values.message}
      onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
      placeholder={t("placeholders.message")}
    />
    {errors.message && <p className={errorClass}>{errors.message}</p>}
  </div>
         </div>

          <div className="mt-4 flex items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => setValues((s) => ({ ...s, consent: e.target.checked }))}
              className="mt-1 h-4 w-4 rounded border-neutral-300 text-black focus:ring-black"
            />
            <label htmlFor="consent" className="text-[12px] lg:text-sm text-neutral-700">
              {t.rich("consent", {
                privacy: (chunks) => <Link href={base.privacy} className="underline">{chunks}</Link>,
                terms:   (chunks) => <Link href={base.terms} className="underline">{chunks}</Link>,
              })}
            </label>
          </div>
          {errors.consent && <p className={errorClass}>{errors.consent}</p>}

          <div className="mt-6 flex items-center justify-center lg:items-start lg:justify-start gap-3">
            <button
              type="submit"
              disabled={status.loading}
              className="inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-[13px] lg:text-sm font-semibold hover:bg-white hover:text-black border border-black transition"
            >
              {status.loading ? t("buttons.sending") : t("buttons.send")}
            </button>

            <a
              href={t("whatsapp.link")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-[13px] lg:text-sm font-semibold hover:bg-black hover:text-white transition"
            >
              {t("buttons.whatsapp")}
            </a>
          </div>

          {/* Durum mesajları */}
          {status.ok && (
            <p className="mt-4 text-[12px] lg:text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
              {t("status.success")}
            </p>
          )}
          {status.error && (
            <p className="mt-4 text-[12px] lg:text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {status.error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
