import React, { useEffect, useState, useRef } from "react";
import styles from "./gridComponent.module.css";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Modal from "react-modal";
import vendidosb from "./vendidos.js";
import trapeciob from "../../../../public/trapeciob.svg";
import Link from "next/link";
import GridItem from "./gridHook";
import { GlobalContext } from "../../store/layout";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function GridComponents(props) {
  const vendidos = vendidosb;
  const vendidosOrdenados = vendidos.sort((a, b) => a.id - b.id);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    hover: [],
    imagenesModal: [],
    descriptionModal: "",
    buttonLinkMenor: "",
    displayType: "",
  });
  const [currentImage, setCurrentImage] = useState("");
  const [hoverImgIndices, setHoverImgIndices] = useState(vendidos.map(() => 0));
  const imgIntervals = useRef(vendidos.map(() => null));
  const handleItemClick = (item) => {
    setModalContent(item);
    setCurrentImage(item.imagenesModal[0]);
    setModalOpen(true);
    setHoverImgIndices(vendidos.map(() => 0));
    updateDisplayType(item.displayType); // <-- Añade esta línea
  };
  const { setGlobalState } = useContext(GlobalContext);
  const router = useRouter();

  const handleMouseEnter = (index) => {
    if (isModalOpen) return;
    imgIntervals.current[index] = setInterval(() => {
      setHoverImgIndices((prevIndices) => {
        const newIndices = [...prevIndices];
        newIndices[index] =
          (newIndices[index] + 1) % vendidos[index].hover.length;
        return newIndices;
      });
    }, 120);
  };
  const handleMouseLeave = (index) => {
    clearInterval(imgIntervals.current[index]);
    imgIntervals.current[index] = null;
    setHoverImgIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = 0;
      return newIndices;
    });
  };
  const updateDisplayType = (newType) => {
    setGlobalState((prevState) => ({
      ...prevState,
      displayType: newType,
    }));
    localStorage.setItem("displayType", newType);
  };
  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>Nuestro Catalogo</h1>
      <div className={styles.background}>
        {vendidosOrdenados.map((item, index) => (
          <GridItem
            key={item.id}
            item={item}
            index={index}
            hoverImgIndices={hoverImgIndices}
            handleMouseEnter={() => handleMouseEnter(index)}
            handleMouseLeave={() => handleMouseLeave(index)}
            handleItemClick={() => handleItemClick(item)}
          />
        ))}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel="My Dialog"
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
              border: "solid",
              borderColor: "#46b02b",
              borderWidth: "1rem",
              overflow: "auto",
              position: "relative",
              top: "auto",
              left: "auto",
              right: "auto",
              width: "80vw",
              bottom: "auto",
              transform: "none",
              padding: "2rem",
              boxSizing: "border-box",
            },
          }}
          className={styles.modal}
        >
          <div className={styles.buttonClose}>
            <button
              className={styles.cerrar}
              onClick={() => setModalOpen(false)}
            >
              X
            </button>
          </div>
          <div className={styles.modal}>
            <div className={styles.modalImages}>
              <Image
                src={currentImage}
                alt={modalContent.title}
                width={500}
                className={styles.imagenModal}
              />
              <div className={styles.modalThumbnails}>
                {modalContent.imagenesModal
                  .filter((img) => img !== currentImage)
                  .map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={modalContent.title}
                      width={150}
                      onClick={() => setCurrentImage(img)}
                      className={styles.imagenModal}
                    />
                  ))}
              </div>
            </div>

            <div className={styles.textContainer}>
              <h1 className={styles.modalTitle}>{modalContent.title}</h1>
              <div
                className={styles.modalText}
                dangerouslySetInnerHTML={{
                  __html: modalContent.descriptionModal.replace(/\n/g, " "),
                }}
              ></div>
              <div className={styles.botonera}>
                {modalContent.buttonLinkMenor && (
                  <a
                    href={modalContent.buttonLinkMenor}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className={styles.boton}>Compra por menor</button>
                  </a>
                )}
                <button
                  className={styles.boton}
                  onClick={() => {
                    setGlobalState((prevState) => ({
                      ...prevState,
                      displayType: modalContent.displayType,
                    }));
                    router.push("/store/fundas");
                  }}
                >
                  Compra por mayor
                </button>
              </div>{" "}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
