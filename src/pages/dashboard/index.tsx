import styles from "./Dashboard.module.scss";
import "../../styles/globals.scss";
import Navbar from "../../components/Navbar/Navbar";

export default function UserDashboard() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <title>User Dashboard</title>
        <h1>Welcome Back, Player!</h1>
        <p>Here's a quick overview of your progress and activity.</p>
        <img src="/dashboard-icon.png" alt="Dashboard Icon" />

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
