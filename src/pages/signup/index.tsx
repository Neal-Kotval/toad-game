import React, { useState } from "react";
import styles from "./SignUpPage.module.scss";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import Navbar from "../../components/Navbar/Navbar";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the page from reloading
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log("User created successfully:", res);
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error("Error during signup:", e);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.signupContainer}>
        <div className={styles.signupBox}>
          <h1 className={styles.title}>Create an Account</h1>
          <form className={styles.form} onSubmit={handleSignUp}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          {error && <p className={styles.error}>{error.message}</p>}
          {user && <p className={styles.success}>Sign Up Successful!</p>}
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
