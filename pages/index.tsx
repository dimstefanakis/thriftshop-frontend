import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { Container, Col } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import Landing from "../src/flat/Landing";
import styles from "../styles/Home.module.css";
import { RootState } from "../store";
import blurr from "../public/blurrBGfilled.png";

const Home: NextPage = () => {
  const router = useRouter();
  const { user, accessToken } = useSelector(
    (state: RootState) => state.authentication
  );

  if (accessToken) {
    router.push("/listing");
    return <div></div>;
  }

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: "url('/blurrBG.png')",
        backgroundSize: "cover ",
      }}
    >
      <Head>
        <title>ThriftMVP - Buy and sell pre / early revenue high quality MVPs</title>
        <meta
          name="description"
          content="Buy and sell high quality pre / early revenue startups and MVPs."
        />
        <meta property="og:url" content="https://www.thriftmvp.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="ThriftMVP - Buy early revenue high quality MVPs"
        />
        <meta
          property="og:description"
          content="Buy and sell high quality pre / early revenue startups and MVPs."
        />
        <meta
          property="og:image"
          content="https://www.thriftmvp.com/og_img.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="thriftmvp.com" />
        <meta property="twitter:url" content="https://www.thriftmvp.com/" />
        <meta
          name="twitter:title"
          content="ThriftMVP - Buy early revenue high quality MVPs"
        />
        <meta
          name="twitter:description"
          content="Buy and sell high quality pre / early revenue startups and MVPs."
        />
        <meta
          name="twitter:image"
          content="https://www.thriftmvp.com/og_img.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </div>
  );
};

export default Home;
