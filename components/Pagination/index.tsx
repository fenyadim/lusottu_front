import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IRouterProps } from '../../lib/types';
import { QueryUrl } from '../../lib/queryUrl';

import styles from './Pagination.module.scss';

const Pagination: React.FC<{ quantityPages: number }> = ({ quantityPages }) => {
  const router = useRouter();
  const { page: currentPage, gender, types, price, brands } = router.query as IRouterProps;

  const paginator: number[] = [];
  for (let i = 1; i <= quantityPages; i++) {
    paginator.push(i);
  }

  React.useEffect(() => {
    const navigationKeys = (forwardOrBackward: number) => {
      console.log(forwardOrBackward);
      if (forwardOrBackward <= quantityPages && forwardOrBackward >= 1) {
        router.push({
          pathname: '/[page]',
          query: QueryUrl(forwardOrBackward, gender, brands, types, price),
        });
      }
    };
    const navigationOnKeysEvent = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          navigationKeys(Number(currentPage) + 1);
          break;
        case 'ArrowLeft':
          navigationKeys(Number(currentPage) - 1);
          break;
      }
    };
    document.addEventListener('keydown', navigationOnKeysEvent);
    return () => {
      document.removeEventListener('keydown', navigationOnKeysEvent);
    };
  }, [currentPage]);

  return (
    <div className={styles.offer}>
      {paginator.map((page) => (
        <Link
          key={page}
          href={{
            pathname: '/[page]',
            query: QueryUrl(page, gender, brands, types, price),
          }}
          scroll={true}>
          <a className={`${styles.link} ${Number(currentPage) === page ? styles.active : ''}`}>
            {page}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
