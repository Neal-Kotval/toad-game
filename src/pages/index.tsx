import styles from "../styles/Home.module.scss";
import "../styles/globals.scss";
import Navbar from "../components/Navbar/Navbar";
import Image from 'next/image'

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
        <div className={styles.wrap}></div>
        <h2>Rules:</h2>
        <div className={styles.rulesText}>
  {[
    "The tournament runs weekly from Monday to Wednesday",
    "Everyone starts with 300 gold",
    "You may play any amount of times while the tournament runs, but you can only play each player once per six hours!",
    "Your goal is to grab as much gold as you can and cash out!",
  ].map((rule, index) => (
    <div key={index} className={styles.rulesBox}>
      <p>&#2022; &nbsp; {rule}</p>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}
