'use client';
import styles from "./Dashboard.module.scss";
import "../../styles/globals.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
} from "firebase/firestore";

export default function UserDashboard() {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [currentRank, setCurrentRank] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [allBattles, setAllBattles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push("/login");
    }
  }, [loadingAuth, user, router]);

  // Fetch user data and rank
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      setLoadingData(true);
      try {
        const usersCollectionRef = collection(db, "users");
        const querySnapshot = await getDocs(usersCollectionRef);

        
        const allUsers = [];
        querySnapshot.forEach((doc) => {
          allUsers.push({ id: doc.id, ...doc.data() });
        });

        const userIndex = allUsers.findIndex((u) => u.email === user.email);
        if (userIndex !== -1) {
          setUserData(allUsers[userIndex]);
          const rank =
            allUsers.filter((u) => u.score > allUsers[userIndex].score).length +
            1;
          setCurrentRank(rank);
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      } finally {
        setLoadingData(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Fetch all battles
  useEffect(() => {
    const fetchAllBattles = async () => {
      try {
        const battlesRef = collection(db, "battles");
        const querySnapshot = await getDocs(battlesRef);

        const battles = [];
        querySnapshot.forEach((doc) => {
          battles.push({ id: doc.id, ...doc.data() });
        });

        setAllBattles(battles);
      } catch (e) {
        console.error("Error fetching battles:", e);
      }
    };

    fetchAllBattles();
  }, []);

  // Resolve a battle
  const resolveBattle = async (battle, isAccepted) => {
    const { winner_id, loser_id, id: battleId } = battle;

    try {
      if (isAccepted) {
        // Fetch winner and loser user documents dynamically
        const winnerRef = doc(db, "users", winner_id);
        const loserRef = doc(db, "users", loser_id);

        const winnerSnap = await getDoc(winnerRef);
        const loserSnap = await getDoc(loserRef);

        if (winnerSnap.exists() && loserSnap.exists()) {
          const winnerData = winnerSnap.data();
          const loserData = loserSnap.data();

          // Update scores
          await updateDoc(winnerRef, { score: (winnerData.score || 0) + 100 });
          await updateDoc(loserRef, { score: (loserData.score || 0) - 100 });

          // Mark battle as resolved
          const battleRef = doc(db, "battles", battleId);
          await updateDoc(battleRef, { pending: false });

          console.log("Battle accepted and resolved.");
        } else {
          console.error("Winner or loser document does not exist.");
        }
      } else {
        // Delete the battle from the database
        const battleRef = doc(db, "battles", battleId);
        await deleteDoc(battleRef);

        console.log("Battle rejected and deleted.");
      }

      // Update local state
      setAllBattles((prev) =>
        isAccepted
          ? prev.map((b) => (b.id === battleId ? { ...b, pending: false } : b))
          : prev.filter((b) => b.id !== battleId)
      );
    } catch (e) {
      console.error("Error resolving battle:", e);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (e) {
      console.error("Error signing out:", e);
    }
  };

  const pendingBattles = allBattles.filter(
    (battle) =>
      battle.pending &&
      (battle.winner === userData?.username || battle.loser === userData?.username) &&
      battle.reporter_id !== userData?.id
  );

  const recentBattles = allBattles
    .filter(
      (battle) =>
        !battle.pending &&
        (battle.winner === userData?.username || battle.loser === userData?.username)
    )
    .slice(0, 5);

  if (loadingAuth || loadingData) {
    return <p>Loading...</p>;
  }

  if (errorAuth) {
    return <p>Error: {errorAuth.message}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.dashboard}>
        <div className={styles.leftSection}>
          <div className={styles.statsSection}>
            <h2 className={styles.statstext}>
              {userData?.username
                ? `${userData.username}'s Stats`
                : "Your Stats"}
            </h2>
            {userData ? (
              <div className={styles.statsBox}>
                <p>&#2022; Gold Collected: {userData.score || 0}</p>
                <p>&#2022; Current Rank: {currentRank || "Unranked"}</p>
              </div>
            ) : (
              <p>Loading stats...</p>
            )}
          </div>

          <div className={styles.recentMatchesSection}>
            <h2 className={styles.statstext}>Recent Matches</h2>
            <div className={styles.recentMatchesBox}>
              {recentBattles.length > 0 ? (
                recentBattles.map((battle) => (
                  <p key={battle.id}>
                    {battle.winner === userData.username
                      ? `You beat ${battle.loser}!`
                      : `${battle.winner} beat you!`}
                  </p>
                ))
              ) : (
                <p>No recent matches.</p>
              )}
            </div>
          </div>

          <button onClick={handleSignOut} className={styles.signOutButton}>
            Log Out
          </button>
        </div>

        <div className={styles.rightSection}>
          <h2 className={styles.statstext}>Messages</h2>
          <div className={styles.messageBox}>
            {pendingBattles.length > 0 ? (
              pendingBattles.map((battle) => (
                <div key={battle.id} className={styles.battleItem}>
                  <p>
                    {battle.winner === userData.username
                      ? `You beat ${battle.loser}!`
                      : `${battle.winner} beat you!`}
                  </p>
                  <button
                    className={styles.acceptButton}
                    onClick={() => resolveBattle(battle, true)}
                  >
                    ✓
                  </button>
                  <button
                    className={styles.rejectButton}
                    onClick={() => resolveBattle(battle, false)}
                  >
                    ✗
                  </button>
                </div>
              ))
            ) : (
              <p>No pending battles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
