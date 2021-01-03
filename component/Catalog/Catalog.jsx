import React from 'react';
import Link from 'next/link';

import { Loader, Pagination, ProductCard } from '../index';

import styles from './Catalog.module.scss';

export default function Catalog({ genderSort, total, page, items, isLoading }) {
  const array = [];
  // Подсчет количества страниц
  const quantityPages = Math.ceil(total / 10);

  let pageNum;
  if (page === undefined) {
    pageNum = 0;
  } else {
    pageNum = (page - 1) * 10;
  }

  console.log(page);

  // Из большого массива делает маленький из 10 элементов
  for (let start = pageNum; start < pageNum + 10; start++) {
    array.push(items[start]);
  }

  return (
    <main className={!isLoading ? styles.offer : styles.offerInvisible}>
      {!isLoading ? (
        <div className={styles.catalog}>
          {items &&
            array.map((obj, index) =>
              obj ? (
                <React.Fragment key={index}>
                  <Link href="/product/[slug]" as={`/product/${obj.slug}/`}>
                    <a>
                      <ProductCard
                        title={obj.name}
                        price={obj.price}
                        img={obj.image.mediaItemUrl}
                      />
                    </a>
                  </Link>
                </React.Fragment>
              ) : (
                ''
              ),
            )}
        </div>
      ) : (
        <Loader />
      )}
      <div className={styles.pagination}>
        <Pagination gender={genderSort} quantityPages={quantityPages} currentPage={page} />
      </div>
    </main>
  );
}
