"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const GlobalContext = createContext();

export default function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [currentOrderDetails, setCurrentOrderDetails] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 12;

  const [globalState, setGlobalState] = useState({
    displayType: "NEOPRENE_COVER",
  });

  const loadCart = () => {
    if (typeof window !== "undefined") {
      try {
        const cart = JSON.parse(localStorage.getItem("cart"));
        return Array.isArray(cart)
          ? cart.map((item) => ({
              ...item,
              selectedSizes: item.selectedSizes || [],
            }))
          : [];
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        return [];
      }
    }
    return [];
  };

  const [cart, setCart] = useState(loadCart());

  const saveCart = (cart) => {
    if (typeof window !== "undefined" && Array.isArray(cart)) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/fafa");
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during the request:", error.message);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/product", {
          params: {
            page: page,
            itemsPerPage: itemsPerPage,
            productType: globalState.displayType.toUpperCase(),
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [page, globalState.displayType]);

  const covers = products.filter(
    (product) => product.productType === "NEOPRENE_COVER"
  );
  console.log("Covers:", covers);
  const maletines = products.filter(
    (product) => product.productType === "MALETINES"
  );
  console.log("Maletines:", maletines);
  const fullColor = products.filter(
    (product) => product.productType === "MALETINES_FULL_COLOR"
  );
  console.log("Full Color:", fullColor);
  const cubrevalijas = products.filter(
    (product) => product.productType === "CUBRE_VALIJAS"
  );
  console.log("Cubre Valijas:", cubrevalijas);
  const tablets = products.filter(
    (product) => product.productType === "TABLET_COVER"
  );
  console.log("Tablets:", tablets);
  const conBolsillo = products.filter(
    (product) => product.productType === "CON_BOLSILLO"
  );
  console.log("Con Bolsillo:", conBolsillo);
  const portafolios = products.filter(
    (product) => product.productType === "PORTAFOLIOS"
  );
  console.log("Portafolios:", portafolios);
  const addToCart = (product, selectedSizes) => {
    const updatedCart = [...cart];

    selectedSizes.forEach((selectedSize) => {
      let foundProduct = false;
      let productIndex = -1;

      for (let i = 0; i < updatedCart.length; i++) {
        if (updatedCart[i].id === product.id) {
          productIndex = i;
          foundProduct = true;
          break;
        }
      }

      if (foundProduct) {
        const sizeIndex = updatedCart[productIndex].selectedSizes.findIndex(
          (sizeItem) => sizeItem.size === selectedSize.size
        );

        if (sizeIndex !== -1) {
          updatedCart[productIndex].selectedSizes[sizeIndex].quantity =
            parseInt(selectedSize.quantity);
        } else {
          updatedCart[productIndex].selectedSizes.push(selectedSize);
        }
      } else {
        updatedCart.push({
          ...product,
          selectedSizes: [selectedSize],
        });
      }
    });

    setCart(updatedCart);
  };

  const removeFromCart = (productId, sizeToRemove) => {
    const updatedCart = cart.filter(
      (item) =>
        !(
          item.id === productId &&
          item.selectedSizes.some(
            (selectedSize) => selectedSize.size === sizeToRemove
          )
        )
    );
    setCart(updatedCart);
  };

  return (
    <GlobalContext.Provider
      value={{
        portafolios,
        covers,
        maletines,
        cubrevalijas,
        tablets,
        conBolsillo,
        isLoading,
        cart,
        addToCart,
        removeFromCart,
        fullColor,
        checkoutVisible,
        setCheckoutVisible,
        setCart,
        currentOrderDetails,
        setCurrentOrderDetails,
        isAuthenticated,
        setIsAuthenticated,
        userData,
        setUserData,
        cart,
        globalState,
        setGlobalState,
        setPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
