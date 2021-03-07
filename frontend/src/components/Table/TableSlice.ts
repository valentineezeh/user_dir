import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserData {
  email: string;
  name: string;
  age: number;
  birthDate: string;
  city: string;
}

interface UserMeta {
  page: number;
  limit: number;
  previousPage: boolean;
  nextPage: number;
  pageCount: number;
  total: number;
}

interface TableState {
  users?: Array<UserData>;
  isLoading?: boolean;
  usersMeta?: UserMeta;
}

interface QueryObject {
  page: number;
  rowsPerPage: number;
}

const initialState: Partial<TableState> = {};

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (queryObj: QueryObject) => {
    try {
      const { page, rowsPerPage } = queryObj;
      const res = await axios({
        url: `http://localhost:4500/api/users?page=${page}&limit=${rowsPerPage}`,
        method: "get",
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const tableSlice = createSlice({
  name: "user",
  initialState: initialState as TableState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const { data, meta } = action.payload;
      state.users = data;
      state.isLoading = false;
      state.usersMeta = meta;
    });
  },
});

export default tableSlice.reducer;
