"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./pedidoscard.module.css";
import Image from "next/image";
import jwt from "jsonwebtoken";

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
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

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

  const [userFormData, setUserFormData] = useState({
    address: user.address || "",
    city: user.city || "",
    localidad: user.localidad || "",
    postalCode: user.postalCode || "",
    phone: user.phone || "",
    shopName: user.shopName || "",
    cuit: user.cuit || "",
  });

  function updateUserField(fieldName, value) {
    setUserFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  }
  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFormData),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      console.log("User updated successfully:", updatedUser);

      // 1. Actualizar el localStorage con los datos actualizados
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // 2. Actualizar el estado local para reflejar estos cambios en la UI
      setUserFormData({
        address: updatedUser.address || "",
        city: updatedUser.city || "",
        localidad: updatedUser.localidad || "",
        postalCode: updatedUser.postalCode || "",
        phone: updatedUser.phone || "",
        shopName: updatedUser.shopName || "",
        cuit: updatedUser.cuit || "",
      });

      setIsUpdateSuccess(true);
      setIsShippingModalOpen(false);
    } else {
      const errorData = await response.json();
      console.error("Error updating user:", errorData.message);
      setIsUpdateSuccess(false);
    }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      alert("Datos actualizados con éxito!");
      setIsUpdateSuccess(false); // Reinicia el estado tras mostrar el mensaje
    }
  }, [isUpdateSuccess]);

  const handleOpenShippingModal = () => {
    setIsShippingModalOpen(true);
  };
  return (
    <div className={styles.contenedorCard}>
      {/* Contenedor para Imagen + Información */}
      <div className={styles.leftContainer}>
        {/* Imagen del primer producto */}
        <div className={styles.contenedorImagen}>
          <Image
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
      <div>
        <button
          className={styles.repeatButton}
          onClick={handleOpenShippingModal}
        >
          Modificar Datos de Envio{" "}
        </button>
        <p className={styles.detallePedidoB}>
          Direccion: {user.address},Ciudad: {user.city},Localidad:{" "}
          {user.localidad},Codigo Postal: {user.postalCode},Telefono:{" "}
          {user.phone},Nombre del Local: {user.shopName}, CUITL {user.cuit}
          ,Nombre: {user.name}, Apellido: {user.lastname}
        </p>
      </div>
      <Modal
        isOpen={isShippingModalOpen}
        onRequestClose={() => setIsShippingModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(1px)",
            zIndex: 10000000,
            display: "flex",
            justifyContent: "center", // Centrar contenido horizontalmente
            alignItems: "center", // Centrar contenido verticalmente
          },
          content: {
            background: "#232323",

            overflow: "auto",
            position: "relative", // Esto es importante para que el modal se posicione en el centro
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
            transform: "none", // Remover la transformación anterior para centrar
            padding: "1rem",
            boxSizing: "border-box", // Asegurar que el padding no afecte el tamaño total
          },
        }}
      >
        <form onSubmit={handleUpdateUserInfo}>
          <div className={styles.textContainerModal}>
            <h1 className={styles.tituloModelo}>Datos de Envio</h1>
            <br />
            <div className={styles.inputsContainer}>
              <div className={styles.inputModal}>
                <label htmlFor="address" className={styles.modalText}>
                  Direccion:
                </label>
                <input
                  type="text"
                  id="address"
                  onChange={(e) => updateUserField("address", e.target.value)}
                  value={userFormData.address}
                />
              </div>
              <div className={styles.inputModal}>
                <label htmlFor="city" className={styles.modalText}>
                  Ciudad:
                </label>
                <input
                  type="text"
                  id="city"
                  onChange={(e) => updateUserField("city", e.target.value)}
                  value={userFormData.city}
                />
              </div>
              <div className={styles.inputModal}>
                <label htmlFor="localidad" className={styles.modalText}>
                  Localidad:
                </label>
                <input
                  type="text"
                  id="localidad"
                  onChange={(e) => updateUserField("localidad", e.target.value)}
                  value={userFormData.localidad}
                />
              </div>
              <div className={styles.inputModal}>
                <label htmlFor="postalCode" className={styles.modalText}>
                  Código Postal:
                </label>
                <input
                  type="text"
                  id="postalCode"
                  onChange={(e) =>
                    updateUserField("postalCode", e.target.value)
                  }
                  value={userFormData.postalCode}
                />
              </div>
              <div className={styles.inputModal}>
                <label htmlFor="phone" className={styles.modalText}>
                  Teléfono:
                </label>
                <input
                  type="tel"
                  id="phone"
                  onChange={(e) => updateUserField("phone", e.target.value)}
                  value={userFormData.phone}
                />
              </div>

              <div className={styles.inputModal}>
                <label htmlFor="shopName" className={styles.modalText}>
                  Nombre de la Tienda:
                </label>
                <input
                  type="text"
                  id="shopName"
                  onChange={(e) => updateUserField("shopName", e.target.value)}
                  value={userFormData.shopName}
                />
              </div>
              <div className={styles.inputModal}>
                <label htmlFor="cuit" className={styles.modalText}>
                  CUIT:
                </label>
                <input
                  type="number"
                  id="cuit"
                  onChange={(e) => updateUserField("cuit", e.target.value)}
                  value={userFormData.cuit}
                />
              </div>
              <br />
            </div>
            <button type="submit" className={styles.botonConfirmacion}>
              Confirmar datos de Envio
            </button>
          </div>
        </form>
      </Modal>

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
              if (typeof window !== "undefined") {
                window.location.reload();
              }
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
