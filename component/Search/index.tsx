import React, { ChangeEvent } from 'react';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';

import { Error, Loader } from '../index';
import { SEARCH_ITEMS } from '../../lib/graphql/query';

import styles from './Search.module.scss';

interface ISearchProductProps {
  name: string;
  slug: string;
  price: number;
  image?: {
    url: string;
  };
}

const Search: React.FC = () => {
  const [value, setValue] = React.useState<string>('');
  const [toggleContainer, setToggleContainer] = React.useState<boolean>(false);

  const { data, loading } = useQuery(SEARCH_ITEMS, {
    variables: { search: value },
  });
  const products: Array<ISearchProductProps> = data?.products;

  React.useEffect(() => {
    const searchOffer = document.querySelectorAll(`.${styles.searchOffer}`);
    const screenWidth: number = document.documentElement.clientWidth;
    const inputSearch = document.querySelectorAll('#search');
    const idActiveScreen = screenWidth > 1050 ? 1 : 0;

    const toggleMenu = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const inputValue: string | undefined = inputSearch[idActiveScreen].value;
      if (
        searchOffer[idActiveScreen].contains(target) &&
        inputValue.length !== 0 &&
        target.attributes[0].value !== styles.productContainer
      ) {
        setToggleContainer(true);
      } else {
        setToggleContainer(false);
      }
    };
    document.addEventListener('click', toggleMenu);
    return () => {
      document.removeEventListener('click', toggleMenu);
    };
  }, []);

  React.useEffect(() => {
    if (value.length === 0) {
      setToggleContainer(false);
    } else {
      setToggleContainer(true);
    }
  }, [value]);

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
      <div
        className={`${styles.searchResult} ${toggleContainer ? styles.visible : ''}`}
        id="resultBlock">
        {!loading ? (
          products.length !== 0 ? (
            products.map(({ image, name, price, slug }, index: number) => (
              <SearchProduct
                key={`${name}_${index}`}
                image={image && image}
                name={name}
                price={price}
                slug={slug}
              />
            ))
          ) : (
            <Error />
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
              src={`${image ? `https://strapi.lusottu.live${image.url}` : '/null'}`}
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
