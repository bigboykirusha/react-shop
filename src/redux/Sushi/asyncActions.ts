import { createAsyncThunk } from "@reduxjs/toolkit";
import { Sushi } from "./types";
import axios from "axios";

export const fetchSushi = createAsyncThunk<Sushi[], Record<string, string>>(
  "sushi/fetchSushiStatus",
  async (params: Record<string, string>, thunkAPI) => {
    const { sortBy, order, category, search, currentPage } = params;
    let catName = "";
    if (category) {
      catName = `&category=${category}`;
    }
    if (search !== "") {
      catName = "";
    }
    console.log(
      `https://645590daa74f994b335ca976.mockapi.io/items?page=${currentPage}&limit=4${catName}&sortBy=${sortBy}&order=${order}&search=${search}`
    );
    const { data } = await axios.get<Sushi[]>(
      `https://645590daa74f994b335ca976.mockapi.io/items?page=${currentPage}&limit=4${catName}&sortBy=${sortBy}&order=${order}&search=${search}`
    );

    if (data.length === 0) {
      return thunkAPI.rejectWithValue("Нет данных");
    }

    return thunkAPI.fulfillWithValue(data);
  }
);
