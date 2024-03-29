export interface IItems {
  slug: string;
  name: string;
  price: number;
  image?: {
    handle: string;
  };
}

export interface ISingleProduct {
  product: IProductProps;
  isLoading: boolean;
}

interface IProductProps {
  image?: {
    handle: string;
  };
  name?: string;
  brand?: {
    name: string;
  };
  desc?: string;
  price?: number;
  volume?: number;
}

export interface IState {
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

export interface IAction {
  type: string;
  payload?: IState | string | any;
}

export interface IRouterProps {
  page?: number;
  slug?: string;
  gender?: string;
  brands?: string;
  types?: string;
  price?: string;
}

export interface ISearchProductProps {
  name: string;
  slug: string;
  price: number;
  image?: {
    handle: string;
  };
}
