import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { GET_PRODUCTS, GET_TOTAL } from '../../lib/graphql/query';

import { Catalog } from '../../component';
import { client } from '../../lib/graphql/graph';

export const getServerSideProps: GetServerSideProps = async (params) => {
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
  // Подсчет количества страниц
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
