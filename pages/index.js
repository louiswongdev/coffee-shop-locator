import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import useTrackLocation from "../hooks/use-track-location";
import { fetchCoffeeStores } from "../lib/coffee-stores";

import styles from "../styles/Home.module.css";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

// import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  console.log("props", props);
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  // const [coffeeStoresData, setCoffeeStoresData] = useState("");
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const {
    dispatch,
    // coffeeStores: { state },
    state: { coffeeStores, latLong },
  } = useContext(StoreContext);

  useEffect(() => {
    async function fetchData() {
      if (latLong) {
        try {
          // const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
          // fetch from api
          const res = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=12`
          );

          const coffeeStores = await res.json();

          // setCoffeeStoresData(fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: { coffeeStores },
          });

          setCoffeeStoresError("");
          // set coffee stores
        } catch (error) {
          //set error
          console.log({ error });
          setCoffeeStoresError(error.message);
        }
      }
    }

    fetchData();
  }, [latLong, dispatch]);

  const handleOnBannerClick = () => {
    console.log("hey");
    handleTrackLocation();
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
          buttonText={isFindingLocation ? "Locating..." : "View Stores Nearby"}
        />

        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-bg.png"
            width={714}
            height={300}
            alt="coffee"
          />
        </div>

        {/* From updated location */}
        {coffeeStores?.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore?.id}
                    name={coffeeStore?.name}
                    imgUrl={
                      coffeeStore?.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`/coffee-store/${coffeeStore?.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
