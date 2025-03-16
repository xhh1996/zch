import React from "react";
import "./style.css";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>赵春晖</h1>
        <p>前端开发工程师 | 腾讯科技</p>
        <div className="hero-buttons">
          <a href="#about" className="btn btn-primary">
            了解更多
          </a>
          <a href="#contact" className="btn btn-secondary">
            联系我
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
