import axios from "axios";

const baseURL = "/api/admin/coupon"; // Esto dependerá de tu configuración

const getAllCoupons = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const getCouponById = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`);
  return response.data;
};

const updateCoupon = async (id, data) => {
  const response = await axios.put(`${baseURL}/${id}`, data);
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

const createCoupon = async (data) => {
  try {
    const response = await axios.post(baseURL, data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create coupon: " + error.message);
  }
};
const bulkCreateCoupons = async () => {
  const response = await axios.post(`${baseURL}?generate=true`);
  return response.data;
};

export {
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  createCoupon,
  bulkCreateCoupons,
};
