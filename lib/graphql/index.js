import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://strapi.lusottu.live/graphql',
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
});
