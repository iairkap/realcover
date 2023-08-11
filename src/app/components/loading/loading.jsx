import React from "react";
import styles from "./loading.module.css";

function LoadingContainer(props) {
  return (
    <div>
      <div
        style={{
          "--size": "64px",
          "--dot-size": "6px",
          "--dot-count": "6",
          "--color": "#56B947",
          "--speed": "1s",
          "--spread": "60deg",
        }}
        className={styles.dots}
      >
        <div style={{ "--i": "0" }} className={styles.dot}></div>
        <div style={{ "--i": "1" }} className={styles.dot}></div>
        <div style={{ "--i": "2" }} className={styles.dot}></div>
        <div style={{ "--i": "3" }} className={styles.dot}></div>
        <div style={{ "--i": "4" }} className={styles.dot}></div>
        <div style={{ "--i": "5" }} className={styles.dot}></div>
      </div>
    </div>
  );
}

export default LoadingContainer;
