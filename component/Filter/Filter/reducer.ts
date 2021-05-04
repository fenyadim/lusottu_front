import { Action, State } from '../../../lib/types';

export const initialState: State = {
  brandsFilter: [],
  typesFilter: [],
};

export const reducer = (state: State, action: Action) => {
  const { type, payload } = action;
  const brandsFilter = state?.brandsFilter;
  const typesFilter = state?.typesFilter;

  console.log(state);

  switch (type) {
    case 'BRANDS_ADD': {
      const { name, slug } = payload;
      return { brandsFilter: [...brandsFilter, { name: name, slug: slug, isChecked: false }] };
    }
    case 'TYPES_ADD': {
      const { name, slug } = payload;
      console.log(name, slug);
      return { typesFilter: [...typesFilter, { name: name, slug: slug, isChecked: false }] };
    }
    case 'BRANDS_TOGGLE': {
      const { targetValue, targetIsChecked } = payload;
      brandsFilter.forEach(({ slug }, index) => {
        if (slug === targetValue) {
          return (brandsFilter[index].isChecked = targetIsChecked);
        }
      });
    }
    default:
      return state;
  }
};
