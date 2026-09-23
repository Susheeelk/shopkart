import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductCard.css";
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWished } = useWishlist();
  const { id, name, price, oldPrice, rating, reviews, img } = product;
  return (
    <div className="card">
      <FiHeart
        className={`wish ${isWished(id) ? "active" : ""}`}
        onClick={() => toggleWishlist(id)}
      />
      <Link to={`/product/${id}`} className="card-link">
        <div className="card-img">{img}</div>
        <h4>{name}</h4>
      </Link>
      <p className="price">
        ₹{price.toLocaleString("en-IN")}{" "}
        <del>₹{oldPrice.toLocaleString("en-IN")}</del>
      </p>
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} color={i < Math.floor(rating) ? "#f5b301" : "#ddd"} />
        ))}
        <span>({reviews})</span>
      </div>
      <button className="btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
