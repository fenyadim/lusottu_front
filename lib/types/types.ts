export interface IItems {
  slug: string
  name: string
  price: number
  image:  {
    url: string
  }
}

export interface ISingleProduct {
  product: IProductProps;
  isLoading: boolean;
}

interface IProductProps {
  image: {
    url: string
  }
  name: string
  brand: string
  desc: string
  price: number
  volume: number
  perfumer: {
    desc: string
  }
  base_notes: {
    desc: string
  }
  top_notes: {
    desc: string
  }
  middle_notes: {
    desc: string
  }
}