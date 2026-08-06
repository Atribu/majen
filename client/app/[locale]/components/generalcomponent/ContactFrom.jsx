"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { buildContactMailto } from "@/lib/contactMailto";

const initialState = {
  name: "",
  email: "",
  company: "",
  country: "",
  phone: "",
  productGroup: "",
  quantity: "",
  subject: "",
  message: "",
  consent: false,
  botField: "", // honeypot
};

const fieldClass =
  "w-full rounded-md border border-neutral-300 bg-white px-3 py-[5px] text-[15px] outline-none focus:border-black focus:ring-1 focus:ring-black transition";

const labelClass = "block text-sm font-medium text-neutral-800 mb-1";
const errorClass = "mt-1 text-xs text-red-600";
const helpClass = "mt-1 text-xs text-neutral-500";
const passwordManagerIgnoreProps = {
  "data-lpignore": "true",
  "data-1p-ignore": "true",
};

function FormSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-1 lg:grid-cols-2 md:gap-6 w-full animate-pulse"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div key={item}>
            <div className="mb-2 h-4 w-24 rounded bg-neutral-200" />
            <div className="h-[38px] rounded-md bg-neutral-100" />
          </div>
        ))}
      </div>

      <div className="mt-4 lg:mt-0 lg:pl-6">
        <div className="mb-2 h-4 w-28 rounded bg-neutral-200" />
        <div className="h-[270px] rounded-md bg-neutral-100" />
      </div>
    </div>
  );
}

