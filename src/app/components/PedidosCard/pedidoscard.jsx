"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./pedidoscard.module.css";
import Image from "next/image";
import jwt from "jsonwebtoken";
import ModalDireccion from "./modal";
import Modal from "react-modal";
import ModalCarrito from "./modalCarrito";
import ModalRepetirOrder from "./modalRepetirOrden";
import { useOrderLogic } from "./hooks/useOrderLogics";
import threeDots from "../../../../public/3dots.svg";
function PedidosCard({
  date,
  total,
  status,
  orderDetails,
  deliveryDate,
  name,
  userData,
  setUserData,
}) {
  const {
    setIsShippingModalOpen,
    setIsModalOpen,
    setIsConfirmModalOpen,
    isLoading,
    error,
    isConfirmModalOpen,
    isShippingModalOpen,
    isUpdateSuccess,
    productCountByType,
    imageUrl,
    isCubreValijas,
    statusClass,
    formattedDeliveryDate,
    formattedOrderDate,
    isModalOpen,
    handleOpenModal,
    formatProductName,
    groupedOrderDetails,
    formatSize,
    user,
    repeatOrder,
    userFormData,
    setUserFormData,
    handleUpdateUserInfo,
    handleOpenShippingModal,
  } = useOrderLogic(date, total, status, orderDetails, deliveryDate, name);

  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const width = windowWidth > 728 ? 150 : 100;
  const height = windowWidth > 728 ? 150 : 100;

  function renderProductCounts(productCounts) {
    const counts = Object.entries(productCounts).map(
      ([type, count]) => `${type.replace(/_/g, " ")}: ${count} unidades`
    );
    return <p className={styles.detallePedido}>{counts.join(" | ")}</p>;
  }
  return (
    <div className={styles.contenedorCard}>
      <div className={styles.leftContainer}>
        <div className={styles.contenedorImagen}>
          <Image
            src={imageUrl}
            alt={orderDetails[0].products.name}
            className={styles.productImage}
            width={width}
            height={height}
          />
        </div>
        <div className={styles.orderInfo}>
          <h2 className={statusClass}>{status}</h2>
          {formattedDeliveryDate && <h1>Enviado el {formattedDeliveryDate}</h1>}
          {renderProductCounts(productCountByType)}
        </div>
      </div>
      <div>
        <button
          className={`${styles.repeatButton} desktop`}
          onClick={handleOpenShippingModal}
        >
          Modificar Datos de Envio
        </button>

        <p className={styles.detallePedidoB}>
          Direccion: {userData?.address},Ciudad: {userData?.city},Localidad:{" "}
          {userData?.localidad},Codigo Postal: {userData?.postalCode},Telefono:{" "}
          {userData?.phone},Nombre del Local: {userData?.shopName}, CUIT{" "}
          {userData?.cuit}
          ,Nombre: {userData?.name}, Apellido: {userData?.lastname}
        </p>
      </div>
      <ModalDireccion
        userFormData={userFormData}
        setUserFormData={setUserFormData}
        isShippingModalOpen={isShippingModalOpen}
        handleUpdateUserInfo={handleUpdateUserInfo}
        setIsShippingModalOpen={setIsShippingModalOpen}
        userData={userData}
        setUserData={setUserData}
      />
      <div className={styles.contenedorBotones}>
        <button onClick={handleOpenModal} className={styles.detailButton}>
          Ver Detalle
        </button>
        <ModalCarrito
          isModalOpen={isModalOpen}
          formattedOrderDate={formattedOrderDate}
          groupedOrderDetails={groupedOrderDetails}
          formatProductName={formatProductName}
          formatSize={formatSize}
          setIsModalOpen={setIsModalOpen} // Añade esta línea
        />
        <button className={styles.repeatButtonB} onClick={repeatOrder}>
          Repetir Orden
        </button>{" "}
        <ModalRepetirOrder
          isConfirmModalOpen={isConfirmModalOpen}
          setIsConfirmModalOpen={setIsConfirmModalOpen}
        />
      </div>
      <button
        className={`${styles.threeDotsButton} mobile`}
        onClick={handleOpenShippingModal}
      >
        <Image src={threeDots} alt="Menu" />
      </button>
    </div>
  );
}

export default PedidosCard;
