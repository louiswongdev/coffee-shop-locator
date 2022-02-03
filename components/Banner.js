import React from "react";

import styles from "./Banner.module.css";

const Banner = ({ buttonText, handleOnClick }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover Your Local Coffe Shops!</p>
      <div className={styles.buttonWrapper}>
        <button onClick={handleOnClick} className={styles.button}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
