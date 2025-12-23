import React, { createContext, useContext, useMemo, useState } from "react";
import { BasketContextType, CoffeeItem } from "@/constants/types/homeTypes";

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [basket, setBasket] = useState<CoffeeItem[]>([]);

  const addToBasket = (item: CoffeeItem) => {
    setBasket((prev) => [...prev, item]);
    console.log("Added to basket:", item);
  };

  const removeFromBasket = (id: number) => {
    setBasket((prev) => prev.filter((i) => i.id !== id));
  };

  const clearBasket = () => setBasket([]);

  const totalPrice = useMemo(() => basket.reduce((sum, i) => sum + (i.price ?? 0), 0), [basket]);

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, clearBasket, totalPrice }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = (): BasketContextType => {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasket must be used within BasketProvider");
  return ctx;
};