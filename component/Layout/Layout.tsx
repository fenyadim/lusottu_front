import Head from 'next/head';
import { useRouter } from 'next/router';

import { Header } from '../index';

import styles from './Layout.module.scss';

export default function Layout({ children }) {
  const router = useRouter();
  const gender = router.query.gender;

  return (
    <>
      <Head>
        <title>
          {gender === 'male'
            ? 'Мужские духи - Lusottu'
            : gender === 'female'
            ? 'Женский духи - Lusottu'
            : 'Главная - Lusottu'}
        </title>
      </Head>
      <div
        className={`${styles.container} ${
          gender === 'female' ? 'femaleTheme' : gender === 'male' ? 'maleTheme' : 'allTheme'
        }`}>
        <Header />
        {children}
      </div>
    </>
  );
}
