import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { AuthAPI } from "@/services/api";
import { currentUser as demoUser } from "@/lib/mockData";

export type User = typeof demoUser;

type AuthState = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setRole: (role: User["role"]) => void;
};

const AuthContext = createContext<AuthState | null>(null);
const STORAGE_KEY = "cc-auth-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read persisted session client-side only (avoid SSR/hydration mismatch).
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* noop */
    }
    setLoading(false);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value: AuthState = {
    user,
    loading,
    login: async (email, password) => {
      const u = await AuthAPI.login(email, password);
      persist(u as User);
    },
    register: async (name, email, password) => {
      const u = await AuthAPI.register(name, email, password);
      persist(u as User);
    },
    logout: () => persist(null),
    setRole: (role) => {
      if (!user) return;
      persist({ ...user, role });
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
