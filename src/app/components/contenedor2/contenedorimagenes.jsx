import React from "react";
import Image from "next/image";
import styles from "./contenedordeimagenes.module.css";
import landing from "../../../../public/cover2.jpg";
function Contenedorimagenes(props) {
  return (
    <div>
      <Image src={landing} className={styles.background}></Image>
    </div>
  );
}

export default Contenedorimagenes;
