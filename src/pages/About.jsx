import "./Pages.css";
export default function About() {
  return (
    <div className="container page about">
      <h2>About ShopKart</h2>
      <p>
        ShopKart ek online shopping platform hai jahan aapko top brands, achhe
        prices aur fast delivery milti hai. Hamara mission hai:{" "}
        <b>Shop Smarter, Live Better.</b>
      </p>
      <div className="stats">
        <div>
          <h3>10K+</h3>
          <p>Products</p>
        </div>
        <div>
          <h3>50K+</h3>
          <p>Happy Customers</p>
        </div>
        <div>
          <h3>100+</h3>
          <p>Top Brands</p>
        </div>
        <div>
          <h3>24/7</h3>
          <p>Support</p>
        </div>
      </div>
    </div>
  );
}
