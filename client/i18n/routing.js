// i18n/routing.js
import { defineRouting } from 'next-intl/routing';


export const config = {
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  // localeDetection: true,
  localePrefix: 'always',
  pathnames: {
    '/': {
      tr: '/',
      en: '/',
    },

    '/contactus': {
      tr: '/iletisim',
      en: '/contactus',
    },

    // Base & product & variant
    '/travertine': {
      en: '/travertines',
      tr: '/travertenler',
    },
    
    '/travertine/[product]': {
      en: '/travertines/[product]',
      tr: '/travertenler/[product]',
    },
    '/travertine/[product]/[variant]': {
      en: '/travertines/[product]/[variant]',
      tr: '/travertenler/[product]/[variant]',
    },

    // --- NEW: deep routes (cut → process → finish → size)
    '/travertine/[product]/[variant]/[cut]': {
      en: '/travertines/[product]/[variant]/[cut]',
      tr: '/travertenler/[product]/[variant]/[cut]',
    },
    '/travertine/[product]/[variant]/[cut]/[process]': {
      en: '/travertines/[product]/[variant]/[cut]/[process]',
      tr: '/travertenler/[product]/[variant]/[cut]/[process]',
    },
    '/travertine/[product]/[variant]/[cut]/[process]/[finish]': {
      en: '/travertines/[product]/[variant]/[cut]/[process]/[finish]',
      tr: '/travertenler/[product]/[variant]/[cut]/[process]/[finish]',
    },
    '/travertine/[product]/[variant]/[cut]/[process]/[finish]/[size]': {
      en: '/travertines/[product]/[variant]/[cut]/[process]/[finish]/[size]',
      tr: '/travertenler/[product]/[variant]/[cut]/[process]/[finish]/[size]',
    },

      '/howweexport': {
      en: '/how-we-export',
      tr: '/nasıl-ihracat-yapıyoruz',
    },

      '/howweexport/fob': {
      en: '/how-we-export/fob',
      tr: '/nasıl-ihracat-yapıyoruz/fob',
    },

     '/howweexport/cif': {
      en: '/how-we-export/cif',
      tr: '/nasıl-ihracat-yapıyoruz/cif',
    },

     '/howweexport/exw': {
      en: '/how-we-export/exw',
      tr: '/nasıl-ihracat-yapıyoruz/exw',
    },
    // i18n/routing.js

  '/blog': { en: '/blog', tr: '/blog' },
  '/blog/[slug]': { en: '/blog/[slug]', tr: '/blog/[slug]' },

  },
};

export const routing = defineRouting(config);