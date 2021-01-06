import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { GET_PRODUCTS, GET_TOTAL } from '../../lib/graphql/query';

import { Catalog } from '../../component';
import { client } from '../../lib/graphql/graph';

export const getServerSideProps: GetServerSideProps = async (params) => {
  const resTotal = await client.query({ query: GET_TOTAL });
  const variables = {
    first: resTotal.data.products.pageInfo.offsetPagination.total,
    gender: params.query.gender,
  };
  const res = await client.query({ query: GET_PRODUCTS, variables });
  const products = res.data.products;
  const total = products.pageInfo.offsetPagination.total;
  const { nodes: items } = products;
  const quantityPages = Math.ceil(total / 12); // Подсчет количества страниц
  return { props: { items, quantityPages } };
};

interface IGender {
  items: Object;
  isLoading: boolean;
  quantityPages: number;
}

enum ValuesGender {
  'female',
  'male',
  undefined,
}

function Gender({ items, isLoading, quantityPages }: IGender) {
  const router = useRouter();
  const { page: currentPage } = router.query;
  const gender: string | string[] | any = router.query.gender;
  const page: number = Number(currentPage);
  React.useEffect(() => {
    if (page > quantityPages || isNaN(page)) {
      router.push('/');
    }
    if (gender in ValuesGender) {
      return;
    } else {
      router.push('/');
    }
  }, [page, gender]);

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
