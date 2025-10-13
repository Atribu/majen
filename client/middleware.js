// middleware.js
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing.js';

// --- i18n (next-intl) middleware ---
const handleI18nRouting = createMiddleware(routing, { localeDetection: false });

/**
 * BLOG & ÜRÜN YOL YÖNETİMİ
 * - Blog: /{locale}/[slug] olarak çalışıyor (routing.js bunu map'liyor).
 * - Ürünler için kısa SEO URL’leri:
 *   /{locale}/vein-cut-travertine-slabs
 *   /{locale}/filled-honed-vein-cut-travertine-slabs
 *   /{locale}/filled-honed-vein-cut-travertine-slabs/ivory
 *   /{locale}/filled-honed-vein-cut-travertine-slabs/ivory/2cm
 *   /{locale}/{color}-{process}-{cut}            ← (YENİ) renk önde
 *   /{locale}/{color}-{process}-{cut}/{thickness}
 *   … TR karşılıkları da desteklenir.
 *
 * Kısa URL’leri iç dosya sistemi rotalarına REWRITE ederiz:
 *   /{locale}/travertine|traverten/{product}/{cut}
 *   /{locale}/travertine|traverten/{product}/{cut}/{process}
 *   /{locale}/travertine|traverten/{product}/{cut}/{process}/{color}
 *   /{locale}/travertine|traverten/{product}/{cut}/{process}/{color}/{thickness}
 */

const COLOR_KEY_FROM_ANY = new Map([
  // EN → key
  ['ivory', 'ivory'], ['light', 'light'], ['antico', 'antico'],
  // TR → key
  ['fildisi', 'ivory'], ['acik', 'light'], ['antiko', 'antico'],
]);
const COLOR_SLUG_BY_LOCALE = {
  en: { ivory: 'ivory', light: 'light', antico: 'antico' },
  tr: { ivory: 'fildisi', light: 'acik',  antico: 'antiko'  }
};
function normalizeColorSlugForLocale(locale, rawSlug) {
  const key = COLOR_KEY_FROM_ANY.get(String(rawSlug || '').toLowerCase());
  if (!key) return null; // bilinmeyen renk
  const lang = locale === 'tr' ? 'tr' : 'en';
  return COLOR_SLUG_BY_LOCALE[lang][key] || null;
}

// Ürün ana sayfaları whitelist (blog’a düşmemesi için)
const EN_PRODUCTS = new Set([
  'travertine-blocks',
  'travertine-slabs',
  'travertine-tiles',
  'travertine-special'
]);
const TR_PRODUCTS = new Set([
  'traverten-bloklar',
  'traverten-plakalar',
  'traverten-karolar',
  'traverten-ozel-tasarim'
]);

// Blogta üst düzey özel sayfalar (ürün rewrite’ına karışma)
const EXEMPT_TOP_LEVEL = new Set([
  'travertine-guide', // özel blog sayfan (örn: /en/travertine-guide)
]);


// --- COLOR + BLOCKS kısa SEO ---
// /{locale}/{color}-travertine-blocks  (EN)
// /{locale}/{color}-traverten-bloklar (TR)
const COLOR_BLOCKS_EN = /^([a-z-]+)-travertine-blocks$/i;
const COLOR_BLOCKS_TR = /^([a-z-]+)-traverten-bloklar$/i;

// Kısa CUT slug desenleri (EN/TR) – ürün tipi cut slug içinde gömülü
 const CUT_EN = /^(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|special)$/i;
 const CUT_TR = /^(damar-kesim|enine-kesim)-traverten-(plakalar|karolar|bloklar|ozel-tasarim)$/i;

// Process(+fill) + CUT **birleşik** desenleri (EN/TR)
// EN ör: filled-honed-vein-cut-travertine-slabs
 const PROC_CUT_WITH_PRODUCT_EN =
   /^((?:(?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural)))-(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|special)$/i;

// TR ör: dolgulu-honlanmis-damar-kesim-traverten-plakalar
// EN işlem adlarını da kabul et (honed|polished|brushed|tumbled) + "natural"
const PROC_CUT_WITH_PRODUCT_TR =
   /^((?:(?:dolgulu|dolgusuz)-(?:honlanmis|cilali|fircalanmis|eskitilmis|honed|polished|brushed|tumbled))|dogal|natural)-(damar-kesim|enine-kesim)-traverten-(plakalar|karolar|bloklar|ozel-tasarim)$/i;

// Sadece process (renk-önde kuralı için)
const PROC_ONLY_EN = /^(natural|(?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural))$/i;
// TR’de process-only kontrolü (color-first match için) — EN varyantlarını da kabul et
const PROC_ONLY_TR =
  /^(?:dogal|natural|(?:dolgulu|dolgusuz)-(?:honlanmis|cilali|fircalanmis|eskitilmis|honed|polished|brushed|tumbled|dogal|natural))$/i;

// Colors
const COLORS_EN = new Set(['ivory','light','antico']);
const COLORS_TR = new Set(['fildisi','acik','antiko']);

// ⚠️ FS tabanı: dosya sistemi her zaman "travertine"
const FS_BASE = 'travertine';

