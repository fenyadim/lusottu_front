import React, { ChangeEvent } from 'react';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';

import { Loader } from '../index';
import { SEARCH_ITEMS } from '../../lib/graphql/query';

import styles from './Search.module.scss';

interface ISearchProductProps {
  name: string;
  slug: string;
  price: number;
  image: {
    url: string;
  };
}

interface SearchProps {
  menuHandler?: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({ menuHandler }) => {
  const [value, setValue] = React.useState<string>('');
  const [toggleContainer, setToggleContainer] = React.useState<boolean>(false);

  const { data, loading } = useQuery(SEARCH_ITEMS, { variables: { search: value } });
  const products: Array<ISearchProductProps> = data?.products;

  React.useEffect(() => {
    const screenWidht: number = document.documentElement.clientWidth;
    const inputSearch = document.getElementsByTagName('input');
    const searchResultContainer = document.getElementsByClassName(styles.searchResult);
    const idActiveScreen = screenWidht > 1050 ? 1 : 0;

    console.log(menuHandler);

    const toggleMenu = (e: Event) => {
      if (
        e.target === searchResultContainer[idActiveScreen] ||
        e.target === inputSearch[idActiveScreen]
      ) {
        setToggleContainer(true);
      } else {
        setToggleContainer(false);
        menuHandler(false);
      }
    };
    document.addEventListener('click', toggleMenu);
    return () => {
      document.removeEventListener('click', toggleMenu);
    };
  }, []);

  return (
    <div className={styles.searchOffer}>
      <div className={styles.inputSearch}>
        <input
          type="search"
          value={value}
          placeholder="Поиск"
          id="search"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e && setValue(e.target.value);
          }}
        />
        <button
          className={`${styles.clear} ${
            value && value.trim().length !== 0 ? styles.showClear : ''
          }`}
          onClick={() => {
            setValue('');
          }}>
          <span />
        </button>
      </div>
      <div className={`${styles.searchResult} ${toggleContainer ? styles.visible : ''}`}>
        {!loading ? (
          products.length !== 0 ? (
            products.map(({ image, name, price, slug }, index: number) => (
              <SearchProduct
                key={`${name}_${index}`}
                image={image}
                name={name}
                price={price}
                slug={slug}
              />
            ))
          ) : (
            'Ничего не найдено'
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Search;

const SearchProduct = ({ image, name, price, slug }: ISearchProductProps) => {
  return (
    <Link href="/product/[slug]" as={`/product/${slug}/`}>
      <a>
        <div className={styles.productContainer}>
          <div className={styles.image}>
            <Image
              src={`https://strapi.lusottu.live${image.url}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.price}>{price} руб.</p>
        </div>
      </a>
    </Link>
  );
};
