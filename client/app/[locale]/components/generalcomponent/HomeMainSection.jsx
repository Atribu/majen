import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { localizedBlogPath } from "@/lib/blogPageRoutes";

const HomeMainSection = () => {
  const t = useTranslations("HomeMainSection");
  const locale = useLocale();

  return (
    <div className="flex w-screen items-center justify-center mt-6 lg:mt-16">
      <div className="flex flex-col max-w-[1400px] items-center justify-center text-center w-[95%] gap-2">
        <div className="w-full">
          <h1 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold leading-[110%]">
            {t("header")} - <span className="text-[#000]">{t("span")}</span>
          </h1>
        </div>

        <p className="text-[12px] md:text-[14px] lg:text-[18px] w-[97%] lg:w-[70%]">
          {t.rich("text", {
            fob: (chunks) => chunks,
            cif: (chunks) => chunks,

            // 🆕 travertine supplier from Turkey
            supplier: (chunks) => (
              <Link
                href={localizedBlogPath(locale, "travertine-supplier")}
                className="underline underline-offset-4 font-semibold"
              >
                {chunks}
              </Link>
            ),

            // 🆕 wholesale travertine from Turkey
            wholesale: (chunks) => (
              <Link
                href={localizedBlogPath(locale, "travertine-turkey")}
                className="underline underline-offset-4 font-semibold"
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

export default HomeMainSection;
