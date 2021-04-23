import React from 'react';

import { ICatalog, IItems } from './CatalogTypes';

import { Loader, Pagination, ProductCard } from '../index';

import styles from './Catalog.module.scss';

const Catalog: React.FC<ICatalog> = ({ genderSort, page, items, isLoading, quantityPages }) => {
  // const itemsOnScreen: number = 12;
  // const products: Array<IItems> = [];

  // let pageNum: number;
  // pageNum = page === undefined ? 0 : (page - 1) * itemsOnScreen;

  // // Из большого массива делает маленький из 12 элементов
  // for (let start = pageNum; start < pageNum + itemsOnScreen; start++) {
  //   products.push(items[start]);
  // }

  return (
    <main className={!isLoading ? styles.offer : styles.offerInvisible}>
      {!isLoading ? (
        <div className={styles.catalog}>
          {items &&
            items.map((obj, index: number) =>
              obj ? (
                <ProductCard
                  key={`${obj.slug}_${index}`}
                  title={obj.name}
                  price={obj.price}
                  img={obj.image.url}
                  slug={obj.slug}
                />
              ) : (
                ''
              ),
            )}
        </div>
      ) : (
        <Loader />
      )}
      <div className={styles.pagination}>
        {/* <Pagination gender={genderSort} quantityPages={quantityPages} currentPage={page} /> */}
      </div>
    </main>
  );
};

export default Catalog;
