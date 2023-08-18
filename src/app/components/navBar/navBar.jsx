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

function NavBar(props) {
  const {
    setCheckoutVisible,
    isUserAuthenticated,
    userData,
    setUserData,
    setIsAuthenticated,
  } = useContext(GlobalContext);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const isAuthenticated = Boolean(userData); // Suponiendo que userData es null si el usuario no está autenticado

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
  const handleLogout = async () => {
    if (userData?.provider === "GOOGLE") {
      // Cierre de sesión para usuarios de Google usando next-auth del lado del cliente
      signOut({ callbackUrl: "/" }); // Redirige al inicio después de cerrar sesión
    } else {
      // Cierre de sesión para usuarios que no son de Google usando tu ruta personalizada
      try {
        const response = await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Asegúrate de enviar las cookies
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
