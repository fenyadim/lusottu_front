import React from 'react';
import Link from 'next/link';

import { Loader, Pagination, ProductCard } from '../index';

import styles from './Catalog.module.scss';

export default function Catalog({ genderSort, page, items, isLoading, quantityPages }) {
  const [itemsOnScreen, setItemsOnScreen] = React.useState(10);
  const array = [];
  // React.useMemo(() => {
  //   if (screenWidht < 1054 && screenWidht >= 742) {
  //     setItemsOnScreen(6);
  //   } else if (screenWidht < 1366 && screenWidht >= 1054) {
  //     setItemsOnScreen(6);
  //   } else if (screenWidht <= 1677 && screenWidht >= 1366) {
  //     setItemsOnScreen(8);
  //   } else if (screenWidht > 1677) {
  //     setItemsOnScreen(10);
  //   }
  // }, [screenWidht]);
  let pageNum;
  if (page === undefined) {
    pageNum = 0;
  } else {
    pageNum = (page - 1) * itemsOnScreen;
  }

  // Из большого массива делает маленький из 10 элементов
  for (let start = pageNum; start < pageNum + itemsOnScreen; start++) {
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
