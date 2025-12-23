import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { AuthContextType, UserType } from "@/constants/types/authTypes";
import { loginApi, registerApi, meApi, googleLoginApi } from "@/api/authApi";

import { googleConfig } from "@/config/google";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: googleConfig.expoClientId,
  scopes: ["profile", "email"],
});

type InternalAuthContext = AuthContextType & {
  isInitializing: boolean;
};

export const AuthContext = createContext<InternalAuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (!token) {
          setIsInitializing(false);
          return;
        }

        const res = await meApi();
        if (res.success && res.data) {
          setUser(res.data);
        } else {
          await SecureStore.deleteItemAsync("token");
        }
      } catch (error) {
        console.error("Auth init error:", error);
        await SecureStore.deleteItemAsync("token");
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (isInitializing) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/welcome");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, isInitializing, segments]);

  const login: AuthContextType["login"] = async (email, password) => {
    try {
      const res = await loginApi(email, password);

      if (!res.success || !res.data) {
        return { success: false, msg: res.msg || "Login failed" };
      }

      await SecureStore.setItemAsync("token", res.data.token);
      setUser(res.data.user);

      return {
        success: true,
        msg: "Login successful",
        token: res.data.token,
        user: res.data.user,
      };
    } catch (error: any) {
      console.error("Login error:", error);
      return {
        success: false,
        msg: `Wewnętrzny błąd logowania: ${error.message}`,
      };
    }
  };

  const register: AuthContextType["register"] = async (
    email,
    password,
    name,
    surname,
    phoneNumber
  ) => {
    try {
      const res = await registerApi(
        email,
        password,
        name,
        surname,
        phoneNumber
      );

      if (!res.success || !res.data) {
        return { success: false, msg: res.msg || "Registration failed" };
      }

      if (res.data.token) {
        await SecureStore.setItemAsync("token", res.data.token);
        setUser(res.data.user);
      }

      return {
        success: true,
        msg: "Registration successful",
        user: res.data.user,
        token: res.data.token,
      };
    } catch (error: any) {
      console.error("Register error:", error);
      return {
        success: false,
        msg: `Wewnętrzny błąd rejestracji: ${error.message}`,
      };
    }
  };

  const logout: AuthContextType["logout"] = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
    router.replace("/(auth)/login");
  };

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();

      console.log("Google sign-in response:", response);

      if (response.type !== "success") {
        return { success: false, msg: "Login cancelled" };
      }

      const userInfo = response.data;
      console.log("Google userInfo.data:", userInfo);

      let idToken = userInfo.idToken;

      if (!idToken) {
        const tokens = await GoogleSignin.getTokens();
        console.log("Google tokens:", tokens);
        idToken = tokens.idToken;
      }

      if (!idToken) {
        return { success: false, msg: "Brak idToken z Google" };
      }

      const res = await googleLoginApi(idToken);

      if (!res.success || !res.data) {
        return {
          success: false,
          msg: res.msg || "Google login failed",
        };
      }

      setUser(res.data.user);
      return { success: true };
    } catch (error: any) {
      console.log("Google sign-in error:", error);

      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        return { success: false, msg: "Login cancelled" };
      }
      if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          success: false,
          msg: "Google Play Services not available",
        };
      }

      return {
        success: false,
        msg: error?.message ?? "Unknown Google error",
      };
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loginWithGoogle,
        register,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): InternalAuthContext => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
