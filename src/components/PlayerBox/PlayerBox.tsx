import styles from "./PlayerBox.module.scss";
import Image from "next/image";

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
        layout="responsive" /* Automatically adapts to container dimensions */
        width={1322}
        height={177}
        objectFit="cover" /* Keep image's aspect ratio */
        priority /* Optimize loading */
      />
      <div className={styles.text_container}>
        <div className={styles.name_text}>{name}</div>
        <div className={styles.score_text}>
          {score}
          <Image
            src="/coin.png"
            alt="Coin Logo"
            width={30}
            height={30}
            className={styles.coin_image}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerBox;
