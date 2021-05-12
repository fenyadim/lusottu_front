import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Navigation, Search } from '../index';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const router = useRouter();
  const { gender } = router.query;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.noMenu}>
          <Navigation gender={gender} />
        </div>
        <Link href="/1">
          <a className={styles.logo}>
            <Image src="/logo.svg" layout="fill" alt="Lusottu" priority={true} />
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
