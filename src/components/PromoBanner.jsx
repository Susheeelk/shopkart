import "./PromoBanners.css";
export default function PromoBanners() {
  return (
    <section className="container promos">
      <div className="promo green">
        <div>
          <h3>Summer Sale</h3>
          <h2>Up to 50% OFF</h2>
          <button className="btn-white">Shop Now</button>
        </div>
        <span>{"\u{1F33F}"}</span>
      </div>
      <div className="promo orange">
        <div>
          <h3>
            Top Brands
            <br />
            Best Deals
          </h3>
          <button className="btn-white">Shop Now</button>
        </div>
        <span>{"\u{1F6CD}\uFE0F"}</span>
      </div>
    </section>
  );
}
