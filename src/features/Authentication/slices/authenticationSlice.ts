import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
      setupTokenInterceptor();
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

export const { setAccessToken, setRefreshToken, setUser } =
  authenticationSlice.actions;
