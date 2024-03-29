import { gql } from '@apollo/client';

// query GET_PRODUCTS
// #  (
//   #    $gender: [Gender]
// #    $start: Int
// #    $limit: Int
// #    $filterBrand: [String]
// #    $filterTypes: [String]
// #    $filterPriceFrom: Int
// #    $filterPriceTo: Int
// #  )
// {
//     pro
//     #    (
//       #      start: $start
//     #      limit: $limit
//     #      where: {
//     #        gender: $gender
//     #        brand: { slug_contains: $filterBrand }
//     #        type: { slug_contains: $filterTypes }
//     #        price_gte: $filterPriceFrom
//     #        price_lte: $filterPriceTo
//     #      }
//     #    )
//     {
//         image {
//         url
//     }
//         name
//         slug
//         price
//     }
// }
// `;

export const GET_PRODUCTS = gql`
    query GET_PRODUCTS($gender: [Gender!], $filterBrand: StringOrArray) {
        products(where: {gender_in: $gender, brand: {slug_in: $filterBrand}}) {
            image {
                handle
            }
            name
            slug
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
            notes
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
        brands(orderBy: name_ASC) {
            name
            slug
        }
    }
`;

export const GET_TYPES = gql`
    query GET_TYPES {
        types(sort: "name:ASC") {
            name
            slug
        }
    }
`;
