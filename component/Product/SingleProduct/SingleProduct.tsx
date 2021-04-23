import React from 'react';
import Image from 'next/image';

import { ISingleProduct } from '../../../lib/types/types';

import { Loader } from '../..';

import styles from './SingleProduct.module.scss';

const SingleProduct: React.FC<ISingleProduct> = ({ product, isLoading }) => {
  const Attributes = ({
    nameAttr,
    descAttr,
  }: {
    nameAttr: string;
    descAttr: string | undefined;
  }) => {
    return descAttr ? (
      <div className={styles.attribute}>
        <h3 className={styles.attributeTitle}>{`${nameAttr}: `}</h3>
        <p className={styles.attributeDesc}>{descAttr}</p>
      </div>
    ) : undefined;
  };

  return !isLoading ? (
    <div className={!isLoading ? styles.offer : styles.offerInvisible}>
      <div className={styles.imageSide}>
        <Image
          src={`https://strapi.lusottu.live${product.image.url}`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.infoSide}>
        <h1 className={styles.title}>{product.name}</h1>
        <h3 className={styles.brand}>
          Бренд: <span>{product.brand}</span>
        </h3>
        <p className={styles.desc}>
          <span>Описание: </span>
          {product.desc}
        </p>
        <Attributes nameAttr="Парфюмер" descAttr={product.perfumer.desc} />
        <Attributes nameAttr="Базовые ноты" descAttr={product.base_notes.desc} />
        <Attributes nameAttr="Верхние ноты" descAttr={product.top_notes.desc} />
        <Attributes nameAttr="Средние ноты" descAttr={product.middle_notes.desc} />
        <h3 className={styles.price}>
          Цена:
          <span>{product.price} руб.</span>
        </h3>
        <h3 className={styles.volume}>
          Объем:
          <span>{product.volume} мл.</span>
        </h3>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default SingleProduct;
