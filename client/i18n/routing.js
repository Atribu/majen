// i18n/routing.js
import { defineRouting } from 'next-intl/routing';

export const config = {
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localeDetection: true,
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
      en: '/travertine/[product]',
      tr: '/traverten/[product]',
    },
    '/travertine/[product]/[variant]': {
      en: '/travertine/[product]/[variant]',
      tr: '/traverten/[product]/[variant]',
    },

    // --- NEW: deep routes (cut → process → finish → size)
    '/travertine/[product]/[variant]/[cut]': {
      en: '/travertine/[product]/[variant]/[cut]',
      tr: '/traverten/[product]/[variant]/[cut]',
    },
    '/travertine/[product]/[variant]/[cut]/[process]': {
      en: '/travertine/[product]/[variant]/[cut]/[process]',
      tr: '/traverten/[product]/[variant]/[cut]/[process]',
    },
    '/travertine/[product]/[variant]/[cut]/[process]/[finish]': {
      en: '/travertine/[product]/[variant]/[cut]/[process]/[finish]',
      tr: '/traverten/[product]/[variant]/[cut]/[process]/[finish]',
    },
    '/travertine/[product]/[variant]/[cut]/[process]/[finish]/[size]': {
      en: '/travertine/[product]/[variant]/[cut]/[process]/[finish]/[size]',
      tr: '/traverten/[product]/[variant]/[cut]/[process]/[finish]/[size]',
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