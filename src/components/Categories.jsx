import { Link } from "react-router-dom";
import { categories } from "../data";
import "./Categories.css";
export default function Categories() {
  return (
    <section className="container cats">
      {categories.map((c) => (
        <Link
          key={c.name}
          className="cat"
          to={
            c.name === "More"
              ? "/products"
              : `/products?category=${encodeURIComponent(c.name)}`
          }
        >
          <div className="cat-circle">{c.icon}</div>
          <p>{c.name}</p>
        </Link>
      ))}
    </section>
  );
}
