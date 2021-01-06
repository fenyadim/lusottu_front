export interface ISingleProduct {
  product: IProductProps
  isLoading: boolean
}

interface IProductProps {
  name: string
  price: number
  weight: number
  image: {
    mediaItemUrl: string
  }
  productTags: {
    nodes: {
      name: string
    }
  }
  description: string
  attributes: {
    nodes: Array<IAttributes>
  }
}



export interface IAttributes {
  name: string
  terms: {
    nodes: Array<{name:string}>
  }
}
