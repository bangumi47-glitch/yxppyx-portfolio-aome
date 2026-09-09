import SectionTitle from "./SectionTitle.jsx";
import { WORKS, sortWorks, readsLabel } from "../data/works.js";

// 采访覆盖的产品：2 家独家专访置顶，其余为常规采访
const SOURCES = [
  { name: "弧光猎人", exclusive: true },
  { name: "迈亚融解", exclusive: true },
  { name: "湮灭之潮" },
  { name: "穿越火线潜伏" },
  { name: "抵抗者" },
  { name: "古剑" },
];

// 独家专访的置顶顺序，与上方标签保持一致
const EXCLUSIVE_ORDER = [
  "https://mp.weixin.qq.com/s/W2rJBMTWH1Ecu61jqus6ew", // 弧光猎人
  "https://mp.weixin.qq.com/s/RS4-444ywg_-3ctThHgD0Q", // 迈亚融解
];

export default function Sources() {
  const interviews = sortWorks(WORKS)
    .filter((w) => w.type === "采访" || w.type === "专访")
    .sort((a, b) => {
      const pa = EXCLUSIVE_ORDER.indexOf(a.link);
      const pb = EXCLUSIVE_ORDER.indexOf(b.link);
      return (pa === -1 ? Infinity : pa) - (pb === -1 ? Infinity : pb);
    });

  return (
    <section className="sources" id="sources">
      <div className="container">
        <SectionTitle num="03">采访与信源</SectionTitle>
        <p className="sources__desc">
          6 篇制作人专访由我独立完成约访、对接与成稿，覆盖 4 款产品，其中 2 家取得独家专访。
        </p>
        <div className="sources__list">
          {SOURCES.map((s) => (
            <span
              key={s.name}
              className={`source ${s.exclusive ? "source--exclusive" : ""}`}
            >
              {s.name}
              {s.exclusive && <em className="source__tag">独家</em>}
            </span>
          ))}
        </div>

        <div className="sources__works">
          {interviews.map((w) => (
            <a
              key={w.link}
              className="source-work"
              href={w.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="source-work__cover"
                style={{
                  backgroundImage: `url(${w.cover})`,
                  backgroundPosition: w.coverPos,
                }}
              />
              <div className="source-work__body">
                <div className="source-work__tags">
                  <span className="tag">{w.type}</span>
                  {w.exclusive && (
                    <span className="tag tag--exclusive">独家</span>
                  )}
                </div>
                <h3 className="source-work__title">{w.title}</h3>
                <p className="source-work__summary">{w.summary}</p>
                <div className="source-work__meta">
                  <span>游戏日报</span>
                  <span>阅读 {readsLabel(w)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
