// app/components/ContactSection.jsx
"use client";

import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
  botField: "", // honeypot
};

const createInitialStatus = () => ({
  loading: false,
  ok: false,
  error: "",
});

const errorClass = "mt-1 text-xs text-red-600";
const passwordManagerIgnoreProps = {
  "data-lpignore": "true",
  "data-1p-ignore": "true",
};
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=Majen%20maden%20kume%20evleri%20No%3A102%2064902%20Sulumenli%20Ulubey%20Usak&z=14&output=embed";
const MAP_LINK_URL =
  "https://www.google.com/maps/place/Majen+maden,+k%C3%BCme+evleri+No:102,+64902+S%C3%BCl%C3%BCmenli%2FUlubey%2FU%C5%9Fak";

function FormSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[0, 1, 2, 3].map((item) => (
          <div key={item}>
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="mt-2 h-[42px] rounded-md bg-gray-100" />
          </div>
        ))}
      </div>
      <div>
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="mt-2 h-[120px] rounded-md bg-gray-100" />
      </div>
      <div className="h-10 w-40 rounded-md bg-gray-100" />
    </div>
  );
}

export default function ContactSection() {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(createInitialStatus);
  const isDev = process.env.NODE_ENV !== "production";

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
        const errorMessage =
          data?.error === "mail_config_missing" && isDev
            ? t("errors.mailConfig")
            : t("errors.submit");
        throw new Error(errorMessage);
      }

      setStatus({ loading: false, ok: true, error: "" });
      setErrors({});
      setValues(initialState);
    } catch (err) {
      setStatus({
        loading: false,
        ok: false,
        error: err instanceof Error ? err.message : t("errors.submit"),
      });
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!status.ok && !status.error) return undefined;

    const timer = window.setTimeout(() => {
      setStatus(createInitialStatus());
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [status.ok, status.error]);

  return (
    <section className="max-w-7xl mx-auto flex min-h-[88vh] flex-col items-center justify-center gap-5 px-4 py-5 text-center sm:px-6 lg:items-start lg:gap-12 lg:px-8 lg:text-start">
      <h1 className="mt-14 text-[30px] text-6xl font-bold">{t("title")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="mt-0 lg:mt-4 text-2xl font-semibold">{t("getintouch")}</h2>
          <p className="mt-2 text-[14px] lg:text-base text-gray-700">{t("text")}</p>

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
                <p className="mt-1 text-gray-700 text-[14px] lg:text-base">
                  Fener Mah. Lara Cad. F Blok Muhsin Adıyaman Sitesi No:110 F/5 Muratpaşa/ANTALYA
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {!mounted ? (
            <FormSkeleton />
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t("fields.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    {...passwordManagerIgnoreProps}
                    value={values.name}
                    onChange={(e) => setValues((s) => ({ ...s, name: e.target.value }))}
                    placeholder={t("placeholders.name")}
                    className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  {errors.name && <p className={errorClass}>{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t("fields.phone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    {...passwordManagerIgnoreProps}
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
                    {...passwordManagerIgnoreProps}
                    value={values.email}
                    onChange={(e) => setValues((s) => ({ ...s, email: e.target.value }))}
                    placeholder={t("placeholders.email")}
                    className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    {t("fields.subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    {...passwordManagerIgnoreProps}
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
                  rows={4}
                  {...passwordManagerIgnoreProps}
                  value={values.message}
                  onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
                  placeholder={t("placeholders.message")}
                  className="mt-1 block w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                {errors.message && <p className={errorClass}>{errors.message}</p>}
              </div>

              <div className="flex items-center">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => setValues((s) => ({ ...s, consent: e.target.checked }))}
                  className="h-4 w-4 text-green-900 focus:ring-green-700 border-gray-300 rounded"
                />
                <label htmlFor="consent" className="ml-2 text-sm text-gray-700">
                  {t("labelText")}
                </label>
              </div>
              {errors.consent && <p className={errorClass}>{errors.consent}</p>}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="lg:min-w-[150px] inline-flex justify-center bg-green-900 text-white py-2 lg:py-3 px-5 lg:px-6 rounded-md hover:bg-green-800 transition whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status.loading ? t("buttons.sending") : t("getintouch")}
                </button>

                <a
                  href={t("whatsapp.link")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center rounded-md border border-green-900 px-5 py-2 text-center text-sm font-semibold text-green-900 transition hover:bg-green-900 hover:text-white lg:min-w-[230px] lg:py-3"
                >
                  {t("buttons.replyWithin24Hours")}
                </a>
              </div>

              {(status.ok || status.error) && (
                <div
                  role={status.ok ? "status" : "alert"}
                  aria-live="polite"
                  className={`rounded-lg border px-4 py-3 text-left ${
                    status.ok
                      ? "border-green-200 bg-green-50 text-green-800"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  <p className="text-sm font-semibold">
                    {status.ok ? t("status.successTitle") : t("status.errorTitle")}
                  </p>
                  <p className="mt-1 text-sm">
                    {status.ok ? t("status.success") : status.error}
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-[28px] border border-stone-200 bg-stone-50 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-5 border-b border-stone-200 px-5 py-6 sm:px-7 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-stone-600">
              {t("map.badge")}
            </span>
            <h2 className="mt-3 text-2xl font-semibold text-stone-900">
              {t("map.title")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600 lg:text-base">
              {t("map.description")}
            </p>
          </div>

          <a
            href={MAP_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-green-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            {t("map.cta")}
          </a>
        </div>

        <div className="p-2 sm:p-3">
          <div className="overflow-hidden rounded-[24px] bg-white">
            <iframe
              title={t("map.title")}
              src={MAP_EMBED_URL}
              className="h-[320px] w-full md:h-[420px] lg:h-[460px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
