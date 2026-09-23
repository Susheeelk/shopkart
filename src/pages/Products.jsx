import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "../data";
import "./Pages.css";
import ProductCard from "../components/Product";
const cats = [
  "All",
  ...categories.filter((c) => c.name !== "More").map((c) => c.name),
];
export default function Products() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("default");
  const category = params.get("category") || "All";
  const q = (params.get("q") || "").toLowerCase();
  const deals = params.get("deals");
  let list = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(q) &&
      (!deals || (p.oldPrice - p.price) / p.oldPrice >= 0.4),
  );
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  const selectCategory = (c) => setParams(c === "All" ? {} : { category: c });
  let title = "All Products";
  if (deals) title = "Top Deals";
  else if (q) title = `Results for "${params.get("q")}"`;
  else if (category !== "All") title = category;
  return (
    <div className="container page">
      <h2>{title}</h2>
      <div className="chips">
        {cats.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? "active" : ""}`}
            onClick={() => selectCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="toolbar">
        <span className="muted">{list.length} products mile</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
      {list.length === 0 ? (
        <p className="empty-msg">Koi product nahi mila {"\u{1F615}"}</p>
      ) : (
        <div className="grid">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
