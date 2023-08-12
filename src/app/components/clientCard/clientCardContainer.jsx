"use client";

import { useEffect, useState } from "react";
import React from "react";
import styles from "./clientCardContainer.module.css";
import ClientCard from "./clientCard";
import SearchBar from "../searchBar/searchBar";
function ClientCardContainer(props) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const handleOrder = async (orderBy) => {
    try {
      const response = await fetch(`/api/admin/users?orderBy=${orderBy}`);
      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("There was an error fetching the clients", error);
    }
  };
  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`/api/admin/users?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("There was an error fetching the clients", error);
    }
  };

  useEffect(() => {
    handleSearch(""); // Obtener todos los clientes al cargar el componente
  }, []);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.titleHeader}>
          {users.length} Clientes Registrados
        </h4>
        <SearchBar onSearch={handleSearch} />
        <div className={styles.ordenamientoFilters}>
          <h4>Ordenar Por:</h4>
          <button className={styles.boton} onClick={() => handleOrder("name")}>
            Nombre
          </button>
          <button
            className={styles.boton}
            onClick={() => handleOrder("location")}
          >
            Locacion
          </button>
          <button
            className={styles.boton}
            onClick={() => handleOrder("orderDate")}
          >
            Fecha de pedido
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className={styles.gridContainer}>
        {currentUsers.map((user) => (
          <ClientCard key={user.id} user={user} />
        ))}
      </div>
      <div className={styles.pagination}>
        {Array(Math.ceil(users.length / itemsPerPage))
          .fill()
          .map((_, idx) => (
            <button
              key={idx}
              onClick={() => paginate(idx + 1)}
              className={
                currentPage === idx + 1
                  ? styles.currentButton
                  : styles.numberButton
              }
            >
              {idx + 1}
            </button>
          ))}
      </div>
    </div>
  );
}

export default ClientCardContainer;
