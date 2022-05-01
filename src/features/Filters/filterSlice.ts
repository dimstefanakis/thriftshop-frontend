import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Filters {
  cloudTypes: any[];
  services: any[];
  industries: any[];
  failureReasons: any[];
  platforms: any[];
  hostings: any[];
  techStacks: any[];
}

interface State {
  filters: Filters;
  checkedFilters: any[];
}

export const filterSlice = createSlice({
  name: "filters",
  initialState: <State>{
    filters: {
      cloudTypes: [],
      services: [],
      industries: [],
      platforms: [],
      failureReasons: [],
      hostings: [],
      techStacks: [],
    },
    checkedFilters: [],
  },
  reducers: {
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters = action.payload;
    },
    setCheckedFilters(state, action: PayloadAction<any[]>) {
      state.checkedFilters = action.payload;
    },
  },
});

export const { setFilters, setCheckedFilters } = filterSlice.actions;
