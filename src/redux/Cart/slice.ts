import { CartItem, CartSLiceState } from "./types";
import { getCartFromLS } from "../../Utils/getCartfromLS";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../Utils/calcTotalPrice";

const { items, totalPrice } = getCartFromLS();

const initialState: CartSLiceState = {
  items,
  totalPrice,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(
        (obj) => obj.id === Number(action.payload)
      );

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (obj) => obj.id !== Number(action.payload)
      );
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { minusItem, clearItems, addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
