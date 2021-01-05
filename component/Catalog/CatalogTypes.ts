export interface IItems {
  slug: string
  name: string
  price: number
  image:  {
    mediaItemUrl: string
  }
}

export interface ICatalog {
  items: object
  isLoading: boolean
  genderSort?: string |  string[]
  page?: number
  quantityPages?: number
}