import React from "react";
import Image from "next/image";
import styles from "./contenedordeimagenes.module.css";
function Contenedorimagenes(props) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.contenedor}>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/backgrounds%2FDSC_8842.jpeg?alt=media&token=a2de74f9-907d-406f-a16c-87fc50827cb9"
          sizing="fill"
          fit="cover"
          width={688}
          height={592}
          className={styles.image1}
        ></Image>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/backgrounds%2FDSC_8854.jpg?alt=media&token=6f7665cc-416c-48b7-b0ac-ea8ca6045d3e"
          sizing="fill"
          fit="cover"
          width={500}
          height={500}
          className={styles.image2}
        ></Image>
      </div>
    </div>
  );
}

export default Contenedorimagenes;
