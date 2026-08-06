// middleware.js
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing.js';
import { localizedBlogSlug, resolveBlogPageKey } from './lib/blogPageRoutes.js';

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
  'travertine-guide',    // en
  'traverten-rehberi',   // tr ✅
  'gallery',
  'galeri',
  'projects',
  'projeler',
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

function asciiTurkishPath(pathname) {
  const replacements = {
    ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u',
    Ç: 'C', Ğ: 'G', İ: 'I', Ö: 'O', Ş: 'S', Ü: 'U'
  };

  return pathname.replace(/[çğıöşüÇĞİÖŞÜ]/g, (char) => replacements[char]);
}

//---neww
const EN_TOKENS = /(travertine|slabs?|tiles?|blocks?|pavers?|vein-cut|cross-cut|filled|unfilled|honed|polished|brushed|tumbled|natural)(?:$|[-/])/i;

function enCutToTr(cut, product) {
  // vein-cut → damar-kesim; cross-cut → enine-kesim
  const cutTr = cut === 'vein-cut' ? 'damar-kesim' : 'enine-kesim';
  const prodTr = product === 'slabs' ? 'plakalar'
    : product === 'tiles' ? 'karolar'
    : product === 'blocks' ? 'bloklar'
    : product === 'pavers' ? 'dosemeler'
    : product;
  return `${cutTr}-traverten-${prodTr}`;
}

function enProcToTr(proc) {
  if (!proc) return null;
  const s = proc.toLowerCase();
  if (s === 'natural') return 'dogal';
  const [fill, p] = s.split('-'); // filled-honed
  const fillTr = fill === 'filled' ? 'dolgulu' : 'dolgusuz';
  const pTr = {honed:'honlanmis', polished:'cilali', brushed:'fircalanmis', tumbled:'eskitilmis', natural:'dogal'}[p] || p;
  return `${fillTr}-${pTr}`;
}

function trCutToEn(cut, product) {
  const cutEn = cut === 'damar-kesim' ? 'vein-cut' : 'cross-cut';
  const prodEn = product === 'plakalar' ? 'slabs'
    : product === 'karolar' ? 'tiles'
    : product === 'bloklar' ? 'blocks'
    : product === 'dosemeler' ? 'pavers'
    : product;
  return `${cutEn}-travertine-${prodEn}`;
}

function trProcToEn(proc) {
  if (!proc) return null;
  const s = proc.toLowerCase();
  if (s === 'dogal') return 'natural';
  const [fill, p] = s.split('-');
  const fillEn = fill === 'dolgulu' ? 'filled' : 'unfilled';
  const pEn = {honlanmis:'honed', cilali:'polished', fircalanmis:'brushed', eskitilmis:'tumbled', dogal:'natural'}[p] || p;
  return `${fillEn}-${pEn}`;
}

const CUT_EN = /^(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|pavers)$/i;
const CUT_TR = /^(damar-kesim|enine-kesim)-traverten-(plakalar|karolar|bloklar|dosemeler)$/i;


const PROC_CUT_WITH_PRODUCT_EN =
  /^((?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural)|natural)-(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|pavers)$/i;

const PROC_CUT_WITH_PRODUCT_TR =
  /^((?:dolgulu|dolgusuz)-(?:honlanmis|cilali|fircalanmis|eskitilmis|dogal)|dogal)-(damar-kesim|enine-kesim)-traverten-(plakalar|karolar|bloklar|dosemeler)$/i;


const PROC_ONLY_EN = /^(?:natural|(?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural))$/i;
const PROC_ONLY_TR = /^(?:dogal|(?:dolgulu|dolgusuz)-(?:honlanmis|cilali|fircalanmis|eskitilmis|dogal))$/i;

