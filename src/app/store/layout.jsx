"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const GlobalContext = createContext();

export default function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [covers, setCovers] = useState([]);
  const [fullColor, setFullColor] = useState([]);
  const [sizes, setSizes] = useState([]);
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
    const fetchCovers = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/fundasNeoprene");
      setCovers(response.data);
      setIsLoading(false);
    };
    fetchCovers();
  }, []);

  useEffect(() => {
    const fetchSizes = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/size");
      setSizes(response.data);
      setIsLoading(false);
    };
    fetchSizes();
  }, []);

  useEffect(() => {
    const fetchCubrevalijas = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/cubrevalijas");
      setCubrevalijas(response.data);
      setIsLoading(false);
    };
    fetchCubrevalijas();
  }, []);

  useEffect(() => {
    const fetchMaletines = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/maletines");
      setMaletines(response.data);
      setIsLoading(false);
    };
    fetchMaletines();
  }, []);

  useEffect(() => {
    const fetchFullColor = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/FullColor");
      if (Array.isArray(response.data)) {
        setFullColor(response.data);
      } else {
        console.error("La respuesta de la API no es un array: ", response.data);
        setFullColor([]);
      }
      setIsLoading(false);
    };
    fetchFullColor();
  }, []);

  const addToCart = (cartItem) => {
    const { id, picture, price, sizes, imageName, selectedSize } = cartItem;
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
        };
      }

      console.log("Nuevo carrito:", newCart);
      return newCart;
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const itemId = `${id}-${size}`;

      delete newCart[itemId];

      console.log("Carrito tras eliminación:", newCart);
      return newCart;
    });
  };

  console.log("Estado actual del carrito:", cart);

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
        sizes,
        checkoutVisible,
        setCheckoutVisible,
        setCart, // añade esta línea
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
