import { useRouter } from 'next/router';

import { SingleProduct } from '../../component';

export default function CatalogSlug() {
  const router = useRouter();
  const { slug } = router.query;

  console.log(`Slug: ${slug}`);

  return (
    <>
      <SingleProduct slug={slug} />
    </>
  );
}
