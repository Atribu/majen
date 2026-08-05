export const COMPANY_PAGE_KEYS = [
  "overview",
  "stonePhilosophy",
  "history",
  "quarries",
  "stoneProcessing",
];

export const COMPANY_PATHS = {
  overview: {
    tr: "/tr/hakkimizda",
    en: "/en/about-us",
  },
  stonePhilosophy: {
    tr: "/tr/hakkimizda/tas-felsefemiz",
    en: "/en/about-us/stone-philosophy",
  },
  history: {
    tr: "/tr/hakkimizda/tarihcemiz",
    en: "/en/about-us/history",
  },
  quarries: {
    tr: "/tr/hakkimizda/traverten-ocaklarimiz",
    en: "/en/about-us/travertine-quarries",
  },
  stoneProcessing: {
    tr: "/tr/hakkimizda/tas-isleme",
    en: "/en/about-us/stone-processing",
  },
};

export function companyPath(locale, key) {
  const lang = locale === "tr" ? "tr" : "en";
  return COMPANY_PATHS[key]?.[lang] || COMPANY_PATHS.overview[lang];
}

export function companyKeyFromPath(pathname) {
  const normalized = String(pathname || "").replace(/\/$/, "") || "/";

  return (
    COMPANY_PAGE_KEYS.find((key) =>
      Object.values(COMPANY_PATHS[key]).includes(normalized)
    ) || null
  );
}
