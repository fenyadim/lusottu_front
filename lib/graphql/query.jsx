import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query($first: Int, $gender: String) {
    products(where: { stockStatus: IN_STOCK, category: $gender }, first: $first) {
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
        offsetPagination {
          total
        }
      }
    }
  }
`;

export const GET_TOTAL = gql`
  query {
    products {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`;

export const FIRST_VALUE_PAGES = gql`
  query($total: Int) {
    products(first: $total) {
      edges {
        cursor
      }
    }
  }
`;
