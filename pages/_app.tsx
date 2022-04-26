import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider, useSelector, useDispatch } from "react-redux";
import Layout from "../src/flat/Layout";
import { store } from "../store";
import {
  setupTokenInterceptor,
  getUserData,
  setAccessTokenFromLocalStorage,
} from "../src/features/Authentication/slices/authenticationSlice";
import { RootState } from "../store";
import blurr from "../public/blurrBGfilled.png";

const queryClient = new QueryClient();

const theme = createTheme({
  type: "dark",
  theme: {
    colors: {
      // brand colors
      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      // you can also create your own color
      myColor: "#ff4ecd",
      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    setupTokenInterceptor();
    dispatch(setAccessTokenFromLocalStorage());
  }, []);

  useEffect(() => {
    if (accessToken) {
      setupTokenInterceptor();
      dispatch(getUserData());
    }
  }, [accessToken]);

  console.log("user", user);

  return (
    <NextUIProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </NextUIProvider>
  );
}

function ReduxWrapper(props: AppProps) {
  return (
    <Provider store={store}>
      <MyApp {...props} />
    </Provider>
  );
}

export default ReduxWrapper;
