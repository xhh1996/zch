import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // 这里可以添加表单提交逻辑，如发送到API
    setSubmitted(true);
    // 重置表单
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">联系我</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <i className="icon-phone"></i>
              <h3>电话</h3>
              <p>15321121314</p>
            </div>
            <div className="contact-item">
              <i className="icon-email"></i>
              <h3>邮箱</h3>
              <p>982636986@qq.com</p>
            </div>
            <div className="contact-item">
              <i className="icon-location"></i>
              <h3>求职意向</h3>
              <p>前端开发 | 一周内到岗</p>
            </div>
          </div>

          <div className="contact-form-container">
            <h3>发送信息</h3>
            {submitted ? (
              <div className="success-message">
                <p>消息已发送，感谢您的联系！</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">姓名</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">邮箱</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">留言</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">
                  发送
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
