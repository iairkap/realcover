import React, { useState } from "react";
import styles from "./CardsContainer.module.css";
import Card from "../card/card";
import { aprevious, nextArrow } from "../../../../public/imagnes";
import Image from "next/image";
import Loading from "../loader/loading";
import { useRouter } from "next/navigation"; // Cambiado de "next/navigation" a "next/router"
import { useEffect } from "react";
import { GlobalContext } from "../../store/layout";
import { useContext } from "react";

function CardsContainer({}) {
  const {
    covers,
    maletines,
    fullColor,
    cubrevalijas,
    isLoading,
    tablets,
    conBolsillo,
    portafolios,
    globalState,
    setGlobalState,
    setPage,
    page,
  } = useContext(GlobalContext);
  const displayType = globalState.displayType;

  const itemsPerPage = 12;
  const maxPageButtons = 5;

  useEffect(() => {
    const savedDisplayType = localStorage.getItem("displayType");

    if (savedDisplayType) {
      setGlobalState((prevState) => ({
        ...prevState,
        displayType: savedDisplayType,
      }));
    } else {
      setGlobalState((prevState) => ({
        ...prevState,
        displayType: "NEOPRENE_COVER",
      }));
    }
    setPage(0); // Restablece la página a 0 cuando el tipo de visualización cambia
  }, [displayType]); // Agrega displayType como una dependencia aquí
  if (isLoading) {
    return <div></div>;
  }

  console.log("Current displayType:", displayType); // Añade esta línea para verificar el valor de displayType

  let items;
  switch (displayType) {
    case "NEOPRENE_COVER":
      items = covers.map((item) => ({ ...item, type: "NEOPRENE_COVER" }));
      const index178 = items.findIndex((item) => item.id === 178);
      if (index178 !== -1) {
        const item178 = items[index178];
        items.splice(index178, 1);
        items.unshift(item178);
      }
      break;
    case "MALETINES":
      items = maletines.map((item) => ({ ...item, type: "MALETINES" }));
      break;
    case "TABLET_COVER":
      items = tablets.map((item) => ({ ...item, type: "TABLET_COVER" }));
      break;
    case "MALETINES_FULL_COLOR":
      items = fullColor.map((item) => ({
        ...item,
        type: "MALETINES_FULL_COLOR",
      }));
      break;
    case "CUBRE_VALIJAS":
      items = cubrevalijas.map((item) => ({ ...item, type: "CUBRE_VALIJAS" }));
      break;
    case "CON_BOLSILLO":
      items = conBolsillo.map((item) => ({ ...item, type: "CON_BOLSILLO" }));
      break;
    case "PORTAFOLIOS":
      items = portafolios.map((item) => ({ ...item, type: "PORTAFOLIOS" }));
      break;
    default:
      items = [];
  }
  console.log("Items before sorting:", items); // Verifica los items antes de ser ordenados

  const sortedItems = [...items].sort((a, b) => {
    const numA = parseInt(
      (a.imageName
        ? a.imageName.replace(/(Fundas%2F|Valijas%2FV20)/, "")
        : ""
      ).match(/\d+/),
      10
    );
    const numB = parseInt(
      (b.imageName
        ? b.imageName.replace(/(Fundas%2F|Valijas%2FV20)/, "")
        : ""
      ).match(/\d+/),
      10
    );
    return numA - numB;
  });

  console.log("Sorted items:", sortedItems); // Verifica los items después de ser ordenados

  const pagedItems = sortedItems.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );
  console.log("Paged items:", pagedItems); // Verifica los items que deberían mostrarse en la página actual

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startPage = Math.max(
    0,
    page - Math.floor(maxPageButtons / 2) // Cambiado de globalState.page a page
  );
  const endPage = Math.min(totalPages, startPage + maxPageButtons);

  const pageNumbers = [];
  for (let i = startPage; i < endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.generalContainer}>
      <div className={styles.botoneraB}>
        <select
          className={styles.mobileSelector}
          value={displayType}
          onChange={(e) => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: e.target.value,
            }));
            setPage(0);
          }}
        >
          <option value="NEOPRENE_COVER">FUNDAS NEOPRENE</option>
          <option value="MALETINES">MALETINES</option>
          <option value="MALETINES_FULL_COLOR">FULL COLOR</option>
          <option value="TABLET_COVER">FUNDAS RIGIDAS</option>
          <option value="CUBRE_VALIJAS">CUBRE VALIJAS</option>
          <option value="CON_BOLSILLO">FUNDSA CON BOLSILLO</option>
          <option value="PORTAFOLIOS">PORTAFOLIOS</option>
        </select>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "NEOPRENE_COVER",
            }));
            setPage(0);
          }}
          className={`${styles.botonOpciones} ${
            displayType === "NEOPRENE_COVER" ? styles.botonOpcionesActivo : ""
          }`}
        >
          FUNDAS NEOPRENE
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "MALETINES",
            }));
            setPage(0);
          }}
          className={`${styles.botonOpciones} ${
            displayType === "MALETINES" ? styles.botonOpcionesActivo : ""
          }`}
        >
          MALETINES
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "MALETINES_FULL_COLOR",
            }));
          }}
          className={`${styles.botonOpciones} ${
            displayType === "MALETINES_FULL_COLOR"
              ? styles.botonOpcionesActivo
              : ""
          }`}
        >
          FULL COLOR
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "CON_BOLSILLO",
            }));
          }}
          className={`${styles.botonOpciones} ${
            displayType === "CON_BOLSILLO" ? styles.botonOpcionesActivo : ""
          }`}
        >
          FUNDAS CON BOLSILLO
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "PORTAFOLIOS",
            }));
          }}
          className={`${styles.botonOpciones} ${
            displayType === "PORTAFOLIOS" ? styles.botonOpcionesActivo : ""
          }`}
        >
          PORTAFOLIOS
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "TABLET_COVER",
            }));
          }}
          className={`${styles.botonOpciones} ${
            displayType === "TABLET_COVER" ? styles.botonOpcionesActivo : ""
          }`}
        >
          FUNDAS RIGIDAS{" "}
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "CUBRE_VALIJAS",
            }));
          }}
          className={`${styles.botonOpciones} ${
            displayType === "CUBRE_VALIJAS" ? styles.botonOpcionesActivo : ""
          }`}
        >
          CUBRE VALIJAS
        </button>
      </div>

      <div className={styles.cardsContainer} key={displayType}>
        {pagedItems.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
      <div className={styles.botonera}>
        {page > 0 && (
          <button
            onClick={() => setPage(page - 1)}
            className={styles.paginationButton}
          >
            <Image src={aprevious} alt="image" className={styles.previous} />
          </button>
        )}
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`${styles.numberButton} ${
              page === num ? styles.currentButton : ""
            }`}
          >
            {num + 1}
          </button>
        ))}
        {page < totalPages - 1 && (
          <button
            onClick={() => setPage(page + 1)}
            className={styles.paginationButton}
          >
            <Image src={nextArrow} alt="image" className={styles.previous} />
          </button>
        )}
      </div>
    </div>
  );
}

export default CardsContainer;
