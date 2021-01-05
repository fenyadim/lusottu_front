import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { GET_SINGLE_PRODUCT } from '../../lib/graphql/query';
import { client } from '../../lib/graphql/graph';

import { SingleProduct } from '../../component';
import { ISingleProduct } from '../../component/Product/SingleProduct/SingleProductTypes';

export const getServerSideProps: GetServerSideProps = async (params: GetServerSidePropsContext) => {
  const { slug } = params.query;
  const res = await client.query({ query: GET_SINGLE_PRODUCT, variables: { slug: slug } }).then();
  const product: Object = res.data.product;
  return { props: { product } };
}

export default function CatalogSlug({ product, isLoading }: ISingleProduct) {
  return (
    <>
      <SingleProduct product={product} isLoading={isLoading} />
    </>
  );
}
