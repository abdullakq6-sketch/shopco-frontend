import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, getToken, setToken } from "@/api/client";
import { useCart } from "./CartContext";
import { AuthModal } from "@/components/AuthModal";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { refresh: refreshCart } = useCart();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    let active = true;
    api
      .me()
      .then((data) => active && setUser(data.user))
      .catch(() => {
        setToken(null);
        active && setUser(null);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const openAuth = useCallback((mode = "login") => {
    setAuthMode(mode);
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthOpen,
      openAuth,
      closeAuth,
      authMode,
      setAuthMode,
      login: async (input) => {
        const data = await api.login(input);
        setToken(data.token);
        setUser(data.user);
        setAuthOpen(false);
        await refreshCart();
      },
      signup: async (input) => {
        const data = await api.signup(input);
        setToken(data.token);
        setUser(data.user);
        setAuthOpen(false);
        await refreshCart();
      },
      logout: async () => {
        await api.logout().catch(() => {});
        setToken(null);
        setUser(null);
        await refreshCart();
      },
    }),
    [user, loading, isAuthOpen, authMode, openAuth, closeAuth, refreshCart],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
