import styles from "./Brackets.module.scss";
import PlayerBox from "../PlayerBox/PlayerBox";

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore"; // Firestore methods
import { db } from "../../firebase/config"; // Import Firestore
import Navbar from "../../components/Navbar/Navbar";

// Import the JSON data (replace './sampleData.json' with your actual JSON file path)
import playerData from "../../../test.json";

const Brackets = () => {
  const collectionRef = collection(db, 'users');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = collectionRef;

    setLoading(true);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPlayers(items);
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  // Sort the players array based on their score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Render the brackets layout using the sorted player data and PlayerBox component
  return (
    <div>
      <div className={styles.bracketsContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          sortedPlayers.map((player, index) => (
            <div key={index} className={styles.playerBox}>
              <PlayerBox name={player.username} score={player.score} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Brackets;
