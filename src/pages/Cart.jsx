import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Pages.css";
export default function Cart() {
  const { items, updateQty, removeFromCart, total } = useCart();
  const { user, openAuth } = useAuth();
  if (items.length === 0) {
    return (
      <div className="container page empty">
        <h2>Aapka cart khaali hai {"\u{1F6D2}"}</h2>
        <Link to="/" className="btn link-btn">
          Shopping shuru karo
        </Link>
      </div>
    );
  }
  return (
    <div className="container page cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="cart-row">
              <div className="cart-thumb">{product.img}</div>
              <div className="cart-info">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
                <p>₹{product.price.toLocaleString("en-IN")}</p>
              </div>
              <div className="qty">
                <button onClick={() => updateQty(product.id, qty - 1)}>
                  −
                </button>
                <span>{qty}</span>
                <button onClick={() => updateQty(product.id, qty + 1)}>
                  +
                </button>
              </div>
              <b>₹{(product.price * qty).toLocaleString("en-IN")}</b>
              <button
                className="remove"
                onClick={() => removeFromCart(product.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <aside className="summary">
          <h3>Order Summary</h3>
          <div className="sum-row">
            <span>Subtotal</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <div className="sum-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="sum-row total">
            <span>Total</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <button
            className="btn"
            onClick={() =>
              user ? alert("Order placed! \u{1F389}") : openAuth("login")
            }
          >
            Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}
