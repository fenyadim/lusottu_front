import React from 'react';

export default function Navigation() {
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
