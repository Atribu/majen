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

  }
};

export const routing = defineRouting(config);