// Home.js
import React from 'react';
import styles from './Home.css';

const Home = () => {
  return (
    <div style={styles.body}>
      <div style={styles.homeContainer}>
        <h1 style={styles.h1}>Software Development Project</h1>
        <h1 style={styles.h1}>SCHEDULE EASE</h1>
        <br />
        <div style={styles.buttons}>
          <a style={styles.a} href="/login">
            Login
          </a>
          <a style={styles.a} href="/signup">
            Signup
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
