import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Header, MenuPopup } from '../index';

import { IRouterProps } from '../../lib/types';

import styles from './Layout.module.scss';

const Layout: React.FC<{ screenWidth: number }> = ({ children, screenWidth }) => {
  const router = useRouter();
  const { gender, slug } = router.query as IRouterProps;

  function formattingSlug(slug: string): string {
    return (
      slug &&
      slug.replace(/-/g, ' ').replace(/(^|\s)\S/g, (a) => {
        return a.toUpperCase();
      })
    );
  }
  function headTitle(gender: string, slug: string): string {
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
        <MenuPopup gender={gender} />
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
