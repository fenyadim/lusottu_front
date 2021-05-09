import { IAction, IState } from "../types";

export const initialState: IState = {
  brandsFilter: [],
  typesFilter: [],
};

export const index = (state: IState, action: IAction) => {
  const { type, payload } = action;
  const brandsFilter = state?.brandsFilter;
  const typesFilter = state?.typesFilter;

  const toggleCheckbox = (
    typeFirst: any[],
    typeSecond?: any[],
    payload?: { targetValue: string; targetIsChecked: boolean }
  ) => {
    const targetValue = payload ? payload.targetValue : "";
    const targetIsChecked = payload ? payload.targetIsChecked : "";
    if (payload) {
      typeFirst.forEach(({ slug }, index) => {
        if (slug === targetValue) {
          typeFirst[index].isChecked = targetIsChecked;
        }
      });
    } else {
      typeFirst.forEach(({ isChecked }, index) => {
        if (isChecked) {
          return (typeFirst[index].isChecked = false);
        }
      });
      typeSecond.forEach(({ isChecked }, index) => {
        if (isChecked) {
          return (typeSecond[index].isChecked = false);
        }
      });
    }
    return { brandsFilter, typesFilter };
  };

  switch (type) {
    case "BRANDS_ADD": {
      const { name, slug } = payload;
      return {
        brandsFilter: [
          ...brandsFilter,
          { name: name, slug: slug, isChecked: false },
        ],
        typesFilter: [...typesFilter],
      };
    }
    case "TYPES_ADD": {
      const { name, slug } = payload;
      return {
        brandsFilter: [...brandsFilter],
        typesFilter: [
          ...typesFilter,
          { name: name, slug: slug, isChecked: false },
        ],
      };
    }
    case "BRANDS_TOGGLE": {
      return toggleCheckbox(brandsFilter, [], payload);
    }
    case "TYPES_TOGGLE": {
      return toggleCheckbox(typesFilter, [], payload);
    }
    case "CLEAR_FILTER": {
      return toggleCheckbox(brandsFilter, typesFilter);
    }
    default:
      return state;
  }
};
