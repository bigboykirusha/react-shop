import { createSlice } from "@reduxjs/toolkit";
import { Status, SushiSliceState } from "./types";
import { fetchSushi } from "./asyncActions";

const initialState: SushiSliceState = {
  items: [],
  status: Status.LOADING,
};
export const sushiSlice = createSlice({
  name: "sushi",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSushi.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchSushi.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchSushi.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

// Action creators are generated for each case reducer function

export default sushiSlice.reducer;
