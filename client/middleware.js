// middleware.js
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing.js';

const handleI18nRouting = createMiddleware(routing, { localeDetection: false });

const FS_BASE = 'travertine';

const EN_PRODUCTS = new Set(['travertine-blocks','travertine-slabs','travertine-tiles','travertine-special']);
const TR_PRODUCTS = new Set(['traverten-bloklar','traverten-plakalar','traverten-karolar','traverten-ozel-tasarim']);

const EXEMPT_TOP_LEVEL = new Set(['travertine-guide']);

const COLOR_KEY_FROM_ANY = new Map([
  ['ivory','ivory'], ['light','light'], ['antico','antico'],
  ['fildisi','ivory'], ['acik','light'], ['antiko','antico']
]);
const COLOR_SLUG_BY_LOCALE = {
  en: { ivory:'ivory', light:'light', antico:'antico' },
  tr: { ivory:'fildisi', light:'acik', antico:'antiko' }
};
function normalizeColorSlugForLocale(locale, raw) {
  const key = COLOR_KEY_FROM_ANY.get(String(raw||'').toLowerCase());
  if (!key) return null;
  return (locale === 'tr' ? COLOR_SLUG_BY_LOCALE.tr : COLOR_SLUG_BY_LOCALE.en)[key] || null;
}

const CUT_EN = /^(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|special)$/i;
const CUT_TR = /^(damar-kesim|enine-kesim)-traverten-(plakalar|karolar|bloklar|ozel-tasarim)$/i;

const PROC_CUT_WITH_PRODUCT_EN =
  /^((?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural)|natural)-(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|special)$/i;

const PROC_CUT_WITH_PRODUCT_TR =
  /^(?:dogal|natural|(?:dolgulu|dolgusuz)-(?:honlanmis|cilali|fircalanmis|eskitilmis|honed|polished|brushed|tumbled))-(damar-kesim|enine-kesim)-traverten-(plakalar|karolar|bloklar|ozel-tasarim)$/i;

const PROC_ONLY_EN = /^(?:natural|(?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural))$/i;
const PROC_ONLY_TR = /^(?:dogal|natural|(?:dolgulu|dolgusuz)-(?:honlanmis|cilali|fircalanmis|eskitilmis|honed|polished|brushed|tumbled|dogal|natural))$/i;

const BLOCKS_COLOR_EN = /^([a-z0-9-]+)-travertine-blocks$/i;
const BLOCKS_COLOR_TR = /^([a-z0-9-]+)-traverten-bloklar$/i;

function localizedProductFromCut(locale, cutSlug) {
  if (locale === 'tr') {
    if (/-traverten-plakalar$/i.test(cutSlug))     return 'plakalar';
    if (/-traverten-karolar$/i.test(cutSlug))      return 'karolar';
    if (/-traverten-bloklar$/i.test(cutSlug))      return 'bloklar';
    if (/-traverten-ozel-tasarim$/i.test(cutSlug)) return 'ozel-tasarim';
  } else {
    if (/-travertine-slabs$/i.test(cutSlug))   return 'slabs';
    if (/-travertine-tiles$/i.test(cutSlug))   return 'tiles';
    if (/-travertine-blocks$/i.test(cutSlug))  return 'blocks';
    if (/-travertine-special$/i.test(cutSlug)) return 'special';
  }
  return locale === 'tr' ? 'plakalar' : 'slabs';
}

