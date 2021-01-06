import React from 'react';
import Image from 'next/image';

import { IAttributes, ISingleProduct } from './SingleProductTypes';

import { Loader } from '../..';

import styles from './SingleProduct.module.scss';

export default function SingleProduct({ product, isLoading }: ISingleProduct) {
  function attrItems(arrayItems: Array<{ name: string }>) {
    const array = [];
    arrayItems.map((obj) => {
      array.push(obj.name);
    });
    return array.join(', ');
  }

  function Attributes({ item }: { item: IAttributes }) {
    return (
      <div className={styles.attribute}>
        <h3 className={styles.attributeTitle}>{`${item.name}: `}</h3>
        <p className={styles.attributeDesc}>{attrItems(item.terms.nodes)}</p>
      </div>
    );
  }

  return !isLoading ? (
    <div className={!isLoading ? styles.offer : styles.offerInvisible}>
      <div className={styles.imageSide}>
        <Image src={product.image.mediaItemUrl} layout="fill" objectFit="contain" />
      </div>
      <div className={styles.infoSide}>
        <h1 className={styles.title}>{product.name}</h1>
        <h3 className={styles.brand}>
          Бренд: <span>{product.productTags.nodes[0].name}</span>
        </h3>
        <p className={styles.desc}>
          <span>Описание: </span>
          {product.description}
        </p>
        {product.attributes &&
          product.attributes.nodes.map((item, index) => <Attributes key={index} item={item} />)}
        <h3 className={styles.price}>
          Цена:
          <span>{product.price} руб.</span>
        </h3>
        <h3 className={styles.volume}>
          Объем:
          <span>{product.weight} мл.</span>
        </h3>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
