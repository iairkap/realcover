"use client";
import React from "react";
import styles from "./searchBar.module.css";
import { searchBarContact } from "../../../../public/imagnes";
import Image from "next/image";

function SearchBar({ onSearch }) {
  return (
    <div className={styles.containerSearchBar}>
      <Image src={searchBarContact} alt="Search Icon" />
      <input
        type="text"
        placeholder="Buscar cliente por Nombre, Ciudad, etc."
        className={styles.searchInput}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
