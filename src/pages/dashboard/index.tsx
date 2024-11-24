'use client';
import styles from "./Dashboard.module.scss";
import "../../styles/globals.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { useEffect } from "react";

export default function UserDashboard() {
  const [user, loading, error] = useAuthState(auth); // Destructure to access user, loading, and error states
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      router.push("/login");
    } catch (e) {
      console.error("Error signing out:", e);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while checking the auth state
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Handle and display any auth errors
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <button onClick={handleSignOut} className={styles.signOutButton}>
          Log Out
        </button>
        <title>User Dashboard</title>
        <h1>Welcome Back, Player!</h1>
        <p>Here's a quick overview of your progress and activity.</p>

        <div className={styles.statsSection}>
          <h2>Your Stats</h2>
          <div className={styles.statsBox}>
            <p>&#2022; Gold Collected: 450</p>
            <p>&#2022; Matches Played: 12</p>
            <p>&#2022; Current Rank: #7</p>
          </div>
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
