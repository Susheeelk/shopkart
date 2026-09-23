import { Link } from "react-router-dom";
import { products } from "../data";
import { useWishlist } from "../context/WishlistContext";

import "./Pages.css";
import ProductCard from "../components/Product";
export default function Wishlist() {
  const { wishlist } = useWishlist();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <div className="container page">
      <h2>My Wishlist ({items.length})</h2>
      {items.length === 0 ? (
        <div className="empty">
          <p className="empty-msg">Wishlist khaali hai {"\u2764\uFE0F"}</p>
          <Link to="/products" className="btn link-btn">
            Products dekho
          </Link>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: 20 }}>
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
