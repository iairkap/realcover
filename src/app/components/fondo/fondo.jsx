import React from "react";
import styles from "./Fondo.module.css";

function Fondo() {
  return (
    <div className={styles.backgroundColor}>
      <div className={styles.trapezoid}></div>
    </div>
  );
}

export default Fondo;
