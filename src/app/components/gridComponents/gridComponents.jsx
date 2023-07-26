import React, { useEffect, useState, useRef } from "react";
import styles from "./gridComponent.module.css";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Modal from "react-modal";
import vendidosb from "./vendidos.js";
import trapeciob from "../../../../public/trapeciob.svg";
import Link from "next/link";

export default function GridComponents(props) {
  const vendidos = vendidosb;
  const vendidosOrdenados = vendidos.sort((a, b) => a.id - b.id);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    hover: [],
    imagenesModal: [],
    descriptionModal: "",
  });
  const [currentImage, setCurrentImage] = useState("");
  const [hoverImgIndices, setHoverImgIndices] = useState(vendidos.map(() => 0));
  const imgIntervals = useRef(vendidos.map(() => null));
  const handleItemClick = (item) => {
    setModalContent(item);
    setCurrentImage(item.imagenesModal[0]);
    setModalOpen(true);
    setHoverImgIndices(vendidos.map(() => 0));
  };
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
  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>Nuestro Catalogo</h1>
      <div className={styles.background}>
        {vendidosOrdenados.map((item, index) => {
          const controls = useAnimation();
          const { ref, inView } = useInView({ threshold: 0.1 });

          useEffect(() => {
            if (inView) {
              controls.start({ scale: 1, transition: { duration: 0.9 } });
            }
            if (!inView) {
              controls.start({ scale: 0.5, transition: { duration: 1.5 } });
            }
          }, [controls, inView]);

          const isDark =
            Math.floor(index / 4) % 2 === 0 ? index % 2 === 0 : index % 2 === 1;

          return (
            <div
              key={item.id}
              className={`${styles.gridItem} ${
                isDark ? styles.dark : styles.light
              }`}
              ref={ref}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => handleItemClick(item)}
            >
              <div className={styles.container}>
                <motion.div animate={controls}>
                  <Image
                    src={
                      item.hover ? item.hover[hoverImgIndices[index]] : item.src
                    }
                    alt={item.title}
                    className={styles.imagen}
                    width={300}
                    height={300}
                  />
                  <h1 className={styles.title}>{item.title}</h1>
                </motion.div>
              </div>
            </div>
          );
        })}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel="My Dialog"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(1px)",
              zIndex: 10000000,
            },
            content: {
              top: "50%",
              left: "50%",

              transform: "translate(25%, 15%)",
              maxWidth: "70vw",
              maxHeight: "auto",
              overflow: "auto",
            },
          }}
          className={styles.modal}
        >
          <div className={styles.modal}>
            <div className={styles.modalImages}>
              <Image
                src={currentImage}
                alt={modalContent.title}
                width={500}
                height={500}
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
                      height={150}
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
                <button className={styles.boton}>Compra por mayor</button>
              </div>{" "}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
