import React from 'react';
import { useQuery } from '@apollo/client';

import { Error, Loader, SearchProduct, TextInput } from '../index';

import { SEARCH_ITEMS } from '../../lib/graphql/query';
import { ISearchProductProps } from '../../lib/types';

import styles from './Search.module.scss';

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
    const inputSearch: NodeListOf<HTMLInputElement> = document.querySelectorAll('#search');
    const idActiveScreen = screenWidth > 1050 ? 1 : 0;

    const toggleMenu = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const inputValue: string | undefined = inputSearch[idActiveScreen]?.value;
      if (
        searchOffer[idActiveScreen]?.contains(target) &&
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
        <TextInput value={value} type="search" placeholder="Поиск" setValue={setValue} />
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
          products?.length !== 0 ? (
            products?.map(({ image, name, price, slug }, index: number) => (
              <SearchProduct
                key={`${name}_${index}_search`}
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
