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
    <div>
      {/* Your brackets layout */}
      {/* For example, map over the sorted players array and render each player using the PlayerBox component */}
      {players.map((player, index) => (
        <PlayerBox key={index} name={player.name} score={player.score} />
      ))}
    </div>
  );
};

export default Brackets;
