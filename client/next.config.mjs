import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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
