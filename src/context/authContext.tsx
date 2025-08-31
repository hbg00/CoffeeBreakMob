import React, { createContext, useContext, useState } from "react";
import { AuthContextType, UserType } from "@/constants/types/types";
import { useRouter } from "expo-router";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);
  const router = useRouter();

  const login: AuthContextType["login"] = async (email, password) => {
    // TODO: Implement real authentication logic here
    router.replace("/(tabs)");
    return { success: true };
  };

  const loginWithGoogle: AuthContextType["loginWithGoogle"] = async () => {
    // TODO: Implement real authentication logic here
    router.replace("/(tabs)");
    return { success: true };
  };

  const register: AuthContextType["register"] = async (email, password, name, surname, phoneNumber) => {
    // TODO: Implement real authentication logic here
    router.replace("/(auth)/login");
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