const VARIANT_PROCESS_EN = /^(.+?)-((?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural)|natural)-(vein-cut|cross-cut)-travertine-(slabs|tiles|pavers)$/i;
const VARIANT_PROCESS_TR = /^(.+?)-((?:dolgulu|dolgusuz)-(?:honlanmis|cilali|fircalanmis|eskitilmis|dogal)|dogal)-(damar-kesim|enine-kesim)-traverten-(plakalar|karolar|dosemeler)$/i;

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
  ['versailles-pattern', 'versailles-pattern'],
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

  if (!parts[0]) {
    return handleI18nRouting(req);
  }

  // Dil öneki olmayan anlamsız yolları ana sayfaya taşımak yerine geçerli
  // locale içindeki 404 akışına gönder. Adres değişmez, yanıt 404 kalır.
  if (!['en','tr'].includes(parts[0])) {
    url.pathname = '/tr/blog/__not-found__';
    return NextResponse.rewrite(url);
  }
  const locale = parts[0];

  // Türkçe URL standardı ASCII'dir. Eski Türkçe karakterli adresler aynı
  // içeriğin ASCII karşılığına kalıcı yönlendirilir; query string korunur.
  if (locale === 'tr') {
    let decodedPathname = url.pathname;
    try {
      decodedPathname = decodeURIComponent(url.pathname);
    } catch {
      // Geçersiz percent-encoding varsa mevcut 404 akışı karar versin.
    }
    const canonicalPathname = asciiTurkishPath(decodedPathname);
    if (canonicalPathname !== url.pathname) {
      const canonicalUrl = url.clone();
      canonicalUrl.pathname = canonicalPathname;
      return NextResponse.redirect(canonicalUrl, 301);
    }
  }

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
      if (locale === 'tr') {
        const [, cutType, productEn] = seg2.match(CUT_EN);
        return NextResponse.redirect(new URL(`/tr/${enCutToTr(cutType, productEn)}`, req.url), 301);
      }
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
      if (locale === 'en') {
        const [, cutTypeTr, productTr] = seg2.match(CUT_TR);
        return NextResponse.redirect(new URL(`/en/${trCutToEn(cutTypeTr, productTr)}`, req.url), 301);
      }
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
    const tail = parts.slice(2).join('/');
    if (locale === 'tr') {
      const canonical = `${enProcToTr(processSlug)}-${enCutToTr(cutType, productEn)}`;
      return NextResponse.redirect(new URL(`/tr/${canonical}${tail ? `/${tail}` : ''}`, req.url), 301);
    }
