import React from 'react';
import Image from 'next/image';

import styles from './ProductCard.module.scss';
import Link from 'next/link';

interface IProductCardProps {
  title: string;
  price: number;
  img: string;
  slug: string;
}

const ProductCard: React.FC<IProductCardProps> = ({ title, price, img, slug }) => {
  return (
    <Link href="/product/[slug]" as={`/product/${slug}/`}>
      <a>
        <div className={styles.productCard}>
          <div className={styles.productImg}>
            <Image
              src={`https://strapi.lusottu.live${img}`}
              layout="fill"
              objectFit="contain"
              alt={title}
            />
          </div>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{title}</h2>
            <span className={styles.productPrice}>{price} руб.</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
