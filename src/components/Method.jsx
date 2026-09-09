import SectionTitle from "./SectionTitle.jsx";

// 首页概览：流程四步
const FLOW = [
  {
    step: "01",
    title: "选题发现",
    desc: "官方动态 → 社区信号 → 跨社区印证 → 反过来问",
  },
  {
    step: "02",
    title: "四问硬闸",
    desc: "任一问不通即淘汰，不进入写作环节",
  },
  {
    step: "03",
    title: "匹配骨架",
    desc: "八种追问结构，按选题特征对号入座",
  },
  {
    step: "04",
    title: "成稿发布",
    desc: "提纲两段递进，每部分论据不超过三条",
  },
];

// 方法论规模
const STATS = [
  { value: "4", label: "个判断闸门" },
  { value: "5", label: "篇判断实例" },
  { value: "8", label: "类选题骨架" },
];

export default function Method() {
  return (
    <section className="method" id="method">
      <div className="container">
        <SectionTitle num="05">选题方法</SectionTitle>
        <p className="method__lead">判断一个内容值不值得做，我用四个问题。</p>
        <p className="method__intro">
          三个月里把选题判断沉淀成一套可复用的流程：先判断能不能写，再决定怎么写。
          四问是硬闸，任一不通就直接淘汰。
        </p>

        <div className="method__flow">
          {FLOW.map((f, i) => (
            <div className="method__step" key={f.step}>
              <span className="method__step-num">{f.step}</span>
              <h3 className="method__step-title">{f.title}</h3>
              <p className="method__step-desc">{f.desc}</p>
              {i < FLOW.length - 1 && (
                <span className="method__arrow" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="method__stats">
          {STATS.map((s) => (
            <div className="method__stat" key={s.label}>
              <span className="method__stat-value">{s.value}</span>
              <span className="method__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="method__cta-wrap">
          <a className="method__cta" href="#/method">
            查看完整方法论
          </a>
        </div>
      </div>
    </section>
  );
}
