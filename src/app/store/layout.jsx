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
  const [tablets, setTablets] = useState([]);
  const [currentOrderDetails, setCurrentOrderDetails] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        const tabletsData = response.data.filter(
          (product) => product.productType === "TABLET_COVER"
        );

        setCovers(coversData);
        setMaletines(maletinesData);
        setFullColor(fullColorData);
        setCubrevalijas(cubrevalijasData);
        setTablets(tabletsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const addToCart = (product, selectedSizes) => {
    // Clone the current cart
    const updatedCart = [...cart];

    // Loop through each selectedSize
    selectedSizes.forEach((selectedSize) => {
      let foundProduct = false;
      let productIndex = -1;

      // Check if the product is already in the cart
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
          // If size already exists for the product, update its quantity
          updatedCart[productIndex].selectedSizes[
            sizeIndex
          ].quantity = parseInt(selectedSize.quantity);
        } else {
          // If the product exists but not the size, add the new size to the product
          updatedCart[productIndex].selectedSizes.push(selectedSize);
        }
      } else {
        // If product wasn't found in the cart at all, add the product with the selected size
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
        covers,
        maletines,
        cubrevalijas,
        tablets,
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
