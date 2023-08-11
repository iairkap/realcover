"use client";
import {
  emailDashboardContact,
  locationDashboardContact,
  shopsDashboardContact,
  whatsappDashboardContact,
  productosDashContacts,
  printDashContacts,
} from "../../../../public/imagnes";
import Image from "next/image";
import React from "react";
import styles from "./clientCard.module.css";
import Etiquetas from "../etiquetasEnvio/page";
import { useState } from "react";
import Modal from "react-modal";
import PedidosContainer from "../PedidosCard/pedidoscardcontainer";
function ClientCard({ user }) {
  const [isModalOpenShipping, setIsModalOpenShipping] = useState(false);
  const [isModalOpenOrders, setIsModalOpernOrders] = useState(false);

  const open = () => {
    setIsModalOpernOrders(true);
  };

  const close = () => {
    setIsModalOpernOrders(false);
  };

  const openModal = () => {
    setIsModalOpenShipping(true);
  };

  const closeModal = () => {
    setIsModalOpenShipping(false);
  };
  const getLatestOrderDate = (orders) => {
    if (!orders || orders.length === 0) return null;
    const latestOrder = orders.reduce((acc, current) => {
      return new Date(acc.date) > new Date(current.date) ? acc : current;
    });
    return latestOrder.date;
  };
  const latestOrderDate = getLatestOrderDate(user.orders);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("es-ES", options).format(date);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.titlesContainer}>
        <h4 className={styles.name}>
          {user.name} {user.lastName}
        </h4>
        <div className={styles.divColor}></div>
        <h4 className={styles.shop}>{user.shopName}</h4>
      </div>
      <div className={styles.divColorb}></div>
      <div className={styles.infoContainer}>
        <div
          className={styles.infoText}
          onClick={() => window.open(`mailto:${user.email}`)}
        >
          <Image
            src={emailDashboardContact}
            className={`${styles.iconHover} ${styles.animatedIcon}`}
          />
          <h5 className={styles.emailText}>{user.email}</h5>
        </div>
        <div
          className={styles.infoText}
          onClick={() =>
            window.open(
              `https://wa.me/${user.phone}?text=Hola ${user.name},`,
              "_blank"
            )
          }
        >
          <Image
            src={whatsappDashboardContact}
            className={`${styles.iconHover} ${styles.animatedIcon}`}
          />
          <h5 className={styles.emailText}>{user.phone}</h5>
        </div>
        <div className={styles.infoText}>
          <Image
            src={shopsDashboardContact}
            className={`${styles.iconHover} ${styles.animatedIcon}`}
          />
          <button className={styles.emailText} onClick={open}>
            {user.orders
              ? `${user.orders.length} pedidos realizados`
              : "No hay pedidos realizados"}
          </button>
          <Modal
            isOpen={isModalOpenOrders} // Usar el mismo estado para determinar si el modal está abierto.
            onRequestClose={close} // Usa tu función closeModal para cerrar el modal.
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.829)",
                zIndex: 10,
                backdropFilter: "blur(4.5px)",
              },
              content: {},
            }}
          >
            <PedidosContainer user={user} />
          </Modal>
        </div>
        <div className={styles.infoText}>
          <Image
            src={locationDashboardContact}
            className={`${styles.iconHover} ${styles.animatedIcon}`}
          />
          {user.city}
        </div>
        <div className={styles.infoText}>
          <Image
            src={productosDashContacts}
            className={`${styles.iconHover} ${styles.animatedIcon}`}
          />
          {latestOrderDate
            ? `Último pedido: ${formatDate(latestOrderDate)}`
            : "No hay pedidos realizados"}
        </div>
        <div className={styles.infoText}>
          <Image
            src={printDashContacts}
            className={`${styles.iconHover} ${styles.animatedIcon}`}
          />
          <button className={styles.button} onClick={openModal}>
            Imprimir datos de Envio
          </button>
        </div>

        <br />
        <Modal
          isOpen={isModalOpenShipping} // Usar el mismo estado para determinar si el modal está abierto.
          onRequestClose={closeModal} // Usa tu función closeModal para cerrar el modal.
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              right: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.829)",
              zIndex: 10,
              backdropFilter: "blur(4.5px)",
            },
            content: {
              width: "fit-content",
              height: "fit-content",
            },
          }}
        >
          <Etiquetas order={user.orders[0]} user={user} />
        </Modal>
      </div>
    </div>
  );
}

export default ClientCard;
