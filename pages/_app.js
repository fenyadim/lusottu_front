import '../styles/style.scss';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Layout } from '../component';

const client = new ApolloClient({
  uri: 'http://a0490689.xsph.ru/graphql',
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
