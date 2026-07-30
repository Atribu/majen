function normalizeRouteSlug(raw = "") {
  return String(raw)
    .trim()
    .replace(/^\/+/, "")
    .replace(/^(en|tr)\//i, "")
    .replace(/^blog\//i, "")
    .replace(/^travertines?\//i, "")
    .toLowerCase();
}

function pageKeyFromSlug(routeSlug = "") {
  return String(routeSlug).replace(/-guide$/, "");
}

const BLOG_PAGE_KEYS = {
  en: {
    "travertine-guide": "travertine-guide",
    "travertine-tiles": "travertine-tiles",
    "travertine-slabs": "travertine-slabs",
    "travertine-blocks": "travertine-blocks",
    "travertine-pavers": "travertine-pavers",
    "travertine-mosaics": "travertine-mosaics",
    "polished-travertine": "polished-travertine",
    "honed-travertine": "honed-travertine",
    "tumbled-travertine": "tumbled-travertine",
    "brushed-travertine": "brushed-travertine",
    "filled-travertine": "filled-travertine",
    "unfilled-travertine": "unfilled-travertine",
    "ivory-travertine": "ivory-travertine",
    "light-travertine": "light-travertine",
    "antico-travertine": "antico-travertine",
    "travertine-flooring": "travertine-flooring",
    "travertine-cladding": "travertine-cladding",
    "travertine-facade": "travertine-facade",
    "travertine-bathroom": "travertine-bathroom",
    "travertine-kitchen": "travertine-kitchen",
    "travertine-pool": "travertine-pool",
    "travertine-turkey": "travertine-turkey",
    "turkish-travertine": "turkish-travertine",
    "travertine-quarry": "travertine-quarry",
    "travertine-supplier": "travertine-supplier",
    "travertine-exporter": "travertine-exporter",
    "travertine-manufacturer": "travertine-manufacturer",
    "travertine-distributor": "travertine-distributor",
  },
  tr: {
    "traverten-rehberi": "travertine-guide",
    "karo-traverten-rehberi": "travertine-tiles",
    "traverten-plakalar-rehberi": "travertine-slabs",
    "traverten-bloklar-rehberi": "travertine-blocks",
    "traverten-dosemeler-rehberi": "travertine-pavers",
    "traverten-mozaik-rehberi": "travertine-mosaics",
    "parlak-traverten-rehberi": "polished-travertine",
    "honlanmis-traverten": "honed-travertine",
    "eskitilmis-traverten": "tumbled-travertine",
    "fircalanmis-traverten": "brushed-travertine",
    "dolgulu-traverten": "filled-travertine",
    "dolgusuz-traverten": "unfilled-travertine",
    "fildisi-traverten": "ivory-travertine",
    "acik-traverten": "light-travertine",
    "antiko-traverten": "antico-travertine",
    "traverten-zemin-kaplama": "travertine-flooring",
    "traverten-kaplama": "travertine-cladding",
    "traverten-cephe": "travertine-facade",
    "traverten-banyo": "travertine-bathroom",
    "traverten-mutfak": "travertine-kitchen",
    "traverten-havuz": "travertine-pool",
    "turkiye-traverteni": "travertine-turkey",
    "turk-traverteni": "turkish-travertine",
    "traverten-ocagi": "travertine-quarry",
    "traverten-tedarikcisi": "travertine-supplier",
    "traverten-ihracatcisi": "travertine-exporter",
    "traverten-ureticisi": "travertine-manufacturer",
    "traverten-dagiticisi": "travertine-distributor",
  },
};

const BLOG_SLUG_BY_PAGE_KEY = {
  en: {
    "travertine-guide": "travertine-guide",
    "travertine-tiles": "travertine-tiles-guide",
    "travertine-slabs": "travertine-slabs-guide",
    "travertine-blocks": "travertine-blocks-guide",
    "travertine-pavers": "travertine-pavers-guide",
    "travertine-mosaics": "travertine-mosaics-guide",
    "polished-travertine": "polished-travertine-guide",
    "honed-travertine": "honed-travertine",
    "tumbled-travertine": "tumbled-travertine",
    "brushed-travertine": "brushed-travertine",
    "filled-travertine": "filled-travertine",
    "unfilled-travertine": "unfilled-travertine",
    "ivory-travertine": "ivory-travertine",
    "light-travertine": "light-travertine",
    "antico-travertine": "antico-travertine",
    "travertine-flooring": "travertine-flooring",
    "travertine-cladding": "travertine-cladding",
    "travertine-facade": "travertine-facade",
    "travertine-bathroom": "travertine-bathroom",
    "travertine-kitchen": "travertine-kitchen",
    "travertine-pool": "travertine-pool",
    "travertine-turkey": "travertine-turkey",
    "turkish-travertine": "turkish-travertine",
    "travertine-quarry": "travertine-quarry",
    "travertine-supplier": "travertine-supplier",
    "travertine-exporter": "travertine-exporter",
    "travertine-manufacturer": "travertine-manufacturer",
    "travertine-distributor": "travertine-distributor",
  },
  tr: {
    "travertine-guide": "traverten-rehberi",
    "travertine-tiles": "karo-traverten-rehberi",
    "travertine-slabs": "traverten-plakalar-rehberi",
    "travertine-blocks": "traverten-bloklar-rehberi",
    "travertine-pavers": "traverten-dosemeler-rehberi",
    "travertine-mosaics": "traverten-mozaik-rehberi",
    "polished-travertine": "parlak-traverten-rehberi",
    "honed-travertine": "honlanmis-traverten",
    "tumbled-travertine": "eskitilmis-traverten",
    "brushed-travertine": "fircalanmis-traverten",
    "filled-travertine": "dolgulu-traverten",
    "unfilled-travertine": "dolgusuz-traverten",
    "ivory-travertine": "fildisi-traverten",
    "light-travertine": "acik-traverten",
    "antico-travertine": "antiko-traverten",
    "travertine-flooring": "traverten-zemin-kaplama",
    "travertine-cladding": "traverten-kaplama",
    "travertine-facade": "traverten-cephe",
    "travertine-bathroom": "traverten-banyo",
    "travertine-kitchen": "traverten-mutfak",
    "travertine-pool": "traverten-havuz",
    "travertine-turkey": "turkiye-traverteni",
    "turkish-travertine": "turk-traverteni",
    "travertine-quarry": "traverten-ocagi",
    "travertine-supplier": "traverten-tedarikcisi",
    "travertine-exporter": "traverten-ihracatcisi",
    "travertine-manufacturer": "traverten-ureticisi",
    "travertine-distributor": "traverten-dagiticisi",
  },
};

export function resolveBlogPageKey(locale, slug) {
  const lang = String(locale || "en").toLowerCase().startsWith("tr") ? "tr" : "en";
  const base = pageKeyFromSlug(normalizeRouteSlug(slug));
  return BLOG_PAGE_KEYS[lang]?.[base] || null;
}

export function localizedBlogSlug(locale, pageKey) {
  const lang = String(locale || "en").toLowerCase().startsWith("tr") ? "tr" : "en";
  return BLOG_SLUG_BY_PAGE_KEY[lang]?.[pageKey] || null;
}

export function localizedBlogPath(locale, pageKey) {
  const lang = String(locale || "en").toLowerCase().startsWith("tr") ? "tr" : "en";
  const slug = localizedBlogSlug(lang, pageKey);
  return slug ? `/${lang}/${slug}` : `/${lang}`;
}
