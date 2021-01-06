import Head from 'next/head';
import { useRouter } from 'next/router';

import { Header } from '../index';

import styles from './Layout.module.scss';

export default function Layout({ children }) {
  const router = useRouter();
  const { gender, slug }: { gender?: string; slug?: string } = router.query;

  function formattingSlug(slug: string) {
    return (
      slug &&
      slug.replace(/-/g, ' ').replace(/(^|\s)\S/g, (a) => {
        return a.toUpperCase();
      })
    );
  }
  function headTitle(gender: string, slug: string) {
    if (gender === 'male') {
      return 'Мужские духи - Lusottu';
    } else if (gender === 'female') {
      return 'Женский духи - Lusottu';
    } else if (slug) {
      return `${formattingSlug(slug)} - Lusottu`;
    }
    return 'Главная - Lusottu';
  }

  return (
    <>
      <Head>
        <title>{headTitle(gender, slug)}</title>
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
