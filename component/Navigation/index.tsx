import Link from 'next/link';
import React from 'react';

import styles from './Navigation.module.scss';

const Navigation: React.FC<{ gender: string | string[] }> = ({ gender }) => {
  console.log('NAVIGATION');

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

export default React.memo(Navigation);
