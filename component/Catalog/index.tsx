import React from 'react';

import { IItems } from '../../lib/types';

import { Error, Loader, ProductCard } from '../index';

import styles from './Catalog.module.scss';

interface ICatalog {
  items: [IItems];
  isLoading: boolean;
}

const Catalog: React.FC<ICatalog> = ({ items, isLoading }) => {
  return items[0] !== undefined ? (
    <main className={!isLoading ? styles.catalog : styles.catalogInvisible}>
      <div className={styles.catalogWrapper}>
        {!isLoading ? (
          <>
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
          </>
        ) : (
          <Loader />
        )}
      </div>
    </main>
  ) : (
    <Error />
  );
};

export default Catalog;
