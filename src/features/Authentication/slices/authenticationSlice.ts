import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserData {
  token?: string | null;
  user?: any;
}

interface State {
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: any;
  loading: boolean;
  loadingUserData: boolean;
}

export const getUserData = createAsyncThunk(
  "authentication/getUserData",
  async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/user/me/`
    );
    return response.data;
  }
);

export function setupTokenInterceptor() {
  const token = localStorage.getItem("accessToken");
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (config.headers && token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
}

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: <State>{
    accessToken: null,
    refreshToken: null,
    user: null,
    loading: false,
    loadingUserData: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loadingUserData = false;
    });
    builder.addCase(getUserData.pending, (state, { payload }) => {
      state.loadingUserData = true;
    });
    builder.addCase(getUserData.rejected, (state, { payload }) => {
      state.loadingUserData = false;
    });
  },
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.accessToken = action.payload;
        localStorage.setItem("accessToken", action.payload);
        setupTokenInterceptor();
      }
    },
    setAccessTokenFromLocalStorage: (
      state,
      action: PayloadAction<undefined>
    ) => {
      let token = localStorage.getItem("accessToken");
      state.accessToken = token;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const {
  setAccessToken,
  setAccessTokenFromLocalStorage,
  setRefreshToken,
  setUser,
} = authenticationSlice.actions;
