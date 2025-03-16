import React, { useEffect, useRef, useMemo } from "react";
import "./style.css";

interface Skill {
  name: string;
  level: number; // 1-100
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const skillsData = useMemo(
    () => [
      // 前端技术
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 90 },
      { name: "WebGL", level: 85 },
      { name: "Three.js", level: 85 },
      // 性能优化
      { name: "Canvas", level: 90 },
      { name: "性能优化", level: 85 },
      { name: "工程化", level: 80 },
      // 协作能力
      { name: "多人协同", level: 85 },
      { name: "文档能力", level: 90 },
      { name: "团队协作", level: 95 },
    ],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");

            const bars = document.querySelectorAll(".skill-progress-bar");
            bars.forEach((bar, index) => {
              setTimeout(() => {
                (
                  bar as HTMLElement
                ).style.width = `${skillsData[index].level}%`;
                bar.classList.add("animate");
              }, 300 + index * 100);
            });
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
  }, [skillsData]);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">技能</h2>
        <div className="skills-content">
          <div className="skills-description">
            <p>
              作为一名经验丰富的前端开发工程师，我精通React技术栈，并在腾讯文档项目中积累了丰富的实践经验。
              我擅长解决复杂的前端问题，包括用户批注、实时协作、多人数据同步、状态持久化、离线编辑、性能优化等。
            </p>
          </div>
          <div className="skills-list">
            {skillsData.map((skill, index) => (
              <div className="skill-item" key={index}>
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-progress">
                  <div
                    className="skill-progress-bar"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
