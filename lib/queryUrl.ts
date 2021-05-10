export const QueryUrl = (
  page?: number,
  sex?: string,
  brands?: string[] | string,
  types?: string[] | string,
  price?: string[] | string,
) => {
  const queryObj = {
    page,
    gender: sex,
    brands: typeof brands === 'object' ? brands.join('_') : brands,
    types: typeof types === 'object' ? types.join('_') : types,
    price: typeof price === 'object' ? price.join('_') : price,
  };
  for (let i in queryObj) {
    if (queryObj[i] === undefined || !queryObj[i] || queryObj[i].lenght === 0) {
      delete queryObj[i];
    }
  }
  return queryObj;
};
