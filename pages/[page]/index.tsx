import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { GET_PRODUCTS, GET_TOTAL } from '../../lib/graphql/query';
import { client } from '../../lib/graphql/graph';

import { Catalog } from '../../component';

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
  const res = await client.query({ query: GET_PRODUCTS, variables: { gender } });
  const products = res.data.products;
  const quantityPages = Math.ceil(totalCount / 12); // Подсчет количества страниц
  return { props: { items: products, quantityPages } };
};

interface IGender {
  items: any;
  isLoading: boolean;
  quantityPages: number;
}

enum ValuesGender {
  'female',
  'male',
  undefined,
}

// const Gender: React.FC<IGender> = ({ items, isLoading, quantityPages }) => {

const Gender: React.FC<IGender> = ({ items, quantityPages, isLoading }) => {
  // const router = useRouter();
  // const { page: currentPage } = router.query;
  // const gender: string | string[] | any = router.query.gender;
  // const page: number = Number(currentPage);
  // React.useEffect(() => {
  //   if (page > quantityPages || isNaN(page)) {
  //     router.push('/');
  //   }
  //   if (gender in ValuesGender) {
  //     return;
  //   } else {
  //     router.push('/');
  //   }
  // }, [page, gender]);

  return (
    <>
      <Catalog
        items={items}
        // genderSort={gender}
        // page={page}
        quantityPages={quantityPages}
        isLoading={isLoading}
      />
    </>
  );
};

export default Gender;
