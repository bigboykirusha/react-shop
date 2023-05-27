import { FilterSLiceState, Sort, SortPropertyEnum } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      console.log("assa", state.searchValue);
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

// Action creators are generated for each case reducer function
export const {
  setSearchValue,
  setFilters,
  setCurrentPage,
  setCategoryId,
  setSortProp,
} = filterSlice.actions;

export default filterSlice.reducer;
