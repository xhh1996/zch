import React, { useEffect, useRef } from "react";
import "./style.css";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const experiences: ExperienceItem[] = [
    {
      title: "前端开发工程师",
      company: "腾讯科技",
      period: "2021-07 ~ 至今",
      description: [
        "负责【腾讯文档】的开发、迭代 与 部分架构设计 工作，在职期间共完成功能与迭代共计 50 余项，并得到 5 星年终评价",
        "多次参与性能优化方案设计与落地工作，涉及到：用户批注、离线编辑、多人协同 等多种业务场景。性能最高提升超 300 %",
        "负责 技术分享与方案沉淀，例如：工程化方案、代码标准化方案、工作流沉淀 等，并被多个项目组认可、使用",
        "负责开发里程碑确认、项目落地、新人培训、技术分享、文档技术沉淀 等工作",
      ],
    },
  ];

  const projects: ExperienceItem[] = [
    {
      title: "基于 Canvas 服务端渲染综合解决方案",
      company: "腾讯文档 PPT 渲染方案",
      period: "",
      description: [
        "项目背景：开发基于 Canvas 的服务端渲染（SSR）方案，提高页面打开速度，解决掉性能卡点问题。并优化渲染一致性和缓存命中率，极大地还原了实际文档的绘制效果。目前该方案已定为 腾讯内部文档类 渲染标准方案",
        "技术难点：",
        "在服务端生成标准化渲染指令，客户端读取指令进行像素级渲染，以达到 文字排版、字体渲染、复杂图形绘制 的高度同步",
        "基于自定义缓存策略配合压缩算法，解决 Canvas 绘制时性能消耗较大的问题，优化后性能提交超 300%",
        "制定独立的缓存策略。基于内容版本进行独立控制，设计增量更新机制，仅缓存变化部分，并设置定期清理策略",
        "优化首屏渲染效率，在 SSR 渲染的同时，自动完成渲染指令缓存，通过缓存指令提高缓存命中率",
        "基于 Web Workers 分担渲染任务，解决低性能设备渲染压力的问题",
      ],
    },
    {
      title: "腾讯文档 PPT 模块",
      company: "",
      period: "",
      description: [
        "项目背景：负责 PPT 模块的落地工作，包括：批注、协作、无障碍、数据持久化、离线编辑 等功能",
        "技术难点：",
        "构建整个 拖拽、变化 的编辑能力，提供 AABB 盒编辑方案，支持任意元素的 吸附、变化、旋转 等能力",
        "维护独立数据队列，解决高并发状态下，多人协作的状态无序问题，设计到 批注、状态 等多种业务场景",
        "设计检测与合并策略，解决多人协作编辑同一块内容时导致的内容冲突问题，该策略已应用在多个项目下",
        "针对大量数据的离线编辑场景进行分块存储，对敏感数据进行本地加密，针对资源文件和文档内容执行分离存储策略",
        "针对多人协作网络波动（断开、重连）时出现的网络恢复时的协同冲突问题，基于 CRDT + OT 方案实现自动合并策略",
        "基于 canvas 代替真实 DOM 绘制，避免回流问题。基于分层绘制，解决元素频繁 拖动、变化 时大量计算的性能问题",
      ],
    },
  ];

  const education = [
    {
      degree: "硕士",
      field: "计算机科学与技术",
      school: "北京邮电大学",
      period: "2018-09 ~ 2021-06",
    },
    {
      degree: "本科",
      field: "测控技术与仪器",
      school: "北京邮电大学",
      period: "2014-09 ~ 2018-06",
    },
  ];

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
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">工作经验</h2>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <p className="period">{exp.period}</p>
                <ul className="description-list">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <h2 className="section-title">项目经验</h2>
        <div className="project-list">
          {projects.map((project, index) => (
            <div className="project-item" key={index}>
              <h3>{project.title}</h3>
              <h4>{project.company}</h4>
              <ul className="description-list">
                {project.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="section-title">教育背景</h2>
        <div className="education-list">
          {education.map((edu, index) => (
            <div className="education-item" key={index}>
              <h3>{edu.school}</h3>
              <h4>
                {edu.field}（{edu.degree}）
              </h4>
              <p className="period">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
