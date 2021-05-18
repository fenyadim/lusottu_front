import React, { useReducer } from 'react';
import { GetServerSideProps } from 'next';

import { GET_BRAND, GET_PRODUCTS, GET_TYPES } from '../../lib/graphql/query';
import { client } from '../../lib/graphql/';

import { Catalog, Footer } from '../../component';

import { initialState, reducer } from '../../lib/reducer';
import { IItems } from '../../lib/types';
import { Context, ContextProps } from '../../lib/context';

interface IPage {
  items: [IItems];
  isLoading: boolean;
  quantityPages: number;
  brands: [FilterProps];
  types: [FilterProps];
  minPrice: number;
  maxPrice: number;
}

export interface FilterProps {
  name?: string;
  slug?: string;
}

interface QueryProps {
  brands?: string;
  types?: string;
  price?: string;
  page?: number;
  gender?: string;
}

const changeVariables = (
  gender: string[],
  brands: string,
  types: string,
  price: string,
  limit: number,
  start: number,
) => {
  const arrayFilterPrice = price?.split('_');
  const priceFrom = arrayFilterPrice ? Number(arrayFilterPrice[0]) : null;
  const priceTo = arrayFilterPrice ? Number(arrayFilterPrice[1]) : null;
  const arrayFilterBrands = brands?.split('_');
  const arrayFilterTypes = types?.split('_');

  const varObj = {
    filterBrand: arrayFilterBrands,
    filterTypes: arrayFilterTypes,
    filterPriceFrom: priceFrom,
    filterPriceTo: priceTo,
    gender,
    limit,
    start,
  };
  for (let i in varObj) {
    if (varObj[i] === undefined || !varObj[i]) {
      delete varObj[i];
    }
  }
  return varObj;
};

export const getServerSideProps: GetServerSideProps = async (params) => {
  let gender: Array<string>;
  const {
    brands: brandsQuery,
    types: typesQuery,
    price: priceQuery,
    page,
    gender: genderQuery,
  }: QueryProps = params.query;

  if (genderQuery === undefined) {
    gender = ['unisex', 'male', 'female'];
  } else if (genderQuery === 'male') {
    gender = ['unisex', 'male'];
  } else {
    gender = ['unisex', 'female'];
  }
  const quanityItemsOnPage = 12;
  const currentPage = Number(page) * 12 - 12;

  const { data: dataProducts } = await client.query({
    query: GET_PRODUCTS,
    variables: changeVariables(
      gender,
      brandsQuery,
      typesQuery,
      priceQuery,
      quanityItemsOnPage,
      currentPage,
    ),
  });
  const { data: dataBrands } = await client.query({
    query: GET_BRAND,
  });
  const { data: dataTypes } = await client.query({
    query: GET_TYPES,
  });

  const { values: items } = dataProducts.productsConnection;
  const { count: totalCount, min, max } = dataProducts.productsConnection.aggregate;
  const { price: minPrice } = min;
  const { price: maxPrice } = max;
  const { brands } = dataBrands;
  const { types } = dataTypes;
  const quantityPages = Math.ceil(totalCount / quanityItemsOnPage); // Подсчет количества страниц
  return { props: { items, quantityPages, brands, types, maxPrice, minPrice } };
};

const Page: React.FC<IPage> = ({
  items,
  quantityPages,
  isLoading,
  brands,
  types,
  maxPrice,
  minPrice,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    brands?.map(({ name, slug }) => {
      dispatch({ type: 'BRANDS_ADD', payload: { name, slug } });
    });
    types?.map(({ name, slug }) => {
      dispatch({ type: 'TYPES_ADD', payload: { name, slug } });
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch, maxPrice, minPrice } as ContextProps}>
      <Catalog items={items} isLoading={isLoading} />
      {!isLoading ? <Footer quantityPages={quantityPages} /> : ''}
    </Context.Provider>
  );
};

export default Page;
