import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query($gender: [ENUM_PRODUCTS_GENDER]) {
    products(where: { gender: $gender }) {
      image {
        url
      }
      slug
      name
      price
    }
  }
`;

export const GET_TOTAL = gql`
  query {
    productsConnection {
      aggregate {
        totalCount
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
