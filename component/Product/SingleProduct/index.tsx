import React from 'react';
import Image from 'next/image';

import { ISingleProduct } from '../../../lib/types';

import { Loader, Attribute } from '../..';

import styles from './SingleProduct.module.scss';

const SingleProduct: React.FC<ISingleProduct> = ({product, isLoading}) => {
  const {name, brand, desc, image, price, volume} = product;
  return !isLoading ? (
    <div className={!isLoading ? styles.offer : styles.offerInvisible}>
      <div className={styles.imageSide}>
        {/*<Image*/}
        {/*  src={`${image ? `https://media.graphcms.com/${image.url}` : '/null'}`}*/}
        {/*  layout="fill"*/}
        {/*  objectFit="contain"*/}
        {/*  priority={true}*/}
        {/*/>*/}
      </div>
      <div className={styles.infoSide}>
        <h1 className={styles.title}>{name}</h1>
        <Attribute name="Бренд" value={brand.name}/>
        <Attribute name="Описание" value={desc}/>
        <Attribute name="Цена" value={price} addition="руб."/>
        <Attribute name="Объем" value={volume} addition="мл."/>
      </div>
    </div>
  ) : (
    <Loader/>
  );
};

export default SingleProduct;
