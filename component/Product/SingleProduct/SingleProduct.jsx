import React from "react";
import { gql, useQuery } from "@apollo/client";

import styles from "./SingleProduct.module.scss";

const GET_SINGLE_PRODUCT = gql`
  query($slug: ID!) {
    product(idType: SLUG, id: $slug) {
      ... on SimpleProduct {
        name
        slug
        price(format: RAW)
        weight
        description(format: RAW)
        productTags {
          nodes {
            name
          }
        }
        attributes {
          nodes {
            ... on GlobalProductAttribute {
              name
              terms {
                nodes {
                  name
                }
              }
            }
          }
        }
        image {
          mediaItemUrl
        }
      }
    }
  }
`;

export default function SingleProduct({ slug }) {
  let array = [];
  const { loading, error, data } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { slug },
  });
  let product;
  if (data) {
    product = data.product;
  }
  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  function ClearElemArray() {
    array = [];
  }
  return (
    <div className={styles.offer}>
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
                <p>{array.join(", ")}</p>
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
