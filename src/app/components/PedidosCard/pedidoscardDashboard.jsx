"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./pedidoscard.module.css";
import Image from "next/image";
import jwt from "jsonwebtoken";
import ShippingLabel from "../etiquetasEnvio/etiquetasEnvio";
import Etiquetas from "../etiquetasEnvio/page";
import { PDFViewer } from "@react-pdf/renderer";

import Modal from "react-modal";

function PedidosCardDashboard({
  date,
  total,
  status,
  orderDetails,
  deliveryDate,
  orderId, // add this

  name,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isPDFVisible, setPDFVisible] = useState(false);

  const productCountByType = {};
  orderDetails.forEach((detail) => {
    const productType = detail.products.productType;
    if (!productCountByType[productType]) {
      productCountByType[productType] = 0;
    }
    productCountByType[productType] += detail.quantity;
  });
  const imageUrl = orderDetails[0].products.picture;
  const isCubreValijas = imageUrl.includes("CubreValijas%");

  console.log(orderDetails[0].products.picture);

  const statusClass =
    status === "En proceso" ? styles.enProceso : styles.entregado;

  const formattedDeliveryDate = deliveryDate
    ? new Intl.DateTimeFormat("es-ES", {
        month: "long",
        day: "numeric",
      }).format(new Date(deliveryDate))
    : null;
  const formattedOrderDate = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  function formatProductName(name) {
    let formattedName = decodeURIComponent(name); // Convertir %2F a "/"
    formattedName = formattedName.replace("/", " "); // Reemplazar "/" con espacio en blanco
    if (formattedName.startsWith("Tablets")) {
      formattedName = formattedName.replace("Tablets", "Funda Rígidas");
    }
    return formattedName;
  }

  const groupedOrderDetails = orderDetails.reduce((acc, detail) => {
    const id = detail.products.id;
    const size = detail.size;

    if (!acc[id]) {
      acc[id] = {
        product: detail.products,
        sizes: {},
      };
    }

    if (!acc[id].sizes[size]) {
      acc[id].sizes[size] = detail.quantity;
    } else {
      acc[id].sizes[size] += detail.quantity;
    }

    return acc;
  }, {});

  const sizeMapping = {
    Size7: '7"',
    Size8: '8"',
    Size9: '9"',
    Size10: '10"',
    Size12: '12"',
    Size14: '14"',
    Size14_1: '14.1"',
    Size15_6: '15.6"',
    Size17: '17"',
    S: "S",
    M: "M",
    L: "L",
  };

  function formatSize(sizeEnum) {
    return sizeMapping[sizeEnum] || sizeEnum;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  const handleOpenShippingModal = () => {
    setIsShippingModalOpen(true);
  };

  const handleOpenPDF = () => {
    setPDFVisible(true);
  };

  return (
    <div className={styles.contenedorCard}>
      <div className={styles.leftContainer}>
        <div className={styles.contenedorImagen}>
          <img
            src={imageUrl}
            alt={orderDetails[0].products.name}
            className={styles.productImage}
            style={{ height: isCubreValijas ? "130px" : "150px" }}
          />
        </div>
        <div className={styles.orderInfo}>
          <h2 className={statusClass}>{status}</h2>
          {formattedDeliveryDate && <h1>Enviado el {formattedDeliveryDate}</h1>}

          {Object.entries(productCountByType).map(([type, count]) => (
            <p key={type} className={styles.detallePedido}>
              {type.replace(/_/g, " ")}: {count} unidades
            </p>
          ))}
        </div>
      </div>
      <div>
        <button className={styles.repeatButton} onClick={handleOpenPDF}>
          Imprimir Datos de Envio
        </button>
        {isPDFVisible && (
          <Modal
            isOpen={isPDFVisible}
            onRequestClose={() => setPDFVisible(false)}
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
            <Etiquetas user={user} orderId={orderId} />
          </Modal>
        )}
        <p className={styles.detallePedidoB}>
          Direccion: {user.address},Ciudad: {user.city},Localidad:{" "}
          {user.localidad},Codigo Postal: {user.postalCode},Telefono:{" "}
          {user.phone},Nombre del Local: {user.shopName}, CUITL {user.cuit}
          ,Nombre: {user.name}, Apellido: {user.lastname}
        </p>
      </div>

      <div className={styles.contenedorBotones}>
        <button onClick={handleOpenModal} className={styles.detailButton}>
          Ver Detalle
        </button>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
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
              backgroundColor: "none",
              position: "fixed",
              top: 0,
              left: "auto", // Añade esta línea
              right: 0,
              padding: "2rem",
              width: "80%",
              maxWidth: "30%",
              maxHeight: "90vh",
              zIndex: 20,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            },
          }}
        >
          <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
          <h1 className={styles.titulo}>
            Pedido realizado el: {formattedOrderDate}
          </h1>
          <div className={styles.line}></div>

          {Object.values(groupedOrderDetails).map((detail) => (
            <div key={detail.product.id}>
              <div className={styles.modalContainer}>
                <div className={styles.contenedorImagen}>
                  <Image
                    src={detail.product.picture}
                    alt={detail.product.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className={styles.contenedorTexto}>
                  <p>Modelo: {formatProductName(detail.product.name)}</p>
                  {Object.entries(detail.sizes).map(([size, quantity]) => (
                    <p key={size}>
                      {formatSize(size)}: {quantity} unidades
                    </p>
                  ))}
                </div>
              </div>
              <div className={styles.line}></div>
            </div>
          ))}
        </Modal>
        <button className={styles.repeatButton}>Confirmar Envio </button>{" "}
        <Modal
          isOpen={isConfirmModalOpen}
          onRequestClose={() => setIsConfirmModalOpen(false)}
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
              backgroundColor: "white",
              position: "fixed",
              top: 0,
              left: "auto", // Añade esta línea
              right: 0,
              padding: "2rem",
              width: "80%",
              maxWidth: "30%",
              maxHeight: "90vh",
              zIndex: 20,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            },
          }}
        >
          <p>Pedido realizado con éxito</p>
          <button
            onClick={() => {
              setIsConfirmModalOpen(false);
              window.location.reload(); // Recarga la página
            }}
          >
            Aceptar
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default PedidosCardDashboard;
