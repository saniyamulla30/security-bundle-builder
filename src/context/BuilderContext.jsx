import React, { createContext, useContext, useState, useEffect } from "react";
import productsData from "../data/products.json";

const BuilderContext = createContext();

// Pre-populated initial seed state matching Figma Frame 1735 exactly
const DEFAULT_INITIAL_CART = {
  "wyze-cam-v4-white": {
    id: "wyze-cam-v4",
    productId: "wyze-cam-v4",
    name: "Wyze Cam v4",
    category: "CAMERAS",
    price: 27.98,
    compareAtPrice: 35.98,
    quantity: 1,
    image: "/assets/images/cam-v4.png",
    variantLabel: "White",
    variantId: "white",
  },
  "wyze-cam-pan-v3-white": {
    id: "wyze-cam-pan-v3",
    productId: "wyze-cam-pan-v3",
    name: "Wyze Cam Pan v3",
    category: "CAMERAS",
    price: 23.99,
    compareAtPrice: 28.99,
    quantity: 2,
    image: "/assets/images/cam-pan-v3.png",
    variantLabel: "White",
    variantId: "white",
  },
  "wyze-sense-motion": {
    id: "wyze-sense-motion",
    productId: "wyze-sense-motion",
    name: "Wyze Sense Motion Sensor",
    category: "SENSORS",
    price: 29.99,
    quantity: 2,
    image: "/assets/images/motion-sensor.png",
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
    image: "/assets/images/sense-hub.png",
  },
  "wyze-microsd-card-256gb": {
    id: "wyze-microsd-card-256gb",
    productId: "wyze-microsd-card-256gb",
    name: "Wyze MicroSD Card (256GB)",
    category: "ACCESSORIES",
    price: 20.98,
    quantity: 2,
    image: "/assets/images/microsd.png",
  },
  "cam-unlimited": {
    id: "cam-unlimited",
    productId: "cam-unlimited",
    name: "Cam Unlimited",
    category: "PLAN",
    price: 9.99,
    compareAtPrice: 12.99,
    quantity: 1,
    image: "/assets/images/plan-shield.svg",
  },
};

export function BuilderProvider({ children }) {
  // Load saved configuration from localStorage if available, else use default seed
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("saved_wyze_bundle");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Could not parse saved bundle:", e);
    }
    return DEFAULT_INITIAL_CART;
  });

  const [saveStatus, setSaveStatus] = useState(null);

  const saveSystem = () => {
    try {
      localStorage.setItem("saved_wyze_bundle", JSON.stringify(cart));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  const updateQuantity = (cartKey, delta, itemData = null) => {
    setCart((prev) => {
      const current = prev[cartKey];
      const newQty = (current?.quantity || 0) + delta;

      if (newQty <= 0) {
        const next = { ...prev };
        delete next[cartKey];
        return next;
      }

      return {
        ...prev,
        [cartKey]: {
          ...(current || itemData),
          quantity: newQty,
        },
      };
    });
  };

  return (
    <BuilderContext.Provider
      value={{
        cart,
        updateQuantity,
        saveSystem,
        saveStatus,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  return useContext(BuilderContext);
}