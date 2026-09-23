import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read("shopkart_user", null));
  const [modal, setModal] = useState({ open: false, mode: "login" });
  useEffect(() => {
    if (user) localStorage.setItem("shopkart_user", JSON.stringify(user));
    else localStorage.removeItem("shopkart_user");
  }, [user]);
  const openAuth = (mode = "login") => setModal({ open: true, mode });
  const switchMode = (mode) => setModal({ open: true, mode });
  const closeAuth = useCallback(
    () => setModal((m) => ({ ...m, open: false })),
    [],
  );
  // ---- DEMO auth (localStorage). Real me yahan API call aayegi ----
  const login = async ({ email, password }) => {
    await delay(600); // TODO: await axios.post('/api/auth/login', { email, password })
    const users = read("shopkart_users", []);
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!found) throw new Error("Email ya password galat hai");
    setUser({ name: found.name, email: found.email });
    closeAuth();
  };
  const signup = async ({ name, email, password }) => {
    await delay(600); // TODO: await axios.post('/api/auth/register', { name, email, password })
    const users = read("shopkart_users", []);
    if (users.some((u) => u.email === email)) {
      throw new Error("Ye email pehle se registered hai");
    }
    localStorage.setItem(
      "shopkart_users",
      JSON.stringify([...users, { name, email, password }]),
    );
    setUser({ name, email });
    closeAuth();
  };
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        modal,
        openAuth,
        closeAuth,
        switchMode,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
