export interface ISingleProduct {
  product: IProductProps
  isLoading: boolean
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



export interface IAttributes {
  name: string
  terms: {
    nodes: Array<{name:string}>
  }
}
