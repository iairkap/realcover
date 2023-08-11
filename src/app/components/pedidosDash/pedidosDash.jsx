"use client";
import React, { useEffect, useState } from "react";
import styles from "./pedidosDash.module.css";
import Image from "next/image";
import {
  activosDash,
  nuevosDash,
  deliveryDash,
} from "../../../../public/imagnes";
import LoadingContainer from "../loading/loading";

function PedidosDash(props) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado

  useEffect(() => {
    fetch("/api/order")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false); // Establecer isLoading a false una vez que hayas recibido los datos
      });
  }, []);

  const getPedidosEnviados = (orders) => {
    return orders.filter((order) => order.status === "Enviado");
  };

  const getPedidosActivos = (orders) => {
    return orders.filter((order) => order.status === "En proceso");
  };

  const getPedidosNuevos = (orders) => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return orders.filter((order) => new Date(order.date) > oneWeekAgo);
  };

  const pedidosEnviados = getPedidosEnviados(orders);
  const pedidosActivos = getPedidosActivos(orders);
  const pedidosNuevos = getPedidosNuevos(orders);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Pedidos</h1>
      </div>
      <div className={styles.iconsContainer}>
        <div className={styles.partContainer}>
          <Image src={nuevosDash} />
          <div className={styles.textContainer}>
            <h4 className={styles.subtitles}>Pedidos nuevos</h4>
            <h1 className={styles.titleb}>
              {isLoading ? <LoadingContainer /> : pedidosNuevos.length}
            </h1>
          </div>
        </div>

        <div className={styles.partContainer}>
          <Image src={activosDash} />
          <div className={styles.textContainer}>
            <h4 className={styles.subtitles}>Pedidos Activos</h4>
            <h1 className={styles.titleb}>
              {isLoading ? <LoadingContainer /> : pedidosActivos.length}
            </h1>
          </div>
        </div>

        <div className={styles.partContainer}>
          <Image src={deliveryDash} />
          <div className={styles.textContainer}>
            <h4 className={styles.subtitles}>Pedidos Enviados</h4>
            <h1 className={styles.titleb}>
              {isLoading ? <LoadingContainer /> : pedidosEnviados.length}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PedidosDash;
