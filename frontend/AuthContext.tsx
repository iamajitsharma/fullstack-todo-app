"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { fetchUserInfo, User } from "@/sanity/lib/query";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  errorMsg: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user_info");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Simulate login with an API call
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = response.statusText || "Login failed";
        setErrorMsg(error);
      }

      const data = await response.json();

      if (data.status && data.status !== 200) {
        setErrorMsg(data.message || "Login failed");
        return;
      }

      // Fetch user data after successful login
      const userInfo = await fetchUserInfo(username);
      if (userInfo) {
        localStorage.setItem("user_info", JSON.stringify(userInfo));
        setUser(userInfo);
      }

      router.push("/accounts");
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Invalid credentials");
    }
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    localStorage.removeItem("user_info");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, errorMsg }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
