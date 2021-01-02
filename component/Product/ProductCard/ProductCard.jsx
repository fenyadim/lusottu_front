import React from 'react';

import styles from './ProductCard.module.scss';

export default function ProductCard({ title, price, img, isLoading }) {
  return (
    <div className={styles.productCard}>
      <img className={styles.productImg} src={img} alt={title} />
      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{title}</h2>
        {/*<p>{desc}</p>*/}
        {/*{attributes &&*/}
        {/*  attributes.nodes.map((item, index) => (*/}
        {/*    <Fragment key={index}>*/}
        {/*      <h3>{`${item.name}: `}</h3>*/}
        {/*      <ul>*/}
        {/*        {item.terms.nodes.map((obj, index) => (*/}
        {/*          <li key={index}>{obj.name}</li>*/}
        {/*        ))}*/}
        {/*      </ul>*/}
        {/*    </Fragment>*/}
        {/*  ))}*/}
        {/*<span>{weight}</span>*/}
        <span className={styles.productPrice}>{price} руб.</span>
      </div>
    </div>
  );
}
