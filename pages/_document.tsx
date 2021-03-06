import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='ru'>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <link
            rel="preload"
            href="/fonts/Montserrat-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Montserrat-Medium.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Montserrat-SemiBold.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/Montserrat-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin=""
          />
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
