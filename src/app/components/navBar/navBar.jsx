import React, { useContext } from "react";
import styles from "./navBar.module.css";
import { logo, search, market, signIn } from "../../../../public/imagnes";
import Image from "next/image";
import Link from "next/link";
import { GlobalContext } from "../../store/layout";
import { getLayout } from "../../store/layout";
import { useRouter, usePathname } from "next/navigation"; // Importa esto

function NavBar(props) {
  const { setCheckoutVisible } = useContext(GlobalContext);
  const router = useRouter(); // Añade esto
  const pathName = usePathname();

  const handleCartOpen = () => {
    if (pathName.includes("/logIn")) {
      router.push("/store/fundas");
    } else {
      setCheckoutVisible(true);
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.trapezoid}>
        <Link href="/">
          <Image src={logo} alt="image" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.botonera}>
        <Image src={search} alt="image" className={styles.icono} />
        <Image
          src={market}
          alt="image"
          onClick={handleCartOpen}
          className={styles.icono}
        />
        <Link href="/logIn">
          <Image src={signIn} alt="image" className={styles.icono} />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
