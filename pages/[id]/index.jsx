import React from "react";

import { Catalog, Layout } from "../../component";
import { useRouter } from "next/router";

export default function Gender() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <Layout>
      <Catalog genderSort={id} />
    </Layout>
  );
}
