import React from 'react';

import { IItems } from '../../lib/types';

import { Error, Loader, ProductCard } from '../index';

import styles from './Catalog.module.scss';

interface ICatalog {
  items: [IItems];
  isLoading: boolean;
}

const Catalog: React.FC<ICatalog> = ({items, isLoading}) => {
  return items[0] !== undefined ? (
    <main className={!isLoading ? styles.catalog : styles.catalogInvisible}>
      <div className={styles.catalogWrapper}>
          {!isLoading ? (
            <>
              {items &&
              items.map(({name, price, image, slug}, index: number) =>
                <ProductCard
                  key={`${slug}_${index}`}
                  name={name}
                  price={price}
                  img={image && image.url}
                  slug={slug}
                />
              )}
            </>
          ) : (
            <Loader/>
          )}
      </div>
    </main>
  ) : (
    <Error/>
  );
};

export default Catalog;
