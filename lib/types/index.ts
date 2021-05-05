export interface IItems {
  slug: string;
  name: string;
  price: number;
  image?: {
    url: string;
  };
}

export interface ISingleProduct {
  product: IProductProps;
  isLoading: boolean;
}

interface IProductProps {
  image?: {
    url: string;
  };
  name?: string;
  brand?: string;
  desc?: string;
  price?: number;
  volume?: number;
  note?: string;
}

export interface State {
  brandsFilter?: Array<{
    name: string;
    slug: string;
    isChecked: boolean;
  }>;
  typesFilter?: Array<{
    name: string;
    slug: string;
    isChecked: boolean;
  }>;
}

export interface Action {
  type: string;
  payload?: State | string | any;
}
