import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api-eu-central-1.graphcms.com/v2/ckjpeqjt0hxml01wkav1i6ppr/master',
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
});
