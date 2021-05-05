import React from 'react';

import { IItems } from '../../lib/types';

import { Filter, Loader, Pagination, ProductCard } from '../index';

import styles from './Catalog.module.scss';

interface ICatalog {
  items: [IItems];
  isLoading: boolean;
  quantityPages: number;
}

const Catalog: React.FC<ICatalog> = ({ items, isLoading, quantityPages }) => {
  return (
    <main className={!isLoading ? styles.offer : styles.offerInvisible}>
      {!isLoading ? (
        <div className={styles.catalog}>
          {items &&
            items.map((obj, index: number) =>
              obj ? (
                <ProductCard
                  key={`${obj.slug}_${index}`}
                  name={obj.name}
                  price={obj.price}
                  img={obj.image && obj.image.url}
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
        <Pagination quantityPages={quantityPages} />
      </div>
      <Filter />
    </main>
  );
};

export default Catalog;
