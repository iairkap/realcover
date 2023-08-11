import React from "react";

function ModalPedidos({ details, onClose }) {
  return (
    <div className={styles.modalContainer}>
      {/* Renderizar los detalles de la orden aquí */}
      {details.map((detail) => (
        <div key={detail.products.id}>
          <img src={detail.products.picture} alt={detail.products.name} />
          {/* ... otros datos del producto ... */}
        </div>
      ))}

      {/* Botón para cerrar el modal */}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}

export default ModalPedidos;
