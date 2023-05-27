import { RootState } from "../store";

export const selectSort = (state: RootState) => state.filter.sortType;
export const selectFilter = (state: RootState) => state.filter;
