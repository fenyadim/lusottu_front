import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';

import { GET_PRODUCTS } from '../../lib/graphql/query';

import { Pagination, ProductCard } from '../index';

import styles from './Catalog.module.scss';

export default function Catalog({ genderSort, total, page }) {
  const array = [];
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { gender: genderSort, first: total },
  });

  const items = data?.products.nodes;
  const pageInfo = data?.products.pageInfo;

  let pageNum;
  if (page === undefined) {
    pageNum = 0;
  } else {
    pageNum = (page - 1) * 10;
  }

  if (loading) {
    return <h1>Загрузка...</h1>;
  }

  for (let start = pageNum; start < pageNum + 10; start++) {
    array.push(items[start]);
  }
  console.log(`GenderSort: ${genderSort}`);
  console.log(items);
  console.log(array);
  console.log(pageNum);

  return (
    <>
      <div className={styles.catalog}>
        {items &&
          array.map((obj, index) =>
            obj ? (
              <React.Fragment key={index}>
                <Link href="/product/[slug]" as={`/product/${obj.slug}/`}>
                  <a>
                    <ProductCard title={obj.name} price={obj.price} img={obj.image.mediaItemUrl} />
                  </a>
                </Link>
              </React.Fragment>
            ) : (
              ''
            ),
          )}
      </div>
      <Pagination gender={genderSort} total={pageInfo.offsetPagination.total} />
    </>
  );
}
