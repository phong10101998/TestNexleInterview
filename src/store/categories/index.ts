import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import getCategories from '../../service/callApi';

export interface CategoryItem {
  categories: any[];
  totalCount: number;
}

export const getCategoryList = createAsyncThunk('category', async () => {
  return await getCategories();
});

export interface CategoryState {
  categoryItem?: CategoryItem | {};
  status: {
    loading: boolean;
    error: any;
  };
}

const initialState = {
  categoryItem: {},
  status: {
    loading: false,
    error: '',
  },
};

export const userSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      getCategoryList.fulfilled,
      (state: CategoryState, {payload}: any) => {
        state.status.loading = false;
        state.categoryItem = payload;
      },
    );
    builder.addCase(getCategoryList.pending, (state: CategoryState) => {
      state.status.loading = true;
    });
    builder.addCase(
      getCategoryList.rejected,
      (state: CategoryState, payload) => {
        state.status.loading = false;
        state.status.error = payload.error;
      },
    );
  },
});

export default userSlice.reducer;
