import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
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
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortProp } = filterSlice.actions;

export default filterSlice.reducer;
