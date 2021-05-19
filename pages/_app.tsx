import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import { Layout } from '../component';

import { client } from '../lib/graphql/';

import '../styles/style.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [screenWidth, setScreenWidth] = React.useState<number>(0);
  const router = useRouter();
  const { asPath } = router;

  React.useEffect(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, []);

  React.useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });
  }, [router && asPath]);

  return (
    <ApolloProvider client={client}>
      <Layout screenWidth={screenWidth}>
        <Component {...pageProps} isLoading={isLoading} />
      </Layout>
    </ApolloProvider>
  );
};

export default MyApp;
