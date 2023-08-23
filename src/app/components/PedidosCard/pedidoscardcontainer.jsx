"use client";

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import PedidosCard from "./pedidoscard";
import styles from "./pedidoscontainer.module.css";
import { GlobalContext } from "../../store/layout";
import { useSession } from "next-auth/react";

function PedidosContainer() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4; // 4 pedidos por página

  const { userData, setUserData } = useContext(GlobalContext);
  const { data: session } = useSession();

  if (!session) {
    // No hay sesión, redirige o muestra un mensaje al usuario.
    return <p>Please sign in to view this content.</p>;
  }

  console.log(session);
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

  // Lógica para mostrar pedidos de acuerdo con la paginación
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Actualiza la página actual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Mis Pedidos</h1>

      {currentOrders.map((order) => (
        <PedidosCard
          key={order.id}
          {...order}
          className={styles.separacion}
          userData={userData}
        />
      ))}
      <div className={styles.pagination}>
        {Array(Math.ceil(orders.length / ordersPerPage))
          .fill()
          .map((_, idx) => (
            <button key={idx} onClick={() => paginate(idx + 1)}>
              {idx + 1}
            </button>
          ))}
      </div>
    </div>
  );
}

export default PedidosContainer;
