import React, { useReducer } from "react";
import { GetServerSideProps } from "next";

import { GET_BRAND, GET_PRODUCTS, GET_TOTAL } from "../../lib/graphql/query";
import { client } from "../../lib/graphql/graph";

import { Catalog, Error } from "../../component";
import { reducer } from "../../component/Filter/Filter/reducer";

import { Action, IItems, State } from "../../lib/types";

interface IPage {
  items: [IItems];
  isLoading: boolean;
  quantityPages: number;
  brands: [BrandProps];
}

export interface BrandProps {
  name?: string;
  slug?: string;
}

interface ContextProps {
  state?: State[];
  dispatch?: React.Dispatch<Action>;
}

interface QueryProps {
  filter?: string;
  page?: number;
  gender?: string;
}

export const getServerSideProps: GetServerSideProps = async (params) => {
  const totalCount = (await client.query({ query: GET_TOTAL })).data
    .productsConnection.aggregate.totalCount;
  let gender: Array<string>;
  const { filter, page, gender: getGenderFromQuery }: QueryProps = params.query;
  if (getGenderFromQuery === undefined) {
    gender = ["unisex", "male", "female"];
  } else if (getGenderFromQuery === "male") {
    gender = ["unisex", "male"];
  } else {
    gender = ["unisex", "female"];
  }

  const quanityItemsOnPage = 12;
  const quantityPages = Math.ceil(totalCount / quanityItemsOnPage); // Подсчет количества страниц
  const currentPage = Number(page) * 12 - 12;
  const { data: dataProducts } = await client.query({
    query: GET_PRODUCTS,
    variables: {
      gender,
      limit: quanityItemsOnPage,
      start: currentPage,
      filterBrand: filter?.split("_"),
    },
  });
  const { data: dataBrands } = await client.query({
    query: GET_BRAND,
  });
  const { brands } = dataBrands;
  const { products } = dataProducts;
  return { props: { items: products, quantityPages, brands } };
};

export const Context = React.createContext<ContextProps>({});

const Page: React.FC<IPage> = ({ items, quantityPages, isLoading, brands }) => {
  const [state, dispatch] = useReducer(reducer, []);

  React.useEffect(() => {
    brands?.map(({ name, slug }) => {
      dispatch({ type: "ADD", payload: { name, slug, isChecked: false } });
    });
  }, []);

  return items[0] !== undefined ? (
    <>
      <Context.Provider value={{ state, dispatch } as ContextProps}>
        <Catalog
          items={items}
          quantityPages={quantityPages}
          isLoading={isLoading}
        />
      </Context.Provider>
    </>
  ) : (
    <Error />
  );
};

export default Page;
