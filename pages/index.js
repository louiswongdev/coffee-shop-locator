import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";

import styles from "../styles/Home.module.css";

export default function Home() {
  const handleOnBannerClick = () => {
    console.log("hi banner btn");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Search for Coffee shops near you!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          handleOnClick={handleOnBannerClick}
          buttonText="View Stores Nearby"
        />
      </main>
    </div>
  );
}
