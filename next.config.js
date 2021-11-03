module.exports = {
  images: {
    domains: ['media.graphcms.com'],
  },
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/1',
        permanent: true,
      },
    ];
  },
};
