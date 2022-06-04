import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

let axiosInterceptor = null as any;

interface UserData {
  token?: string | null;
  user?: any;
}

interface State {
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: any;
  errors: any[];
  loading: boolean;
  loadingUserData: boolean;
}

export const getUserData = createAsyncThunk(
  "authentication/getUserData",
  async () => {
    let token = localStorage.getItem("accessToken");
    if (!token) {
      axios.defaults.headers.common["Authorization"] = "";
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/user/me/`
      );
      return response.data;
    } catch (err) {
      let error = err as AxiosError;
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        axios.interceptors.request.eject(axiosInterceptor);
        axios.defaults.headers.common["Authorization"] = "";
        return {
          user: null,
          token: null,
        };
      }
      return {
        user: null,
        token: null,
      };
    }
  }
);

export function setupTokenInterceptor() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // axiosInterceptor = axios.interceptors.request.use(
  //   function (config) {
  //     // Do something before request is sent
  //     if (config.headers && token) {
  //       config.headers.authorization = `Bearer ${token}`;
  //     }
  //     return config;
  //   },
  //   function (error) {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   }
  // );
}

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: <State>{
    accessToken: null,
    refreshToken: null,
    user: null,
    errors: [],
    loading: false,
    loadingUserData: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, { payload }) => {
      if (!payload.user) {
        state.user = null;
        state.loadingUserData = false;
      } else {
        state.user = payload;
        state.loadingUserData = false;
      }
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
    logout: (state, action: PayloadAction<undefined>) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      console.log(axios, axiosInterceptor);
      axios.interceptors.request.eject(axiosInterceptor);
      axios.defaults.headers.common["Authorization"] = "";
    },
  },
});

export const {
  setAccessToken,
  setAccessTokenFromLocalStorage,
  setRefreshToken,
  setUser,
  logout,
} = authenticationSlice.actions;
