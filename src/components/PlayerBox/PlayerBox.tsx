// components/PlayerBox.js

import styles from "./PlayerBox.module.scss";
import Image from 'next/image'

interface PlayerBoxProps {
  name: string;
  score: number;
}

const PlayerBox: React.FC<PlayerBoxProps> = ({ name, score }) => {
  return (
    <div className={styles.image_with_overlay}>
      <Image
      src="/profile.png"
      alt="User Banner"
      width={1322}
      height={177}
    />
      <div className={styles.text_container}>
        <div className={styles.name_text}>{name}</div>
        <div className={styles.score_text}>{score} <Image
      src="/coin.png"
      alt="Coin Logo"
      width={46}
      height={47}
    /></div>
      </div>
    </div>
  );
};

export default PlayerBox;
