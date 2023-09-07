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
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import NumeroCarrito from "../numeroCarrito/numeroCarrito";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import menuNav from "../../../../public/menuNav.svg";

function NavBar(props) {
  const {
    setCheckoutVisible,
    isAuthenticated,
    userData,
    setUserData,
    setIsAuthenticated,
  } = useContext(GlobalContext);

  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      setShowLogoutMenu(!showLogoutMenu);
    } else {
      router.push("/logIn");
    }
  };
  const handleLogout = async () => {
    if (userData?.provider === "GOOGLE") {
      signOut({ callbackUrl: "/" });
    } else {
      try {
        const response = await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(null);
          setIsAuthenticated(false);
        } else {
          console.error("Error logging out:", data.message);
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
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
      <Tooltip />
      <div className={styles.trapezoid}>
        <Link href="/">
          <Image
            src={logo}
            alt="image"
            className={styles.logo}
            data-tooltip-id="Inicio"
            data-tooltip-content=" homepage"
          />
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
              data-tooltip-id="Mis Pedidos"
              data-tooltip-content="Mis Pedidos"
            />
          </Link>
        </div>
        <Link href="/store/fundas">
          <div>
            <Image
              src={market}
              alt="image"
              onClick={handleCartOpen}
              className={styles.icono}
              data-tooltip-id="Carrito"
              data-tooltip-content="Carrito"
            />
            <NumeroCarrito />
          </div>
        </Link>

        {isAuthenticated ? (
          <Image
            src={logout}
            alt="Logout"
            onClick={handleLogout}
            className={styles.icono}
            data-tooltip-id="Cerrar sesión"
            data-tooltip-content="Cerrar sesión"
          />
        ) : (
          <Link href="/logIn">
            <Image
              src={signIn}
              alt="Log In"
              onClick={handleLoginClick}
              className={styles.icono}
              title="Log In"
              data-tooltip-id="Iniciar sesión"
              data-tooltip-content="Iniciar sesión / Registrarse"
            />
          </Link>
        )}
      </div>
      <div
        className={styles.mobileMenuIcon}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Image src={menuNav} alt="Menu" />
      </div>
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div onClick={handlePedidosClick}>Mi perfil</div>
          <div onClick={handleCartOpen}>Carrito</div>
          {isAuthenticated ? (
            <div onClick={handleLogout}>Cerrar sesión</div>
          ) : (
            <div onClick={handleLoginClick}>Iniciar sesión / Registrarse</div>
          )}
        </div>
      )}
      <Tooltip id="Inicio" place="bottom" />
      <Tooltip id="Mis Pedidos" place="bottom" />
      <Tooltip id="Carrito" place="bottom" />
      <Tooltip id="Cerrar sesión" place="bottom" />
      <Tooltip id="Iniciar sesión" place="bottom" />
    </div>
  );
}

export default NavBar;
