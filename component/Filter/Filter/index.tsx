import React from 'react';
import { useRouter } from 'next/router';

import { Checkbox, FilterItem } from '../..';
import { Context } from '../../../pages/[page]';

import styles from './Filter.module.scss';

interface RouterProps {
  page?: number;
  gender?: string;
}

const Filter: React.FC = () => {
  const [filterMenu, setFilterMenu] = React.useState<boolean>(false);
  const [valueFrom, setValueFrom] = React.useState<string>('');
  const [valueTo, setValueTo] = React.useState<string>('');
  const context = React.useContext(Context);
  const { state, dispatch } = context;
  const router = useRouter();
  const { page, gender } = router.query as RouterProps;
  const { brandsFilter, typesFilter } = state;

  const toggleCheckboxFilter = (
    { currentTarget }: React.MouseEvent<HTMLInputElement>,
    typeDispatch: string,
  ) => {
    dispatch({
      type: typeDispatch,
      payload: {
        targetValue: currentTarget.value,
        targetIsChecked: currentTarget.checked,
      },
    });
  };

  const FilterUrl = (sex: string, brands: string[], types: string[], price: string[]) => {
    const queryObj = {
      page,
      gender: sex,
      brands: brands.join('_'),
      types: types.join('_'),
      price: price.join('_'),
    };
    for (let i in queryObj) {
      if (queryObj[i] === undefined || !queryObj[i]) {
        delete queryObj[i];
      }
    }
    return queryObj;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    let brandsFilterActive: string[] | undefined = [];
    let typesFilterActive: string[] | undefined = [];
    let priceFilterActive: string[] | undefined = [];
    if (valueFrom || valueTo) {
      priceFilterActive.push(valueFrom, valueTo);
    }
    brandsFilter.map(({ slug, isChecked }) => (isChecked ? brandsFilterActive.push(slug) : ''));
    typesFilter.map(({ slug, isChecked }) => (isChecked ? typesFilterActive.push(slug) : ''));
    router.push({
      pathname: '/[page]',
      query: FilterUrl(gender, brandsFilterActive, typesFilterActive, priceFilterActive),
    });
    e.preventDefault();
  };

  return (
    <div className={`${styles.filterOffer} ${filterMenu ? styles.active : styles.disable}`}>
      <div className={styles.filterBlock}>
        <form onSubmit={handleSubmit}>
          <FilterItem title={'Цена'}>
            <label>
              От:
              <input
                type="number"
                name="from"
                id="from"
                min="0"
                onChange={(e) => {
                  setValueFrom(e.target.value);
                }}
              />
            </label>
            <label>
              До:
              <input
                type="number"
                name="to"
                id="to"
                onChange={(e) => {
                  setValueTo(e.target.value);
                }}
              />
            </label>
          </FilterItem>
          <FilterItem title={'Бренд'}>
            {brandsFilter &&
              brandsFilter.map(
                ({ name, slug, isChecked }: { name: string; slug: string; isChecked: boolean }) => (
                  <Checkbox
                    key={`${name}_${slug}`}
                    name={name}
                    slug={slug}
                    isChecked={isChecked}
                    onClickFunc={(e) => toggleCheckboxFilter(e, 'BRANDS_TOGGLE')}
                  />
                ),
              )}
          </FilterItem>
          <FilterItem title={'Тип парфюма'}>
            {typesFilter &&
              typesFilter.map(
                ({ name, slug, isChecked }: { name: string; slug: string; isChecked: boolean }) => (
                  <Checkbox
                    key={`${name}_${slug}`}
                    name={name}
                    slug={slug}
                    isChecked={isChecked}
                    onClickFunc={(e) => toggleCheckboxFilter(e, 'TYPES_TOGGLE')}
                  />
                ),
              )}
          </FilterItem>
          <input type="submit" value="Отправить" />
        </form>
      </div>
      <button className={styles.filterBtn} onClick={() => setFilterMenu(!filterMenu)}>
        <svg x="0px" y="0px" viewBox="0 0 477.875 477.875">
          <g>
            <g>
              <path
                d="M460.804,0H17.071C7.645,0,0.004,7.641,0.004,17.067V102.4c-0.004,4.842,2.05,9.458,5.649,12.698l165.018,148.514V460.8
			c-0.004,9.426,7.633,17.07,17.059,17.075c2.651,0.001,5.266-0.615,7.637-1.8l102.4-51.2c5.786-2.891,9.441-8.806,9.438-15.275
			V263.612l165.018-148.48c3.608-3.247,5.662-7.878,5.649-12.732V17.067C477.871,7.641,470.23,0,460.804,0z"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Filter;
