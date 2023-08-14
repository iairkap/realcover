"use client";
import { createContext, useEffect, useState } from "react";
import {
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  createCoupon,
  bulkCreateCoupons,
} from "./useClienta";

export const GlobalContext = createContext();

export default function Layout({ children }) {
  // States
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Efecto para cargar todos los cupones al iniciar
  useEffect(() => {
    fetchCoupons();
  }, []);

  // Funciones
  async function fetchCoupons() {
    setIsLoading(true);
    try {
      const data = await getAllCoupons();
      setCoupons(data);
    } catch (err) {
      console.error("Error fetching coupons:", err);
      setError("Error fetching coupons: " + err.message);
    }
    setIsLoading(false);
  }

  async function fetchCouponById(id) {
    setIsLoading(true);
    try {
      const data = await getCouponById(id);
      setCoupon(data);
    } catch (err) {
      console.error("Error fetching coupon by ID: ", err);

      setError("Error fetching coupon by ID: " + err.message);
    }
    setIsLoading(false);
  }

  async function createNewCupon(couponData) {
    setIsLoading(true);
    try {
      const newCoupon = await createCoupon(couponData);
      setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
    } catch (err) {
      console.error("Error creating new coupon: ", err);
      setError("Error creating new coupon: " + err.message);
    }
    setIsLoading(false);
  }

  async function modifyCoupon(id, updatedData) {
    setIsLoading(true);
    try {
      const updatedCoupon = await updateCoupon(id, updatedData);
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) => (coupon.id === id ? updatedCoupon : coupon))
      );
    } catch (err) {
      console.error("Error updating coupon: ", err);
      setError("Error updating coupon: " + err.message);
    }
    setIsLoading(false);
  }

  async function removeCoupon(id) {
    setIsLoading(true);
    try {
      await deleteCoupon(id);
      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon.id !== id)
      );
    } catch (err) {
      console.error("Error deleting coupon: ", err);
      setError("Error deleting coupon: " + err.message);
    }
    setIsLoading(false);
  }

  async function createManyCoupons() {
    setIsLoading(true);
    try {
      const newCoupons = await bulkCreateCoupons();
      setCoupons((prevCoupons) => [...prevCoupons, ...newCoupons]);
    } catch (err) {
      console.error("Error bulk creating coupons: ", err);
      setError("Error bulk creating coupons: " + err.message);
    }
    setIsLoading(false);
  }

  // Pasar todos los estados y funciones al contexto
  const contextValue = {
    coupons,
    coupon,
    isLoading,
    error,
    fetchCoupons,
    fetchCouponById,
    createNewCupon,
    modifyCoupon,
    removeCoupon,
    createManyCoupons,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export function getLayout(page) {
  return <Layout>{page}</Layout>;
}
