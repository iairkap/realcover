import React from "react";
import styles from "./dashnav.module.css";
import logoDashboard from "../../../../public/logoDashboard.png";
import Image from "next/image";
import {
  clientesDash,
  mensajesDash,
  pedidosDash,
  preciosDash,
  stockDash,
  voucherDash,
  productosDash,
  ingresosDash,
} from "../../../../public/imagnes";
import Link from "next/link";
function DashNav(props) {
  return (
    <div className={styles.navBarContainer}>
      <div className={styles.logo}></div>
      <br /> <Image src={logoDashboard} className={styles.logo} />
      <div className={styles.iconsContainer}>
        <div className={styles.iconTitle}>
          <Image src={pedidosDash} />
          <h4 className={styles.titles}>Pedidos</h4>
        </div>
        <div className={styles.iconTitle}>
          <Image src={clientesDash} />
          <h4 className={styles.titles}>Clientes</h4>
        </div>
        <div className={styles.iconTitle}>
          <Image src={preciosDash} />
          <h4 className={styles.titles}>Precios</h4>
        </div>
        <div className={styles.iconTitle}>
          <Image src={stockDash} />
          <h4 className={styles.titles}>Stock</h4>
        </div>
        <div className={styles.iconTitle}>
          <Image src={productosDash} />
          <h4 className={styles.titles}>Productos</h4>
        </div>
        <div className={styles.iconTitle}>
          <Image src={voucherDash} />
          <h4 className={styles.titles}>Cupones</h4>
        </div>
      </div>
    </div>
  );
}

export default DashNav;
