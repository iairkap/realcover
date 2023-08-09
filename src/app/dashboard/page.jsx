import React from "react";
import DashNav from "../components/Dashboard/dashnav";
import styles from "./dashboard.module.css";
import PedidosDash from "../components/pedidosDash/pedidosDash";
import MoneyDashboard from "../components/moneyDashboard/moneyDashboard";
import PedidosContainerDashboard from "../components/PedidosCard/pedidosCardContainerDashboard";
function Dashboard(props) {
  return (
    <div className={styles.generalBody}>
      <DashNav className={styles.navBar} />
      <div className={styles.generalContaier}>
        <div className={styles.firstPart}>
          <PedidosDash />
          <MoneyDashboard />
        </div>
        <div className={styles.secondPart}>
          <PedidosContainerDashboard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
