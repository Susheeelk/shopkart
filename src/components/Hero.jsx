import "./Hero.css";
export default function Hero() {
  return (
    <section className="container">
      <div className="hero">
        <div className="hero-text">
          <h2>
            Upgrade
            <br />
            Your Everyday
          </h2>
          <p>Top brands. Great prices. Better you.</p>
          <button className="btn">Shop Now</button>
        </div>
        <div className="hero-img">{"\u{1F3A7}\u231A\u{1F4F1}"}</div>
        <div className="hero-side">
          <h3>
            New
            <br />
            Arrivals
          </h3>
        </div>
      </div>
      <div className="dots">
        <span className="active" />
        <span />
        <span />
      </div>
    </section>
  );
}
