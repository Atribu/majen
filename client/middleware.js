// middleware.js
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing.js';

const handleI18nRouting = createMiddleware(routing, { localeDetection: false });

const FS_BASE = 'travertine';

const EN_PRODUCTS = new Set([
  'travertine-blocks',
  'travertine-slabs',
  'travertine-tiles',
  'travertine-pavers'
]);

const TR_PRODUCTS = new Set([
  'traverten-bloklar',
  'traverten-plakalar',
  'traverten-karolar',
  'traverten-dosemeler'
]);
const EXEMPT_TOP_LEVEL = new Set([
  'travertine-guide',
  'gallery',  // en
  'galeri',   // tr
]);

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

const CUT_EN = /^(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|pavers)$/i;
const CUT_TR = /^(damar-kesim|enine-kesim)-traverten-(plakalar|karolar|bloklar|dosemeler)$/i;


const PROC_CUT_WITH_PRODUCT_EN =
  /^((?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural)|natural)-(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|pavers)$/i;

const PROC_CUT_WITH_PRODUCT_TR =
  /^((?:dolgulu|dolgusuz)-(?:honlanmis|cilali|fircalanmis|eskitilmis)|dogal)-(damar-kesim|enine-kesim)-traverten-(plakalar|karolar|bloklar|dosemeler)$/i;


const PROC_ONLY_EN = /^(?:natural|(?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural))$/i;
const PROC_ONLY_TR = /^(?:dogal|(?:dolgulu|dolgusuz)-(?:honlanmis|cilali|fircalanmis|eskitilmis))$/i;

const BLOCKS_COLOR_EN = /^([a-z0-9-]+)-travertine-blocks$/i;
const BLOCKS_COLOR_TR = /^([a-z0-9-]+)-traverten-bloklar$/i;

function localizedProductFromCut(locale, cutSlug) {
  if (locale === 'tr') {
    if (/-traverten-plakalar$/i.test(cutSlug))     return 'slabs';
    if (/-traverten-karolar$/i.test(cutSlug))      return 'tiles';
    if (/-traverten-bloklar$/i.test(cutSlug))      return 'blocks';
    if (/-traverten-dosemeler$/i.test(cutSlug))       return 'pavers'; // yeni
  } else {
    if (/-travertine-slabs$/i.test(cutSlug))   return 'slabs';
    if (/-travertine-tiles$/i.test(cutSlug))   return 'tiles';
    if (/-travertine-blocks$/i.test(cutSlug))  return 'blocks';
    if (/-travertine-pavers$/i.test(cutSlug))  return 'pavers'; // yeni
  }
  return 'slabs';
}


  const TILE_SIZE_CANON = new Map([
  ['6x12', '6x12'],
  ['8x8', '8x8'],
  ['12x12', '12x12'],
  ['12x24', '12x24'],
  ['16x16', '16x16'],
  ['16x24', '16x24'],
  ['18x18', '18x18'],
  ['18x36', '18x36'],
  ['24x24', '24x24'],
  ['24x36', '24x36'],
  ['24x48', '24x48'],
  ['48x110', '48x110'],
  ['versailles-set', 'versailles-set'],
  ['versailles', 'versailles-set'],
]);

