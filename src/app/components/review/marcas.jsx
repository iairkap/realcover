"use client";
import React, { useRef } from "react";
import { useEffect } from "react";
import styles from "./cardContainer.module.css";

function Marcas() {
  const logos = [
    "amsel.png",
    "fibertel.png",
    "fluxit 1.png",
    "globalLocic.png",
    "google.png",
    "larroca 1.png",
    "MEDTRONIC.png",
    "ministeriodeseguridad 1.png",
    "msuenergy.png",
    "oia 1.png",
    "sebigus.png",
    "remax.png",
    "techint 1.png",
    "amsel.png",
    "1.png",
    "fluxit 1.png",
    "globalLocic.png",
    "google.png",
    "larroca 1.png",
    "MEDTRONIC.png",
    "ministeriodeseguridad 1.png",
    "msuenergy.png",
    "oia 1.png",
    "sebigus.png",
    "remax.png",

    "techint 1.png",
    "amsel.png",
    "fibertel.png",
    "fluxit 1.png",
    "globalLocic.png",
    "google.png",
    "larroca 1.png",
    "MEDTRONIC.png",
    "ministeriodeseguridad 1.png",
    "msuenergy.png",
    "oia 1.png",
    "sebigus.png",
    "remax.png",

    "techint 1.png",
    "amsel.png",
    "fibertel.png",
    "fluxit 1.png",
    "globalLocic.png",
    "google.png",
    "larroca 1.png",
    "MEDTRONIC.png",
    "ministeriodeseguridad 1.png",
    "msuenergy.png",
    "oia 1.png",
    "sebigus.png",
    "remax.png",

    "techint 1.png",
    "amsel.png",
    "fibertel.png",
    "fluxit 1.png",
    "globalLocic.png",
    "google.png",
    "larroca 1.png",
    "MEDTRONIC.png",
    "ministeriodeseguridad 1.png",
    "msuenergy.png",
    "oia 1.png",
    "sebigus.png",
    "remax.png",

    "techint 1.png",
    "amsel.png",
    "fibertel.png",
    "fluxit 1.png",
    "globalLocic.png",
    "google.png",
    "larroca 1.png",
    "MEDTRONIC.png",
    "ministeriodeseguridad 1.png",
    "msuenergy.png",
    "oia 1.png",
    "sebigus.png",
    "remax.png",

    "techint 1.png",
    "amsel.png",
    "fibertel.png",
    "fluxit 1.png",
    "globalLocic.png",
    "google.png",
    "larroca 1.png",
    "MEDTRONIC.png",
    "ministeriodeseguridad 1.png",
    "msuenergy.png",
    "oia 1.png",
    "sebigus.png",
    "remax.png",

    "techint 1.png",
    "amsel.png",
    "fibertel.png",
    "fluxit 1.png",
    "globalLocic.png",
    "google.png",
    "larroca 1.png",
    "MEDTRONIC.png",
    "ministeriodeseguridad 1.png",
    "msuenergy.png",
    "oia 1.png",
    "sebigus.png",
    "remax.png",

    "techint 1.png",
    "amsel.png",
    "fibertel.png",
    "fluxit 1.png",
    "globalLocic.png",
    "google.png",
    "larroca 1.png",
    "MEDTRONIC.png",
    "ministeriodeseguridad 1.png",
    "msuenergy.png",
    "oia 1.png",
    "sebigus.png",
    "remax.png",

    "techint 1.png",
  ];
  const scrollContainer = useRef(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -180, behavior: "smooth" }); // Aumentado el valor de desplazamiento
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 180, behavior: "smooth" }); // Aumentado el valor de desplazamiento
    }
  };

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollContainer.current) {
        const container = scrollContainer.current;
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth
        ) {
          // Si llegas al final, reinicia la posición
          container.scrollLeft = 0;
        } else {
          // Desplázate lentamente a la derecha
          container.scrollLeft += 0.5;
        }
      }
    }, 30);

    return () => clearInterval(scrollInterval); // Limpieza al desmontar el componente
  }, []);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "fit-content",
      }}
    >
      <div
        ref={scrollContainer}
        style={{
          display: "flex",
          overflowX: "scroll",
          scrollBehavior: "smooth",
          width: "100%",
          height: "55px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          margin: "0px 0px 100px 0px",
        }}
      >
        {logos.map((logo, index) => (
          <img
            src={`/quienestrabajaron/${logo}`}
            alt={`Logo ${index + 1}`}
            style={{
              height: "100%",
            }}
            key={index}
            className={styles.fafa}
          />
        ))}
      </div>

      <style jsx global>{`
        /* Oculta la barra de desplazamiento para Chrome, Safari y Opera */
        ::-webkit-scrollbar {
          display: none;
        }

        /* Estilos para .fafa, en caso de que necesites agregar estilos adicionales */
        .fafa {
        }
      `}</style>
    </div>
  );
}

export default Marcas;
