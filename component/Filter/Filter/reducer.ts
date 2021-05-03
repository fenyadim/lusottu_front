import { Action, State } from "../../../lib/types";

export const reducer = (state: Array<State>, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD":
      return [...state, payload];
    case "TOGGLE": {
      const { targetValue, targetIsChecked } = payload;
      let newArr = [];
      state.map(({ name, slug, isChecked }) => {
        if (slug !== targetValue) {
          newArr.push({ name, slug, isChecked });
          return (state = newArr);
        } else {
          newArr.push({ name, slug, isChecked: targetIsChecked });
          return (state = newArr);
        }
      });
    }
    default:
      return state;
  }
};
