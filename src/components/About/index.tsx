import React, { useEffect, useRef } from "react";
import "./style.css";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">关于我</h2>
        <div className="about-content">
          <div className="about-info">
            <div className="about-text">
              <p>
                北京邮电大学 本 + 硕 学历，在校绩点 3.5（前 5%），英语 6 级（583
                分），具有使用英语进行工作 + 日常沟通的能力。
              </p>
              <p>
                近 4 年腾讯前端工作经验，React
                技术栈，负责【腾讯文档】开发。工作内容涉及到：架构设计、工程化方案、功能迭代推进等，为项目整体结果与落地负责。在职期间获得
                5 星（最高）年终评价。
              </p>
              <p>
                熟悉前端常见技术，对算法逻辑有一定的理解。针对【腾讯文档】复杂功能具有自己独到的见解，如：用户批注、实时协作、多人数据同步、状态持久化、离线编辑、性能优化、兼容性处理、权限控制与安全管理
                等。
              </p>
            </div>
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-label">年龄:</span>
                <span className="detail-value">29岁</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">性别:</span>
                <span className="detail-value">女</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">工作年限:</span>
                <span className="detail-value">3年</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">电话:</span>
                <span className="detail-value">15321121314</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">邮箱:</span>
                <span className="detail-value">982636986@qq.com</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">学历:</span>
                <span className="detail-value">北京邮电大学（本 + 硕）</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
