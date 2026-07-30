"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFoundContent() {
  const pathname = usePathname() || "";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const locale = isEnglish ? "en" : "tr";

  return (
    <main className="flex min-h-[65vh] w-full items-center justify-center px-5 py-20 text-center">
      <div className="max-w-xl">
        <p className="text-sm font-semibold tracking-[0.3em] text-teal-700">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-950 md:text-5xl">
          {isEnglish ? "Page not found" : "Sayfa bulunamadı"}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
          {isEnglish
            ? "The address may be incorrect, or the page may have been moved."
            : "Adres hatalı olabilir veya aradığınız sayfa taşınmış olabilir."}
        </p>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          {isEnglish ? "Return to homepage" : "Ana sayfaya dön"}
        </Link>
      </div>
    </main>
  );
}
