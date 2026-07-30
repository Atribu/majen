import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Legacy export URLs -> canonical localized slugs
      {
        source: '/howweexport/:term(fob|cif|exw)',
        destination: '/en/how-we-export/:term',
        permanent: true,
      },
      {
        source: '/en/howweexport/:term(fob|cif|exw)',
        destination: '/en/how-we-export/:term',
        permanent: true,
      },
      {
        source: '/tr/howweexport/:term(fob|cif|exw)',
        destination: '/tr/nasil-ihracat-yapiyoruz/:term',
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
      {
        source: '/en/traverten',
        destination: '/en/travertine',
        permanent: true,
      },
      {
        source: '/en/traverten/:path*',
        destination: '/en/travertine/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
