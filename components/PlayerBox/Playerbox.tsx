// components/PlayerBox.js

import React from 'react';
import styles from './PlayerBox.module.scss';

const PlayerBox = ({ name, score }) => {
  return (
    <div className={styles.container}>
    <div className={styles.imageContainer}>
      <img
        src={"/profile.png"}
        alt="Player Image"
        className={styles.image}
      />
      <div className={styles.overlay}>
        <p className={styles.name}>{name}</p>
        <div className={styles.scoreContainer}>
          <p className={styles.scoreValue}>{score}</p>
          <img src={"/coin.png"} alt="Coin Icon" className={styles.coinImage} />
        </div>
      </div>
    </div>
  </div>
  );
};

export default PlayerBox;
