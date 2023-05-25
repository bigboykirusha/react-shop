import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSushi = createAsyncThunk(
  "sushi/fetchSushiStatus",
  async (params, thunkAPI) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://645590daa74f994b335ca976.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue("Нет данных");
    }

    return thunkAPI.fulfillWithValue(data);
  }
);

const initialState = {
  items: [],
  status: "loading",
};

export const sushiSlice = createSlice({
  name: "sushi",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchSushi.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchSushi.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchSushi.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const selectSushiData = (state) => state.sushi;
// Action creators are generated for each case reducer function

export default sushiSlice.reducer;
