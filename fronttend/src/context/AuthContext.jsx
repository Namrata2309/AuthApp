import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Check session on app load
  useEffect(() => {
    api
      .get("/api/dashboard")
      .then((res) => {
        setUser(res.data.user); // session valid
      })
      .catch(() => {
        setUser(null); // not logged in
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Correct login (API-only)
  const login = async (email, password) => {
    await api.post("/api/auth/login", { email, password });
    const res = await api.get("/api/dashboard");
    setUser(res.data.user);
  };

  // ✅ Correct logout
  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
