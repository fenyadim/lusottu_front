import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ISearchProductProps } from '../../../lib/types';

import styles from './SearchProduct.module.scss';

const SearchProduct: React.FC<ISearchProductProps> = ({ image, name, price, slug }) => {
  return (
    <Link href="/product/[slug]" as={`/product/${slug}/`}>
      <a>
        <div className={styles.productContainer} id="searchProduct">
          <div className={styles.image}>
            <Image
              src={`${image ? `https://strapi.lusottu.live${image.url}` : '/null'}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.price}>{price} руб.</p>
        </div>
      </a>
    </Link>
  );
};

export default React.memo(SearchProduct);
