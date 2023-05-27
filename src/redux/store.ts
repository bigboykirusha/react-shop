import { configureStore } from "@reduxjs/toolkit";
import filter from "./Filter/slice";
import cart from "./Cart/slice";
import sushi from "./Sushi/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    sushi,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
