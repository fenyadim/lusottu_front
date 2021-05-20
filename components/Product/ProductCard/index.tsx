import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './ProductCard.module.scss';

interface IProductCardProps {
  name: string;
  price: number;
  img?: string;
  slug: string;
}

const ProductCard: React.FC<IProductCardProps> = ({ name, price, img, slug }) => {
  return (
    <Link href="/product/[slug]" as={`/product/${slug}/`}>
      <a>
        <div className={styles.productCard}>
          <div className={styles.productImg}>
            <Image
              src={`${img ? `https://strapi.lusottu.live${img}` : '/null'}`}
              layout="fill"
              objectFit="contain"
              alt={name}
              // priority={true}
            />
          </div>
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{name}</h2>
            <span className={styles.productPrice}>{price} руб.</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
