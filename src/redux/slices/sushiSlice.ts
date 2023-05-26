import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Sushi = {
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
  search: string;
  currentPage: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface SushiSliceState {
  items: Sushi[];
  status: Status;
}

export const fetchSushi = createAsyncThunk<Sushi[], Record<string, string>>(
  "sushi/fetchSushiStatus",
  async (params: Record<string, string>, thunkAPI) => {
    const { sortBy, order, category, search, currentPage } = params;
    console.log(
      `https://645590daa74f994b335ca976.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    const { data } = await axios.get<Sushi[]>(
      `https://645590daa74f994b335ca976.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}&${search}`
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue("Нет данных");
    }

    return thunkAPI.fulfillWithValue(data);
  }
);

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

export const selectSushiData = (state: RootState) => state.sushi;
// Action creators are generated for each case reducer function

export default sushiSlice.reducer;
