import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_TOTAL } from '../lib/graphql/query';

import { Catalog } from '../component';

export default function Home() {
  const { data } = useQuery(GET_TOTAL);
  const total = data?.products.pageInfo.offsetPagination.total;

  return (
    <>
      <Catalog total={total} />
    </>
  );
}
