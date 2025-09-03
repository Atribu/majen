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

      '/travertine': {
    en: '/travertine',
    tr: '/traverten'
  },
  '/travertine/[product]': {
    en: '/travertine/[product]',
    tr: '/traverten/[product]'
  },
  '/travertine/[product]/[variant]': {
    en: '/travertine/[product]/[variant]',
    tr: '/traverten/[product]/[variant]'
  }
    

  }
};

export const routing = defineRouting(config);