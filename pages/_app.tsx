import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import Layout from "../src/flat/Layout";
import { store } from "../store";
import { setupTokenInterceptor } from "../src/features/Authentication/slices/authenticationSlice";
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

  useEffect(() => {
    setupTokenInterceptor();
  }, []);

  return (
    <Provider store={store}>
      <NextUIProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </NextUIProvider>
    </Provider>
  );
}

export default MyApp;
