import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($gender: [ENUM_PRODUCTS_GENDER], $start: Int, $limit: Int) {
    products(where: { gender: $gender }, start: $start, limit: $limit) {
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
  query GET_TOTAL {
    productsConnection {
      aggregate {
        totalCount
      }
    }
  }
`;

export const GET_SINGLE_PRODUCT = gql`
  query GET_SINGLE_PRODUCT($slug: String) {
    productFindSlug(slug: $slug) {
      image {
        url
      }
      name
      brand
      desc
      price
      volume
      perfumer {
        desc
      }
      base_notes {
        desc
      }
      top_notes {
        desc
      }
      middle_notes {
        desc
      }
    }
  }
`;

// export const SEARCH_ITEMS = gql`
//   query($search: String, $first: Int) {
//     products(where: { stockStatus: IN_STOCK, search: $search }, first: $first) {
//       nodes {
//         ... on SimpleProduct {
//           name
//           slug
//           price(format: RAW)
//           image {
//             mediaItemUrl
//           }
//         }
//       }
//     }
//   }
// `;
