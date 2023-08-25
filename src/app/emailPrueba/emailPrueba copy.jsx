"use client";

import React from "react";
import styles from "./email.module.css";
import Image from "next/image";
import { logo } from "../../../public/imagnes";
import funda from "../../../public/fundas/130.png";
import axioss from "axios";
import { useEffect } from "react";
import { useState } from "react";

function limitWords(str, wordLimit) {
  const words = str.split(" ");
  if (words.length <= wordLimit) return str;
  return words.slice(0, wordLimit).join(" ") + "...";
}

function toUpperCase(str) {
  return str ? str.toUpperCase() : "";
}
function Email({ CartData, email, orderId, total }) {
  const [orders, setOrders] = useState([]);

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
    [ProductType.NEOPRENE_COVER]: "Fundas de Neoprene",
    [ProductType.MALETINES]: "Maletines",
    [ProductType.MALETINES_FULL_COLOR]: "Full Color",
    [ProductType.TABLET_COVER]: "Fundas Rigidas",
    [ProductType.CUBRE_VALIJAS]: "Cubre Valijas",
    [ProductType.PORTAFOLIOS]: "Portafolios",
    [ProductType.CON_BOLSILLO]: "Fundas con Bolsillo",
  };
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axioss.get("/api/order/");
        setOrders(response.data);
        console.log("Fetched order:", response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    }
    fetchOrders();
  }, []);

  console.log(orders);
  const aggregateOrderDetails = (orderDetails) => {
    const details = orderDetails.reduce((acc, detail) => {
      const productDisplayName =
        ProductDisplayName[detail.products.productType];
      const mappedSize = sizeMapping[detail.size];
      const key = `${productDisplayName}-${mappedSize}`;

      if (acc[key]) {
        acc[key].quantity += detail.quantity;
        acc[key].unitPrice = detail.unitPrice;
      } else {
        acc[key] = {
          productType: productDisplayName,
          size: mappedSize,
          quantity: detail.quantity,
          unitPrice: detail.unitPrice,
          picture: detail.products.picture,
          name: detail.products.name,
        };
      }
      return acc;
    }, {});

    return {
      details: details,
      total: order.total,
      userName: order.user.name,
    };
  };
  const order = orders.find((order) => order.id === 16);

  let summarizedDetails;

  if (order) {
    summarizedDetails = aggregateOrderDetails(order.orderDetails);
    console.log(summarizedDetails);
  }

  const detailStrings =
    summarizedDetails &&
    Object.values(summarizedDetails.details).map(
      (detail) => `${detail.quantity} ${detail.productType} ${detail.size}`
    );

  const combinedDetails = detailStrings && detailStrings.join(", ");

  return (
    <table
      width="640px"
      height="1249px"
      bgcolor="#b9b9b9"
      cellPadding="0"
      cellSpacing="0"
      style={{ borderCollapse: "collapse" }}
    >
      <tbody>
        {/* Header */}
        <tr>
          <td height="56.998px" bgcolor="#232323" style={{ padding: "0 2rem" }}>
            <table width="100%" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <Image
                      src={logo}
                      alt="dashnav"
                      width="auto"
                      height="auto"
                    />
                  </td>
                  <td align="right">
                    <h1
                      style={{
                        color: "#56b947",
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: "900",
                        letterSpacing: "-0.176px",
                      }}
                    >
                      {toUpperCase(
                        summarizedDetails && summarizedDetails.userName
                      )}
                    </h1>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        {/* First Part */}
        <tr bgcolor="#56b947">
          <td height="291px" style={{ padding: "49px 0" }}>
            <table width="100%" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td
                    width="50%"
                    valign="top"
                    style={{
                      paddingTop: "100px",
                      color: "#fff",
                      fontFamily: "Roboto",
                      fontSize: "14px",
                      paddingLeft: "77px",
                    }}
                  >
                    Compraste{" "}
                    {combinedDetails
                      ? limitWords(combinedDetails, 3)
                      : "Cargando detalles..."}
                    <br />
                    Tiempo de demora Estimado
                    <br />
                    <h1
                      style={{
                        fontSize: "40px",
                        fontWeight: "700",
                        marginTop: "0",
                      }}
                    >
                      15 dias
                    </h1>
                  </td>
                  <td width="50%">
                    <Image src={funda} alt="funda" width="244" height="244" />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        {/* Resumen de compra */}
        <tr>
          <td style={{ position: "relative" }}>
            <table
              style={{
                position: "absolute",
                top: "-64px",
                left: "32px",
                width: "550px",
                padding: "40px 37px",
                background: "#fff",
                boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "3px",
                borderCollapse: "collapse",
              }}
              cellPadding="0"
              cellSpacing="0"
            >
              <tbody>
                <tr>
                  <td colspan="2" style={{ padding: "10px" }}>
                    <h4>Resumen de tu compra</h4>
                  </td>
                </tr>

                {summarizedDetails &&
                  Object.values(summarizedDetails.details).map((detail) => (
                    <tr key={`${detail.productType}-${detail.size}`}>
                      <td style={{ padding: "10px" }}>
                        {detail.quantity} {detail.productType}
                      </td>
                      <td style={{ padding: "10px", textAlign: "right" }}>
                        {detail.size}
                      </td>
                    </tr>
                  ))}

                <tr>
                  <td height="10"></td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>Total</td>
                  <td style={{ padding: "10px", textAlign: "right" }}>
                    {summarizedDetails && summarizedDetails.total}$
                    {/* Asegurándonos de que summarizedDetails exista antes de intentar acceder a 'total' */}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style={{ padding: "5px" }}>
                    <a
                      href="http://localhost:3000/profile"
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{
                          padding: "10px 15px",
                          marginRight: "5px",
                          border: "none",
                          borderRadius: "5px",
                          backgroundColor: "#56b947",
                          color: "#fff",
                        }}
                      >
                        Ver Detalle
                      </button>
                    </a>
                    <a
                      href="http://localhost:3000/profile"
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{
                          padding: "10px 15px",
                          marginLeft: "5px",
                          border: "none",
                          borderRadius: "5px",
                          backgroundColor: "#232323",
                          color: "#fff",
                        }}
                      >
                        Agregar direccion Envio
                      </button>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export default Email;
