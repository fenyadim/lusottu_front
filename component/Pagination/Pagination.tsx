import React from 'react';
import Link from 'next/link';

import styles from './Pagination.module.scss';

interface IPagination {
  quantityPages: number;
  gender: string | string[];
  currentPage: number;
}

export default function Pagination({ quantityPages, gender, currentPage }: IPagination) {
  const paginator: number[] = [];
  for (let i = 1; i <= quantityPages; i++) {
    paginator.push(i);
  }

  return (
    <>
      {paginator.map((page: number) =>
        !gender ? (
          <Link key={page} href={{ pathname: '/[page]', query: { page: page } }}>
            <a className={`${styles.link} ${currentPage === page ? styles.active : ''}`}>{page}</a>
          </Link>
        ) : (
          <Link key={page} href={{ pathname: '/[page]', query: { page: page, gender: gender } }}>
            <a className={`${styles.link} ${currentPage === page ? styles.active : ''}`}>{page}</a>
          </Link>
        ),
      )}
    </>
  );
}
