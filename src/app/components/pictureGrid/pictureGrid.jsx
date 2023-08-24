import React from "react";
import styles from "./pictureGrid.module.css";
import { pictures } from "../../../../public/gridpicture/gridPicture";
import Image from "next/image";

const PhotoGrid = () => {
  return (
    <div className={styles.photoGrid}>
      {pictures.map((photoObj, index) => {
        let classNames = `${styles.photoCell}`;
        if (index === 0) classNames += ` ${styles.photo1}`;
        if (index === 2) classNames += ` ${styles.photo3}`;
        if (index === 3) classNames += ` ${styles.photo4}`;
        if (index === 4) classNames += ` ${styles.photo5}`;
        return (
          <div key={photoObj.id} className={classNames}>
            <Image src={photoObj.picture} alt={`Foto ${index + 1}`} />
          </div>
        );
      })}
    </div>
  );
};

export default PhotoGrid;
