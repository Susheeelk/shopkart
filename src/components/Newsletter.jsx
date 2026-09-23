import { useState } from "react";
import { FiMail } from "react-icons/fi";
import "./Newsletter.css";
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail("");
  };
  return (
    <section className="container">
      <div className="newsletter">
        <FiMail className="mail-icon" />
        <div className="nl-text">
          <h3>Stay Updated</h3>
          <p>Get the latest offers, new arrivals and exclusive deals.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
