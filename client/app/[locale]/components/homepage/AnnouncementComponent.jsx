import { useTranslations } from "next-intl";

const HASHTAGS = [
  {
    translationKey: "marmomac",
    instagramSlug: "marmomac2026",
  },
  {
    translationKey: "chiaro",
    instagramSlug: "chiarostone",
  },
  {
    translationKey: "naturalStone",
    instagramSlug: "naturalstone",
  },
  {
    translationKey: "majen",
    instagramSlug: "majen",
  },
];

const strongText = (chunks) => (
  <strong className="font-semibold text-stone-900">{chunks}</strong>
);

export default function AnnouncementComponent() {
  const t = useTranslations("Announcement");

  return (
    <section
      aria-labelledby="marmomac-announcement-title"
      className="px-5 py-6 sm:px-8 lg:py-9 mt-2 md:mt-5 lg:mt-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden border border-stone-300/80 bg-white px-6 py-7 shadow-sm sm:px-9 sm:py-9 lg:px-12">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1 bg-[#8b7355]"
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-4xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="bg-[#2f3a32] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white uppercase">
                  {t("badge")}
                </span>

                <span className="text-sm text-stone-600">
                  {t("dateLocation")}
                </span>
              </div>

              <h2
                id="marmomac-announcement-title"
                className="font-semibold text-2xl text-stone-900 sm:text-3xl"
              >
                {t("title")}
              </h2>

              <div className="mt-4 space-y-3 text-sm leading-7 text-stone-700 sm:text-base">
                <p>
                  {t.rich("intro", {
                    strong: strongText,
                  })}
                </p>

                <p>
                  {t.rich("collections", {
                    strong: strongText,
                  })}
                </p>

                <p>{t("invitation")}</p>
              </div>

              <div
                aria-label={t("hashtagsLabel")}
                className="mt-5 flex flex-wrap gap-x-4 gap-y-2"
              >
                {HASHTAGS.map((hashtag) => (
                  <a
                    key={hashtag.instagramSlug}
                    href={`https://www.instagram.com/explore/tags/${hashtag.instagramSlug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#786044] transition-colors hover:text-stone-950 hover:underline"
                  >
                    {t(`hashtags.${hashtag.translationKey}`)}
                  </a>
                ))}
              </div>
            </div>

            <div className="shrink-0 border-t border-stone-200 pt-5 lg:w-48 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <p className="text-xs tracking-[0.16em] text-stone-500 uppercase">
                {t("saveTheDate")}
              </p>

              <p className="mt-2 text-xl font-semibold text-stone-900">
                {t("date")}
              </p>

              <p className="mt-1 text-sm text-stone-600">{t("location")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}