"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import styles from "./pedidoscard.module.css";
function ModalDireccion({
  userFormData,
  setUserFormData,
  isShippingModalOpen,
  handleUpdateUserInfo,
  setIsShippingModalOpen,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const updateUserField = (field, value) => {
    setUserFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddressChange = async (value) => {
    updateUserField("address", value);

    try {
      const response = await axios.get("/api/googledirection", {
        params: {
          address: value,
        },
      });

      setSuggestions(response.data);
      setError(null);
    } catch (err) {
      setError(
        "Hubo un problema al obtener las sugerencias de dirección. Por favor, intenta de nuevo."
      );
    }
  };

  const handleSuggestionClick = async (placeId) => {
    try {
      const response = await axios.get("/api/googledirection", {
        params: {
          placeId: placeId,
        },
      });

      const addressComponents = response.data;

      let street = "";
      let route = "";
      let locality = "";
      let administrative_area_level_1 = "";
      let postal_code = "";

      for (const component of addressComponents) {
        if (component) {
          if (component.street_number) street = component.street_number;
          if (component.route) route = component.route;
          if (component.locality) locality = component.locality;
          if (component.administrative_area_level_1)
            administrative_area_level_1 = component.administrative_area_level_1;
          if (component.postal_code) postal_code = component.postal_code;
        }
      }

      updateUserField("address", `${street} ${route}`.trim()); // Combinando el número de la calle y la ruta
      updateUserField("localidad", locality);
      updateUserField("postalCode", postal_code);
      updateUserField("city", administrative_area_level_1);

      setSuggestions([]);
      setError(null);
    } catch (err) {
      setError(
        "Hubo un problema al obtener detalles de la dirección. Por favor, intenta de nuevo."
      );
    }
  };

  return (
    <div>
      <Modal
        isOpen={isShippingModalOpen}
        onRequestClose={() => setIsShippingModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(1px)",
            zIndex: 10000000,
            display: "flex",
            justifyContent: "center", // Centrar contenido horizontalmente
            alignItems: "center", // Centrar contenido verticalmente
          },
          content: {
            background: "#232323",

            overflow: "auto",
            position: "relative", // Esto es importante para que el modal se posicione en el centro
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
            transform: "none", // Remover la transformación anterior para centrar
            padding: "1rem",
            boxSizing: "border-box", // Asegurar que el padding no afecte el tamaño total
          },
        }}
      >
        <form onSubmit={handleUpdateUserInfo}>
          <div className={styles.textContainerModal}>
            <h1 className={styles.tituloModelo}>Datos de Envio</h1>
            <br />
            <div className={styles.inputsContainer}>
              <div className={styles.inputModal}>
                <label htmlFor="address" className={styles.modalText}>
                  Direccion:
                </label>
                <input
                  type="text"
                  id="address"
                  onChange={(e) => handleAddressChange(e.target.value)}
                  value={userFormData.address}
                />
                {suggestions.length > 0 && (
                  <div className={styles.dropdown}>
                    {suggestions.map((s) => (
                      <div
                        key={s.place_id}
                        className={styles.dropdownItem}
                        onClick={() => handleSuggestionClick(s.place_id)}
                      >
                        {s.description}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {error && <div className={styles.errorMsg}>{error}</div>}

              <div className={styles.inputModal}>
                <label htmlFor="city" className={styles.modalText}>
                  Ciudad:
                </label>
                <input
                  type="text"
                  id="city"
                  onChange={(e) => updateUserField("city", e.target.value)}
                  value={userFormData.city}
                />
              </div>
              <div className={styles.inputModal}>
                <label htmlFor="localidad" className={styles.modalText}>
                  Localidad:
                </label>
                <input
                  type="text"
                  id="localidad"
                  onChange={(e) => updateUserField("localidad", e.target.value)}
                  value={userFormData.localidad}
                />
              </div>
              <div className={styles.inputModal}>
                <label htmlFor="postalCode" className={styles.modalText}>
                  Código Postal:
                </label>
                <input
                  type="text"
                  id="postalCode"
                  onChange={(e) =>
                    updateUserField("postalCode", e.target.value)
                  }
                  value={userFormData.postalCode}
                />
              </div>
              <div className={styles.inputModal}>
                <label htmlFor="phone" className={styles.modalText}>
                  Teléfono:
                </label>
                <input
                  type="tel"
                  id="phone"
                  onChange={(e) => updateUserField("phone", e.target.value)}
                  value={userFormData.phone}
                />
              </div>

              <div className={styles.inputModal}>
                <label htmlFor="shopName" className={styles.modalText}>
                  Nombre de la Tienda:
                </label>
                <input
                  type="text"
                  id="shopName"
                  onChange={(e) => updateUserField("shopName", e.target.value)}
                  value={userFormData.shopName}
                />
              </div>
              <div className={styles.inputModal}>
                <label htmlFor="cuit" className={styles.modalText}>
                  CUIT:
                </label>
                <input
                  type="number"
                  id="cuit"
                  onChange={(e) => updateUserField("cuit", e.target.value)}
                  value={userFormData.cuit}
                />
              </div>
              <br />
            </div>
            <button type="submit" className={styles.botonConfirmacion}>
              Confirmar datos de Envio
            </button>
          </div>
        </form>
      </Modal>
      ;
    </div>
  );
}

export default ModalDireccion;
