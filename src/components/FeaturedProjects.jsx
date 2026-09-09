import { useEffect, useRef, useState } from "react";
import { WORKS, sortWorks, readsLabel, hotLabel } from "../data/works.js";
import SectionTitle from "./SectionTitle.jsx";
import LineSidebar from "./LineSidebar.jsx";
import ViewToggle from "./ViewToggle.jsx";

export default function FeaturedProjects() {
  const featured = sortWorks(WORKS).filter((w) => w.featured);
  const [view, setView] = useState("list");
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  const handleItemClick = (index) => {
    const items = listRef.current?.querySelectorAll(".featured-item");
    items?.[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // 竖向排列时，滚动跟踪当前作品联动目录高亮
  useEffect(() => {
    if (view !== "list") return;
    const items = listRef.current?.querySelectorAll(".featured-item");
    if (!items) return;
    const arr = Array.from(items);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(arr.indexOf(e.target));
        });
      },
      { threshold: 0.55, rootMargin: "-35% 0px -35% 0px" }
    );
    arr.forEach((it) => obs.observe(it));
    return () => obs.disconnect();
  }, [view]);

  return (
    <section className="featured" id="featured">
      <div className="container">
        <div className="section-head">
          <SectionTitle num="02">精选项目</SectionTitle>
          <ViewToggle view={view} onChange={setView} />
        </div>

        {view === "list" ? (
          <div className="featured__layout">
            <aside className="featured__sidebar">
              <LineSidebar
                items={featured.map((w) => w.title)}
                accentColor="#6d8dff"
                textColor="#bcc9e0"
                markerColor="#7b8aa8"
                fontSize={0.8}
                active={active}
                onItemClick={handleItemClick}
              />
            </aside>
            <div className="featured__list" ref={listRef}>
              {featured.map((w) => (
                <a
                  key={w.link}
                  className="featured-item"
                  href={w.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="featured-item__cover"
                    style={
                      w.cover
                        ? { backgroundImage: `url(${w.cover})`, backgroundPosition: w.coverPos }
                        : undefined
                    }
                  >
                    {w.hot && <span className="featured-item__hot">{hotLabel(w)}</span>}
                  </div>
                  <div className="featured-item__body">
                    <div className="featured-item__tags">
                      <span className="tag">{w.track}</span>
                      <span className="tag">{w.type}</span>
                    </div>
                    <h3 className="featured-item__title">{w.title}</h3>
                    <p className="featured-item__summary">{w.summary}</p>
                    <div className="featured-item__meta">
                      <span>游戏日报</span>
                      <span>阅读 {readsLabel(w)}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="featured__grid">
            {featured.map((w) => (
              <a
                key={w.link}
                className="feature-card"
                href={w.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="feature-card__cover"
                  style={
                    w.cover
                      ? { backgroundImage: `url(${w.cover})`, backgroundPosition: w.coverPos }
                      : undefined
                  }
                >
                  {w.hot && <span className="feature-card__hot">{hotLabel(w)}</span>}
                </div>
                <div className="feature-card__body">
                  <div className="feature-card__tags">
                    <span className="tag">{w.track}</span>
                    <span className="tag">{w.type}</span>
                  </div>
                  <h3 className="feature-card__title">{w.title}</h3>
                  <p className="feature-card__summary">{w.summary}</p>
                  <div className="feature-card__meta">
                    <span>游戏日报</span>
                    <span>阅读 {readsLabel(w)}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
