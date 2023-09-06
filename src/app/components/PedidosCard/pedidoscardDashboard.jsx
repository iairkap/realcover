"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./pedidoscard.module.css";
import Image from "next/image";
import jwt from "jsonwebtoken";
import ShippingLabel from "../etiquetasEnvio/etiquetasEnvio";
import Etiquetas from "../etiquetasEnvio/etiquta";
import { PDFViewer } from "@react-pdf/renderer";

import Modal from "react-modal";

function PedidosCardDashboard({
  date,
  total,
  status,
  orderDetails,
  deliveryDate,
  orders,
  user,
  name,
  order,
  fetchOrders, // Recibe fetchOrders como prop
  orderId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [isPDFVisible, setPDFVisible] = useState(false);
  const [tableOption, setTableOption] = useState(1);

  const [isModalOpenShipping, setIsModalOpenShipping] = useState(false);
  const [localStatus, setLocalStatus] = useState("En proceso");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [encomiendaName, setEncomiendaName] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const openModal = () => {
    setIsModalOpenShipping(true);
  };

  const closeModal = () => {
    setIsModalOpenShipping(false);
  };
  const confirmSend = async () => {
    setIsLoading(true);
    try {
      console.log("Enviando orden con ID:", orderId);

      // Actualizar la orden en la base de datos o donde sea necesario
      const updateResponse = await fetch("api/order", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
          status: "Enviado",
        }),
      });

      if (!updateResponse.ok) {
        const data = await updateResponse.json();
        throw new Error(data.message || "Error actualizando la orden.");
      }

      // Preparar datos para enviar correo
      const emailData = {
        shippingDetails: {
          encomiendaName,
          trackingNumber,
          selectedBank,
          // Puedes agregar más datos aquí si es necesario
        },
        email: user.email,
        user: {
          name: user.name,
          lastName: user.lastName,
          // Y cualquier otra información de usuario que desees enviar
        },
      };

      // Hacer la solicitud para enviar el correo
      const emailResponse = await fetch("api/emailDelivery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!emailResponse.ok) {
        const data = await emailResponse.json();
        throw new Error(data.message || "Error al enviar el correo.");
      }

      setLocalStatus("Enviado");
      await fetchOrders();
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };
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

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

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
  const ProductType = {
    NEOPRENE_COVER: "NEOPRENE_COVER",
    MALETINES: "MALETINES",
    MALETINES_FULL_COLOR: "MALETINES_FULL_COLOR",
    TABLET_COVER: "TABLET_COVER",
    CUBRE_VALIJAS: "CUBRE_VALIJAS",
    PORTAFOLIOS: "PORTAFOLIOS",
    CON_BOLSILLO: "CON_BOLSILLO",
  };

  const ProductDisplayName = {
    [ProductType.NEOPRENE_COVER]: "Fundas",
    [ProductType.MALETINES]: "Valijas",
    [ProductType.MALETINES_FULL_COLOR]: "Full Color",
    [ProductType.TABLET_COVER]: "Fundas Rigidas",
    [ProductType.CUBRE_VALIJAS]: "Cubre Valijas",
    [ProductType.PORTAFOLIOS]: "Portafolios",
    [ProductType.CON_BOLSILLO]: "Con Bolsillo",
  };
  const groupedOrderDetails = orderDetails.reduce((acc, detail) => {
    const size = sizeMapping[detail.size];
    const nameParts = decodeURIComponent(detail.products.name).split("/");
    const type = ProductDisplayName[detail.products.productType]; // Usamos el tipo de producto correcto
    const productId = nameParts[1];

    if (!acc[size]) {
      acc[size] = {};
    }

    if (!acc[size][type]) {
      acc[size][type] = {
        products: {},
      };
    }

    if (!acc[size][type].products[productId]) {
      acc[size][type].products[productId] = {
        count: 0,
        price: detail.unitPrice,
      };
    }

    acc[size][type].products[productId].count += detail.quantity;

    return acc;
  }, {});
  function formatSize(sizeEnum) {
    return sizeMapping[sizeEnum] || sizeEnum;
  }

  const allSizes = Object.keys(sizeMapping);
  function convertToCSV(data) {
    const csvRows = [];

    // Obtener los encabezados de "tipo de funda"
    const typeHeaders = ["MODELO"].concat(Array.from(uniqueTypes));
    csvRows.push(typeHeaders.join(","));

    // Obtener los encabezados de tamaños
    const sizeHeaders = ["MODELO"].concat(
      Array.from(uniqueTypes).flatMap(() => Array.from(uniqueSizes))
    );
    csvRows.push(sizeHeaders.join(","));

    // Rellenar los datos
    for (const productId of uniqueProducts) {
      const row = [productId];
      for (const displayType of uniqueTypes) {
        for (const currSize of uniqueSizes) {
          const currProd =
            groupedOrderDetails[currSize]?.[displayType]?.products[productId];
          row.push(currProd ? currProd.count : "--");
        }
      }
      csvRows.push(row.join(","));
    }

    return csvRows.join("\n");
  }
  function handleExportToCSV() {
    const csvData = convertToCSV(groupedOrderDetails);
    const blob = new Blob([csvData], { type: "text/csv" });
    let url;
    if (typeof window !== "undefined") {
      url = window.URL.createObjectURL(blob);
    }
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "export.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const uniqueSizes = new Set(Object.keys(groupedOrderDetails));
  const uniqueTypes = new Set(
    Object.values(groupedOrderDetails).flatMap((sizeDetails) =>
      Object.keys(sizeDetails)
    )
  );

  const uniqueProducts = new Set(
    Object.values(groupedOrderDetails)
      .flatMap((sizeDetails) => Object.values(sizeDetails))
      .flatMap((typeDetails) => Object.keys(typeDetails.products))
  );
  function renderTable2() {
    return (
      <table className={styles.table}>
        <thead className={styles.tablaB}>
          {/* Primer fila para tipo de funda */}
          <tr className={styles.tr}>
            <th className={`${styles.titulosTabla} ${styles.th}`}></th>
            {Array.from(uniqueTypes).map((type) => (
              <th
                key={type}
                colSpan={Array.from(uniqueSizes).length}
                className={`${styles.titulosTabla} ${styles.th}`}
              >
                {type}
              </th>
            ))}
          </tr>
          {/* Segunda fila para el modelo y tamaño */}
          <tr className={styles.tr}>
            <th className={`${styles.titulosTabla} ${styles.th}`}>MODELO</th>
            {Array.from(uniqueTypes).flatMap(() =>
              Array.from(uniqueSizes).map((size) => (
                <th
                  key={size}
                  className={`${styles.titulosTabla} ${styles.th}`}
                >
                  {size}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from(uniqueProducts).map((productId) => (
            <tr key={productId}>
              <td className={styles.td1}>{productId}</td>
              {Array.from(uniqueTypes).flatMap((displayType) =>
                Array.from(uniqueSizes).map((currSize) => {
                  const currProd =
                    groupedOrderDetails[currSize]?.[displayType]?.products[
                      productId
                    ];
                  return (
                    <td
                      key={`${productId}-${currSize}`}
                      className={`${styles.td} ${
                        currProd && currProd.count !== "--"
                          ? styles.tdHighlighted
                          : ""
                      }`}
                    >
                      {currProd ? currProd.count : "--"}
                    </td>
                  );
                })
              )}
            </tr>
          ))}
        </tbody>
        <button onClick={handleExportToCSV} className={styles.exportButton}>
          Exportar a CSV
        </button>
      </table>
    );
  }
  const handleOpenShippingModal = () => {
    setIsShippingModalOpen(true);
  };

  const handleOpenPDF = () => {
    setPDFVisible(true);
  };

  console.log(groupedOrderDetails);
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
            <Etiquetas order={order} user={user} />
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

              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              zIndex: 10,
              backdropFilter: "blur(10px)",
            },
            content: {
              backgroundColor: "#232323",
              position: "fixed",
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
          <button onClick={() => setTableOption(1)}>Tabla 1</button>
          <button onClick={() => setTableOption(2)}>Tabla 2</button>
          <h1 className={styles.titulo}>
            Pedido realizado el: {formattedOrderDate}
          </h1>
          <div className={styles.line}></div>

          {/* Agregamos la tabla aquí */}
          {/* Renderizar tabla basado en tableOption */}
          {tableOption === 1 && (
            <table className={styles.table}>
              <thead className={styles.tablaB}>
                <tr className={styles.tr}>
                  <th className={`${styles.titulosTabla} ${styles.th}`}>
                    Tipo
                  </th>
                  <th className={`${styles.titulosTabla} ${styles.th}`}>
                    Tamaño
                  </th>
                  <th className={`${styles.titulosTabla} ${styles.th}`}>IDs</th>
                  <th className={`${styles.titulosTabla} ${styles.th}`}>
                    Cantidad
                  </th>
                  <th className={`${styles.titulosTabla} ${styles.th}`}>
                    $ Unidad
                  </th>
                  <th className={`${styles.titulosTabla} ${styles.th}`}>
                    $ Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedOrderDetails).map(
                  ([size, sizeDetails]) => {
                    return Object.entries(sizeDetails).map(
                      ([type, typeDetails]) => {
                        const totalQuantity = Object.values(
                          typeDetails.products
                        ).reduce((sum, product) => sum + product.count, 0);
                        const productEntries = Object.entries(
                          typeDetails.products
                        )
                          .map(([id, prod]) => `${id} x (${prod.count})`)
                          .join(", ");
                        const pricePerUnit = Object.values(
                          typeDetails.products
                        )[0].price;
                        return (
                          <tr key={`${size}-${type}`}>
                            <td className={styles.td1}>{type}</td>
                            <td className={styles.td}>{size}</td>
                            <td className={styles.td}>{productEntries}</td>
                            <td className={styles.td}>{totalQuantity}</td>
                            <td className={styles.td}>
                              ${pricePerUnit.toFixed(2)}
                            </td>
                            <td className={styles.td}>
                              ${(pricePerUnit * totalQuantity).toFixed(2)}
                            </td>
                          </tr>
                        );
                      }
                    );
                  }
                )}
              </tbody>
            </table>
          )}
          {tableOption === 2 && renderTable2()}

          {/* Fin de la tabla */}
        </Modal>
        <button onClick={openModal} className={styles.repeatButton}>
          Confirmar Envio
        </button>
        <Modal
          isOpen={isModalOpenShipping}
          onRequestClose={closeModal}
          contentLabel="Confirmar Envío"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(1px)",
              zIndex: 10000000,
              display: "flex",
              justifyContent: "center", // Centrar contenido horizontalmente
              alignItems: "center", // Centrar contenido verticalmente
            },
            content: {
              background: "#d9d9d9",

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
          <div className={styles.contenedorModal}>
            <h2 className={styles.modalTitle}>
              Confirmar Envío para {user.email} {user.lastName} {user.shopName}
            </h2>
            <br />
            <input
              placeholder="Nombre de encomienda"
              value={encomiendaName}
              onChange={(e) => setEncomiendaName(e.target.value)}
              className={styles.modalTextB}
            />
            <br />
            <input
              placeholder="Número de seguimiento"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className={styles.modalTextB}
            />
            <br />
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className={styles.modalSelect}
            >
              <option value="" disabled selected>
                Transferir a{" "}
              </option>
              <option value="opcion1">BBVA FRANCES</option>
              <option value="opcion2">Galicia</option>
              <option value="opcion3">Mercado Pago</option>
              {/* Agrega más opciones según lo necesario */}
            </select>

            <br />

            <button onClick={confirmSend}>Confirmar Envío</button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default PedidosCardDashboard;
