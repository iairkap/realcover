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
function CardsContainer({
  covers,
  maletines,
  fullColor,
  cubrevalijas,
  isLoading,
  tablets,
  conBolsillo,
  portafolios,
}) {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [page, setPage] = useState(0);
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
    }
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  let items;
  switch (displayType) {
    case "covers":
      items = covers.map((item) => ({ ...item, type: "neopreneCover" }));
      const index178 = items.findIndex((item) => item.id === 178);
      if (index178 !== -1) {
        const item178 = items[index178];
        items.splice(index178, 1);
        items.unshift(item178);
      }
      break;
    case "maletines":
      items = maletines.map((item) => ({ ...item, type: "maletines" }));
      break;
    case "tablets":
      items = tablets.map((item) => ({ ...item, type: "tablets" }));
      break;
    case "fullColor":
      items = fullColor.map((item) => ({
        ...item,
        type: "maletinesFUllColor",
      }));
      break;
    case "cubrevalijas":
      items = cubrevalijas.map((item) => ({ ...item, type: "cubrevalijas" }));
      break;
    case "conBolsillo":
      items = conBolsillo.map((item) => ({ ...item, type: "conBolsillo" }));
      break;
    case "portafolios":
      items = portafolios.map((item) => ({ ...item, type: "portafolios" }));
      break;
    default:
      items = [];
  }

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

  const pagedItems = sortedItems.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startPage = Math.max(0, page - Math.floor(maxPageButtons / 2));
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
          <option value="covers">FUNDAS NEOPRENE</option>
          <option value="maletines">MALETINES</option>
          <option value="fullColor">FULL COLOR</option>
          <option value="tablets">FUNDAS RIGIDAS</option>
          <option value="cubrevalijas">CUBRE VALIJAS</option>
          <option value="conBolsillo">FUNDSA CON BOLSILLO</option>
          <option value="portafolios">PORTAFOLIOS</option>
        </select>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "covers",
            }));
            setPage(0);
          }}
          className={`${styles.botonOpciones} ${
            displayType === "covers" ? styles.botonOpcionesActivo : ""
          }`}
        >
          FUNDAS NEOPRENE
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "maletines",
            }));
            setPage(0);
          }}
          className={`${styles.botonOpciones} ${
            displayType === "maletines" ? styles.botonOpcionesActivo : ""
          }`}
        >
          MALETINES
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "fullColor",
            }));
          }}
          className={`${styles.botonOpciones} ${
            displayType === "fullColor" ? styles.botonOpcionesActivo : ""
          }`}
        >
          FULL COLOR
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "conBolsillo",
            }));
          }}
          className={`${styles.botonOpciones} ${
            displayType === "conBolsillo" ? styles.botonOpcionesActivo : ""
          }`}
        >
          FUNDAS CON BOLSILLO
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "portafolios",
            }));
          }}
          className={`${styles.botonOpciones} ${
            displayType === "portafolios" ? styles.botonOpcionesActivo : ""
          }`}
        >
          PORTAFOLIOS
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "tablets",
            }));
          }}
          className={`${styles.botonOpciones} ${
            displayType === "tablets" ? styles.botonOpcionesActivo : ""
          }`}
        >
          FUNDAS RIGIDAS{" "}
        </button>
        <button
          onClick={() => {
            setGlobalState((prevState) => ({
              ...prevState,
              displayType: "cubrevalijas",
            }));
          }}
          className={`${styles.botonOpciones} ${
            displayType === "cubrevalijas" ? styles.botonOpcionesActivo : ""
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
