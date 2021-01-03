import React from 'react';

import styles from './SingleProduct.module.scss';

export default function SingleProduct({ product, isLoading }) {
  let array = [];

  console.log(isLoading);

  function ClearElemArray() {
    array = [];
  }
  return (
    <div className={!isLoading ? styles.offer : ''}>
      <div>
        <h2>{product.productTags.nodes[0].name}</h2>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        {product.attributes &&
          product.attributes.nodes.map((item, index) => (
            <React.Fragment key={index}>
              <div>
                <h3>{`${item.name}: `}</h3>
                {item.terms.nodes.map((obj, index) => {
                  array.push(obj.name);
                })}
                <p>{array.join(', ')}</p>
                {ClearElemArray()}
              </div>
            </React.Fragment>
          ))}
        <span>{product.price} руб.</span>
        <span>{product.weight} мл.</span>
      </div>
      <div>
        <img src={product.image.mediaItemUrl} alt={product.name} />
      </div>
    </div>
  );
}
