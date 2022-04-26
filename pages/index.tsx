import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Container, Col } from "@nextui-org/react";
import Landing from "../src/flat/Landing";
import styles from "../styles/Home.module.css";
import { url } from "inspector";
import blurr from "../public/blurrBGfilled.png";

const Home: NextPage = () => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: "url('/blurrBG.png')",
        backgroundSize: "cover ",
      }}
    >
      <Head>
        <title>ThriftMVP - Buy early revenue high quality MVPs</title>
        <meta
          name="description"
          content="About 90% of startups fail. What about projects that never kicked off, the project that a developer started sometime somewhere but never put on display? They all currently live on github graveyards. Does that mean they should stay on graveyards? No."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </div>
  );
};

export default Home;
