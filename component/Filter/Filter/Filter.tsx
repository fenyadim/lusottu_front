import React from "react";
import { useRouter } from "next/router";

import { FilterItem } from "../..";
import { Context } from "../../../pages/[page]";

import styles from "./Filter.module.scss";
import { log } from "util";

interface RouterProps {
  page?: number;
  gender?: string;
  asPath?: string;
}

const Filter: React.FC = () => {
  const [filterMenu, setFilterMenu] = React.useState<boolean>(false);
  const context = React.useContext(Context);
  const { state, dispatch } = context;
  console.log(state);
  const router = useRouter();
  const { page, gender } = router.query as RouterProps;

  const Toggle = (toggle: boolean) => {
    return toggle ? styles.active : styles.disable;
  };

  const fetchBrandValue = ({
    currentTarget,
  }: React.MouseEvent<HTMLInputElement>) => {
    dispatch({
      type: "TOGGLE",
      payload: {
        targetValue: currentTarget.value,
        targetIsChecked: currentTarget.checked,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newArr = [];
    state.map(({ slug, isChecked }) => (isChecked ? newArr.push(slug) : ""));
    const isFilterNull = (gender) => {
      if (newArr.length === 0) {
        gender
          ? router.push({ pathname: "/[page]", query: { page, gender } })
          : router.push({
              pathname: "/[page]",
              query: { page },
            });
      }
    };
    if (gender) {
      isFilterNull(gender);
      router.push({
        query: { page, gender, filter: newArr.join("_") },
      });
    } else {
      isFilterNull(gender);
      router.push({
        pathname: "/[page]",
        query: { page, filter: newArr.join("_") },
      });
    }
  };
  return (
    <div className={`${styles.filterOffer} ${Toggle(filterMenu)}`}>
      <div className={styles.filterBlock}>
        <FilterItem title={"Цена"}>
          <label>
            От: <input type="text" name="from" id="from" />
          </label>
          <label>
            До: <input type="text" name="to" id="to" />
          </label>
        </FilterItem>
        <FilterItem title={"Бренд"}>
          <form onSubmit={handleSubmit}>
            {state?.map(
              ({
                name,
                slug,
                isChecked,
              }: {
                name: string;
                slug: string;
                isChecked: boolean;
              }) => (
                <div key={`${name}_${slug}`}>
                  <label>
                    <input
                      type="checkbox"
                      name={name}
                      value={slug}
                      defaultChecked={isChecked}
                      onClick={fetchBrandValue}
                    />
                    {name}
                  </label>
                </div>
              )
            )}
            <input type="submit" value="Отправить" />
          </form>
        </FilterItem>
        <FilterItem title={"Тест"}>
          {state.map(({ slug, isChecked }, index) =>
            isChecked ? <p key={index}>{slug}</p> : ""
          )}
        </FilterItem>
      </div>
      <button
        className={styles.filterBtn}
        onClick={() => setFilterMenu(!filterMenu)}
      >
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
