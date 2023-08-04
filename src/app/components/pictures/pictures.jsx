import React from "react";
import mochila from "../../../../public/mochila.jpeg";
import Image from "next/image";
import { logoReal } from "../../../../public/imagnes";
import landing2 from "../../../../public/landing2.jpg";
import styles from "./pictures.module.css";
import bacoground from "../../../../public/landing3.jpg";
import { motion, useViewportScroll, useTransform } from "framer-motion";

function Pictures(props) {
  return (
    <div>
      <div className={styles.firstContainer}>
        <Image
          alt="Maletin Neopren Real Cover"
          src={bacoground}
          className={styles.background2}
        ></Image>
        <motion.div
          className={styles.logoImage}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <Image src={logoReal}></Image>
          <h3 className={styles.subTitulo}>DISEÑO Y PROTECCION</h3>
          <h4 className={styles.mayorista}>VENTA MAYORISTA</h4>
        </motion.div>
      </div>
    </div>
  );
}

export default Pictures;
