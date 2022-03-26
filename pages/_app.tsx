import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { url } from 'inspector';
import blurr from "../public/blurrBGfilled.png";

const theme = createTheme({
  type: "dark",
  theme: {
    colors: {
      // brand colors
      primaryLight: "$green200",
      primary: "#4ADE7B",
      primaryDark: "$green600",
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
  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp
