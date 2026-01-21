import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://api.escuelajs.co/api/v1/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, pageSize }, { rejectWithValue }) => {
    try {
      const offset = (page - 1) * pageSize;

      const res = await axios.get(API, {
        params: { offset, limit: pageSize },
      });

      return Array.isArray(res.data) ? res.data : [];
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to load products");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,

    page: 1,
    pageSize: 10,
    query: "",
    category: "all",
    sort: "relevance",
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
    },
    setCategory(state, action) {
      state.category = action.payload;
      state.page = 1;
    },
    setSort(state, action) {
      state.sort = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Request failed";
      });
  },
});

export const { setPage, setQuery, setCategory, setSort } =
  productsSlice.actions;

export default productsSlice.reducer;
