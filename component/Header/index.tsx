import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Search } from '../index';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const router = useRouter();
  const { gender } = router.query;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.noMenu}>{Navigation(gender)}</div>
        <Link href="/1">
          <a className={styles.logo}>
            <Image src="/logo.svg" layout="fill" alt="Lusottu" />
          </a>
        </Link>
        <div className={styles.noMenu} style={{ justifySelf: 'right' }}>
          <Search />
        </div>
      </header>
    </>
  );
};

export default React.memo(Header);

export const Navigation = (gender: string | string[]) => {
  return (
    <nav
      className={`${styles.navigation} ${
        gender === 'female' ? 'femaleTheme' : gender === 'male' ? 'maleTheme' : 'allTheme'
      }`}>
      <Link href={{ pathname: '/[page]', query: { page: 1 } }}>
        <a className={`${styles.link} ${!gender ? styles.active : ''}`} id="nav">
          Все
        </a>
      </Link>
      <Link href={{ pathname: '/[page]', query: { page: 1, gender: 'male' } }}>
        <a className={`${styles.link} ${gender === 'male' ? styles.active : ''}`} id="nav">
          Мужские
        </a>
      </Link>
      <Link href={{ pathname: '/[page]', query: { page: 1, gender: 'female' } }}>
        <a className={`${styles.link} ${gender === 'female' ? styles.active : ''}`} id="nav">
          Женские
        </a>
      </Link>
    </nav>
  );
};
