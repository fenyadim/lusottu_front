import { Action, State } from '../../../lib/types';

export const initialState: State = {
  brandsFilter: [],
  typesFilter: [],
};

export const reducer = (state: State, action: Action) => {
  const { type, payload } = action;
  const brandsFilter = state?.brandsFilter;
  const typesFilter = state?.typesFilter;

  switch (type) {
    case 'BRANDS_ADD': {
      const { name, slug } = payload;
      return {
        brandsFilter: [...brandsFilter, { name: name, slug: slug, isChecked: false }],
        typesFilter: [...typesFilter],
      };
    }
    case 'TYPES_ADD': {
      const { name, slug } = payload;
      return {
        brandsFilter: [...brandsFilter],
        typesFilter: [...typesFilter, { name: name, slug: slug, isChecked: false }],
      };
    }
    case 'BRANDS_TOGGLE': {
      const { targetValue, targetIsChecked } = payload;
      brandsFilter.forEach(({ slug }, index) => {
        if (slug === targetValue) {
          return (brandsFilter[index].isChecked = targetIsChecked);
        }
      });
    }
    case 'TYPES_TOGGLE': {
      const { targetValue, targetIsChecked } = payload;
      typesFilter.forEach(({ slug }, index) => {
        if (slug === targetValue) {
          return (typesFilter[index].isChecked = targetIsChecked);
        }
      });
    }
    default:
      return state;
  }
};