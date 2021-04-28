import { useQuery } from '@apollo/client';
import React, { ChangeEvent } from 'react';

import { FilterItem } from '../..';

import { GET_BRAND } from '../../../lib/graphql/query';

import styles from './Filter.module.scss';

const Filter: React.FC = () => {
  const [filterMenu, setFilterMenu] = React.useState<boolean>(false);
  const [brandValue, setBrandValue] = React.useState([]);
  const { data } = useQuery(GET_BRAND);
  const brands: [] = data?.brands;

  const Toggle = (toggle: boolean) => {
    return toggle ? styles.active : styles.disable;
  };

  const fetchBrandValue = (e) => {
    const id = brandValue.indexOf(e.target.value);
    setBrandValue((prevState) => [...prevState, e.target.value]);
    if (brandValue.includes(e.target.value)) {
      brandValue.forEach((value) => {
        if (e.target.value === value) {
          const newArr = brandValue.splice(id, 1);
          setBrandValue(newArr);
        }
      });
    }
    // if (!brandValue.includes(e.target.value)) {
    //   setBrandValue((prevState) => [...prevState, e.target.value]);
    // } else {
    //   brandValue.forEach((value) => {
    //     if (e.target.value === value) {
    //       const newArr = brandValue.splice(id - 1, 1);
    //       setBrandValue(newArr);
    //     }
    //   });
    // }
    console.log(id);
  };

  console.log(brandValue);

  return (
    <div className={`${styles.filterOffer} ${Toggle(filterMenu)}`}>
      <div className={styles.filterBlock}>
        <FilterItem title={'Цена'}>
          <label>
            От: <input type="text" name="from" id="from" />
          </label>
          <label>
            До: <input type="text" name="to" id="to" />
          </label>
        </FilterItem>
        <FilterItem title={'Бренд'}>
          {brands?.map(({ name, slug }: { name: string; slug: string }) => (
            <div key={`${name}_${slug}`}>
              <label>
                <input type="checkbox" name={name} value={slug} onClick={fetchBrandValue} />
                {name}
              </label>
            </div>
          ))}
        </FilterItem>
        <FilterItem title={'Тест'}>{brandValue}</FilterItem>
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
