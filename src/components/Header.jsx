import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import "./Header.css";
const links = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Toys",
];
export default function Header() {
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, openAuth, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // mobile menu
  const [menu, setMenu] = useState(false); // account dropdown
  const [q, setQ] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };
  return (
    <header className="header">
      <div className="container header-top">
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
        <Link to="/" className="logo">
          <FiShoppingCart /> ShopKart
        </Link>
        <form className="search" onSubmit={handleSearch}>
          <input
            placeholder="Search for products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit">
            <FiSearch />
          </button>
        </form>
        <div className="header-icons">
          <div onClick={() => (user ? setMenu(!menu) : openAuth("login"))}>
            <FiUser />
            <span>{user ? user.name.split(" ")[0] : "Login"}</span>
            {user && menu && (
              <div className="dropdown">
                <Link to="/wishlist">My Wishlist</Link>
                <Link to="/cart">My Cart</Link>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
          <Link to="/wishlist">
            <FiHeart />
            {wishlist.length > 0 && <b className="badge">{wishlist.length}</b>}
            <span>Wishlist</span>
          </Link>
          <Link to="/cart">
            <FiShoppingCart />
            {cartCount > 0 && <b className="badge">{cartCount}</b>}
            <span>Cart</span>
          </Link>
        </div>
      </div>
      <nav className={`nav ${open ? "open" : ""}`}>
        <div className="container nav-links">
          <Link to="/products" onClick={() => setOpen(false)}>
            All Categories
          </Link>
          {links.map((l) => (
            <Link
              key={l}
              to={`/products?category=${encodeURIComponent(l)}`}
              onClick={() => setOpen(false)}
            >
              {l}
            </Link>
          ))}
          <Link to="/products?deals=1" onClick={() => setOpen(false)}>
            Deals
          </Link>
        </div>
      </nav>
    </header>
  );
}
