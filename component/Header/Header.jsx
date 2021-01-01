import Image from 'next/image';
import Link from 'next/link';

import styles from './Header.module.scss';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const { asPath } = router;

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link href="/">
          <a className={asPath === '/' ? styles.active : ''}>Все</a>
        </Link>
        <Link href="/[id]/" as="/male/">
          <a className={asPath === '/male' ? styles.active : ''}>Мужские</a>
        </Link>
        <Link href="/[id]/" as="/female/">
          <a className={asPath === '/female' ? styles.active : ''}>Женские</a>
        </Link>
      </nav>
      <Link href="/">
        <a className={styles.logo}>
          <Image src="/logo.svg" alt="Logo" width={188} height={93} style={{ margin: '0 auto' }} />
        </a>
      </Link>
    </header>
  );
}
