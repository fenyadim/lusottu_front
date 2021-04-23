import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Router, useRouter } from 'next/router';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import { Layout } from '../component';
import { client } from '../lib/graphql/graph';

import '../styles/style.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
};

export default MyApp;
