import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Pagination.module.scss';

const Pagination: React.FC<{ quantityPages: number }> = ({ quantityPages }) => {
  const router = useRouter();
  const { page: currentPage, gender } = router.query;
  const paginator: number[] = [];
  for (let i = 1; i <= quantityPages; i++) {
    paginator.push(i);
  }

  return (
    <div className={styles.offer}>
      {paginator.map((page: number) =>
        !gender ? (
          <Link key={page} href={{ pathname: '/[page]', query: { page: page } }}>
            <a className={`${styles.link} ${Number(currentPage) === page ? styles.active : ''}`}>
              {page}
            </a>
          </Link>
        ) : (
          <Link key={page} href={{ pathname: '/[page]', query: { page: page, gender: gender } }}>
            <a className={`${styles.link} ${Number(currentPage) === page ? styles.active : ''}`}>
              {page}
            </a>
          </Link>
        ),
      )}
    </div>
  );
};

export default Pagination;
