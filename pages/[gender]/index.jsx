import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { GET_TOTAL } from '../../lib/graphql/query';

import { Catalog } from '../../component';

export default function Gender() {
  const { data } = useQuery(GET_TOTAL);
  const total = data?.products.pageInfo.offsetPagination.total;

  const router = useRouter();
  console.log(router.query);
  const { gender } = router.query;
  console.log(`Gender: ${gender}`);
  return (
    <>
      <Catalog genderSort={gender} total={total} />
    </>
  );
}
