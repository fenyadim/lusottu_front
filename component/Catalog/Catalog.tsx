import React from 'react';
import Link from 'next/link';

import { ICatalog, IItems } from './CatalogTypes';

import { Loader, Pagination, ProductCard } from '../index';

import styles from './Catalog.module.scss';

export default function Catalog({ genderSort, page, items, isLoading, quantityPages }: ICatalog) {
  const itemsOnScreen: number = 12;
  const products: Array<IItems> = [];

  let pageNum: number;
  if (page === undefined) {
    pageNum = 0;
  } else {
    pageNum = (page - 1) * itemsOnScreen;
  }

  // Из большого массива делает маленький из 12 элементов
  for (let start = pageNum; start < pageNum + itemsOnScreen; start++) {
    products.push(items[start]);
  }

  return (
    <main className={!isLoading ? styles.offer : styles.offerInvisible}>
      {!isLoading ? (
        <div className={styles.catalog}>
          {items &&
            products.map((obj, index: number) =>
              obj ? (
                <React.Fragment key={index}>
                  <Link href="/product/[slug]" as={`/product/${obj.slug}/`}>
                    <a>
                      <ProductCard
                        title={obj.name}
                        price={obj.price}
                        img={obj.image.mediaItemUrl}
                        gender={genderSort}
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
