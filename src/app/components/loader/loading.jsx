import React from "react";
import styles from "./loading.module.css";

function Loading(props) {
  return (
    <div>
      <div className={styles.newtonscradle}>
        <div className={styles.newtonscradle__dot}></div>
        <div className={styles.newtonscradle__dot}></div>
        <div className={styles.newtonscradle__dot}></div>
        <div className={styles.newtonscradle__dot}></div>
      </div>
    </div>
  );
}

export default Loading;
