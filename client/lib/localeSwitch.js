// lib/localeSwitch.js
import { baseFor, productKeyFromSlug, productSlugFor } from "@/lib/travertine";

/**
 * TR/EN arasında travertine rota paramlarını çevirerek yeni href üretir.
 * Örn: /tr/travertenler/plakalar/blaundos-antiko
 *   →  /en/travertines/slabs/blaundos-antiko
 *
 * @param {string} currentLocale - mevcut locale (tr|en)
 * @param {string} targetLocale  - hedef locale (tr|en)
 * @param {object} params        - dinamik segmentler
 * @returns {string|null}
 */
export function buildLocalizedTravertineHref(currentLocale, targetLocale, params = {}) {
  const { product, variant, cut, process, finish, size } = params;
  if (!product) return null; // travertine rotasında değilsek

  // 1) Mevcut dildeki product slug → canonical key (block|slabs|tiles|special)
  const key = productKeyFromSlug(currentLocale, product);

  // 2) Canonical key → hedef dil slug
  const productSlugTarget = productSlugFor(targetLocale, key);

  // 3) Base segment (travertine|traverten) hedef dile göre
  const baseTarget = baseFor(targetLocale);

  // 4) Derin segmentleri koru
  const tail = [variant, cut, process, finish, size].filter(Boolean);

  const prefix = `/${targetLocale}/${baseTarget}/${productSlugTarget}`;
  return tail.length ? `${prefix}/${tail.join("/")}` : prefix;
}