const productSeg  = locale === 'tr'
  ? (productEn === 'slabs'  ? 'slabs'
    : productEn === 'tiles' ? 'tiles'
    : productEn === 'blocks'? 'blocks'
    : productEn === 'pavers'? 'pavers'
    : productEn)
  : productEn;
    const cutSlugFull = `${cutType}-travertine-${productEn}`;
    url.pathname = `/${locale}/${FS_BASE}/${productSeg}/${cutSlugFull}/${processSlug}${tail ? `/${tail}` : ''}`;
    return NextResponse.rewrite(url);
  }

  // TR kısmını şöyle değiştirin (güvenli kontroller ile):
  m = seg2.match(PROC_CUT_WITH_PRODUCT_TR);
  if (m && m[1] && m[2] && m[3]) {  // ✅ Tüm grupların var olduğunu kontrol et
    let processSlug = m[1];
    const cutTypeTr = m[2];
    const productTr = m[3].toLowerCase();
    const tail = parts.slice(2).join('/');

    if (locale === 'en') {
      const canonical = `${trProcToEn(processSlug)}-${trCutToEn(cutTypeTr, productTr)}`;
      return NextResponse.redirect(new URL(`/en/${canonical}${tail ? `/${tail}` : ''}`, req.url), 301);
    }

    const EN2TR = { honed:'honlanmis', polished:'cilali', brushed:'fircalanmis', tumbled:'eskitilmis' };
    if (processSlug.toLowerCase() === 'natural') processSlug = 'dogal';
    processSlug = processSlug.replace(
      /(dolgulu|dolgusuz)-(honed|polished|brushed|tumbled)/i,
      (_, f, p) => `${f.toLowerCase()}-${EN2TR[p.toLowerCase()] || p.toLowerCase()}`
    );

    const cutSlugFull = `${cutTypeTr}-traverten-${productTr}`;
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
// 3) COLOR-FIRST / SIZE-FIRST kısa URL
if (parts.length >= 2) {
  const seg2 = parts[1];

  // Karşı dile ait varyant URL'si geldiyse renk/boyut ve varsa tail'i
  // koruyarak o dilin tam kanonik slug'ına 301 yönlendir.
  if (locale === 'tr') {
    const crossLocaleMatch = seg2.match(VARIANT_PROCESS_EN);
    if (crossLocaleMatch) {
      const [, head, processEn, cutEn, productEn] = crossLocaleMatch;
      const localizedHead = normalizeColorSlugForLocale('tr', head) || head;
      const localizedPath = `${localizedHead}-${enProcToTr(processEn)}-${enCutToTr(cutEn, productEn)}`;
      return NextResponse.redirect(
        new URL(`/tr/${localizedPath}${parts.length > 2 ? `/${parts.slice(2).join('/')}` : ''}`, req.url),
        301
      );
    }
  } else {
    const crossLocaleMatch = seg2.match(VARIANT_PROCESS_TR);
    if (crossLocaleMatch) {
      const [, head, processTr, cutTr, productTr] = crossLocaleMatch;
      const localizedHead = normalizeColorSlugForLocale('en', head) || head;
      const localizedPath = `${localizedHead}-${trProcToEn(processTr)}-${trCutToEn(cutTr, productTr)}`;
      return NextResponse.redirect(
        new URL(`/en/${localizedPath}${parts.length > 2 ? `/${parts.slice(2).join('/')}` : ''}`, req.url),
        301
      );
    }
  }

  const tokens = seg2.split('-');

  if (tokens.length >= 6) {
    const maybeLast5 = tokens.slice(-5).join('-');
    const last4      = tokens.slice(-4).join('-');

    // EN & TR için cut segmenti: ...-travertine-tiles/pavers vs ...-traverten-karolar/dosemeler
    const cutCandidate =
      (locale === 'tr' && /-traverten-pavers$/i.test(maybeLast5))
        ? maybeLast5
        : last4;

    const isCutEN = CUT_EN.test(cutCandidate);
    const isCutTR = CUT_TR.test(cutCandidate);

    if ((locale === 'en' && isCutEN) || (locale === 'tr' && isCutTR)) {
      // Ürün: slabs | tiles | blocks | pavers
      const productSeg = localizedProductFromCut(locale, cutCandidate);

      // HEAD (color/size) belirleme
      let headConsumed = 1;
      let headRaw = tokens[0]; // 'ivory' | '8x8' | 'versailles' ...

      // versailles-set / versailles-pattern iki token
      if (tokens.length >= 2) {
        const firstTwo = `${tokens[0]}-${tokens[1]}`.toLowerCase();
        if (firstTwo === 'versailles-set' || firstTwo === 'versailles-pattern') {
          headRaw = firstTwo;
          headConsumed = 2;
        }
      }

      // ① renk dene
      const colorSlug = normalizeColorSlugForLocale(locale, headRaw);

      // ② tiles/pavers ise size dene
      let sizeSlug = (!colorSlug && (productSeg === 'tiles' || productSeg === 'pavers'))
        ? normalizeTileSizeSlug(headRaw)
        : null;

      // process, head’i tükettikten sonra kalan kısımdan çıkarılmalı
      const cutLen = cutCandidate.split('-').length;
      const processTokens = tokens.slice(headConsumed, tokens.length - cutLen);
      const processSlug = processTokens.join('-');

      // process doğrulaması (EN/TR)
      const procOk = (locale === 'tr' ? PROC_ONLY_TR : PROC_ONLY_EN).test(processSlug);

      if (procOk && (colorSlug || sizeSlug)) {
     
        if (productSeg === 'pavers' && sizeSlug === 'versailles-set') {
          sizeSlug = 'versailles-pattern';
        }

        const leaf = colorSlug || sizeSlug; // tiles/pavers: size, diğerleri: color

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



// 4) BLOCKS: COLOR-ONLY kısa URL’ler
if (parts.length === 2) {
  const seg2 = parts[1];
  let m;

  if (locale === 'tr' && (m = seg2.match(BLOCKS_COLOR_EN))) {
    const colorSlug = normalizeColorSlugForLocale('tr', m[1]);
    if (colorSlug) {
      return NextResponse.redirect(new URL(`/tr/${colorSlug}-traverten-bloklar`, req.url), 301);
    }
  }

  if (locale === 'en' && (m = seg2.match(BLOCKS_COLOR_TR))) {
    const colorSlug = normalizeColorSlugForLocale('en', m[1]);
    if (colorSlug) {
      return NextResponse.redirect(new URL(`/en/${colorSlug}-travertine-blocks`, req.url), 301);
    }
  }

  // EN: /en/ivory-travertine-blocks → /en/travertine/blocks/ivory
  if (locale === 'en' && (m = seg2.match(BLOCKS_COLOR_EN))) {
    const colorRaw = m[1]; // ivory | light | antico
    const key = COLOR_KEY_FROM_ANY.get(colorRaw) || colorRaw;           // ivory|light|antico
    const colorSlug = COLOR_SLUG_BY_LOCALE.en[key] || key;             // ivory|light|antico
    url.pathname = `/${locale}/${FS_BASE}/blocks/${colorSlug}`;
    return NextResponse.rewrite(url);
  }

  // 🔴 Sende eksik olan kısım buydu:
  // TR: /tr/fildisi-traverten-bloklar → /tr/travertine/blocks/fildisi
  if (locale === 'tr' && (m = seg2.match(BLOCKS_COLOR_TR))) {
    const colorRaw = m[1]; // fildisi | acik | antiko
    const key = COLOR_KEY_FROM_ANY.get(colorRaw) || colorRaw;          // ivory|light|antico
    const colorSlug = COLOR_SLUG_BY_LOCALE.tr[key] || colorRaw;        // fildisi|acik|antiko
    url.pathname = `/${locale}/${FS_BASE}/blocks/${colorSlug}`;
    return NextResponse.rewrite(url);
  }

  // EN kısa slug'ları TR Türkçeye çeviren mevcut blok (aynen kalsın)
  if (locale === 'tr' && EN_TOKENS.test(url.pathname.slice(4))) {
    const seg2 = parts[1];
    const tail = parts.slice(2);

    // 1) sadece CUT
    let m = seg2.match(/^(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|pavers)$/i);
    if (m) {
      const cutTrFull = enCutToTr(m[1], m[2]);
      return NextResponse.redirect(
        new URL(`/tr/${cutTrFull}${tail.length ? '/' + tail.join('/') : ''}`, req.url),
        301
      );
    }

    // 2) PROC + CUT
    m = seg2.match(/^((?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural)|natural)-(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|pavers)$/i);
    if (m) {
      const procTr = enProcToTr(m[1]);
      const cutTrFull = enCutToTr(m[2], m[3]);
      return NextResponse.redirect(
        new URL(`/tr/${procTr}-${cutTrFull}${tail.length ? '/' + tail.join('/') : ''}`, req.url),
        301
      );
    }

    // 3) COLOR/SIZE + PROC + CUT
    m = seg2.match(/^([a-z0-9-]+)-((?:filled|unfilled)-(?:honed|polished|brushed|tumbled|natural)|natural)-(vein-cut|cross-cut)-travertine-(slabs|tiles|blocks|pavers)$/i);
    if (m) {
      const colorOrSize = m[1];
      const procTr = enProcToTr(m[2]);
      const cutTrFull = enCutToTr(m[3], m[4]);
      const colorKey = COLOR_KEY_FROM_ANY.get(colorOrSize);
      const headTr =
        colorKey
          ? COLOR_SLUG_BY_LOCALE.tr[colorKey]
          : normalizeTileSizeSlug(colorOrSize) || colorOrSize;
      return NextResponse.redirect(
        new URL(`/tr/${headTr}-${procTr}-${cutTrFull}${tail.length ? '/' + tail.join('/') : ''}`, req.url),
        301
      );
    }

    if (parts[1] === 'travertine') {
      url.pathname = '/tr/not-found';
      return NextResponse.rewrite(url);
    }
  }
}


  // 5) Ürün görünümlü ama whitelist dışı tekil slug’ı blog’a yolla
  if (parts.length === 2) {
    const slug = parts[1];
    const otherLocale = locale === 'tr' ? 'en' : 'tr';
    const otherPageKey = resolveBlogPageKey(otherLocale, slug);
    const localizedSlug = otherPageKey ? localizedBlogSlug(locale, otherPageKey) : null;

    if (localizedSlug && localizedSlug !== slug) {
      return NextResponse.redirect(new URL(`/${locale}/${localizedSlug}`, req.url), 301);
    }

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
