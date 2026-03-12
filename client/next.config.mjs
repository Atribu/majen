import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Legacy export URLs -> canonical localized slugs
      {
        source: '/howweexport',
        destination: '/en/how-we-export',
        permanent: true,
      },
      {
        source: '/howweexport/:term(fob|cif|exw)',
        destination: '/en/how-we-export/:term',
        permanent: true,
      },
      {
        source: '/en/howweexport',
        destination: '/en/how-we-export',
        permanent: true,
      },
      {
        source: '/en/howweexport/:term(fob|cif|exw)',
        destination: '/en/how-we-export/:term',
        permanent: true,
      },
      {
        source: '/tr/howweexport',
        destination: '/tr/nasil-ihracat-yapiyoruz',
        permanent: true,
      },
      {
        source: '/tr/howweexport/:term(fob|cif|exw)',
        destination: '/tr/nasil-ihracat-yapiyoruz/:term',
        permanent: true,
      },
      {
        source: '/tr/how-we-export',
        destination: '/tr/nasil-ihracat-yapiyoruz',
        permanent: true,
      },
      {
        source: '/tr/how-we-export/:term(fob|cif|exw)',
        destination: '/tr/nasil-ihracat-yapiyoruz/:term',
        permanent: true,
      },
      // TR yanlış base → doğruya yönlendir
      {
        source: '/tr/travertine',
        destination: '/tr/traverten',
        permanent: true,
      },
      {
        source: '/tr/travertine/:path*',
        destination: '/tr/traverten/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
