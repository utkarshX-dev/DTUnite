import { createContext, useState, useEffect } from "react";
import axios from "axios";
const apiBase = import.meta.env.VITE_API_BASE;
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    axios
      .get(`${apiBase}/api/user`, {
        headers: { Authorization: token },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}