// import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import styles from './Header.module.scss';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const { gender } = router.query;

  const [menuHandler, setMenuHandler] = React.useState(false);

  console.log(menuHandler);

  return (
    <>
      <div className={menuHandler ? styles.menuDisable : styles.menuActive}>{Nav(gender)}</div>
      <header className={styles.header}>
        <button className={styles.menuBtn} onClick={() => setMenuHandler(!menuHandler)}>
          X
        </button>
        <div className={styles.noMenu}>{Nav(gender)}</div>
        <Link href="/">
          <a className={styles.logo}>
            {/* <Image src="/logo.svg" alt="Logo" width={188} height={93} style={{ margin: '0 auto' }} /> */}
            <img
              src="/logo.svg"
              alt="Logo"
              style={{ margin: '0 auto', width: '188px', height: '93px' }}
            />
          </a>
        </Link>
      </header>
    </>
  );
}

function Nav(gender) {
  return (
    <nav
      className={`${styles.navigation} ${
        gender === 'female' ? 'femaleTheme' : gender === 'male' ? 'maleTheme' : 'allTheme'
      }`}>
      <Link href={{ pathname: '/[page]', query: { page: '1' } }}>
        <a className={!gender ? styles.active : ''}>Все</a>
      </Link>
      <Link href={{ pathname: '/[page]', query: { page: '1', gender: 'male' } }}>
        <a className={gender === 'male' ? styles.active : ''}>Мужские</a>
      </Link>
      <Link href={{ pathname: '/[page]', query: { page: '1', gender: 'female' } }}>
        <a className={gender === 'female' ? styles.active : ''}>Женские</a>
      </Link>
    </nav>
  );
}
