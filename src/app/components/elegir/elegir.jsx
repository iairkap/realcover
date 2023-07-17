import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./elegir.module.css";

const WheelControls = (slider) => {
  let touchTimeout;
  let position;
  let wheelActive;

  function dispatch(e, name) {
    position.x -= e.deltaX;
    position.y -= e.deltaY;
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    );
  }

  function wheelStart(e) {
    position = {
      x: e.pageX,
      y: e.pageY,
    };
    dispatch(e, "ksDragStart");
  }

  function wheel(e) {
    dispatch(e, "ksDrag");
  }

  function wheelEnd(e) {
    dispatch(e, "ksDragEnd");
  }

  function eventWheel(e) {
    e.preventDefault();
    if (!wheelActive) {
      wheelStart(e);
      wheelActive = true;
    }
    wheel(e);
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      wheelActive = false;
      wheelEnd(e);
    }, 50);
  }

  slider.on("created", () => {
    slider.container.addEventListener("wheel", eventWheel, {
      passive: false,
    });
  });
};

function Elegir(props) {
  const [sliderRef, slider] = useKeenSlider(
    {
      loop: false,
      rubberband: false,
      vertical: true,
      initial: 0,
      slideChanged(s) {
        //  setIndex(s.details().relativeSlide);
      },
    },
    [WheelControls]
  );

  const [index, setIndex] = React.useState(0);

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
    {
      numeracion: "3",
      pregunta: "Garantia",
      parrafo:
        "Nuestros productos están garantizados contra cualquier falla del material o fabricación.",
    },
  ];

  return (
    <div ref={sliderRef} className="keen-slider" style={{ height: 400 }}>
      {data.map((item, idx) => (
        <div
          key={idx}
          className="keen-slider__slide"
          style={{
            backgroundColor: "#232323",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={styles.contenedor}>
            <h1 className={styles.numeracion}>{item.numeracion}</h1>
            <div className={styles.texto}>
              <h2 className={styles.pregunta}>{item.pregunta}</h2>
              <h2 className={styles.parrafo}>{item.parrafo}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Elegir;

/* import React, { useState, useEffect, useRef } from "react";
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
 */
