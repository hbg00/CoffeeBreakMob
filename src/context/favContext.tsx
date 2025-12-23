import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FavoriteContextType, ProductCard } from "@/constants/types/homeTypes";
import { useAuth } from "@/context/authContext";

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<ProductCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = user?.email ? `@favorites_${user.email}` : `@favorites_guest`;

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setIsLoading(true);
        const json = await AsyncStorage.getItem(storageKey);
        if (json) {
          const parsed: ProductCard[] = JSON.parse(json);
          const normalized = parsed.map((p) => ({
            ...p,
            description: p.description ?? "",
          }));
          setFavorites(normalized);
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error("Failed to load favorites", error);
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [storageKey]);

  useEffect(() => {
    if (isLoading) return;

    const save = async () => {
      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites", error);
      }
    };

    save();
  }, [favorites, storageKey, isLoading]);

  const addToFavorites = (item: ProductCard) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoriteProvider");
  return ctx;
};
