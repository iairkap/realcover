"use client";

import React from "react";
import styles from "./landing.module.css";
import mochila from "../../../public/mochila.jpeg";
import Image from "next/image";
import landing2 from "../../../public/landing2.jpg";
import NavBar from "../components/navBar/navBar";
import { logoReal } from "../../../public/imagnes";
import Categorias from "../components/categorias/categorias";
import Contenedorimagenes from "../components/contenedor2/contenedorimagenes";
import Elegir from "../components/elegir/elegir";
import Criticas from "../components/criticas/criticas";
function Landing(props) {
  return (
    <div className={styles.backgroundColor}>
      <div className={styles.navBar}>
        <NavBar />
      </div>
      <div className={styles.firstContainer}>
        <Image
          alt="Mochila Neoprene Real Cover"
          src={mochila}
          className={styles.background1}
        ></Image>
        <Image
          alt="Maletin Neopren Real Cover"
          src={landing2}
          className={styles.background2}
        ></Image>
        <div className={styles.logoImage}>
          <Image src={logoReal}></Image>
          <h3 className={styles.subTitulo}>DISEÑO Y PROTECCION</h3>

          <h4 className={styles.mayorista}>VENTA MAYORISTA</h4>
        </div>
      </div>
      <Categorias />
      <div>
        <Contenedorimagenes />
      </div>
      <div>
        <Elegir />
      </div>
      <div>
        <Criticas />
      </div>
    </div>
  );
}

export default Landing;

/* "use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./styles.css";
import styles from "./styles.css";

export default () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 9000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <div ref={sliderRef} className="keen-slider" style={{ height: "76vh" }}>
        <div className={styles.contenedor}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/Untitled-1.jpg?alt=media&token=854e796e-982a-44d8-b7bb-785695bf998d"
            alt="foto 1"
          />
        </div>
        <div className="keen-slider__slide number-slide2">
          <img
            src="http://realcover.com.ar/assets/images/4-2000x1335.jpg"
            alt="foto 2"
          />
        </div>
        <div className="keen-slider__slide number-slide3">
          <img
            src="http://realcover.com.ar/assets/images/dsc-8842-2000x1335-23-2000x1335.jpg"
            alt="foto 3"
          />
        </div>
        <div className="keen-slider__slide number-slide4">4</div>
        <div className="keen-slider__slide number-slide5">5</div>
        <div className="keen-slider__slide number-slide6">6</div>
      </div>
    </>
  );
};
 */
