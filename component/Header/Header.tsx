import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from './Header.module.scss';
// import { Search } from "../index";

export default function Header() {
  const router = useRouter();
  const { gender } = router.query;
  const [menuHandler, setMenuHandler] = React.useState<boolean>(false);

  React.useEffect(() => {
    const NavLink = document.getElementsByClassName(styles.link);
    document.addEventListener('click', (e) => {
      for (let i = 0; i < 3; i++) {
        if (NavLink[i] === e.target) {
          setMenuHandler(false);
        }
      }
    });
    () => {
      document.removeEventListener('click', (e) => {
        for (let i = 0; i < 3; i++) {
          if (NavLink[i] === e.target) {
            setMenuHandler(false);
          }
        }
      });
    };
  }, []);
  //TODO: Поправить здесь
  return (
    <>
      <div>
        <div className={!menuHandler ? styles.menuDisable : styles.menuActive}>
          {Navigation(gender)}
          <div className={styles.searchBlock}>{/*<Search/>*/}</div>
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
        {/*<div className={styles.noMenu} style={{justifySelf: 'right'}}><Search/></div>*/}
      </header>
    </>
  );
}

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
