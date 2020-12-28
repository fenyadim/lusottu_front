import { useRouter } from "next/router";

import { Layout, SingleProduct } from "../../component";

export default function CatalogSlug() {
  const router = useRouter();
  const { slug } = router.query;

  console.log(slug);

  return (
    <Layout>
      <SingleProduct slug={slug} />
    </Layout>
  );
}
