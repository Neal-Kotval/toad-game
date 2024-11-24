'use client';
import styles from "./Submission.module.scss";
import "../../styles/globals.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  setDoc,
  query,
  getDocs,
  doc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function SubmissionPage() {
  const [user, loadingAuth] = useAuthState(auth);
  const [userData, setUserData] = useState(null); // Current user's data
  const [searchQuery, setSearchQuery] = useState(""); // Search bar query
  const [searchResults, setSearchResults] = useState([]); // Searched users
  const [feedbackMessage, setFeedbackMessage] = useState(null); // Feedback message
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push("/login");
    }
  }, [loadingAuth, user, router]);

  // Fetch current user's data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef);
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const currentUserData = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .find((doc) => doc.email === user.email);

          setUserData(currentUserData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  // Fetch all users and filter for closest matches locally
  useEffect(() => {
    const fetchAndFilterUsers = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }

      const lowerSearchQuery = searchQuery.toLowerCase();

      try {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);

        const allUsers = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter(
            (doc) =>
              doc.username.toLowerCase().includes(lowerSearchQuery) &&
              doc.username !== userData?.username
          )
          .slice(0, 5); // Limit to top 5 results

        setSearchResults(allUsers);
      } catch (error) {
        console.error("Error fetching or filtering users:", error);
      }
    };

    fetchAndFilterUsers();
  }, [searchQuery, userData]);

  const logBattle = async (opponent, isWin) => {
    if (!userData) return;

    const battleId = uuidv4(); // Generate a unique ID for the battle
    const battle = {
      id: battleId,
      winner: isWin ? userData.username : opponent.username,
      loser: isWin ? opponent.username : userData.username,
      winner_id: isWin ? userData.id : opponent.id,
      loser_id: isWin ? opponent.id : userData.id,
      reporter_id: userData.id, // The ID of the user logging the battle
      pending: true,
      createdAt: new Date().toISOString(),
    };

    try {
      const battlesRef = collection(db, "battles");
      await setDoc(doc(battlesRef, battleId), battle); // Use setDoc with the specified ID
      console.log("Battle logged:", battle);

      // Show feedback message
      setFeedbackMessage("Battle logged!");
      setTimeout(() => setFeedbackMessage(null), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error("Error logging battle:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.dashboard}>
        <div className={styles.leftSection}>
          <h1 className={styles.title}>Log Your Battles</h1>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for a player"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchBar}
            />
          </div>
          <div className={styles.resultsContainer}>
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div key={result.id} className={styles.resultItem}>
                  <span>{result.username}</span>
                  <button
                    className={styles.winButton}
                    onClick={() => logBattle(result, true)}
                  >
                    WIN
                  </button>
                  <button
                    className={styles.loseButton}
                    onClick={() => logBattle(result, false)}
                  >
                    LOSE
                  </button>
                </div>
              ))
            ) : (
              <p>No players found.</p>
            )}
          </div>
          {feedbackMessage && (
            <div className={styles.feedbackMessage}>{feedbackMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
