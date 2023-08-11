import React from "react";
import DashNav from "../../components/Dashboard/dashnav";
import styles from "./precios.module.css";
import PreciosCardContainer from "../../components/precios/preciosCardContainer";

function Precios(props) {
  return (
    <div className={styles.generalBody}>
      <DashNav className={styles.navBar} />
      <div className={styles.generalContaier}>
        <div className={styles.firstPart}></div>
        <div className={styles.secondPart}></div>

        <PreciosCardContainer />
      </div>
    </div>
  );
}

export default Precios;
