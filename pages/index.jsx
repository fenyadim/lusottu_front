import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_PRODUCTS } from '../lib/graphql/query';

import { Catalog } from '../component';

import { client } from '../lib/graphql/graph';

export async function getServerSideProps(params) {
  const variables = {
    first: 30,
    gender: params.query.gender,
  };
  const res = await client.query({ query: GET_PRODUCTS, variables }).then();
  const products = res.data.products;
  const { nodes: items, pageInfo } = products;
  const total = pageInfo.offsetPagination.total;
  return { props: { items, total } };
}

export default function Home({ items, total, isLoading }) {
  return (
    <>
      <Catalog total={total} items={items} isLoading={isLoading} />
    </>
  );
}
