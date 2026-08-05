import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { COMPANY_PAGE_KEYS, companyPath } from "@/lib/companyPages";

export default async function CompanyNavigation({ locale, current = "overview" }) {
  const t = await getTranslations({ locale, namespace: "CompanyPages.nav" });

  return (
    <nav
      aria-label={locale === "tr" ? "Kurumsal sayfalar" : "Company pages"}
      className="border-b border-neutral-200 bg-white"
    >
      <div className="mx-auto flex max-w-[1180px] gap-1 overflow-x-auto px-5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center md:px-8">
        {COMPANY_PAGE_KEYS.map((key) => {
          const active = key === current;
          return (
            <Link
              key={key}
              href={companyPath(locale, key)}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-black bg-black text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 hover:text-black"
              }`}
            >
              {t(key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
