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

function NavBar(props) {
  const {
    setCheckoutVisible,
    isAuthenticated,
    userData,
    setUserData,
    setIsAuthenticated,
  } = useContext(GlobalContext);

  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

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
          <div>
            <Image
              src={market}
              alt="image"
              onClick={handleCartOpen}
              className={styles.icono}
              title="Store"
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
            title="Log Out"
          />
        ) : (
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
