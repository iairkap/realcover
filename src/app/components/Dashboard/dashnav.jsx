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
      <br /> <Image src={logoDashboard} className={styles.logo} alt="dashnav" />
      <div className={styles.iconsContainer}>
        <Link href="/dashboard">
          <div className={styles.iconTitle}>
            <div>
              <Image src={pedidosDash} alt="dashnav" />
            </div>
            <h4 className={styles.titles}>Pedidos</h4>
          </div>
        </Link>
        <Link href="/dashboard/clientes">
          <div className={styles.iconTitle}>
            <Image src={clientesDash} alt="dashnav" />
            <h4 className={styles.titles}>Clientes</h4>
          </div>
        </Link>
        <Link href="/dashboard/precios" alt="dashnav">
          <div className={styles.iconTitle}>
            <Image src={preciosDash} />
            <h4 className={styles.titles}>Precios</h4>
          </div>
        </Link>
        <Link href="/dashboard/stock" alt="dashnav">
          <div className={styles.iconTitle}>
            <Image src={stockDash} />
            <h4 className={styles.titles}>Stock</h4>
          </div>
        </Link>
        <Link href="/dashboard/productos" alt="dashnav">
          <div className={styles.iconTitle}>
            <Image src={productosDash} />
            <h4 className={styles.titles}>Productos</h4>
          </div>
        </Link>
        <Link href="/dashboard/cupones" alt="dashnav">
          <div className={styles.iconTitle}>
            <Image src={voucherDash} />
            <h4 className={styles.titles}>Cupones</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DashNav;
