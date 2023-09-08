"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import PedidosCard from "./pedidoscard";
import styles from "./pedidoscontainer.module.css";
import { GlobalContext } from "../../store/layout";
import LoadingContainer from "../loading/loading";

function PedidosContainer({ userData, setUserData }) {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const ordersPerPage = 4;

  useEffect(() => {
    const fetchOrders = async (userId) => {
      try {
        const response = await axios.get(`/api/order?userId=${userId}`);
        if (response.status === 200) {
          setOrders(response.data);
        }
        console.log("Orders:", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userData && userData.id) {
      fetchOrders(userData.id);
    }
  }, [userData]);

  useEffect(() => {
    if (orders.length !== 0 || !userData || !userData.id) {
      setLoading(false);
    }
  }, [orders, userData]);

  // Lógica para mostrar pedidos de acuerdo con la paginación
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Actualiza la página actual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingContainer /> // Mostrar LoadingContainer si está cargando
      ) : (
        <>
          {currentOrders.map((order) => (
            <PedidosCard
              key={order.id}
              {...order}
              className={styles.separacion}
              userData={userData}
              setUserData={setUserData}
            />
          ))}
          <div className={styles.pagination}>
            {Array(Math.ceil(orders.length / ordersPerPage))
              .fill()
              .map((_, idx) => (
                <button
                  className={styles.buttons}
                  key={idx}
                  onClick={() => paginate(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PedidosContainer;
