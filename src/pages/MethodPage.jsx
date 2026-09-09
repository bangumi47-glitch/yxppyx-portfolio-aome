import { useEffect, useRef, useState } from "react";
import LineSidebar from "../components/LineSidebar.jsx";
import {
  CLAIM,
  METHOD_STATS,
  SECTIONS,
  GATES,
  GATE_EXTRA,
  INSTANCES,
  SYSTEM,
  SKELETONS,
} from "../data/method.js";

function Block({ name, def, desc, good, bad, points, transfer }) {
  const lead = def || desc;
  return (
    <article className="mps__block">
      <h3 className="mps__block-title">{name}</h3>
      {lead && <p className="mps__block-def">{lead}</p>}

      {good && (
        <div className="mps__cases">
          {good.map((g) => (
            <p className="mps__case mps__case--good" key={g}>
              <span className="mps__case-tag">通过</span>
              {g}
            </p>
          ))}
          {bad && (
            <p className="mps__case mps__case--bad">
              <span className="mps__case-tag">避免</span>
              {bad}
            </p>
          )}
        </div>
      )}

      {!good && points && (
        <ul className="mps__points">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}

      {transfer && (
        <p className="mps__transfer">
          <span className="mps__transfer-label">迁移</span>
          {transfer}
        </p>
      )}
    </article>
  );
}

function SectionHead({ num, title, intro }) {
  return (
    <>
      <h2 className="mps__section-title">
        <span className="mps__section-num">{num}</span>
        {title}
      </h2>
      {intro && <p className="mps__section-intro">{intro}</p>}
    </>
  );
}

export default function MethodPage() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  // 滚动联动左侧目录高亮
  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    const arr = Array.from(wrap.querySelectorAll(".mps__section"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(arr.indexOf(e.target));
        });
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    arr.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleClick = (index) => {
    const arr = ref.current?.querySelectorAll(".mps__section");
    arr?.[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mps" ref={ref}>
      <header className="mps__hero">
        <div className="container">
          <a className="mps__back" href="#method">
            ← 返回作品集
          </a>
          <h1 className="mps__title">选题方法论</h1>
          <p className="mps__lead">{CLAIM.lead}</p>
          <p className="mps__desc">{CLAIM.desc}</p>
          <div className="mps__stats">
            {METHOD_STATS.map((s) => (
              <div className="mps__stat" key={s.label}>
                <span className="mps__stat-value">{s.value}</span>
                <span className="mps__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="container mps__layout">
        <aside className="mps__sidebar">
          <LineSidebar
            items={SECTIONS.map((s) => s.title)}
            accentColor="#6d8dff"
            textColor="#bcc9e0"
            markerColor="#7b8aa8"
            fontSize={0.78}
            active={active}
            onItemClick={handleClick}
          />
        </aside>

        <div className="mps__content">
          {/* 01 四问硬闸 */}
          <section className="mps__section" id="gates">
            <SectionHead
              num="01"
              title="四问硬闸"
              intro="四问回答「能不能做」，五问回答「做的话好不好」。"
            />
            <div className="mps__grid">
              {GATES.map((g) => (
                <article className="gate" key={g.num}>
                  <div className="gate__head">
                    <span className="gate__num">{g.num}</span>
                    <h3 className="gate__title">{g.title}</h3>
                  </div>
                  <p className="gate__ask">{g.ask}</p>
                  <p className="gate__rule">{g.rule}</p>
                  <div className="gate__cases">
                    <p className="gate__case gate__case--good">
                      <span className="gate__tag">通过</span>
                      {g.good}
                    </p>
                    <p className="gate__case gate__case--bad">
                      <span className="gate__tag">淘汰</span>
                      {g.bad}
                    </p>
                  </div>
                  {g.marketing && (
                    <p className="gate__marketing">
                      <span className="gate__marketing-label">营销对应</span>
                      {g.marketing}
                    </p>
                  )}
                </article>
              ))}
            </div>
            <div className="mps__blocks">
              {GATE_EXTRA.map((b) => (
                <Block key={b.name} {...b} />
              ))}
            </div>
          </section>

          {/* 02 判断实例 */}
          <section className="mps__section" id="instances">
            <SectionHead
              num="02"
              title="判断实例"
              intro="五篇稿件，看同一套四问在不同选题上怎么用。"
            />
            <div className="mps__instances">
              {INSTANCES.map((it) => (
                <article className="instance" key={it.link}>
                  <div className="instance__head">
                    <a
                      className="instance__title"
                      href={it.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {it.title}
                    </a>
                    <span className="instance__reads">阅读 {it.reads}</span>
                  </div>
                  <div className="instance__row">
                    <span className="instance__label">现象</span>
                    <p className="instance__text">{it.phenomenon}</p>
                  </div>
                  <div className="instance__row">
                    <span className="instance__label">关键依据</span>
                    <p className="instance__text">{it.evidence}</p>
                  </div>
                  <div className="instance__row instance__row--judgment">
                    <span className="instance__label">判断</span>
                    <p className="instance__text">{it.judgment}</p>
                  </div>
                  {it.selection && (
                    <details className="instance__more">
                      <summary>查看完整选题与提纲</summary>
                      <div className="instance__doc">
                        <span className="instance__doc-label">选题.txt</span>
                        <pre className="instance__doc-body">{it.selection}</pre>
                        <span className="instance__doc-label">提纲</span>
                        <pre className="instance__doc-body">{it.outline}</pre>
                      </div>
                    </details>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* 03 方法体系 */}
          <section className="mps__section" id="system">
            <SectionHead
              num="03"
              title="方法体系"
              intro="四问之外，一套完整的选题流程。"
            />
            <div className="mps__blocks">
              {SYSTEM.map((b) => (
                <Block key={b.name} {...b} />
              ))}
            </div>

            <h3 className="mps__sub">八类选题骨架</h3>
            <div className="mps__table-wrap">
              <table className="mps__table">
                <thead>
                  <tr>
                    <th>骨架</th>
                    <th>追问结构</th>
                    <th>适合场景</th>
                    <th>我的作品</th>
                  </tr>
                </thead>
                <tbody>
                  {SKELETONS.map((s) => (
                    <tr key={s.name}>
                      <td className="mps__td-name">{s.name}</td>
                      <td>{s.flow}</td>
                      <td>{s.fit}</td>
                      <td className="mps__td-sample">
                        <a
                          className="mps__sample-link"
                          href={s.sample.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.sample.title}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
