import React from "react";
import DashNav from "../../components/Dashboard/dashnav";
import styles from "./clients.module.css";
import ClientCardContainer from "../../components/clientCard/clientCardContainer";
/* import ArgentinaMap from "../../components/clientCard/mapsDemo";
 */
function Dashboard(props) {
  return (
    <div className={styles.generalBody}>
      <DashNav className={styles.navBar} />
      <div className={styles.generalContaier}>
        <div className={styles.firstPart}></div>
        <div className={styles.secondPart}></div>
        <ClientCardContainer />z{/*   <ArgentinaMap /> */}
      </div>
    </div>
  );
}

export default Dashboard;
