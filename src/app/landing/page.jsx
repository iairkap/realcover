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

function Landing(props) {
  return (
    <div className={styles.backgroundColor}>
      <div className={styles.navBar}>
        <NavBar />
      </div>
      <Pictures />
      {/*       <Categorias />
       */}
      <div>
        <Elegir />
      </div>
      <GridComponents />{" "}
      <div>
        <Contenedorimagenes />
      </div>
      <div>
        {/*         <Criticas />
         */}{" "}
        <Contactanos />
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