export default function ContactFrom() {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const base = locale?.startsWith("tr")
    ? {
        privacy: "/tr/gizlilik",
        terms: "/tr/kosullar",
      }
    : {
        privacy: "/en/privacy",
        terms: "/en/terms",
      };

  function validate(v) {
    const e = {};
    if (!v.name.trim()) e.name = t("errors.required");
    if (!v.email.trim() || !/^\S+@\S+\.\S+$/.test(v.email)) e.email = t("errors.email");
    if (!v.company.trim()) e.company = t("errors.required");
    if (!v.country.trim()) e.country = t("errors.required");
    if (!v.productGroup) e.productGroup = t("errors.required");
    if (!v.message.trim() || v.message.trim().length < 10) e.message = t("errors.message");
    if (!v.consent) e.consent = t("errors.consent");
    return e;
  }

  function onSubmit(e) {
    e.preventDefault();
    const eMap = validate(values);
    setErrors(eMap);
    if (Object.keys(eMap).length > 0) return;

    // honeypot (botField doluysa post etme)
    if (values.botField) return;

    window.location.href = buildContactMailto({
      locale,
      values,
      pageUrl: window.location.href,
    });
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative mt-7 lg:mt-12 mb-12">
      <div className="max-w-[1100px] mx-auto p-6 md:p-8 bg-white/80 backdrop-blur-sm shadow-sm text-center lg:text-start ">
        <header className="mb-2 lg:mb-6">
          <span className="text-[20px] md:text-[24px] font-semibold tracking-tight">
            {t("title")}
          </span>
          <p className="mt-2 text-neutral-600 text-[12px] md:text-[14px] lg:text-[16px]">
            {t("subtitle")}
          </p>
        </header>

        {!mounted ? (
          <FormSkeleton />
        ) : (
          <form onSubmit={onSubmit} noValidate className=" ">
            {/* Honeypot: gizli alan */}
            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="hidden"
              value={values.botField}
              onChange={(e) => setValues((s) => ({ ...s, botField: e.target.value }))}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="name">
                    {t("fields.name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...passwordManagerIgnoreProps}
                    className={fieldClass}
                    value={values.name}
                    onChange={(e) => setValues((s) => ({ ...s, name: e.target.value }))}
                    placeholder={t("placeholders.name")}
                  />
                  {errors.name && <p className={errorClass}>{errors.name}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="email">
                    {t("fields.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...passwordManagerIgnoreProps}
                    className={fieldClass}
                    value={values.email}
                    onChange={(e) => setValues((s) => ({ ...s, email: e.target.value }))}
                    placeholder={t("placeholders.email")}
                    inputMode="email"
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="phone">
                    {t("fields.phone")}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...passwordManagerIgnoreProps}
                    className={fieldClass}
                    value={values.phone}
                    onChange={(e) => setValues((s) => ({ ...s, phone: e.target.value }))}
                    placeholder="+90 555 555 55 55"
                    inputMode="tel"
                  />
                  <p className={helpClass}>{t("helps.phone")}</p>
                </div>

                <div>
                  <label className={labelClass} htmlFor="company">
                    {t("fields.company")}
                  </label>
                  <input
                    id="company"
                    type="text"
                    {...passwordManagerIgnoreProps}
                    className={fieldClass}
                    value={values.company}
                    onChange={(e) => setValues((s) => ({ ...s, company: e.target.value }))}
                    placeholder={t("placeholders.company")}
                  />
                  {errors.company && <p className={errorClass}>{errors.company}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="country">
                    {t("fields.country")}
                  </label>
                  <input
                    id="country"
                    type="text"
                    {...passwordManagerIgnoreProps}
                    className={fieldClass}
                    value={values.country}
                    onChange={(e) => setValues((s) => ({ ...s, country: e.target.value }))}
                    placeholder={t("placeholders.country")}
                  />
                  {errors.country && <p className={errorClass}>{errors.country}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="productGroup">
                    {t("fields.productGroup")}
                  </label>
                  <select
                    id="productGroup"
                    className={fieldClass}
                    value={values.productGroup}
                    onChange={(e) => setValues((s) => ({ ...s, productGroup: e.target.value }))}
                  >
                    <option value="">{t("options.productPlaceholder")}</option>
                    <option value={t("options.blocks")}>{t("options.blocks")}</option>
                    <option value={t("options.slabs")}>{t("options.slabs")}</option>
                    <option value={t("options.tiles")}>{t("options.tiles")}</option>
                    <option value={t("options.pavers")}>{t("options.pavers")}</option>
                    <option value={t("options.other")}>{t("options.other")}</option>
                  </select>
                  {errors.productGroup && <p className={errorClass}>{errors.productGroup}</p>}
                </div>

                <div>
                  <label className={labelClass} htmlFor="quantity">
                    {t("fields.quantity")}
                  </label>
                  <input
                    id="quantity"
                    type="text"
                    {...passwordManagerIgnoreProps}
                    className={fieldClass}
                    value={values.quantity}
                    onChange={(e) => setValues((s) => ({ ...s, quantity: e.target.value }))}
                    placeholder={t("placeholders.quantity")}
                  />
                  <p className={helpClass}>{t("helps.quantity")}</p>
                </div>

                <div>
                  <label className={labelClass} htmlFor="subject">
                    {t("fields.subject")}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...passwordManagerIgnoreProps}
                    className={fieldClass}
                    value={values.subject}
                    onChange={(e) => setValues((s) => ({ ...s, subject: e.target.value }))}
                    placeholder={t("placeholders.subject")}
                  />
                </div>
              </div>

              <div className="mt-4 lg:mt-0 lg:pl-6">
                <label className={labelClass} htmlFor="message">
                  {t("fields.message")}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...passwordManagerIgnoreProps}
                  className={fieldClass + " lg:min-h-[270px]"}
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
                  privacy: (chunks) => (
                    <Link href={base.privacy} className="underline">
                      {chunks}
                    </Link>
                  ),
                  terms: (chunks) => (
                    <Link href={base.terms} className="underline">
                      {chunks}
                    </Link>
                  ),
                })}
              </label>
            </div>
            {errors.consent && <p className={errorClass}>{errors.consent}</p>}

            <div className="mt-6 flex flex-wrap items-center justify-center lg:items-start lg:justify-start gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-[13px] lg:text-sm font-semibold hover:bg-white hover:text-black border border-black transition"
              >
                {t("buttons.send")}
              </button>

              <a
                href={t("whatsapp.link")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-center text-[13px] leading-tight lg:text-sm font-semibold hover:bg-black hover:text-white transition"
              >
                {t("buttons.replyWithin24Hours")}
              </a>
            </div>

          </form>
        )}
      </div>
    </section>
  );
}
