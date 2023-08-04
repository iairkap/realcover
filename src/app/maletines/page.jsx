"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/card/card"; // Asegúrate de tener un componente Card

const PER_PAGE = 12;

function Page() {
  const [maletines, setMaletines] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch("/api/maletines") // Reemplace esto con la URL de tu API
      .then((response) => response.json())
      .then((data) => setMaletines(data));
  }, []);

  const handleNextPage = () => setCurrentPage((page) => page + 1);
  const handlePrevPage = () => setCurrentPage((page) => page - 1);

  const startIndex = currentPage * PER_PAGE;
  const selectedMaletines = maletines.slice(startIndex, startIndex + PER_PAGE);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
        }}
      >
        {selectedMaletines.map((maletin) => (
          <Card key={maletin.id} maletin={maletin} />
        ))}
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Página anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={startIndex + PER_PAGE >= maletines.length}
        >
          Página siguiente
        </button>
      </div>
    </div>
  );
}

export default Page;
