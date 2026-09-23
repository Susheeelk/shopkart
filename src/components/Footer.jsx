import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Footer.css";
const cols = {
  Shop: [
    ["All Products", "/products"],
    ["New Arrivals", "/products"],
    ["Best Sellers", "/products"],
    ["Deals", "/products?deals=1"],
  ],
  Help: [
    ["Contact Us", "/contact"],
    ["Track Order", "/cart"],
    ["Returns & Refunds", "/contact"],
    ["FAQs", "/contact"],
  ],
  About: [
    ["Our Story", "/about"],
    ["Careers", "/about"],
    ["Terms & Conditions", "/about"],
    ["Privacy Policy", "/about"],
  ],
};
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2>{"\u{1F6D2}"} ShopKart</h2>
          <p>Shop Smarter, Live Better.</p>
          <div className="social">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
            <FaLinkedinIn />
          </div>
        </div>
        {Object.entries(cols).map(([title, items]) => (
          <div key={title}>
            <h4>{title}</h4>
            {items.map(([label, to]) => (
              <Link key={label} to={to}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <p className="copy">© 2024 ShopKart. All rights reserved.</p>
    </footer>
  );
}
