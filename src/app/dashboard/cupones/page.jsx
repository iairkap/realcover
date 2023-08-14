"use client";
import React from "react";
import TableCouponesDashboard from "../../components/tableCoupones/tableCoupones copy";
import CreateCoupon from "./cupon";
import Layout from "./layout.js";
import { useContext } from "react";
import { useState } from "react";
import DashNav from "../../components/Dashboard/dashnav";
import styles from "./cupones.module.css";
import { useEffect } from "react";
import SearchBar from "../../components/searchBar/searchBar";
import UpdateCoupon from "./modificarCupones";
import { CouponContext, CouponProvider } from "./CouponContext"; // Assuming CouponContext is exported from "./CouponContext"

function CuponDashboard(props) {
  const { coupons, fetchCoupons } = useContext(CouponContext);

  const [isModalOpenUpdate, setModalOpenUpdate] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleOpenModalUpdate = () => {
    setModalOpenUpdate(true);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleUserChange = (newValue) => {
    setSelectedUser(newValue);
  };
  const filteredCoupons = coupons.filter((coupon) => {
    return (
      coupon.user?.name?.toLowerCase().includes(searchTerm) ||
      coupon.user?.lastName?.toLowerCase().includes(searchTerm) ||
      coupon.code?.toLowerCase().includes(searchTerm) ||
      coupon.isActive?.toString().toLowerCase() === searchTerm
      // Añade aquí otras propiedades por las que quieras filtrar
      // ...
    );
  });
  return (
    <Layout>
      <div className={styles.generalBody}>
        <DashNav className={styles.navBar} />
        <div className={styles.generalContaier}>
          <div className={styles.firstPart}>
            <button onClick={handleOpenModal} className={styles.button}>
              Crear Cupón
            </button>
            <button className={styles.button} onClick={handleOpenModalUpdate}>
              Modificar Cupones general{" "}
            </button>
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className={styles.secondPart}></div>
          <CreateCoupon
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
          />
          <UpdateCoupon
            isOpen={isModalOpenUpdate}
            onRequestClose={handleCloseModal}
          />
          <TableCouponesDashboard
            coupons={filteredCoupons}
            className={styles.table}
          />
        </div>
      </div>
    </Layout>
  );
}

export default CuponDashboard;
