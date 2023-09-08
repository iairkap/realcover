"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import styles from "./backup.module.css";
function ModalDireccion({
  userFormData,
  setUserFormData,
  isShippingModalOpen,
  setIsShippingModalOpen,
  userData,
  isAuthenticated,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    setIsOpen(false);
  };

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
      setIsOpen(true); // Añade esta línea
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

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 200);
  };

  const dropdownRef = useRef(null);

  const options = suggestions.map((s) => ({
    value: s.place_id,
    label: s.description,
  }));

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    console.log("Attempting to update user with data:", userFormData);

    try {
      const response = await fetch(`/api/user/fafa`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
        credentials: "include", // Include cookies in the request
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("User updated successfully:", responseData);
        setUserFormData({
          address: responseData.address || "",
          city: responseData.city || "",
          localidad: responseData.localidad || "",
          postalCode: responseData.postalCode || "",
          phone: responseData.phone || "",
          shopName: responseData.shopName || "",
          cuit: responseData.cuit || "",
        });
        setIsUpdateSuccess(true);
        setIsShippingModalOpen(false);
      } else {
        console.error("Error updating user:", responseData.message);
        setIsUpdateSuccess(false);
      }
    } catch (error) {
      console.error("Unexpected error during update:", error);
      setIsUpdateSuccess(false);
    }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      alert("Datos actualizados con éxito!");
      setIsUpdateSuccess(false); // Reinicia el estado tras mostrar el mensaje
    }
  }, [isUpdateSuccess]);

  const handleOpenShippingModal = () => {
    setIsShippingModalOpen(true);
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
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            background: "#232323",
            overflow: "auto",
            position: "relative",
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
            width: "30rem",
            transform: "none",
            padding: "2rem",
            boxSizing: "border-box",
          },
        }}
      >
        <form onSubmit={handleUpdateUserInfo}>
          <div className={styles.textContainerModal}>
            <h1 className={styles.tituloModelo}>Datos de Envio</h1>
            <br />
            <div className={styles.inputsContainer}>
              <div className={styles.inputModal}>
                <div className={styles.inputWrapper}>
                  <label htmlFor="address" className={styles.modalText}>
                    Direccion:
                  </label>
                  <input
                    type="text"
                    id="address"
                    onChange={(e) => handleAddressChange(e.target.value)}
                    value={userFormData.address}
                    onBlur={handleInputBlur} // Añade esta línea
                    className={styles.input}
                  />
                  {isOpen && suggestions.length > 0 && (
                    <div className={styles.dropdown} ref={dropdownRef}>
                      <button onClick={closeDropdown} className={styles.button}>
                        x
                      </button>
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
              </div>
              {error && <div className={styles.errorMsg}>{error}</div>}
              <div className={styles.restodelModal}>
                <div className={styles.inputModal}>
                  <label htmlFor="city" className={styles.modalText}>
                    Ciudad:
                  </label>
                  <input
                    type="text"
                    id="city"
                    onChange={(e) => updateUserField("city", e.target.value)}
                    value={userFormData.city}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputModal}>
                  <label htmlFor="localidad" className={styles.modalText}>
                    Localidad:
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="localidad"
                    onChange={(e) =>
                      updateUserField("localidad", e.target.value)
                    }
                    value={userFormData.localidad}
                  />
                </div>
                <div className={styles.inputModal}>
                  <label htmlFor="postalCode" className={styles.modalText}>
                    Código Postal:
                  </label>
                  <input
                    className={styles.input}
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
                    className={styles.input}
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
                    className={styles.input}
                    type="text"
                    id="shopName"
                    onChange={(e) =>
                      updateUserField("shopName", e.target.value)
                    }
                    value={userFormData.shopName}
                  />
                </div>
                <div className={styles.inputModal}>
                  <label htmlFor="cuit" className={styles.modalText}>
                    CUIT:
                  </label>
                  <input
                    className={styles.input}
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
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ModalDireccion;
