import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { companyPath } from "@/lib/companyPages";

const cards = [
  { key: "stonePhilosophy", image: "/images/homepage/anasayfa3.webp" },
  { key: "history", image: "/images/homepage/antikoarkplan.webp" },
  { key: "quarries", image: "/images/blogs/TravertineQuarry.webp" },
  { key: "stoneProcessing", image: "/images/blogs/Travertinemanufacturer.webp" },
];

export default async function CompanyHub({ locale }) {
  const t = await getTranslations({ locale, namespace: "CompanyPages" });

  return (
    <section className="bg-[#f5f3ee] py-14 md:py-20">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00877b]">
            {t("common.eyebrow")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            {t("hub.title")}
          </h2>
          <p className="mt-3 leading-7 text-neutral-600">{t("hub.text")}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map(({ key, image }) => (
            <Link
              key={key}
              href={companyPath(locale, key)}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white"
            >
              <div className="relative aspect-[16/8] overflow-hidden">
                <Image
                  src={image}
                  alt={t(`pages.${key}.hero.alt`)}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              </div>
              <div className="flex items-start justify-between gap-5 p-5 md:p-6">
                <div>
                  <h3 className="text-xl font-semibold">{t(`nav.${key}`)}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
                    {t(`pages.${key}.hero.subtitle`)}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