// Cut slug'ından **LOCALE’E UYGUN** ürün segmentini çıkar (EN: slabs/tiles, TR: plakalar/karolar)
function localizedProductFromCut(locale, cutSlug) {
  if (locale === 'tr') {
    if (/-traverten-plakalar$/i.test(cutSlug))       return 'plakalar';
    if (/-traverten-karolar$/i.test(cutSlug))        return 'karolar';
    if (/-traverten-bloklar$/i.test(cutSlug))        return 'bloklar';
    if (/-traverten-ozel-tasarim$/i.test(cutSlug))   return 'ozel-tasarim';
  } else {
    if (/-travertine-slabs$/i.test(cutSlug))   return 'slabs';
    if (/-travertine-tiles$/i.test(cutSlug))   return 'tiles';
    if (/-travertine-blocks$/i.test(cutSlug))  return 'blocks';
    if (/-travertine-special$/i.test(cutSlug)) return 'special';
  }
  return locale === 'tr' ? 'plakalar' : 'slabs';
}

// --- BLOCKS: COLOR-ONLY kısa URL’ler ---
// EN: /{locale}/{color}-travertine-blocks
// TR: /{locale}/{color}-traverten-bloklar
const BLOCKS_COLOR_EN = /^([a-z0-9-]+)-travertine-blocks$/i;
const BLOCKS_COLOR_TR = /^([a-z0-9-]+)-traverten-bloklar$/i;

