import styles from "./Brackets.module.scss";
import PlayerBox from "../PlayerBox/PlayerBox";

// Import the JSON data (replace './sampleData.json' with your actual JSON file path)
import playerData from "../../../test.json";

const Brackets = () => {
  // Access the players array from the imported JSON data
  const players = playerData.players;

  // Sort the players array based on their score in descending order
  players.sort((a, b) => b.score - a.score);

  // Render the brackets layout using the sorted player data and PlayerBox component
  return (
    <div className={styles.bracketsContainer}>
      {players.map((player, index) => (
        <div key={index} className={styles.playerBox}>
          <PlayerBox name={player.name} score={player.score} />
        </div>
      ))}
    </div>
  );
};

export default Brackets;
