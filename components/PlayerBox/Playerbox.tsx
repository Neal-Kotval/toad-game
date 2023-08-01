// components/PlayerBox.js

import styles from "./PlayerBox.module.scss";

const PlayerBox = ({ name, score }) => {
  return (
    <div className={styles.image_with_overlay}>
      <img src={"/profile.png"} alt="Image" />
      <div className={styles.text_container}>
        <div className={styles.name_text}>{name}</div>
        <div className={styles.score_text}>{score} <img className={styles.coin_image} src="/coin.png" alt="Coin" /></div>
      </div>
    </div>
  );
};

export default PlayerBox;
