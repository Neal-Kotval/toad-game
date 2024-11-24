'use client';
import styles from "./Dashboard.module.scss";
import "../../styles/globals.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function UserDashboard() {
  const [user, loadingAuth, errorAuth] = useAuthState(auth); // Auth state
  const [userData, setUserData] = useState(null); // State for Firestore user data
  const [currentRank, setCurrentRank] = useState(null); // State for rank
  const [loadingData, setLoadingData] = useState(false); // Loading state for Firestore data
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push("/login");
    }
  }, [loadingAuth, user, router]);

  useEffect(() => {
    if (!user) return; // Ensure user is authenticated before fetching data

    const fetchUserData = async () => {
      setLoadingData(true);
      try {
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, orderBy("score", "desc")); // Query to fetch all users sorted by score
        const querySnapshot = await getDocs(q);

        const allUsers = [];
        querySnapshot.forEach((doc) => {
          allUsers.push({ id: doc.id, ...doc.data() });
        });

        // Find the logged-in user and their rank
        const userIndex = allUsers.findIndex((u) => u.email === user.email);
        if (userIndex !== -1) {
          setUserData(allUsers[userIndex]);
          setCurrentRank(userIndex + 1); // Rank is index + 1
        } else {
          console.error("User not found in the database");
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      } finally {
        setLoadingData(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      router.push("/login");
    } catch (e) {
      console.error("Error signing out:", e);
    }
  };

  if (loadingAuth || loadingData) {
    return <p>Loading...</p>; // Show loading message
  }

  if (errorAuth) {
    return <p>Error: {errorAuth.message}</p>; // Show authentication error message
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <button onClick={handleSignOut} className={styles.signOutButton}>
          Log Out
        </button>
        <title>User Dashboard</title>
        <h1 className={styles.title}>
          Welcome Back, {userData?.username || "Player"}!
        </h1>
        <p>Here's a quick overview of your progress and activity.</p>

        <div className={styles.statsSection}>
          <h2>Your Stats</h2>
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
          <h2>Recent Matches</h2>
          <div className={styles.recentMatchesBox}>
            <p>&#2022; Win vs. Player123 (+50 Gold)</p>
            <p>&#2022; Loss to Player456 (-30 Gold)</p>
            <p>&#2022; Win vs. Player789 (+100 Gold)</p>
          </div>
        </div>

        <div className={styles.upcomingEventsSection}>
          <h2>Upcoming Events</h2>
          <div className={styles.upcomingEventsBox}>
            <p>&#2022; Weekly Tournament: Starts Monday</p>
            <p>&#2022; Gold Rush Challenge: Ongoing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
