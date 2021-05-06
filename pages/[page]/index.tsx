import React, { useReducer } from 'react';
import { GetServerSideProps } from 'next';

import { GET_BRAND, GET_PRODUCTS, GET_TOTAL, GET_TYPES } from '../../lib/graphql/query';
import { client } from '../../lib/graphql/';

import { Catalog, Error } from '../../component';
import { initialState, reducer } from '../../component/Filter/Filter/reducer';

import { Action, IItems, State } from '../../lib/types';
import Footer from '../../component/Footer';

interface IPage {
  items: [IItems];
  isLoading: boolean;
  quantityPages: number;
  brands: [FilterProps];
  types: [FilterProps];
}

export interface FilterProps {
  name?: string;
  slug?: string;
}

interface ContextProps {
  state?: State;
  dispatch?: React.Dispatch<Action>;
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
  const totalCount = (await client.query({ query: GET_TOTAL })).data.productsConnection.aggregate
    .totalCount;
  let gender: Array<string>;

  const {
    brands: brandsQuery,
    types: typesQuery,
    price: priceQuery,
    page,
    gender: getGenderFromQuery,
  }: QueryProps = params.query;

  if (getGenderFromQuery === undefined) {
    gender = ['unisex', 'male', 'female'];
  } else if (getGenderFromQuery === 'male') {
    gender = ['unisex', 'male'];
  } else {
    gender = ['unisex', 'female'];
  }
  const quanityItemsOnPage = 12;
  const quantityPages = Math.ceil(totalCount / quanityItemsOnPage); // Подсчет количества страниц
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
  const { brands } = dataBrands;
  const { products } = dataProducts;
  const { types } = dataTypes;
  return { props: { items: products, quantityPages, brands, types } };
};

export const Context = React.createContext<ContextProps>({});

const Page: React.FC<IPage> = ({ items, quantityPages, isLoading, brands, types }) => {
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
    <>
      <Context.Provider value={{ state, dispatch } as ContextProps}>
        <Catalog items={items} isLoading={isLoading} />
        <Footer quantityPages={quantityPages} />
      </Context.Provider>
    </>
  );
};

export default Page;
