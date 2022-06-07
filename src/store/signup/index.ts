import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {postSignUp} from '../../service/callApi';

export interface UserParams {
  email: string;
  password: string;
}

export const signUpUser = createAsyncThunk(
  'signup',
  async ({email, password}: UserParams) => {
    return await postSignUp(email, password);
  },
);

export interface UserState {
  userItem?: Object;
  status: {
    loading: boolean;
    error: any;
  };
}

const initialState = {
  userItem: {},
  status: {
    loading: false,
    error: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      signUpUser.fulfilled,
      (state: UserState, {payload}: any) => {
        state.status.loading = false;
        state.userItem = payload;
      },
    );
    builder.addCase(signUpUser.pending, (state: UserState) => {
      state.status.loading = true;
    });
    builder.addCase(signUpUser.rejected, (state: UserState, payload) => {
      state.status.loading = false;
      state.status.error = payload.error;
    });
  },
});

export default userSlice.reducer;
