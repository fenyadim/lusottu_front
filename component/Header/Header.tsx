import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Search } from '../index';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const router = useRouter();
  const { gender } = router.query;
  const [menuHandler, setMenuHandler] = React.useState<boolean>(false);

  React.useEffect(() => {
    const navLink = document.getElementsByClassName(styles.link);
    const menuContainer = document.getElementsByClassName(styles.menuActive);
    const menuBtn = document.getElementsByClassName(styles.menuBtn);
    const searchBlock = document.getElementsByTagName('input');
    const resultBlock = document.getElementById('resultBlock');

    const btnMenuListener = (e: Event) => {
      if (
        e.target !== menuContainer[0] &&
        e.target !== menuBtn[0] &&
        e.target !== searchBlock[0] &&
        e.target !== resultBlock
      ) {
        setMenuHandler(false);
      }
      for (let i = 0; i < 3; i++) {
        if (navLink[i] === e.target) {
          setMenuHandler(false);
        }
      }
    };
    document.addEventListener('click', btnMenuListener);
    return () => {
      document.removeEventListener('click', btnMenuListener);
    };
  }, [menuHandler]);

  return (
    <>
      <div>
        <div className={!menuHandler ? styles.menuDisable : styles.menuActive}>
          {Navigation(gender)}
          <div className={styles.searchBlock}>
            <Search />
          </div>
        </div>
        <button
          className={`${styles.menuBtn} ${!menuHandler ? '' : styles.activeBtn}`}
          onClick={() => setMenuHandler(!menuHandler)}>
          <span />
        </button>
      </div>
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

export default Header;

const Navigation = (gender: string | string[]) => {
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
};
