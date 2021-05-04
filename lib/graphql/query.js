import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS(
    $gender: [ENUM_PRODUCTS_GENDER]
    $start: Int
    $limit: Int
    $filterBrand: [String]
  ) {
    products(
      where: { gender: $gender, brand: { slug_contains: $filterBrand } }
      start: $start
      limit: $limit
    ) {
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
      brand {
        name
      }
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

export const SEARCH_ITEMS = gql`
  query SEARCH_ITEMS($search: String) {
    products(where: { name_contains: $search }) {
      name
      slug
      price
      image {
        url
      }
    }
  }
`;

export const GET_BRAND = gql`
  query GET_BRAND {
    brands {
      name
      slug
    }
  }
`;

export const GET_TYPES = gql`
  query GET_TYPES {
    types {
      name
      slug
    }
  }
`;
