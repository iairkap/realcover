import React, { useState, useEffect, useRef } from "react";
import styles from "./elegir.module.css";

function Elegir(props) {
  const [index, setIndex] = useState(0);

  // Datos que cambiarán con el scroll
  const data = [
    {
      numeracion: "1",
      pregunta: "Calidad",
      parrafo:
        "Usamos los mejores materiales del mercado que otorgan a nuestros productos durabilidad y resistencia. Aplicamos controles de calidad para asegurar una excelente terminación.",
    },
    {
      numeracion: "2",
      pregunta: "Diseño",
      parrafo:
        "La amplia variedad de diseños hace casi imposible no encontrar el indicado para las necesidades de sus clientes. También realizamos pedidos especiales con diseños exclusivos. Esto incluye el desarrollo de productos de merchandising y regalos empresariales.",
    },
  ];

  const ref = useRef(null);

  // Escucha al evento de scroll
  useEffect(() => {
    const onScroll = () => {
      const elementPos = ref.current
        ? ref.current.getBoundingClientRect().top
        : 0;
      const scrollPos = window.innerHeight - elementPos;
      setIndex(scrollPos > 282 ? 1 : 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.generalContenedor} ref={ref}>
      <div className={styles.contenedor}>
        <h1 className={styles.numeracion}>{data[index].numeracion}</h1>
        <div className={styles.texto}>
          <h2 className={styles.pregunta}>{data[index].pregunta}</h2>
          <h2 className={styles.parrafo}>{data[index].parrafo}</h2>
        </div>
      </div>
    </div>
  );
}

export default Elegir;
