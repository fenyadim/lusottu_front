import React from 'react';
import { GetServerSideProps } from 'next';
import { client } from '../lib/graphql/graph';

import { GET_PRODUCTS, GET_TOTAL } from '../lib/graphql/query';

import { Catalog } from '../component';

export const getServerSideProps: GetServerSideProps = async(params) => {
  const resTotal = await client.query({ query: GET_TOTAL }).then();
  const total: number = resTotal.data.products.pageInfo.offsetPagination.total;
  const variables = {
    first: total,
    gender: params.query.gender,
  };
  const res = await client.query({ query: GET_PRODUCTS, variables }).then();
  const products = res.data.products;
  const { nodes: items } = products;
  const quantityPages = Math.ceil(total / 10);
  return { props: { items, total, quantityPages } };
}

interface IHome {
  items: Object
  isLoading: boolean
  quantityPages: number
}

export default function Home({ items, isLoading, quantityPages }: IHome) {
  return (
    <>
      <Catalog items={items} isLoading={isLoading} quantityPages={quantityPages}/>
    </>
  );
}
