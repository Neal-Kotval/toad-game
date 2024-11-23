// components/Login.tsx

import React, { useState } from 'react';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("EEEEE")
    // Handle login logic here (e.g., send login data to the server)
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.loginHeading}>Login</h2>
        <div className={styles.inputGroup}>
          <label className={styles.loginLabel} htmlFor="username">Username</label>
          <input type="text" id="username" name="username" className={styles.loginInput} />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.loginLabel} htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className={styles.loginInput} />
        </div>
        <button type="submit" className={styles.loginButton}>Log In</button>
      </form>
    </div>
  );
};

export default LoginForm;
