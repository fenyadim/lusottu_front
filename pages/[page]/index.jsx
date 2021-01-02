import React from 'react';
import { useRouter } from 'next/router';

import { GET_PRODUCTS } from '../../lib/graphql/query';

import { Catalog } from '../../component';
import { client } from '../../lib/graphql/graph';

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

function Gender({ items, total, isLoading }) {
  const quantityPages = Math.ceil(total / 10); // Подсчет количества страниц
  const router = useRouter();
  let { page, gender } = router.query;
  page = Number(page);
  React.useEffect(() => {
    if (page > quantityPages || isNaN(page)) {
      router.push('/');
    }
  }, []);

  return (
    <>
      <Catalog items={items} genderSort={gender} total={total} page={page} isLoading={isLoading} />
    </>
  );
}

export default Gender;
