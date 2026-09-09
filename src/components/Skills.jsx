import SectionTitle from "./SectionTitle.jsx";
import GameList from "./GameList.jsx";

const PROFESSIONAL = [
  {
    icon: "✍️",
    title: "内容策划与传播",
    desc: "多媒介创作经验，熟悉从策划到执行的完整流程；基于产品卖点与用户偏好产出传播内容，覆盖专访、深度稿、脚本等多元形式。",
  },
  {
    icon: "🔗",
    title: "KOL合作与创作者沟通",
    desc: "与制作人、核心信源对接的实战经验，精准理解需求、清晰传递创意；熟悉二次元社区与核心创作者的内容形态。",
  },
  {
    icon: "🎮",
    title: "二次元玩家社区洞察",
    desc: "13000+ 小时游戏体验，长期追踪 B站、NGA、小黑盒等核心社区，从玩家反馈与社区热点提炼洞察反哺传播。",
  },
  {
    icon: "📈",
    title: "数据驱动的执行思维",
    desc: "依托阅读量、互动率、增长趋势验证内容效果并持续调整；跨团队沟通与项目推进，注重执行细节与结果达成。",
  },
];

const SUMMARY = [
  {
    icon: "🔄",
    title: "坚韧与调整",
    desc: "在高压产出中历经推倒重来，把挫折转化为调整的动力，长线保持稳定输出。",
  },
  {
    icon: "💡",
    title: "共情与洞察",
    desc: "兼具同理心与表达欲，精准捕捉玩家情绪与团队需求，转化为有传播力的文字。",
  },
  {
    icon: "🤝",
    title: "协作与推进",
    desc: "跨团队沟通与大型活动统筹经验，在多方协同中推动共识与执行。",
  },
];

function SkillCard({ icon, title, desc }) {
  return (
    <div className="skill-card">
      <div className="skill-card__icon">{icon}</div>
      <h3 className="skill-card__title">{title}</h3>
      <p className="skill-card__desc">{desc}</p>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <SectionTitle num="04">个人优势</SectionTitle>

        <div className="skills__group">
          <h3 className="skills__subtitle">专业技能</h3>
          <div className="skills__grid">
            {PROFESSIONAL.map((s) => (
              <SkillCard key={s.title} {...s} />
            ))}
          </div>
        </div>

        <div className="skills__group">
          <h3 className="skills__subtitle">游戏经历</h3>
          <GameList />
        </div>

        <div className="skills__group">
          <h3 className="skills__subtitle">个人总结</h3>
          <div className="skills__grid skills__grid--summary">
            {SUMMARY.map((s) => (
              <SkillCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
