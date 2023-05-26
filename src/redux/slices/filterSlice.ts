import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type Sort = {
  name: string;
  sortProp: SortPropertyEnum;
};

interface FilterSLiceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sortType: Sort;
}

const initialState: FilterSLiceState = {
  categoryId: 0,
  searchValue: "",
  currentPage: 1,
  sortType: {
    name: "популярности",
    sortProp: SortPropertyEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = Number(action.payload);
    },
    setSortProp(state, action: PayloadAction<Sort>) {
      state.sortType = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSLiceState>) {
      state.sortType = action.payload.sortType;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sortType;
export const selectFilter = (state: RootState) => state.filter;

// Action creators are generated for each case reducer function
export const {
  setSearchValue,
  setFilters,
  setCurrentPage,
  setCategoryId,
  setSortProp,
} = filterSlice.actions;

export default filterSlice.reducer;
