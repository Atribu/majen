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
      en: '/travertine',
      tr: '/traverten',
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
  },
};

export const routing = defineRouting(config);