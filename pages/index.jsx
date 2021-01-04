import React from 'react';

import { GET_PRODUCTS, GET_TOTAL } from '../lib/graphql/query';

import { Catalog } from '../component';

import { client } from '../lib/graphql/graph';

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

export default function Home({ items, total, isLoading }) {
  return (
    <>
      <Catalog items={items} isLoading={isLoading} />
    </>
  );
}