export default function middleware(req) {
  const url = req.nextUrl;
  const parts = url.pathname.split('/').filter(Boolean); // ["en", "...", ...]
  const locale = parts[0];

  // i18n locale segmenti yoksa → i18n middleware'ine bırak
  if (!['en', 'tr'].includes(locale)) {
    return handleI18nRouting(req);
  }

  // İç rota kökü ise (travertine/traverten): dosya sistemi rotalarına zaten uyuyor → i18n'e bırak
  if (parts[1] === 'travertine' || parts[1] === 'traverten') {
    return handleI18nRouting(req);
  }

  // /{locale}/blog/... → blog'a dokunma
  if (parts[1] === 'blog') {
    return handleI18nRouting(req);
  }

  // Üst düzey (/{locale}/{slug}) istisnaları (tekil blog sayfaları)
  if (parts.length === 2 && EXEMPT_TOP_LEVEL.has(parts[1])) {
    return handleI18nRouting(req);
  }


  // Üst düzey travertine-* benzeri görünüm:
  // Ürün whitelist’te değilse → blog’a rewrite
  if (parts.length === 2) {
    const slug = parts[1];
    const looksLikeTrav =
      slug.startsWith('travertine-') || slug.startsWith('traverten-');
    const isWhitelistedProduct =
      (locale === 'en' && EN_PRODUCTS.has(slug)) ||
      (locale === 'tr' && TR_PRODUCTS.has(slug));
    if (looksLikeTrav && !isWhitelistedProduct) {
      url.pathname = `/${locale}/blog/${slug}`;
      return NextResponse.rewrite(url);
    }
  }

  // ------------------------------------------------------------
  // ✳️ (YENİ) COLOR-FIRST KISA URL
  //     /{locale}/{color}-{process}-{cut}
  //     /{locale}/{color}-{process}-{cut}/{thickness}
  // ------------------------------------------------------------
  if (parts.length >= 2) {
    const seg2 = parts[1]; // color-process-cut
    const tokens = seg2.split('-');

     if (tokens.length >= 6) {
    // EN'de cut 4 token; TR'de "ozel-tasarim" varsa 5 token.
    const maybeLast5 = tokens.slice(-5).join('-'); // ...-damar-kesim-traverten-ozel-tasarim
    const last4      = tokens.slice(-4).join('-'); // ...-damar-kesim-traverten-plakalar|karolar

    // Locale'e göre doğru adayı seç
    const cutCandidate =
      locale === 'tr' && /-traverten-ozel-tasarim$/i.test(maybeLast5)
        ? maybeLast5
        : last4;

    const isCutEN = CUT_EN.test(cutCandidate);
    const isCutTR = CUT_TR.test(cutCandidate);

      if ((locale === 'en' && isCutEN) || (locale === 'tr' && isCutTR)) {
        const rawColor    = tokens[0]; // ilk token (EN/TR olabilir)
          const processSlug = tokens.slice(1, tokens.length - cutCandidate.split('-').length).join('-'); // aradaki tüm tokenlar

         // Renk: EN ya da TR gelmiş olabilir → hedef locale’e çevir
        const colorSlug = normalizeColorSlugForLocale(locale, rawColor);
        const colorOk = !!colorSlug;
        const procOk  = (locale === 'tr' ? PROC_ONLY_TR : PROC_ONLY_EN).test(processSlug);

        if (colorOk && procOk) {
          const cutSlugFull = cutCandidate;
          const productSeg  = localizedProductFromCut(locale, cutSlugFull);
          const base        = FS_BASE;

          // opsiyonel thickness
          if (parts.length === 3) {
            const thickness = parts[2];
            url.pathname = `/${locale}/${base}/${productSeg}/${cutSlugFull}/${processSlug}/${colorSlug}/${thickness}`;
          } else {
            url.pathname = `/${locale}/${base}/${productSeg}/${cutSlugFull}/${processSlug}/${colorSlug}`;
          }
          return NextResponse.rewrite(url);
        }
      }
    }
  }

  // ------------------------------------------------------------
  // ✳️ PROCESS(+FILL)+CUT **TEK SEGMENT** KÖKLERİ (ve tail)
  //    /{locale}/[process]-[cut]-travertine-(slabs|tiles)[/(color[/thickness])]
  // ------------------------------------------------------------
  if (parts.length >= 2) {
    const seg2 = parts[1];

    // EN
    let m = seg2.match(PROC_CUT_WITH_PRODUCT_EN);
    if (m) {
      let processSlug = m[1];                 // natural | filled-honed ...
      const cutType     = m[2];                 // vein-cut | cross-cut
      const productEn   = m[3].toLowerCase();   // slabs | tiles
      const productSeg  = locale === 'tr'
        ? (productEn === 'slabs' ? 'plakalar' : 'karolar')
        : productEn;

      const cutSlugFull = `${cutType}-travertine-${productEn}`; // tam cut SEO slug
      const tail = parts.slice(2).join('/'); // color[/thickness] olabilir

       url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${cutSlugFull}/${processSlug}${tail ? `/${tail}` : ''}`;
      return NextResponse.rewrite(url);
    }

     // ✳️ BLOCKS renk kısa URL → FS rotasına rewrite
  //     /{locale}/{color}-travertine-blocks
  //     /{locale}/{color}-traverten-bloklar
  // FS: /{locale}/travertine/blocks/{color}
  if (parts.length === 2) {
    const seg2 = parts[1];
    let m;
    if (locale === 'en' && (m = seg2.match(BLOCKS_COLOR_EN))) {
      const rawColor = m[1];   // "ivory" | "light" | "antico" (veya ileride eklenecekler)
      url.pathname = `/${locale}/travertine/blocks/${rawColor}`;
      return NextResponse.rewrite(url);
    }
    if (locale === 'tr' && (m = seg2.match(BLOCKS_COLOR_TR))) {
      const color = m[1]; // fildisi|acik|antiko...
      url.pathname = `/${locale}/traverten/bloklar/damar-kesim-traverten-bloklar/dogal/${color}`;
      return NextResponse.rewrite(url);
    }
  }


    // TR
    m = seg2.match(PROC_CUT_WITH_PRODUCT_TR);
    if (m) {
      let processSlug = m[1];                 // dogal | dolgulu-honlanmis ...
      const cutTypeTr   = m[2];                 // damar-kesim | enine-kesim
      const productTr   = m[3].toLowerCase();   // plakalar | karolar
      const productSeg  = locale === 'tr'
        ? productTr
        : (productTr === 'plakalar' ? 'slabs' : 'tiles');

         // 🔁 İngilizce işlem adlarını TR’ye normalize et (rewrite’ı garantiye al)
    const EN2TR = {
      'honed': 'honlanmis',
      'polished': 'cilali',
      'brushed': 'fircalanmis',
      'tumbled': 'eskitilmis'
    };
    // natural → dogal
    if (processSlug.toLowerCase() === 'natural') {
      processSlug = 'dogal';
    } else {
      // "dolgulu-polished" gibi birleşik geldiyse sağdaki kısmı çevir
      processSlug = processSlug.replace(
        /(dolgulu|dolgusuz)-(honed|polished|brushed|tumbled)/i,
        (_, fill, proc) => `${fill.toLowerCase()}-${EN2TR[proc.toLowerCase()] || proc.toLowerCase()}`
      );
    }

      const cutSlugFull = `${cutTypeTr}-traverten-${productTr}`;
      const tail = parts.slice(2).join('/');

      url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${cutSlugFull}/${processSlug}${tail ? `/${tail}` : ''}`;
      return NextResponse.rewrite(url);
    }
  }

  // ------------------------------------------------------------
  // ✳️ CUT KÖKLERİ (tek segment) → derin route'a
  //    /{locale}/vein-cut-travertine-slabs
  // ------------------------------------------------------------
  if (parts.length === 2) {
    const seg2 = parts[1];
    if (CUT_EN.test(seg2) || CUT_TR.test(seg2)) {
      const productSeg = localizedProductFromCut(locale, seg2);
      url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${seg2}`;
      return NextResponse.rewrite(url);
    }
  }


  if (parts.length === 2) {
  const seg2 = parts[1];
  const m = locale === 'tr' ? seg2.match(COLOR_BLOCKS_TR) : seg2.match(COLOR_BLOCKS_EN);
  if (m) {
    const rawColor = m[1]; // "ivory" | "fildisi" gibi
    const colorSlug = normalizeColorSlugForLocale(locale, rawColor);
    if (colorSlug) {
      const productSeg = locale === 'tr' ? 'bloklar' : 'blocks';
      url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${colorSlug}`;
      return NextResponse.rewrite(url);
    }
  }
}

  // Diğer tüm yolları i18n middleware yönetsin (blog dahil)
  return handleI18nRouting(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
