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

export const GET_SINGLE_PRODUCT = gql`
  query($slug: ID!) {
    product(idType: SLUG, id: $slug) {
      ... on SimpleProduct {
        name
        slug
        price(format: RAW)
        weight
        description(format: RAW)
        productTags {
          nodes {
            name
          }
        }
        attributes {
          nodes {
            ... on GlobalProductAttribute {
              name
              terms {
                nodes {
                  name
                }
              }
            }
          }
        }
        image {
          mediaItemUrl
        }
      }
    }
  }
`;

export const SEARCH_ITEMS = gql`
  query($search: String, $first: Int) {
    products(where: { stockStatus: IN_STOCK, search: $search }, first: $first) {
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
    }
  }
`;