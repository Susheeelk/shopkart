import { useState } from "react";
import "./Pages.css";
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: backend API call (POST /api/contact)
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div className="container page contact">
      <h2>Contact Us</h2>
      <p className="muted">Koi sawaal ho to humein message karo.</p>
      {sent && (
        <div className="success">
          Message bhej diya gaya {"\u2705"} Hum jaldi reply karenge.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your message"
          required
          value={form.message}
          onChange={handleChange}
        />
        <button className="btn">Send Message</button>
      </form>
    </div>
  );
}
