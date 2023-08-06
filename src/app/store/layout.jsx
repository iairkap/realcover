"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const GlobalContext = createContext();

export default function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [covers, setCovers] = useState([]);
  const [fullColor, setFullColor] = useState([]);
  const [cubrevalijas, setCubrevalijas] = useState([]);
  const [maletines, setMaletines] = useState([]);
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  const loadCart = () => {
    if (typeof window !== "undefined") {
      const cart = localStorage.getItem("cart");
      if (cart) {
        return JSON.parse(cart);
      }
    }
    return [];
  };

  const [cart, setCart] = useState(loadCart());

  const saveCart = (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/product");

        const coversData = response.data.filter(
          (product) => product.productType === "NEOPRENE_COVER"
        );
        const maletinesData = response.data.filter(
          (product) => product.productType === "MALETINES"
        );
        const fullColorData = response.data.filter(
          (product) => product.productType === "MALETINES_FULL_COLOR"
        );
        const cubrevalijasData = response.data.filter(
          (product) => product.productType === "CUBRE_VALIJAS"
        );

        setCovers(coversData);
        setMaletines(maletinesData);
        setFullColor(fullColorData);
        setCubrevalijas(cubrevalijasData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (cartItem) => {
    const {
      id,
      picture,
      price,
      sizes,
      imageName,
      selectedSize,
      type,
    } = cartItem; // Agregamos 'type' aquí

    setCart((prevCart) => {
      if (!selectedSize || !selectedSize.size) {
        return prevCart;
      }

      const newCart = { ...prevCart };
      const itemId = `${id}-${selectedSize.size}`;

      if (newCart[itemId]) {
        newCart[itemId].quantity += Number(selectedSize.quantity);
      } else {
        newCart[itemId] = {
          id,
          picture,
          price,
          imageName,
          size: selectedSize.size,
          quantity: Number(selectedSize.quantity),
          type, // Agregamos 'type' aquí
        };
      }

      return newCart;
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const itemId = `${id}-${size}`;

      delete newCart[itemId];

      return newCart;
    });
  };

  console.log("asi se ve el carrito", cart);

  return (
    <GlobalContext.Provider
      value={{
        covers,
        maletines,
        cubrevalijas,
        isLoading,
        cart,
        addToCart,
        removeFromCart,
        fullColor,
        checkoutVisible,
        setCheckoutVisible,
        setCart, // añade esta línea
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
