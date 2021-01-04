import React from 'react';
import Image from 'next/image';

import styles from './ProductCard.module.scss';

export default function ProductCard({ title, price, img, gender }) {
  return (
    <div
      className={`${styles.productCard} ${
        gender === 'female' ? 'femaleTheme' : gender === 'male' ? 'maleTheme' : 'allTheme'
      }`}>
      <div className={styles.productImg}>
        <Image src={img} layout="fill" objectFit="contain" />
      </div>
      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{title}</h2>
        <span className={styles.productPrice}>{price} руб.</span>
      </div>
    </div>
  );
}
