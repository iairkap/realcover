import React from "react";
import styles from "./dashnav.module.css";
import logo from "../../../../public/imagnes";
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
      <br />{" "}
      <Image
        src="/logonav.svg"
        alt="image"
        className={styles.logo}
        width={30}
        height={30}
        data-tooltip-id="Inicio"
        data-tooltip-content=" homepage"
      />
      <div className={styles.iconsContainer}>
        <Link href="/dashboard" className={styles.Link}>
          <div className={styles.iconTitle}>
            <div>
              <Image src={pedidosDash} alt="dashnav" />
            </div>
            <h4 className={styles.titles}>Pedidos</h4>
          </div>
        </Link>
        <Link href="/dashboard/clientes" className={styles.Link}>
          <div className={styles.iconTitle}>
            <Image src={clientesDash} alt="dashnav" />
            <h4 className={styles.titles}>Clientes</h4>
          </div>
        </Link>
        <Link href="/dashboard/precios" alt="dashnav" className={styles.Link}>
          <div className={styles.iconTitle}>
            <Image src={preciosDash} />
            <h4 className={styles.titles}>Precios</h4>
          </div>
        </Link>
        <Link href="/dashboard/stock" alt="dashnav" className={styles.Link}>
          <div className={styles.iconTitle}>
            <Image src={stockDash} />
            <h4 className={styles.titles}>Stock</h4>
          </div>
        </Link>
        <Link href="/dashboard/productos" alt="dashnav" className={styles.Link}>
          <div className={styles.iconTitle}>
            <Image src={productosDash} />
            <h4 className={styles.titles}>Productos</h4>
          </div>
        </Link>
        <Link href="/dashboard/cupones" alt="dashnav" className={styles.Link}>
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
