import React, { useContext } from "react";
import styles from "./navBar.module.css";
import {
  logo,
  search,
  market,
  signIn,
  pedidos,
  logout,
} from "../../../../public/imagnes";
import Image from "next/image";
import Link from "next/link";
import { GlobalContext } from "../../store/layout";
import { getLayout } from "../../store/layout";
import { useRouter, usePathname } from "next/navigation"; // Importa esto
import { useState } from "react";

function NavBar(props) {
  const { setCheckoutVisible } = useContext(GlobalContext);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const initializeAuthStatus = () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      return user ? true : false;
    }
    return false;
  };
  const [isAuthenticated, setIsAuthenticated] = useState(
    initializeAuthStatus()
  ); // Hacerlo parte del estado del componente

  const router = useRouter(); // Añade esto
  const pathName = usePathname();

  const handleCartOpen = () => {
    if (pathName.includes("/logIn")) {
      router.push("/store/fundas");
    } else {
      setCheckoutVisible(true);
    }
  };

  const handleLoginClick = () => {
    if (isAuthenticated) {
      setShowLogoutMenu(!showLogoutMenu); // Mostrar/ocultar el menú de deslogueo
    } else {
      router.push("/logIn");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Eliminar el usuario del localStorage
    setIsAuthenticated(false); // Actualizar el estado para reflejar que el usuario no está autenticado
  };

  const handlePedidosClick = () => {
    if (!isAuthenticated) {
      router.push("/logIn");
      return; // Detén la ejecución aquí para evitar la navegación a "/profile"
    }
    router.push("/profile");
  };
  return (
    <div className={styles.contenedor}>
      <div className={styles.trapezoid}>
        <Link href="/">
          <Image src={logo} alt="image" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.botonera}>
        <div onClick={handlePedidosClick}>
          <Link href="/profile">
            <Image
              src={pedidos}
              alt="image"
              className={styles.icono}
              title="Mis pedidos"
            />
          </Link>
        </div>
        <Link href="/store/fundas">
          <Image
            src={market}
            alt="image"
            onClick={handleCartOpen}
            className={styles.icono}
            title="Store"
          />
        </Link>
        {isAuthenticated ? (
          // Si está autenticado, mostrar el ícono de logout
          <Image
            src={logout}
            alt="Logout"
            onClick={handleLogout}
            className={styles.icono}
            title="Log Out"
          />
        ) : (
          // Si no está autenticado, mostrar el ícono de login
          <Link href="/logIn">
            <Image
              src={signIn}
              alt="Log In"
              onClick={handleLoginClick}
              className={styles.icono}
              title="Log In"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