export default function middleware(req) {
  const url = req.nextUrl;
  const parts = url.pathname.split('/').filter(Boolean); // ["tr","..."] / ["en","..."]

  if (!parts[0] || !['en','tr'].includes(parts[0])) {
    return handleI18nRouting(req);
  }
  const locale = parts[0];

  // İç FS kökü → artık uygulamaya geç
  if (parts[1] === FS_BASE) return NextResponse.next();

  // Public TR kökü
  if (parts[1] === 'traverten') return handleI18nRouting(req);

  // Blog kökü
  if (parts[1] === 'blog') return handleI18nRouting(req);

  // Tekil üst seviye istisnalar
  if (parts.length === 2 && EXEMPT_TOP_LEVEL.has(parts[1])) {
    return handleI18nRouting(req);
  }

  // 1) CUT kısa URL’leri
  if (parts.length === 2) {
    const seg2 = parts[1];

    if (CUT_EN.test(seg2)) {
      const productEn = localizedProductFromCut('en', seg2);
      const productSeg = (locale === 'tr')
        ? (productEn === 'slabs' ? 'plakalar'
          : productEn === 'tiles' ? 'karolar'
          : productEn === 'blocks' ? 'bloklar'
          : 'ozel-tasarim')
        : productEn;

      url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${seg2}`;
      return NextResponse.rewrite(url);
    }

    if (CUT_TR.test(seg2)) {
      const productTr = localizedProductFromCut('tr', seg2);
      url.pathname = `/${locale}/${FS_BASE}/${productTr}/${seg2}`;
      return NextResponse.rewrite(url);
    }
  }

  // 2) PROCESS+CUT kısa URL’ler (+tail)
  if (parts.length >= 2) {
    const seg2 = parts[1];

    // EN
    let m = seg2.match(PROC_CUT_WITH_PRODUCT_EN);
    if (m) {
      const processSlug = m[1];
      const cutType     = m[2];
      const productEn   = m[3].toLowerCase();
      const productSeg  = locale === 'tr'
        ? (productEn === 'slabs' ? 'plakalar'
          : productEn === 'tiles' ? 'karolar'
          : productEn === 'blocks' ? 'bloklar'
          : 'ozel-tasarim')
        : productEn;
      const cutSlugFull = `${cutType}-travertine-${productEn}`;
      const tail = parts.slice(2).join('/');
      url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${cutSlugFull}/${processSlug}${tail ? `/${tail}` : ''}`;
      return NextResponse.rewrite(url);
    }

    // TR
    m = seg2.match(PROC_CUT_WITH_PRODUCT_TR);
    if (m) {
      let processSlug = m[1];
      const cutTypeTr = m[2];
      const productTr = m[3].toLowerCase();

      const EN2TR = { honed:'honlanmis', polished:'cilali', brushed:'fircalanmis', tumbled:'eskitilmis' };
      if (processSlug.toLowerCase() === 'natural') processSlug = 'dogal';
      processSlug = processSlug.replace(
        /(dolgulu|dolgusuz)-(honed|polished|brushed|tumbled)/i,
        (_, f, p) => `${f.toLowerCase()}-${EN2TR[p.toLowerCase()] || p.toLowerCase()}`
      );

      const cutSlugFull = `${cutTypeTr}-traverten-${productTr}`;
      const tail = parts.slice(2).join('/');
      const productSeg = locale === 'tr'
        ? productTr
        : (productTr === 'plakalar' ? 'slabs'
          : productTr === 'karolar' ? 'tiles'
          : productTr === 'bloklar' ? 'blocks'
          : 'special');
      url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${cutSlugFull}/${processSlug}${tail ? `/${tail}` : ''}`;
      return NextResponse.rewrite(url);
    }
  }

  // 3) COLOR-FIRST kısa URL
  if (parts.length >= 2) {
    const seg2 = parts[1];
    const tokens = seg2.split('-');
    if (tokens.length >= 6) {
      const maybeLast5 = tokens.slice(-5).join('-');
      const last4      = tokens.slice(-4).join('-');
      const cutCandidate =
        locale === 'tr' && /-traverten-ozel-tasarim$/i.test(maybeLast5) ? maybeLast5 : last4;

      const isCutEN = CUT_EN.test(cutCandidate);
      const isCutTR = CUT_TR.test(cutCandidate);
      if ((locale === 'en' && isCutEN) || (locale === 'tr' && isCutTR)) {
        const rawColor    = tokens[0];
        const processSlug = tokens.slice(1, tokens.length - cutCandidate.split('-').length).join('-');
        const colorSlug   = normalizeColorSlugForLocale(locale, rawColor);
        const procOk      = (locale === 'tr' ? PROC_ONLY_TR : PROC_ONLY_EN).test(processSlug);
        if (colorSlug && procOk) {
          const productSeg = localizedProductFromCut(locale, cutCandidate);
          if (parts.length === 3) {
            const thickness = parts[2];
            url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${cutCandidate}/${processSlug}/${colorSlug}/${thickness}`;
          } else {
            url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${cutCandidate}/${processSlug}/${colorSlug}`;
          }
          return NextResponse.rewrite(url);
        }
      }
    }
  }

  // 4) BLOCKS: COLOR-ONLY kısa URL’ler  ✅ (fonksiyonun İÇİNDE!)
  if (parts.length === 2) {
    const seg2 = parts[1];
    let m;
    if (locale === 'en' && (m = seg2.match(BLOCKS_COLOR_EN))) {
      const color = m[1]; // antico|ivory|light
      url.pathname = `/${locale}/${FS_BASE}/blocks/${color}`;
      return NextResponse.rewrite(url);
    }
    if (locale === 'tr' && (m = seg2.match(BLOCKS_COLOR_TR))) {
      const color = m[1]; // antiko|fildisi|acik
      url.pathname = `/${locale}/${FS_BASE}/blocks/${color}`;
      return NextResponse.rewrite(url);
    }
  }

  // 5) Ürün görünümlü ama whitelist dışı tekil slug’ı blog’a yolla
  if (parts.length === 2) {
    const slug = parts[1];
    const looksLikeTrav = slug.startsWith('travertine-') || slug.startsWith('traverten-');
    const isWhitelisted = (locale === 'en' && EN_PRODUCTS.has(slug)) || (locale === 'tr' && TR_PRODUCTS.has(slug));
    if (looksLikeTrav && !isWhitelisted) {
      url.pathname = `/${locale}/blog/${slug}`;
      return NextResponse.rewrite(url);
    }
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
