import React from 'react';
import Image from 'next/image';

import { Loader } from '../..';

import styles from './SingleProduct.module.scss';

export default function SingleProduct({ product, isLoading }) {
  let array = [];

  function ClearElemArray() {
    array = [];
  }

  return !isLoading ? (
    <div className={!isLoading ? styles.offer : styles.offerInvisible}>
      <div className={styles.infoSide}>
        <h2 className={styles.brand}>{product.productTags.nodes[0].name}</h2>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.desc}>
          <span>Описание: </span>
          {product.description}
        </p>
        {product.attributes &&
          product.attributes.nodes.map((item, index) => (
            <React.Fragment key={index}>
              <div className={styles.attribute}>
                <h3 className={styles.attributeTitle}>{`${item.name}: `}</h3>
                {item.terms.nodes.map((obj) => {
                  array.push(obj.name);
                })}
                <p className={styles.attributeDesc}>{array.join(', ')}</p>
                {ClearElemArray()}
              </div>
            </React.Fragment>
          ))}
        <h3 className={styles.price}>
          Цена:
          <span>{product.price} руб.</span>
        </h3>
        <h3 className={styles.volume}>
          Объем:
          <span>{product.weight} мл.</span>
        </h3>
      </div>
      <div className={styles.imageSide}>
        <Image src={product.image.mediaItemUrl} layout="fill" objectFit="contain" />
      </div>
    </div>
  ) : (
    <Loader />
  );
}
