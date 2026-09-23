import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "../data";
import { useCart } from "../context/CartContext";
import "./Pages.css";
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));
  if (!product) {
    return (
      <div className="container page">
        <p>Product nahi mila.</p>
        <Link to="/">← Home pe jao</Link>
      </div>
    );
  }
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100,
  );
  return (
    <div className="container page detail">
      <div className="detail-img">{product.img}</div>
      <div className="detail-info">
        <Link to="/" className="back">
          ← Back
        </Link>
        <h2>{product.name}</h2>
        <p className="muted">
          {"\u2B50"} {product.rating} ({product.reviews} reviews)
        </p>
        <p className="detail-price">
          ₹{product.price.toLocaleString("en-IN")}
          <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>
          <span className="off">{discount}% OFF</span>
        </p>
        <p className="desc">
          Yahan product ki description aayegi. Baad me ise data.js me
          description field bana ke ya backend se laa sakte ho.
        </p>
        <div className="detail-actions">
          <button className="btn" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
