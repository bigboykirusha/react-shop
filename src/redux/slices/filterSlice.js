import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  searchValue: "",
  currentPage: 1,
  sortType: {
    name: "популярности",
    sortProp: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortProp(state, action) {
      state.sortType = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sortType = action.payload.sortType;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectSort = (state) => state.filter.sortType;
export const selectFilter = (state) => state.filter;

// Action creators are generated for each case reducer function
export const {
  setSearchValue,
  setFilters,
  setCurrentPage,
  setCategoryId,
  setSortProp,
} = filterSlice.actions;

export default filterSlice.reducer;
