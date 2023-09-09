import { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./gridComponent.module.css";

function GridItem({
  item,
  index,
  hoverImgIndices,
  handleMouseEnter,
  handleMouseLeave,
  handleItemClick,
}) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1, transition: { duration: 0.9 } });
    } else {
      controls.start({ scale: 0.5, transition: { duration: 1.5 } });
    }
  }, [controls, inView]);

  const isDark =
    Math.floor(index / 4) % 2 === 0 ? index % 2 === 0 : index % 2 === 1;

  return (
    <div
      className={`${styles.gridItem} ${isDark ? styles.dark : styles.light}`}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleItemClick}
    >
      <div className={styles.container}>
        <motion.div animate={controls}>
          <div className={styles.containerd}>
            <Image
              src={item.hover ? item.hover[hoverImgIndices[index]] : item.src}
              alt={item.title}
              className={styles.imagen}
              width={300}
              height={300}
            />
            <button className={styles.title}>{item.title}</button>
          </div>
        </motion.div>{" "}
      </div>
    </div>
  );
}

export default GridItem;
