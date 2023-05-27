export type Sushi = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export type SearchSushiParams = {
  sortProp: string;
  order: string;
  categoryId: string;
  searchValue: string;
  currentPage: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface SushiSliceState {
  items: Sushi[];
  status: Status;
}
