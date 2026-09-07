import { useState } from "react";
import { AuthContext } from "./authContext";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));

  const login = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
