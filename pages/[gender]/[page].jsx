import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { Catalog } from '../../component';
import { GET_TOTAL } from '../../lib/graphql/query';

export default function Page() {
  const { data } = useQuery(GET_TOTAL);
  const total = data?.products.pageInfo.offsetPagination.total;

  const router = useRouter();
  console.log(router.query);
  const { gender, page } = router.query;

  console.log(`Page: ${page}`);

  return (
    <>
      <Catalog genderSort={gender} page={page} total={total} />
    </>
  );
}
