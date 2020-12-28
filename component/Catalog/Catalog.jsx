import React from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";

import { Pagination, ProductCard } from "../index";

import styles from "./Catalog.module.scss";

const GET_PRODUCTS = gql`
  query(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $gender: String
  ) {
    products(
      where: { stockStatus: IN_STOCK, category: $gender }
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      nodes {
        ... on SimpleProduct {
          name
          slug
          price(format: RAW)
          image {
            mediaItemUrl
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        offsetPagination {
          total
        }
      }
    }
  }
`;

export default function Catalog({ genderSort }) {
  const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: { gender: genderSort },
  });

  const items = data?.products.nodes;
  const pageInfo = data?.products.pageInfo;

  if (loading) {
    return <h1>Загрузка...</h1>;
  }

  const updateQuery = (prevResult, { fetchMoreResult }) => {
    console.log(prevResult);
    console.log(fetchMoreResult);
    return fetchMoreResult;
  };

  return (
    <>
      <div className={styles.catalog}>
        {items &&
          items.map((obj, index) => (
            <React.Fragment key={index}>
              <Link href="/product/[slug]" as={`/product/${obj.slug}/`}>
                <a>
                  <ProductCard
                    title={obj.name}
                    price={obj.price}
                    img={obj.image.mediaItemUrl}
                  />
                </a>
              </Link>
            </React.Fragment>
          ))}
      </div>
      <Pagination gender={genderSort} total={pageInfo.offsetPagination.total} />
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    fetchMore({*/}
      {/*      variables: {*/}
      {/*        first: 10,*/}
      {/*        after: prevPage,*/}
      {/*        last: null,*/}
      {/*        before: null,*/}
      {/*      },*/}
      {/*      updateQuery,*/}
      {/*    });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Назад*/}
      {/*</button>*/}

      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    fetchMore({*/}
      {/*      variables: {*/}
      {/*        first: 10,*/}
      {/*        after: pageInfo.endCursor || null,*/}
      {/*        last: null,*/}
      {/*        before: null,*/}
      {/*      },*/}
      {/*      updateQuery,*/}
      {/*    });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Вперед*/}
      {/*</button>*/}

      {/*{pageInfo.hasNextPage ? (*/}
      {/*  <button*/}
      {/*    onClick={() => {*/}
      {/*      fetchMore({*/}
      {/*        variables: {*/}
      {/*          first: 10,*/}
      {/*          after: pageInfo.endCursor || null,*/}
      {/*          last: null,*/}
      {/*          before: null,*/}
      {/*        },*/}
      {/*        updateQuery,*/}
      {/*      });*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Вперед*/}
      {/*  </button>*/}
      {/*) : null}*/}
    </>
  );
}
