"use client";

import React, { useRef, useEffect } from "react";
import styles from "./etiquetasEnvio.module.css";
import Image from "next/image";
import QRCode from "qrcode";

function Etiquetas({ order, orders = [] }) {
  const qrCanvasRef = useRef(null);

  useEffect(() => {
    if (qrCanvasRef.current) {
      QRCode.toCanvas(qrCanvasRef.current, "https://realcover.com.ar", function(
        error
      ) {
        if (error) console.error(error);
      });
    }
  }, []);

  return (
    <div className={styles.Contenedor}>
      {orders.map((order) => (
        <div key={order.id}>
          <div className={styles.ContenedorRemitente}>
            <div className={styles.textContainer}>
              <h1 className={styles.destinatarioTitleb}>
                Remitente REAL COVER
              </h1>
              <h1 className={styles.destinatarioTitlec}>
                Devolver a BUENOS AIRES, C.A.B.A,
              </h1>
              <h1 className={styles.destinatarioTitleE}>JUNCAL 3408</h1>
              <h1 className={styles.destinatarioTitleE}>1154231080</h1>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.destinatarioContainer}>
            <div className={styles.destinatarioInformation}>
              <h1 className={styles.destinatarioTitleb}>
                Destinatario: {order.user.name} {order.user.lastName}
              </h1>
              <div className={styles.textContainerDes}>
                <h1 className={styles.destinatarioTitleb}>Domicilio:</h1>
                <h1 className={styles.destinatarioTitlec}>
                  {order.user.address}
                </h1>
              </div>
              <div className={styles.textContainerDes}>
                <h1 className={styles.destinatarioTitleE}>CP</h1>
                <h1 className={styles.destinatarioTitleD}>
                  {order.user.postalCode}
                </h1>
              </div>
              <div className={styles.textContainerDes}>
                <h1 className={styles.destinatarioTitleb}>Ciudad De Destino</h1>
                <h1 className={styles.destinatarioTitlec}>{order.user.city}</h1>
              </div>
              <div className={styles.textContainerDes}>
                <h1 className={styles.destinatarioTitleb}>Localidad</h1>
                <h1 className={styles.destinatarioTitlec}>
                  {order.user.localidad}
                </h1>
              </div>
              <div className={styles.textContainerDes}>
                <h1 className={styles.destinatarioTitleb}>CUIT: </h1>
                <br />
                <h1 className={styles.destinatarioTitlec}>{order.user.cuit}</h1>
              </div>
              <div className={styles.textContainerDes}>
                <h1 className={styles.destinatarioTitleb}>telefono: </h1>
                <br />
                <h1 className={styles.destinatarioTitlec}>
                  {order.user.phone}
                </h1>
              </div>
            </div>
          </div>
          <div className={styles.footerContainer}>
            <canvas ref={qrCanvasRef} className={styles.qrCanvas}></canvas>
            <div className={styles.logoContainer}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/logoDashboardBlack.png?alt=media&token=316899ca-78f9-4dbf-9278-29903fb9d61f"
                width={100}
                height={50}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Etiquetas;
