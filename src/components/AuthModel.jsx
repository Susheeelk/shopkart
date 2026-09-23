import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import "./AuthModal.css";
const empty = { name: "", email: "", password: "", confirm: "" };
export default function AuthModal() {
  const { modal, closeAuth, switchMode, login, signup } = useAuth();
  const { open, mode } = modal;
  const isLogin = mode === "login";
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // mode badalne ya modal khulne pe form reset
  useEffect(() => {
    setForm(empty);
    setError("");
  }, [mode, open]);
  // Esc se band + background scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeAuth();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeAuth]);
  if (!open) return null;
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLogin) {
      if (form.password.length < 6)
        return setError("Password kam se kam 6 characters ka rakho");
      if (form.password !== form.confirm)
        return setError("Dono passwords match nahi kar rahe");
    }
    try {
      setLoading(true);
      if (isLogin) await login(form);
      else await signup(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="overlay" onClick={closeAuth}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={closeAuth} aria-label="Close">
          <FiX />
        </button>
        <h2>{isLogin ? "Welcome back \u{1F44B}" : "Create account"}</h2>
        <p className="auth-sub">
          {isLogin
            ? "Apne ShopKart account me login karo"
            : "Sirf 1 minute me account banao"}
        </p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              name="name"
              placeholder="Full name"
              required
              value={form.name}
              onChange={handleChange}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <input
              name="confirm"
              type="password"
              placeholder="Confirm password"
              required
              value={form.confirm}
              onChange={handleChange}
            />
          )}
          {error && <div className="auth-error">{error}</div>}
          <button className="btn" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="auth-switch">
          {isLogin ? "Naye ho? " : "Pehle se account hai? "}
          <button onClick={() => switchMode(isLogin ? "signup" : "login")}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
