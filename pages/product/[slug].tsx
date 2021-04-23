import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { GET_SINGLE_PRODUCT } from '../../lib/graphql/query';
import { client } from '../../lib/graphql/graph';

import { Error, SingleProduct } from '../../component';
import { ISingleProduct } from '../../component/Product/SingleProduct/SingleProductTypes';

export const getServerSideProps: GetServerSideProps = async (params: GetServerSidePropsContext) => {
  const { slug } = params.query;
  const res = await client.query({ query: GET_SINGLE_PRODUCT, variables: { slug } });
  const product = res.data.productFindSlug;
  console.log(slug);
  return { props: { product } };
};

const CatalogSlug: React.FC<ISingleProduct> = ({ product, isLoading }) => {
  return product ? (
    <>
      <SingleProduct product={product} isLoading={isLoading} />
    </>
  ) : (
    <Error />
  );
};

export default CatalogSlug;
