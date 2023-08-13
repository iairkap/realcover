import React, { useState } from "react";
import Modal from "react-modal";
import { validateCoupon } from "./validations";

function CreateNewCoupon({ isOpen, onClose, createNewCupon }) {
  const [formData, setFormData] = useState({
    code: "",
    discountValue: "",
    discountPercent: "",
    description: "",
    useOnce: false,
    expiryDate: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateCoupon(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await createNewCupon(formData);
    setFormData({
      code: "",
      discountValue: "",
      discountPercent: "",
      description: "",
      useOnce: false,
      expiryDate: "",
    });
    setMessage("Cupón realizado con éxito!");
    setTimeout(() => setMessage(""), 3000); // Resetea el mensaje después de 3 segundos
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Crear nuevo Cupon"
    >
      <h2>Crear nuevo Cupon</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Código"
        />
        {errors.code && <p className="error">{errors.code}</p>}

        <input
          name="discountValue"
          value={formData.discountValue}
          onChange={handleChange}
          placeholder="Valor de descuento"
        />
        {errors.discount && <p className="error">{errors.discount}</p>}
        <input
          name="discountPercent"
          value={formData.discountPercent}
          onChange={handleChange}
          placeholder="Porcentaje de descuento"
        />
        {errors.discount && <p className="error">{errors.discount}</p>}
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <input
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          placeholder="Fecha de vencimiento (yyyy-mm-dd)"
          type="date"
        />
        {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
        <label>
          <input
            type="checkbox"
            name="useOnce"
            checked={formData.useOnce}
            onChange={() =>
              setFormData((prev) => ({ ...prev, useOnce: !prev.useOnce }))
            }
          />
          Usar una vez
        </label>
        {message && <p className="success">{message}</p>}
        <p className="error">{errors.message}</p>
        <button type="submit">Crear</button>
      </form>
      <button onClick={onClose}>Cerrar</button>
    </Modal>
  );
}

export default CreateNewCoupon;
