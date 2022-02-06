import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Card from "../components/Card";

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
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-bg.png"
            width={714}
            height={300}
            alt="coffee"
          />
        </div>

        <div className={styles.cardLayout}>
          <Card
            className={styles.card}
            name="Darkhorse Coffee"
            imgUrl="/static/hero-bg.png"
            href="/coffee-store/darkhouse-coffee"
          />
          <Card
            className={styles.card}
            name="Darkhorse Coffee"
            imgUrl="/static/hero-bg.png"
            href="/coffee-store/darkhouse-coffee"
          />
          <Card
            className={styles.card}
            name="Darkhorse Coffee"
            imgUrl="/static/hero-bg.png"
            href="/coffee-store/darkhouse-coffee"
          />
        </div>
      </main>
    </div>
  );
}
