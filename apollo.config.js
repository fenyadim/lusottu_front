module.exports = {
  client: {
    includes: ['./lib/graphql/**/*.js'],
    service: {
      name: 'Lusottu Back',
      url: 'https://strapi.lusottu.live/graphql',
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};
