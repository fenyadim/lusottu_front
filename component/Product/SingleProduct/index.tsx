import React from 'react';
import Image from 'next/image';

import { ISingleProduct } from '../../../lib/types';

import { Loader } from '../..';

import styles from './SingleProduct.module.scss';
import AttributeWrapper from '../../Elements/AttributeWrapper';

const SingleProduct: React.FC<ISingleProduct> = ({ product, isLoading }) => {
  const { name, brand, desc, image, price, volume, note } = product;

  console.log(name);

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
        <h3 className={styles.brand}>
          Бренд: <span>{brand}</span>
        </h3>
        <p className={styles.desc}>
          <span>Описание: </span>
          {desc}
        </p>
        <div className={styles.attribute}>
          <h3 className={styles.attributeTitle}>Ноты: </h3>
          <p className={styles.attributeDesc}>{note}</p>
        </div>
        <h3 className={styles.price}>
          Цена:
          <span>{price} руб.</span>
        </h3>
        <h3 className={styles.volume}>
          Объем:
          <span>{volume} мл.</span>
        </h3>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default SingleProduct;
