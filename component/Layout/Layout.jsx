import Head from "next/head";

import { Header } from "../index";

import styles from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Lusottu</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={styles.offer}>{children}</main>
      </div>
    </>
  );
}
