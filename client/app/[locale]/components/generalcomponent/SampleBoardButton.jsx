"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const initialValues = {
  name: "",
  email: "",
  company: "",
  country: "",
  phone: "",
  message: "",
  consent: false,
  botField: "",
};

const initialStatus = {
  loading: false,
  ok: false,
  error: "",
};

const fieldClass =
  "mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100";
const labelClass = "block text-sm font-medium text-neutral-800";
const errorClass = "mt-1 text-xs text-red-600";

export default function SampleBoardButton({ productTitle = "" }) {
  const t = useTranslations("SampleBoard");
  const locale = useLocale();
  const pathname = usePathname();
  const triggerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(initialStatus);
  const isDev = process.env.NODE_ENV !== "production";

  const legalPaths = locale?.startsWith("tr")
    ? { privacy: "/tr/gizlilik", terms: "/tr/kosullar" }
    : { privacy: "/en/privacy", terms: "/en/terms" };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !status.loading) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, status.loading]);

  const updateValue = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const closeModal = () => {
    if (status.loading) return;
    setOpen(false);
    setStatus(initialStatus);
    setErrors({});
    triggerRef.current?.focus();
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = t("errors.required");
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) nextErrors.email = t("errors.email");
    if (!values.company.trim()) nextErrors.company = t("errors.required");
    if (!values.country.trim()) nextErrors.country = t("errors.required");
    if (!values.consent) nextErrors.consent = t("errors.consent");
    return nextErrors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || values.botField) return;

    setStatus({ loading: true, ok: false, error: "" });

    const pageUrl = window.location.href;
    const pageLabel = productTitle || document.title || pathname;
    const requestMessage = [
      "Sample Board Request",
      `Product / Page: ${pageLabel}`,
      `Company: ${values.company.trim()}`,
      `Country: ${values.country.trim()}`,
      `Phone: ${values.phone.trim() || "-"}`,
      `Page URL: ${pageUrl}`,
      "",
      "Customer message:",
      values.message.trim() || "-",
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          subject: `[Sample Board Request] ${pageLabel}`,
          message: requestMessage,
          locale,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const message =
          data?.error === "mail_config_missing" && isDev
            ? t("errors.mailConfig")
            : t("errors.submit");
        throw new Error(message);
      }

      setStatus({ loading: false, ok: true, error: "" });
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setStatus({
        loading: false,
        ok: false,
        error: error instanceof Error ? error.message : t("errors.submit"),
      });
    }
  };

  const modal = open ? (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sample-board-title"
        aria-describedby="sample-board-description"
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 text-left text-neutral-900 shadow-2xl sm:p-7"
      >
        <button
          type="button"
          onClick={closeModal}
          disabled={status.loading}
          aria-label={t("buttons.close")}
          className="absolute right-4 top-3 rounded-full p-2 text-2xl leading-none text-neutral-500 transition hover:bg-neutral-100 hover:text-black disabled:opacity-50"
        >
          ×
        </button>

        {status.ok ? (
          <div className="py-8 text-center" role="status" aria-live="polite">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-2xl text-teal-800">
              ✓
            </div>
            <h2 id="sample-board-title" className="mt-4 text-2xl font-semibold">
              {t("status.successTitle")}
            </h2>
            <p id="sample-board-description" className="mx-auto mt-2 max-w-lg text-sm leading-6 text-neutral-600">
              {t("status.success")}
            </p>
            <button
              type="button"
              onClick={closeModal}
              className="mt-6 rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              {t("buttons.close")}
            </button>
          </div>
        ) : (
          <>
            <h2 id="sample-board-title" className="pr-10 text-2xl font-semibold">
              {t("title")}
            </h2>
            <p id="sample-board-description" className="mt-2 text-sm leading-6 text-neutral-600">
              {t("description")}
            </p>
            <div className="mt-3 rounded-lg bg-stone-50 px-3 py-2 text-xs text-stone-600">
              <span className="font-semibold">{t("productLabel")}:</span> {productTitle || pathname}
            </div>

            <form onSubmit={onSubmit} noValidate className="mt-5">
              <input
                type="text"
                name="company_website"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
                value={values.botField}
                onChange={(event) => updateValue("botField", event.target.value)}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="sample-name" className={labelClass}>{t("fields.name")}</label>
                  <input
                    id="sample-name"
                    autoFocus
                    value={values.name}
                    onChange={(event) => updateValue("name", event.target.value)}
                    placeholder={t("placeholders.name")}
                    className={fieldClass}
                  />
                  {errors.name && <p className={errorClass}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="sample-email" className={labelClass}>{t("fields.email")}</label>
                  <input
                    id="sample-email"
                    type="email"
                    inputMode="email"
                    value={values.email}
                    onChange={(event) => updateValue("email", event.target.value)}
                    placeholder={t("placeholders.email")}
                    className={fieldClass}
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="sample-company" className={labelClass}>{t("fields.company")}</label>
                  <input
                    id="sample-company"
                    value={values.company}
                    onChange={(event) => updateValue("company", event.target.value)}
                    placeholder={t("placeholders.company")}
                    className={fieldClass}
                  />
                  {errors.company && <p className={errorClass}>{errors.company}</p>}
                </div>
                <div>
                  <label htmlFor="sample-country" className={labelClass}>{t("fields.country")}</label>
                  <input
                    id="sample-country"
                    value={values.country}
                    onChange={(event) => updateValue("country", event.target.value)}
                    placeholder={t("placeholders.country")}
                    className={fieldClass}
                  />
                  {errors.country && <p className={errorClass}>{errors.country}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="sample-phone" className={labelClass}>{t("fields.phone")}</label>
                  <input
                    id="sample-phone"
                    type="tel"
                    inputMode="tel"
                    value={values.phone}
                    onChange={(event) => updateValue("phone", event.target.value)}
                    placeholder={t("placeholders.phone")}
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="sample-message" className={labelClass}>{t("fields.message")}</label>
                  <textarea
                    id="sample-message"
                    rows={3}
                    value={values.message}
                    onChange={(event) => updateValue("message", event.target.value)}
                    placeholder={t("placeholders.message")}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <input
                  id="sample-consent"
                  type="checkbox"
                  checked={values.consent}
                  onChange={(event) => updateValue("consent", event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-teal-700 focus:ring-teal-600"
                />
                <label htmlFor="sample-consent" className="text-xs leading-5 text-neutral-600 sm:text-sm">
                  {t.rich("consent", {
                    privacy: (chunks) => <Link href={legalPaths.privacy} className="underline">{chunks}</Link>,
                    terms: (chunks) => <Link href={legalPaths.terms} className="underline">{chunks}</Link>,
                  })}
                </label>
              </div>
              {errors.consent && <p className={errorClass}>{errors.consent}</p>}

              {status.error && (
                <div role="alert" aria-live="polite" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  <p className="font-semibold">{t("status.errorTitle")}</p>
                  <p className="mt-1">{status.error}</p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={status.loading}
                  className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-500 disabled:opacity-50"
                >
                  {t("buttons.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={status.loading}
                  className="rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status.loading ? t("buttons.sending") : t("buttons.submit")}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setStatus(initialStatus);
          setOpen(true);
        }}
        className="inline-flex items-center justify-center rounded-full bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 sm:text-sm"
      >
        {t("button")}
      </button>
      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
