import styles from "./Brackets.module.scss";
import PlayerBox from "../PlayerBox/PlayerBox";

import React, { useState, useEffect } from "react";
import { collection, onSnapshot, DocumentData } from "firebase/firestore"; // Firestore methods
import { db } from "../../firebase/config"; // Import Firestore

interface Player {
  id: string;
  username: string;
  score: number;
}

const Brackets: React.FC = () => {
  const collectionRef = collection(db, "users");
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const items: Player[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          username: data.username || "Unknown",
          score: data.score || 0,
        });
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
          sortedPlayers.map((player) => (
            <div key={player.id} className={styles.playerBox}>
              <PlayerBox name={player.username} score={player.score} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Brackets;
