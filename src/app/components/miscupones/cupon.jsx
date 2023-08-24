import React from "react";
import styles from "./cupon.module.css";
import useFormattedDate from "./hooks.js";
export default function CardCupon({ coupon }) {
  const formattedExpiryDate = useFormattedDate(coupon.expiryDate);

  return (
    <div className={styles.cuponContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>CODE</h1>
        <h1 className={styles.titleCode}>{coupon.code}</h1>
      </div>
      <div className={styles.subtitleContainer}>
        <div className={styles.line}>
          <h2 className={styles.subs}>Descuento de:</h2>
          <h2 className={styles.subs2}>
            {coupon.discountPercent
              ? `${coupon.discountPercent}%`
              : coupon.discountValue}
          </h2>{" "}
        </div>
        <div className={styles.line}>
          <h2 className={styles.subs}>Vencimiento</h2>
          <h2 className={styles.subs2}>{formattedExpiryDate}</h2>
        </div>
        <div className={styles.line}>
          <h2 className={styles.subs}>Estado</h2>
          <h2 className={styles.subs2}>
            {coupon.used ? "USADO" : "SIN USAR"}
          </h2>{" "}
        </div>
      </div>
      <div className={styles.description}>
        <p className={styles.desc}>{coupon.description}</p>
      </div>
    </div>
  );
}
