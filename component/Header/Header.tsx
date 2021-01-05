// import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import styles from './Header.module.scss';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const { gender } = router.query;

  const [menuHandler, setMenuHandler] = React.useState<boolean>(false);

  return (
    <>
      <div
        className={`${!menuHandler ? styles.menuDisable : styles.menuActive} 
      ${gender === 'female' ? 'femaleTheme' : gender === 'male' ? 'maleTheme' : 'allTheme'}`}>
        {Navigation(gender)}
      </div>
      <button
        className={`${styles.menuBtn} ${!menuHandler ? '' : styles.activeBtn}`}
        onClick={() => setMenuHandler(!menuHandler)}>
        <span />
      </button>
      <header className={styles.header}>
        <div className={styles.noMenu}>{Navigation(gender)}</div>
        <Link href="/">
          <a className={styles.logo}>
            <img src="/logo.svg" alt="Logo" />
          </a>
        </Link>
      </header>
    </>
  );
}

function Navigation(gender: string | string[]) {
  return (
    <nav
      className={`${styles.navigation} ${
        gender === 'female' ? 'femaleTheme' : gender === 'male' ? 'maleTheme' : 'allTheme'
      }`}>
      <Link href={{ pathname: '/[page]', query: { page: '1' } }}>
        <a className={`${styles.link} ${!gender ? styles.active : ''}`}>Все</a>
      </Link>
      <Link href={{ pathname: '/[page]', query: { page: '1', gender: 'male' } }}>
        <a className={`${styles.link} ${gender === 'male' ? styles.active : ''}`}>Мужские</a>
      </Link>
      <Link href={{ pathname: '/[page]', query: { page: '1', gender: 'female' } }}>
        <a className={`${styles.link} ${gender === 'female' ? styles.active : ''}`}>Женские</a>
      </Link>
    </nav>
  );
}
