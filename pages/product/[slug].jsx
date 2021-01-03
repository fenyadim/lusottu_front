import { useRouter } from 'next/router';

import { SingleProduct } from '../../component';
import { GET_SINGLE_PRODUCT } from '../../lib/graphql/query';
import { client } from '../../lib/graphql/graph';

export async function getServerSideProps(params) {
  const { slug } = params.query;
  const res = await client.query({ query: GET_SINGLE_PRODUCT, variables: { slug: slug } }).then();
  const singleProduct = res.data.product;
  return { props: { singleProduct } };
}

export default function CatalogSlug({ singleProduct, isLoading }) {
  return (
    <>
      <SingleProduct product={singleProduct} isLoading={isLoading} />
    </>
  );
}
