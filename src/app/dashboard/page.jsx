"use client";
import React from "react";
import DashNav from "../components/Dashboard/dashnav";
import styles from "./dashboard.module.css";
import PedidosDash from "../components/pedidosDash/pedidosDash";
import MoneyDashboard from "../components/moneyDashboard/moneyDashboard";
import PedidosContainerDashboard from "../components/PedidosCard/pedidosCardContainerDashboard";
import LoadingContainer from "../components/loading/loading";
import { useState, useEffect } from "react";

function Dashboard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchCount, setFetchCount] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setFetchCount((prevCount) => prevCount + 1);
    fetch("/api/admin/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      })
      .finally(() => {
        setFetchCount((prevCount) => prevCount - 1);
      });
  }, []);

  if (isLoading) {
    return (
      <div className={styles.ContainerLoading}>
        <LoadingContainer className={styles.ContainerLoading} />
      </div>
    );
  }

  return (
    <div className={styles.generalBody}>
      <DashNav className={styles.navBar} />
      <div className={styles.generalContaier}>
        <div className={styles.firstPart}>
          <PedidosDash
            orders={orders}
            isLoading={isLoading}
            setFetchCount={setFetchCount}
          />
          <MoneyDashboard
            orders={orders}
            isLoading={isLoading}
            setFetchCount={setFetchCount}
          />
        </div>
        <div className={styles.secondPart}>
          <PedidosContainerDashboard
            orders={orders}
            setFetchCount={setFetchCount}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
