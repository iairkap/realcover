"use client";

import React, { useState, useContext } from "react";
import TableCouponesDashboard from "../../components/tableCoupones/tableCoupones copy";
import DashNav from "../../components/Dashboard/dashnav";
import CreateNewCoupon from "./createNewCoupon";
import styles from "./cupones.module.css";
import { GlobalContext } from "./layout";

function Cupones(props) {
  const { coupons, isLoading } = useContext(GlobalContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const { createNewCupon } = useContext(GlobalContext);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.generalBody}>
      <DashNav className={styles.navBar} />
      <div className={styles.generalContaier}>
        <div className={styles.firstPart}></div>
        <button onClick={handleOpenModal}>Crear nuevo Cupon</button>
        <CreateNewCoupon
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          createNewCupon={createNewCupon}
        />
        <div className={styles.secondPart}></div>
        <TableCouponesDashboard coupons={coupons} />
      </div>
    </div>
  );
}

export default Cupones;
