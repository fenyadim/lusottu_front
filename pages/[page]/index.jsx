import React from 'react';
import { useRouter } from 'next/router';

import { GET_PRODUCTS, GET_TOTAL } from '../../lib/graphql/query';

import { Catalog } from '../../component';
import { client } from '../../lib/graphql/graph';

export async function getServerSideProps(params) {
  const resTotal = await client.query({ query: GET_TOTAL }).then();
  const total = resTotal.data.products.pageInfo.offsetPagination.total;
  const variables = {
    first: total,
    gender: params.query.gender,
  };
  const res = await client.query({ query: GET_PRODUCTS, variables }).then();
  const products = res.data.products;
  const { nodes: items } = products;
  return { props: { items, total } };
}

function Gender({ items, total, isLoading }) {
  // Подсчет количества страниц
  const quantityPages = Math.ceil(total / 10);
  const router = useRouter();
  let { page, gender } = router.query;
  page = Number(page);
  React.useEffect(() => {
    if (page > quantityPages || isNaN(page)) {
      router.push('/');
    }
  }, []);

  return (
    <>
      <Catalog
        items={items}
        genderSort={gender}
        page={page}
        quantityPages={quantityPages}
        isLoading={isLoading}
      />
    </>
  );
}

export default Gender;
