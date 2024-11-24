'use client';

import React, { useState } from "react";
import styles from "./login.module.scss";
import Navbar from "../../components/Navbar/Navbar"; // Import Navbar
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the page from reloading
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log("Login successful:", res);
      setEmail("");
      setPassword("");
      setShowSuccess(true);

      // Redirect to home after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000); // 2-second delay
    } catch (e) {
      console.error("Error during login:", e);
    }
  };

  const handleSignUpClick = () => {
    router.push("/signup");
  };

  return (
    <>
      <Navbar /> {/* Add Navbar at the top */}
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Log In</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
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
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>
          {showSuccess && (
            <p className={styles.successMessage}>Login successful! Redirecting...</p>
          )}
          {error && <p className={styles.errorMessage}>{error.message}</p>}
          <div className={styles.signupSection}>
            <p>Don't have an account?</p>
            <button
              type="button"
              className={styles.signUpButton}
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
