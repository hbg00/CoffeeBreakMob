import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "@/context/authContext";
import { BasketProvider } from "@/context/basketContext";
import { FavoriteProvider } from "@/context/favContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <BasketProvider>
        <FavoriteProvider>
          <Slot />
        </FavoriteProvider>
      </BasketProvider>
    </AuthProvider>
  );
}
