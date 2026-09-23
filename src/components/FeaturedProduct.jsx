import { Link } from "react-router-dom";
import { products } from "../data";
import "./ProductCard.css";
import ProductCard from "./Product";
export default function FeaturedProducts() {
  return (
    <section className="container">
      <div className="section-head">
        <h3 style={{ fontWeight: 800, fontSize: "24px" }}>Featured Products</h3>
        <Link to="/products">View All →</Link>
      </div>
      <div className="grid">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
