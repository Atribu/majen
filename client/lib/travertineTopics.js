// app/lib/travertineTopics.js
export const GROUPS = {
  product: { en: "Product Type", tr: "Ürün Tipi" },
  finish:  { en: "Finish", tr: "Ürün Özelliği / Finish" },
  color:   { en: "Colors / Varieties", tr: "Renk / Çeşit" },
  app:     { en: "Applications", tr: "Kullanım Alanı" },
  supply:  { en: "Supply & Location", tr: "Lokasyon / Tedarik" }
};

// Tek seviye slug (/[locale]/travertine/[topic]) — slug’lar locale’e göre değişir
export const TOPICS = [
  // Product
  { key: "tiles",   group: "product", en:{slug:"tiles",   label:"Travertine Tiles"},   tr:{slug:"karolar",      label:"Traverten Karolar"} },
  { key: "slabs",   group: "product", en:{slug:"slabs",   label:"Travertine Slabs"},   tr:{slug:"plakalar",     label:"Traverten Plakalar"} },
  { key: "blocks",  group: "product", en:{slug:"blocks",  label:"Travertine Blocks"},  tr:{slug:"bloklar",      label:"Traverten Bloklar"} },
  { key: "pavers",  group: "product", en:{slug:"pavers",  label:"Travertine Pavers"},  tr:{slug:"parke-taslari",label:"Traverten Parke Taşları"} },
  { key: "mosaics", group: "product", en:{slug:"mosaics", label:"Travertine Mosaics"}, tr:{slug:"mozaikler",    label:"Traverten Mozaikler"} },

  // Finish
  { key: "polished",  group: "finish", en:{slug:"polished",  label:"Polished Travertine"},  tr:{slug:"parlatilmis", label:"Parlatılmış Traverten"} },
  { key: "honed",     group: "finish", en:{slug:"honed",     label:"Honed Travertine"},     tr:{slug:"honlanmis",   label:"Honlanmış Traverten"} },
  { key: "tumbled",   group: "finish", en:{slug:"tumbled",   label:"Tumbled Travertine"},   tr:{slug:"eskitilmis",  label:"Eskitilmiş Traverten"} },
  { key: "brushed",   group: "finish", en:{slug:"brushed",   label:"Brushed Travertine"},   tr:{slug:"fircalanmis", label:"Fırçalanmış Traverten"} },
  { key: "filled",    group: "finish", en:{slug:"filled",    label:"Filled Travertine"},    tr:{slug:"dolgulu",     label:"Dolgulu Traverten"} },
  { key: "unfilled",  group: "finish", en:{slug:"unfilled",  label:"Unfilled Travertine"},  tr:{slug:"dolgusuz",    label:"Dolgusuz Traverten"} },

  // Color
  { key: "ivory",   group: "color", en:{slug:"ivory",   label:"Ivory Travertine"},   tr:{slug:"fildisi", label:"Fildişi Traverten"} },
  { key: "silver",  group: "color", en:{slug:"silver",  label:"Silver Travertine"},  tr:{slug:"gumus",   label:"Gümüş Traverten"} },
  { key: "classic", group: "color", en:{slug:"classic", label:"Classic Travertine"}, tr:{slug:"klasik",  label:"Klasik Traverten"} },

  // Application
  { key: "flooring", group: "app", en:{slug:"flooring", label:"Travertine Flooring"}, tr:{slug:"zemin",   label:"Traverten Zemin"} },
  { key: "cladding", group: "app", en:{slug:"cladding", label:"Travertine Cladding"}, tr:{slug:"kaplama", label:"Traverten Kaplama"} },
  { key: "facade",   group: "app", en:{slug:"facade",   label:"Travertine Facade"},   tr:{slug:"cephe",   label:"Traverten Cephe"} },
  { key: "bathroom", group: "app", en:{slug:"bathroom", label:"Travertine Bathroom"}, tr:{slug:"banyo",   label:"Traverten Banyo"} },
  { key: "kitchen",  group: "app", en:{slug:"kitchen",  label:"Travertine Kitchen"},  tr:{slug:"mutfak",  label:"Traverten Mutfak"} },
  { key: "pool",     group: "app", en:{slug:"pool",     label:"Travertine Pool"},     tr:{slug:"havuz",   label:"Traverten Havuz"} },

  // Supply
  { key: "turkey",             group: "supply", en:{slug:"turkey",             label:"Travertine Turkey"},        tr:{slug:"turkiye",          label:"Traverten Türkiye"} },
  { key: "turkish-travertine", group: "supply", en:{slug:"turkish-travertine", label:"Turkish Travertine"},       tr:{slug:"turk-traverten",   label:"Türk Traverteni"} },
  { key: "quarry",             group: "supply", en:{slug:"quarry",             label:"Travertine Quarry"},        tr:{slug:"ocak",             label:"Traverten Ocağı"} },
  { key: "supplier",           group: "supply", en:{slug:"supplier",           label:"Travertine Supplier"},      tr:{slug:"tedarikci",        label:"Traverten Tedarikçisi"} },
  { key: "exporter",           group: "supply", en:{slug:"exporter",           label:"Travertine Exporter"},      tr:{slug:"ihracatci",        label:"Traverten İhracatçısı"} },
  { key: "manufacturer",       group: "supply", en:{slug:"manufacturer",       label:"Travertine Manufacturer"},  tr:{slug:"uretici",          label:"Traverten Üreticisi"} },
  { key: "distributor",        group: "supply", en:{slug:"distributor",        label:"Travertine Distributor"},   tr:{slug:"dagitici",         label:"Traverten Dağıtıcısı"} }
];

// Yardımcılar
export function byLocaleSlug(locale, topic) {
  return locale.startsWith("tr") ? topic.tr.slug : topic.en.slug;
}
export function byLocaleLabel(locale, topic) {
  return locale.startsWith("tr") ? topic.tr.label : topic.en.label;
}
export function findBySlug(locale, slug) {
  return TOPICS.find(t => (locale.startsWith("tr") ? t.tr.slug : t.en.slug) === slug);
}
export function topicsByGroup() {
  return TOPICS.reduce((acc, t) => {
    (acc[t.group] ||= []).push(t);
    return acc;
  }, {});
}
