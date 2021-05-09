import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { IRouterProps } from "../../lib/types";

import styles from "./Pagination.module.scss";
import { QueryUrl } from "../../lib/queryUrl";

const Pagination: React.FC<{ quantityPages: number }> = ({ quantityPages }) => {
  const router = useRouter();
  const {
    page: currentPage,
    gender,
    types,
    price,
    brands,
  } = router.query as IRouterProps;

  const paginator: number[] = [];
  for (let i = 1; i <= quantityPages; i++) {
    paginator.push(i);
  }

  return (
    <div className={styles.offer}>
      {paginator.map((page) =>
        !gender ? (
          <Link
            key={page}
            href={{
              pathname: "/[page]",
              query: QueryUrl(page, "", brands, types, price),
            }}
            scroll={true}
          >
            <a
              className={`${styles.link} ${
                Number(currentPage) === page ? styles.active : ""
              }`}
            >
              {page}
            </a>
          </Link>
        ) : (
          <Link
            key={page}
            href={{
              pathname: "/[page]",
              query: QueryUrl(page, gender, brands, types, price),
            }}
            scroll={true}
          >
            <a
              className={`${styles.link} ${
                Number(currentPage) === page ? styles.active : ""
              }`}
            >
              {page}
            </a>
          </Link>
        )
      )}
    </div>
  );
};

export default Pagination;
