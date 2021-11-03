module.exports = {
  client: {
    includes: ['./lib/graphql/**/*.js'],
    service: {
      name: 'Lusottu Back',
      url: 'https://api-eu-central-1.graphcms.com/v2/ckjpeqjt0hxml01wkav1i6ppr/master',
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
};
