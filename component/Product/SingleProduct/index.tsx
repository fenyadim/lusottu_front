import React from 'react';
import Image from 'next/image';

import { ISingleProduct } from '../../../lib/types';

import { Loader, AttributeWrapper } from '../..';

import styles from './SingleProduct.module.scss';

const SingleProduct: React.FC<ISingleProduct> = ({ product, isLoading }) => {
  const { name, brand, desc, image, price, volume, notes } = product;

  return !isLoading ? (
    <div className={!isLoading ? styles.offer : styles.offerInvisible}>
      <div className={styles.imageSide}>
        <Image
          src={`${image ? `https://strapi.lusottu.live${image.url}` : '/null'}`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.infoSide}>
        <AttributeWrapper value={name}>
          <h1 className={styles.title}>{name}</h1>
        </AttributeWrapper>
        <AttributeWrapper value={brand.name}>
          <h3 className={styles.brand}>
            Бренд: <span>{brand.name}</span>
          </h3>
        </AttributeWrapper>
        <AttributeWrapper value={desc}>
          <p className={styles.desc}>
            <span className={styles.itemTitle}>Описание: </span>
            {desc}
          </p>
        </AttributeWrapper>
        <AttributeWrapper value={notes}>
          <p className={styles.notes}>
            <span className={styles.itemTitle}>Ноты: </span>
            {notes}
          </p>
        </AttributeWrapper>
        <AttributeWrapper value={price}>
          <h3 className={styles.price}>
            Цена:
            <span>{price} руб.</span>
          </h3>
        </AttributeWrapper>
        <AttributeWrapper value={volume}>
          <h3 className={styles.volume}>
            Объем:
            <span>{volume} мл.</span>
          </h3>
        </AttributeWrapper>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default SingleProduct;
