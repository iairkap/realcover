import React from "react";

export function validateCoupon(formData) {
  let errors = {};

  if (!formData.code) {
    errors.code = "El código es requerido";
  }
  if (!formData.discountValue && !formData.discountPercent) {
    errors.discount = "Debes ingresar un valor de descuento o un porcentaje";
  }
  if (!formData.description) {
    errors.description = "La descripción es requerida";
  }

  return errors;
}
