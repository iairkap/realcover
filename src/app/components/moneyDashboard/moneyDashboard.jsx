"use client";

import React from "react";
import styles from "./moneyDashboard.module.css";
import { useState } from "react";
import { useEffect } from "react";

function MoneyDashboard({ setFetchCount, orders }) {
  const [isLoading, setIsLoading] = useState(true);
  const [earnings, setEarnings] = useState(0);
  const [activeButton, setActiveButton] = useState("A");

  function filterOrdersByDay(orders, date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return orders.filter(
      (order) =>
        new Date(order.date) >= startOfDay && new Date(order.date) <= endOfDay
    );
  }

  function filterOrdersByWeek(orders, date) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    return orders.filter(
      (order) =>
        new Date(order.date) >= startOfWeek && new Date(order.date) <= endOfWeek
    );
  }

  function filterOrdersByMonth(orders, date) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
    return orders.filter(
      (order) =>
        new Date(order.date) >= startOfMonth &&
        new Date(order.date) <= endOfMonth
    );
  }

  function filterOrdersByYear(orders, date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const endOfYear = new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
    return orders.filter(
      (order) =>
        new Date(order.date) >= startOfYear && new Date(order.date) <= endOfYear
    );
  }

  function calculateEarningsForOrder(order) {
    return order.orderDetails.reduce(
      (acc, detail) => acc + detail.unitPrice * detail.quantity,
      0
    );
  }

  function calculateTotalEarnings(orders) {
    return orders.reduce(
      (acc, order) => acc + calculateEarningsForOrder(order),
      0
    );
  }

  const handleTimeframeChange = (timeframe) => {
    setActiveButton(timeframe); // Establece el botón activo
    const now = new Date();
    let filteredOrders = [];

    switch (timeframe) {
      case "D":
        filteredOrders = filterOrdersByDay(orders, now);
        break;
      case "S":
        filteredOrders = filterOrdersByWeek(orders, now);
        break;
      case "M":
        filteredOrders = filterOrdersByMonth(orders, now);
        break;
      case "A":
        filteredOrders = filterOrdersByYear(orders, now);
        break;
      default:
        filteredOrders = orders;
    }

    const totalEarnings = calculateTotalEarnings(filteredOrders);
    setEarnings(totalEarnings);
  };
  useEffect(() => {
    handleTimeframeChange("A");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.subtitlos}>
        <h2 className={styles.titulo}>Ganancias</h2>
        <div className={styles.botonera}>
          <button
            onClick={() => handleTimeframeChange("D")}
            className={`${styles.boton} ${
              activeButton === "D" ? styles.active : ""
            }`}
          >
            D
          </button>
          <button
            onClick={() => handleTimeframeChange("S")}
            className={`${styles.boton} ${
              activeButton === "S" ? styles.active : ""
            }`}
          >
            S
          </button>
          <button
            onClick={() => handleTimeframeChange("M")}
            className={`${styles.boton} ${
              activeButton === "M" ? styles.active : ""
            }`}
          >
            M
          </button>
          <button
            onClick={() => handleTimeframeChange("A")}
            className={`${styles.boton} ${
              activeButton === "A" ? styles.active : ""
            }`}
          >
            A
          </button>
        </div>
      </div>
      <h1 className={styles.plata}>${earnings}</h1>
    </div>
  );
}

export default MoneyDashboard;
