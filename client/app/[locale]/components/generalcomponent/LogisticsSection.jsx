import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { localizedBlogPath } from "@/lib/blogPageRoutes";

const LogisticSection = () => {
  const t = useTranslations("LogisticSection");
  const locale = useLocale();

  return (
    <div className="flex w-screen items-center justify-center lg:mt-10 mb-20 lg:mb-0 z-[99]">
      <div className="flex flex-col max-w-[1400px] items-center justify-center text-center">
        <h3 className="text-[24px] md:text-[26px] lg:text-[30px] font-bold">
          {t("header")}
        </h3>

        <p className="text-[12px] md:text-[11px] lg:text-[14px] w-[76.8%]">
          {t.rich("text", {
            fob: (chunks) => chunks,
            cif: (chunks) => chunks,

            // 🔗 yeni blog linkleri
            exp: (chunks) => (
              <Link
                href={localizedBlogPath(locale, "travertine-exporter")}
                className=" text-teal-700"
              >
                {chunks}
              </Link>
            ),
            docs: (chunks) => (
              <Link
                href={localizedBlogPath(locale, "travertine-exporter")}
                className=" text-teal-700"
              >
                {chunks}
              </Link>
            ),
            manu: (chunks) => (
              <Link
                href={localizedBlogPath(locale, "travertine-manufacturer")}
                className=" text-teal-700"
              >
                {chunks}
              </Link>
            ),
            dist: (chunks) => (
              <Link
                href={localizedBlogPath(locale, "travertine-distributor")}
                className=" text-teal-700"
              >
                {chunks}
              </Link>
            ),
            sup: (chunks) => (
              <Link
                href={localizedBlogPath(locale, "travertine-supplier")}
                className=" text-teal-700"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </div>
  );
};

export default LogisticSection;
