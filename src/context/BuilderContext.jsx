import React, { createContext, useContext, useState, useEffect } from "react";

const BuilderContext = createContext();

// Exact initial state matching Figma Frame 1735 preview
const defaultInitialCart = {
  "wyze-cam-v4-v4-white": {
    id: "wyze-cam-v4",
    productId: "wyze-cam-v4",
    name: "Wyze Cam v4",
    category: "CAMERAS",
    price: 27.98,
    compareAtPrice: 35.98,
    quantity: 1,
    // Ensure this matches the exact filename (spaces or hyphens):
    image: "/assets/products/wyze-cam-v4.png", 
    variantLabel: "White",
  },
  "wyze-cam-pan-v3-pan-white": {
    id: "wyze-cam-pan-v3",
    productId: "wyze-cam-pan-v3",
    name: "Wyze Cam Pan v3",
    category: "CAMERAS",
    price: 23.99,
    compareAtPrice: 28.99,
    quantity: 2,
    image: "/assets/products/wyze-cam-pan-v3.png",
    variantLabel: "White",
  },
  "wyze-sense-motion": {
    id: "wyze-sense-motion",
    productId: "wyze-sense-motion",
    name: "Wyze Sense Motion Sensor",
    category: "SENSORS",
    price: 29.99,
    compareAtPrice: 29.99,
    quantity: 2,
    // Check your public/assets/products/ folder for this file name:
    image: "/assets/products/sensor-motion.png", 
  },
  "wyze-sense-hub": {
    id: "wyze-sense-hub",
    productId: "wyze-sense-hub",
    name: "Wyze Sense Hub (Required)",
    category: "SENSORS",
    price: 0.0,
    compareAtPrice: 29.92,
    quantity: 1,
    isFree: true,
    // Check your public/assets/products/ folder for this file name:
    image: "/assets/products/sensor-hub.png",
  },
  "wyze-microsd-256": {
    id: "wyze-microsd-256",
    productId: "wyze-microsd-256",
    name: "Wyze MicroSD Card (256GB)",
    category: "ACCESSORIES",
    price: 20.98,
    compareAtPrice: 20.98,
    quantity: 2,
    // Check if it has a space or hyphen (microsd card.png vs microsd-card.png):
    image: "/assets/products/microsd-card.png",
  },
  "cam-unlimited": {
    id: "cam-unlimited",
    productId: "cam-unlimited",
    name: "Cam Unlimited",
    category: "PLAN",
    price: 9.99,
    compareAtPrice: 12.99,
    quantity: 1,
    image: "/assets/icons/logo-cam-unlimited.svg",
  },
};

export function BuilderProvider({ children }) {
  // Always initialize with the Figma reference state
  const [cart, setCart] = useState(defaultInitialCart);

  const updateQuantity = (key, delta, productData) => {
    setCart((prevCart) => {
      const existing = prevCart[key];
      const newQty = (existing?.quantity || 0) + delta;

      if (newQty <= 0) {
        const nextCart = { ...prevCart };
        delete nextCart[key];
        return nextCart;
      }

      // Dynamic Bundle Discount Logic:
      // If Wyze Cam Pan v3 has 2 or more units, unit price drops to $23.99 (Compare $28.99)
      let unitPrice = productData?.price ?? existing?.price ?? 0;
      let unitCompare = productData?.compareAtPrice ?? existing?.compareAtPrice ?? unitPrice;

      if (key.includes("wyze-cam-pan-v3")) {
        if (newQty >= 2) {
          unitPrice = 23.99;
          unitCompare = 28.99;
        } else {
          unitPrice = 34.98;
          unitCompare = 39.98;
        }
      }

      return {
        ...prevCart,
        [key]: {
          ...(existing || productData),
          quantity: newQty,
          price: unitPrice,
          compareAtPrice: unitCompare,
        },
      };
    });
  };

  const clearCart = () => setCart({});

  return (
    <BuilderContext.Provider value={{ cart, updateQuantity, clearCart }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}