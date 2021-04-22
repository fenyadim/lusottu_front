export interface IItems {
  slug: string
  name: string
  price: number
  image:  {
    url: string
  }
}

export interface ICatalog {
  items: [IItems]
  isLoading: boolean
  genderSort?: string |  string[]
  page?: number
  quantityPages?: number
}