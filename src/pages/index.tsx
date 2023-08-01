import styles from "../styles/Home.module.scss";
import "../styles/globals.scss";
import Navbar from "../components/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <title>Online Tournament</title>
        <h1>Welcome to Toad Game</h1>
        <p>Join the Competition and Become the Best</p>
        <img src="/tode.png" alt="Tode Logo" />

        <div className={styles.hostedByText}>
          <p>Hosted by Nyelson</p>
        </div>

        <div className={styles.whiteLine}></div>

        <h2>Rules:</h2>
        <div className={styles.rulesText}>
          <div className={styles.rulesBox}>
            <p>
              &#2022; &nbsp; The tournament will run weekly from Monday to
              Wednesday
            </p>
          </div>
          <div className={styles.rulesBox}>
            <p>&#2022; &nbsp; Everyone starts with 300 gold</p>
          </div>
          <div className={styles.rulesBox}>
            <p>
              &#2022; &nbsp; You may play any amount of times while the
              tournament runs, but you can only play each player once per six
              hours!
            </p>
          </div>
          <div className={styles.rulesBox}>
            <p>
              &#2022; &nbsp; Your goal is to grab as much gold as you can and
              cash out!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
