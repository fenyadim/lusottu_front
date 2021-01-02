import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Layout } from '../component';
import { client } from '../lib/graphql/graph';
import { Router, useRouter } from 'next/router';

import '../styles/style.scss';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { asPath } = router;
  React.useMemo(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }, [router && asPath]);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} isLoading={isLoading} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
