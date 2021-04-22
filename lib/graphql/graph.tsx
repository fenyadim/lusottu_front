import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://strapi.lusottu.live/graphql',
  cache: new InMemoryCache(),
  ssrMode: true,
});
