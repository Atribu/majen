// lib/internalLinks.js

/** Blog slug'larını normalize et: baştaki / işaretini temizle */
function normalizeBlogSlug(raw) {
  return String(raw || "").replace(/^\/+/, ""); // "/travertine-tiles-guide" -> "travertine-tiles-guide"
}

/** Regex escape helper */
const escapeRx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** "travertine tiles" → /\btravertine\s+tiles\b/i */
function keywordToRegex(keyword) {
  const body = escapeRx(keyword).replace(/\s+/g, "\\s+");
  return new RegExp(`\\b${body}\\b`, "i");
}

/**
 * EN anahtar kelime → blog slug map'i (tamamı senin JSON'daki slug'lar)
 * Not: slug'ları aynen yazıyoruz, ister düz (`travertine-tiles-guide`),
 * ister "travertines/..." olsun; routing'te `/[locale]/blog/${slug}` ile gideceğiz.
 */
const BLOG_KEYWORD_TO_SLUG_EN = {
  // Genel rehber
  "travertine":               "travertine-guide",

  // Ürün tipleri
  "travertine tiles":         "travertine-tiles-guide",
  "travertine slabs":         "travertine-slabs-guide",
  "travertine blocks":        "travertine-blocks-guide",
  "travertine pavers":        "travertines/travertine-pavers-guide",
  "travertine mosaics":       "travertines/travertine-mosaics-guide",

  // Finishes
  "polished travertine":      "travertines/polished-travertine-guide",
  "honed travertine":         "travertines/honed-travertine",
  "tumbled travertine":       "travertines/tumbled-travertine",
  "brushed travertine":       "travertines/brushed-travertine",
  "filled travertine":        "travertines/filled-travertine",
  "unfilled travertine":      "travertines/unfilled-travertine",

  // Renkler
  "ivory travertine":         "travertines/ivory-travertine",
  "light travertine":         "travertines/light-travertine",
  "antico travertine":        "travertines/antico-travertine",

  // Uygulama alanları
  "travertine flooring":      "travertines/travertine-flooring",
  "travertine cladding":      "travertines/travertine-cladding",
  "travertine facade":        "travertines/travertine-facade",
  "travertine bathroom":      "travertines/travertine-bathroom",
  "travertine kitchen":       "travertines/travertine-kitchen",
  "travertine pool":          "travertines/travertine-pool",

  // Pazar / tedarik zinciri
  "travertine turkey":        "travertines/travertine-turkey",
  "turkish travertine":       "travertines/turkish-travertine",
  "travertine quarry":        "travertines/travertine-quarry",
  "travertine supplier":      "travertines/travertine-supplier",
  "travertine exporter":      "travertines/travertine-exporter",
  "travertine manufacturer":  "travertines/travertine-manufacturer",
  "travertine distributor":   "travertines/travertine-distributor",
};

/**
 * TR tarafında şimdilik aynı İngilizce slug'lara gidebiliriz.
 * İleride TR için ayrı blog slug'ların olursa sadece burayı değiştirmen yeterli.
 */
const BLOG_KEYWORD_TO_SLUG_TR = {
  // Genel
  "traverten":                     "travertine-guide",

  // Ürün tipleri
  "traverten karolar":             "travertine-tiles-guide",
  "traverten plakalar":            "travertine-slabs-guide",
  "traverten bloklar":             "travertine-blocks-guide",
  "traverten döşeme taşları":      "travertines/travertine-pavers-guide",
  "traverten mozaik":              "travertines/travertine-mosaics-guide",

  // Finishes
  "cilalı traverten":              "travertines/polished-travertine-guide",
  "honlanmış traverten":           "travertines/honed-travertine",
  "eskitilmiş traverten":          "travertines/tumbled-travertine",
  "fırçalanmış traverten":         "travertines/brushed-travertine",
  "dolgulu traverten":             "travertines/filled-travertine",
  "dolgusuz traverten":            "travertines/unfilled-travertine",

  // Renkler
  "ivory traverten":               "travertines/ivory-travertine",
  "light traverten":               "travertines/light-travertine",
  "antico traverten":              "travertines/antico-travertine",

  // Uygulama alanları
  "traverten zemin":               "travertines/travertine-flooring",
  "traverten kaplama":             "travertines/travertine-cladding",
  "traverten cephe":               "travertines/travertine-facade",
  "traverten banyo":               "travertines/travertine-bathroom",
  "traverten mutfak":              "travertines/travertine-kitchen",
  "traverten havuz kenarı":        "travertines/travertine-pool",

  // Pazar / tedarik zinciri
  "türkiye traverten":             "travertines/travertine-turkey",
  "türk traverteni":               "travertines/turkish-travertine",
  "traverten ocağı":               "travertines/travertine-quarry",
  "traverten tedarikçisi":         "travertines/travertine-supplier",
  "traverten ihracatçısı":         "travertines/travertine-exporter",
  "traverten üreticisi":           "travertines/travertine-manufacturer",
  "traverten distribütörü":        "travertines/travertine-distributor",
};

/**
 * InlineLinks için pattern dizisi üretir.
 * Son URL formatı: /{locale}/blog/{slug}
 */
export function buildBlogLinkPatterns(locale) {
  const lang = String(locale).toLowerCase().startsWith("tr") ? "tr" : "en";
  const table = lang === "tr" ? BLOG_KEYWORD_TO_SLUG_TR : BLOG_KEYWORD_TO_SLUG_EN;

  // Daha spesifik (daha uzun) keyword'leri önce işle
  const entries = Object.entries(table).sort(
    ([a], [b]) => b.length - a.length
  );

  return entries.map(([keyword, slug]) => ({
    pattern: keywordToRegex(keyword),
    href: `/${lang}/blog/${normalizeBlogSlug(slug)}`,
  }));
}
