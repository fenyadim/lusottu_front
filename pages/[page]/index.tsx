import React from 'react';
import { GetServerSideProps } from 'next';

import { GET_PRODUCTS, GET_TOTAL } from '../../lib/graphql/query';
import { client } from '../../lib/graphql/graph';

import { Catalog, Error } from '../../component';
import { IItems } from '../../lib/types/types';

export const getServerSideProps: GetServerSideProps = async (params) => {
  const totalCount = await (await client.query({ query: GET_TOTAL })).data.productsConnection
    .aggregate.totalCount;
  let gender: Array<string>;
  const getGenderFromQuery = params.query.gender;
  if (getGenderFromQuery === undefined) {
    gender = ['unisex', 'male', 'female'];
  } else if (getGenderFromQuery === 'male') {
    gender = ['unisex', 'male'];
  } else {
    gender = ['unisex', 'female'];
  }
  const quanityItemsOnPage = 12;
  const quantityPages = Math.ceil(totalCount / quanityItemsOnPage); // Подсчет количества страниц
  const currentPage = Number(params.query.page) * 12 - 12;
  const res = await client.query({
    query: GET_PRODUCTS,
    variables: { gender, limit: quanityItemsOnPage, start: currentPage },
  });
  const products = res.data.products;
  return { props: { items: products, quantityPages } };
};

interface IPage {
  items: [IItems];
  isLoading: boolean;
  quantityPages: number;
}

const Page: React.FC<IPage> = ({ items, quantityPages, isLoading }) => {
  return items[0] !== undefined ? (
    <>
      <Catalog items={items} quantityPages={quantityPages} isLoading={isLoading} />
    </>
  ) : <Error />;
};

export default Page;