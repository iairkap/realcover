"use client";

import React from "react";
import styles from "./landing.module.css";
import Image from "next/image";

import NavBar from "../components/navBar/navBar";
import Categorias from "../components/categorias/categorias";
import Contenedorimagenes from "../components/contenedor2/contenedorimagenes";
import Elegir from "../components/elegir/elegir";
import Criticas from "../components/criticas/criticas";
import Contactanos from "../components/contactanos/contactanos";
import Pictures from "../components/pictures/pictures";
import GridComponents from "../components/gridComponents/gridComponents";
import Review from "../components/review/review";

function Landing(props) {
  return (
    <div className={styles.backgroundColor}>
      <div className={styles.navBar}>
        <NavBar />
      </div>
      <Pictures />
      {/*       <Categorias />
       */}
      <div></div>
      <GridComponents />
      <Review />
      <div></div>
      <div className={styles.contactanos}>
        <Contactanos />
      </div>
    </div>
  );
}

export default Landing;
