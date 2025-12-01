"use client";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "normal";
};

type AuthContextProps = {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      const data = response.data;

      if (data.user) {
        setUser(data.user);
      }

      return {
        success: true,
        message: data.message || "Logged in successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    }
  };

  const logout = async () => {
    await axios.post("/api/logout");
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
