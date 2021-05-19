import dynamic from 'next/dynamic';

//Layout
export const Header = dynamic(() => import('./Header'));
export const Layout = dynamic(() => import('./Layout'));
export const Footer = dynamic(() => import('./Footer'));

//Catalog
export const Catalog = dynamic(() => import('./Catalog'));

//Product
export const ProductCard = dynamic(() => import('./Product/ProductCard'));
export const SingleProduct = dynamic(() => import('./Product/SingleProduct'));

//Pagination
export const Pagination = dynamic(() => import('./Pagination'));

//Navigation
export const Navigation = dynamic(() => import('./Navigation'));

//Loader
export const Loader = dynamic(() => import('./Loader'));

//Search
export const Search = dynamic(() => import('./Search'));
export const SearchProduct = dynamic(() => import('./Search/SearchProduct'));

//Error
export const Error = dynamic(() => import('./Error'));

//MenuPopup
export const MenuPopup = dynamic(() => import('./MenuPopup'));

//Filter
export const Filter = dynamic(() => import('./Filter/Filter'));
export const FilterItem = dynamic(() => import('./Filter/FilterItem'));

//Custom Elements
export const Checkbox = dynamic(() => import('./Elements/Checkbox'));
export const Attribute = dynamic(() => import('./Elements/Attribute'));
export const TextInput = dynamic(() => import('./Elements/TextInput'));
