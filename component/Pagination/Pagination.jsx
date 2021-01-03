import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Pagination.module.scss';

export default function Pagination({ quantityPages, gender, currentPage }) {
  const router = useRouter();
  const { gender: isGender } = router.query;

  const Pages = () => {
    const array = [];
    for (let i = 1; i <= quantityPages; i++) {
      array.push(i);
    }

    return array.map((item) =>
      !isGender ? (
        <Link key={item} href={{ pathname: '/[page]', query: { page: item } }}>
          <a className={currentPage === item ? `${styles.link} ${styles.active}` : styles.link}>
            {item}
          </a>
        </Link>
      ) : (
        <Link key={item} href={{ pathname: '/[page]', query: { page: item, gender: gender } }}>
          <a className={currentPage === item ? `${styles.link} ${styles.active}` : styles.link}>
            {item}
          </a>
        </Link>
      ),
    );
  };

  return <>{Pages()}</>;
}
