"use client";

import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../store/layout";
import axios from "axios";
import CardCupon from "./cupon";
import styles from "./cuponContainer.module.css";
function CuponContainer(props) {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("/api/getCoupon");
        setCoupons(response.data);
      } catch (err) {
        console.error("Error fetching coupons:", err);
        setError(err);
      }
    };

    fetchCoupons();
  }, []); // El array vacío significa que useEffect se ejecutará solo una vez, similar a componentDidMount.

  console.log(coupons);

  return (
    <div className={styles.cuponContainer}>
      {/* Aquí puedes renderizar tus cupones o cualquier error que haya ocurrido */}
      {coupons.map((coupon) => (
        <div key={coupon.id}>
          <CardCupon coupon={coupon} />
        </div>
      ))}
      {error && <div>Error fetching coupons: {error.message}</div>}
    </div>
  );
}

export default CuponContainer;
