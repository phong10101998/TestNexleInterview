import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {postSignUp} from '../../service/signup';
import getCategories from '../../service/categories/getCategories';

export interface UserParams {
  email: string;
  password: string;
}

export const signUpUser = createAsyncThunk(
  '/auth/signup',
  async ({email, password}: UserParams, {rejectWithValue}) => {
    try {
      // const response = await postSignUp(email, password);
      const response = await getCategories();
      return response;
    } catch (error: any) {
      const {message} = error;
      rejectWithValue(message);
    }
  },
);

export interface UserState {
  item: object;
  signUp: {
    loading: boolean;
    error: any;
  };
}

const initialState = {
  item: {},
  signUp: {
    loading: false,
    error: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signUpUser.fulfilled, (state: UserState, payload) => {
      state.signUp.loading = false;
      state.item = payload;
    });
    builder.addCase(signUpUser.pending, (state: UserState) => {
      state.signUp.loading = true;
    });
    builder.addCase(signUpUser.rejected, (state: UserState, payload) => {
      state.signUp.loading = false;
      state.item = payload.error;
    });
  },
});

export default userSlice.reducer;
