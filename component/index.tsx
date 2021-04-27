import dynamic from 'next/dynamic';

//Layout
export const Header = dynamic(() => import('./Header/Header'));
export const Layout = dynamic(() => import('./Layout/Layout'));

//Catalog
export const Catalog = dynamic(() => import('./Catalog/Catalog'));

//Product
export const ProductCard = dynamic(() => import('./Product/ProductCard/ProductCard'));
export const SingleProduct = dynamic(() => import('./Product/SingleProduct/SingleProduct'));

//Pagination
export const Pagination = dynamic(() => import('./Pagination/Pagination'));

//Loader
export const Loader = dynamic(() => import('./Loader/Loader'));

//Search
export const Search = dynamic(() => import('./Search/Search'));

//Error
export const Error = dynamic(() => import('./Error/Error'));
