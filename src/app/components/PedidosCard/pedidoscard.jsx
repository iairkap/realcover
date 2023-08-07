import React, { useState, useContext } from "react";
import styles from "./pedidoscard.module.css";
import Image from "next/image";

import Modal from "react-modal";

function PedidosCard({
  date,
  total,
  status,
  orderDetails,
  deliveryDate,
  name,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

  const repeatOrder = async () => {
    setIsLoading(true);
    setError(null);

    const newOrderData = {
      userId: user.id, // Deberías obtener esto de alguna forma, por ejemplo de una variable de estado o de una variable global, o incluso de un contexto.
      total: total,
      status: status,
      products: orderDetails.map((detail) => ({
        productId: detail.products.id,
        quantity: detail.quantity,
        unitPrice: detail.products.price, // Asumiendo que el producto tiene un precio. Si no es así, ajusta esto.
        size: detail.size,
      })),
    };
    console.log(
      "Enviando orden con datos:",
      JSON.stringify(newOrderData, null, 2)
    );

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrderData),
      });

      if (!response.ok) {
        throw new Error("Error creating the order");
      }

      const data = await response.json();
      console.log(data);

      // Puede que quieras actualizar el UI de alguna manera, por ejemplo mostrando un mensaje de éxito.
      setIsConfirmModalOpen(true);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <div className={styles.contenedorCard}>
      {/* Contenedor para Imagen + Información */}
      <div className={styles.leftContainer}>
        {/* Imagen del primer producto */}
        <div className={styles.contenedorImagen}>
          <img
            src={imageUrl}
            alt={orderDetails[0].products.name}
            className={styles.productImage}
            style={{ height: isCubreValijas ? "130px" : "150px" }}
          />
        </div>
        {/* Status y Detalle General */}
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

      {/* Contenedor de botones */}
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
        <button className={styles.repeatButton} onClick={repeatOrder}>
          Repetir Orden
        </button>{" "}
        <Modal
          isOpen={isConfirmModalOpen}
          onRequestClose={() => setIsConfirmModalOpen(false)}
          style={{
            overlay: {
              //... (puedes usar el mismo estilo que tu modal anterior o uno diferente si lo prefieres)
            },
            content: {
              //... (puedes usar el mismo estilo que tu modal anterior o uno diferente si lo prefieres)
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
      {/* Sección Detalle (por ahora oculta) */}
    </div>
  );
}

export default PedidosCard;
