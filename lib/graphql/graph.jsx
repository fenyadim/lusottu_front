import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://a0490689.xsph.ru/graphql',
  cache: new InMemoryCache(),
});
