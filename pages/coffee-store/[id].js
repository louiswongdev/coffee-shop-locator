import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import cls from "classnames";

// import coffeeStoresData from "../../data/coffee-stores.json";
import styles from "../../styles/coffee-stores.module.css";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { StoreContext } from "../../store/store-context";
import { isEmpty } from "../../utils";

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();

  console.log(coffeeStores);

  const findCoffeeStoreById = coffeeStores.find(
    (coffeeStore) => coffeeStore.id.toString() === params.id
  );

  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((coffeeStore) => ({
    params: {
      id: coffeeStore.id.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  // debugger;
  const router = useRouter();
  // const {
  //   query: { id },
  // } = router;

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffeeStore || {}
  );

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      // check if there's any coffeestores from context
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find(
          (coffeeStore) => coffeeStore.id.toString() === id
        );

        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [coffeeStores, id, initialProps.coffeeStore]);

  const { address, name, neighbourhood, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    console.log("handleUpvote");
  };

  if (router.isFallback) {
    return <div>loading</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>??? Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            alt={name}
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="icon"
            />
            <p className={styles.text}>{address}</p>
          </div>

          {neighbourhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt="icon"
              />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
          )}

          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="icon"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