function normalizeTileSizeSlug(raw) {
  if (!raw) return null;
  let s = String(raw).trim().toLowerCase();

  // “12"×24"”, '12in x 24in', '12 x 24', '12×24' gibi yazımları yakala
  s = s
    .replace(/["“”]/g, "")         // inç işaretlerini kaldır
    .replace(/[×x]/g, "x")         // × → x
    .replace(/\s+/g, "");          // boşlukları kaldır

  // bilinen kalıpları doğrudan eşle
  if (TILE_SIZE_CANON.has(s)) return TILE_SIZE_CANON.get(s);

  // 12x24 gibi NxM kalıplarını doğrula (N ve M tamsayı)
  const m = s.match(/^(\d{1,3})x(\d{1,3})$/);
  if (m) return `${m[1]}x${m[2]}`;

  return null;
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
  ? (productEn === 'slabs'  ? 'plakalar'
    : productEn === 'tiles' ? 'karolar'
    : productEn === 'blocks'? 'bloklar'
    : productEn === 'pavers'? 'dosemeler'
    : productEn)
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
  if (m && m[1] && m[2] && m[3]) {  // ✅ Güvenli kontrol
    const processSlug = m[1];
    const cutType     = m[2];
    const productEn   = m[3].toLowerCase();
const productSeg  = locale === 'tr'
  ? (productEn === 'slabs'  ? 'slabs'
    : productEn === 'tiles' ? 'tiles'
    : productEn === 'blocks'? 'blocks'
    : productEn === 'pavers'? 'pavers'
    : productEn)
  : productEn;
    const cutSlugFull = `${cutType}-travertine-${productEn}`;
    const tail = parts.slice(2).join('/');
    url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${cutSlugFull}/${processSlug}${tail ? `/${tail}` : ''}`;
    return NextResponse.rewrite(url);
  }

  // TR kısmını şöyle değiştirin (güvenli kontroller ile):
  m = seg2.match(PROC_CUT_WITH_PRODUCT_TR);
  if (m && m[1] && m[2] && m[3]) {  // ✅ Tüm grupların var olduğunu kontrol et
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
    
    // ✅ İç route için EN key kullan
   const productSeg = 
  productTr === 'plakalar' ? 'slabs' :
  productTr === 'karolar'  ? 'tiles' :
  productTr === 'bloklar'  ? 'blocks' :
  productTr === 'dosemeler'   ? 'pavers' :
  'slabs';
    
    url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${cutSlugFull}/${processSlug}${tail ? `/${tail}` : ''}`;
    return NextResponse.rewrite(url);
  }
}

  // 3) COLOR-FIRST / SIZE-FIRST kısa URL
if (parts.length >= 2) {
  const seg2 = parts[1];
  const tokens = seg2.split('-');

  if (tokens.length >= 6) {
    const maybeLast5 = tokens.slice(-5).join('-');
    const last4      = tokens.slice(-4).join('-');
const cutCandidate =
  (locale === 'tr' && /-traverten-pavers$/i.test(maybeLast5)) ? maybeLast5 : last4;


    const isCutEN = CUT_EN.test(cutCandidate);
    const isCutTR = CUT_TR.test(cutCandidate);

    if ((locale === 'en' && isCutEN) || (locale === 'tr' && isCutTR)) {
         // Ürün: slabs | tiles | blocks | pavers
       const productSeg = localizedProductFromCut(locale, cutCandidate); 

       // HEAD (color/size) belirleme: versailles-set iki token!
      let headConsumed = 1;
      let headRaw = tokens[0];                    // 'ivory' | '8x8' | 'versailles' ...
      if (tokens.length >= 2 && `${tokens[0]}-${tokens[1]}`.toLowerCase() === 'versailles-set') {
        headRaw = 'versailles-set';
        headConsumed = 2;
      }
      // ① renk dene
      const colorSlug = normalizeColorSlugForLocale(locale, headRaw);
      // ② tiles/pavers ise size dene
      const sizeSlug = (!colorSlug && (productSeg === 'tiles' || productSeg === 'pavers'))
        ? normalizeTileSizeSlug(headRaw) // versailles | versailles-set -> versailles-set
        : null;

      // process, head’i tükettikten sonra kalan kısımdan çıkarılmalı
      const cutLen = cutCandidate.split('-').length;
      const processTokens = tokens.slice(headConsumed, tokens.length - cutLen);
      const processSlug = processTokens.join('-');

      // process doğrulaması (EN/TR)
      const procOk = (locale === 'tr' ? PROC_ONLY_TR : PROC_ONLY_EN).test(processSlug);


      // ürün tipi (iç rota için İngilizce key)
     

      if (procOk && (colorSlug || sizeSlug)) {
        const leaf = colorSlug || sizeSlug; // tiles→size, diğerleri→color

        if (parts.length === 3) {
          // opsiyonel kalınlık segmenti varsa
          const thickness = parts[2];
          url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${cutCandidate}/${processSlug}/${leaf}/${thickness}`;
        } else {
          url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${cutCandidate}/${processSlug}/${leaf}`;
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
