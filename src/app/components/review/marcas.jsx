"use client";
import React, { useRef } from "react";
import { useEffect } from "react";

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
        width: "fit-content", // Usamos el ancho pasado como prop o "fit-content" como valor por defecto
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
          scrollbarWidth: "none", // Para Firefox
          msOverflowStyle: "none", // Para Internet Explorer y Edge
        }}
      >
        {logos.map((logo, index) => (
          <img
            src={`/quienestrabajaron/${logo}`}
            alt={`Logo ${index + 1}`}
            style={{
              margin: "0 4.5px",
              height: "100%",
            }}
            key={index}
          />
        ))}
      </div>

      <style jsx global>{`
        /* Oculta la barra de desplazamiento para Chrome, Safari y Opera */
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Marcas;
