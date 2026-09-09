import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKS, sortWorks, readsLabel, hotLabel } from "../data/works.js";
import SectionTitle from "./SectionTitle.jsx";
import useTilt from "../hooks/useTilt.js";
import LineSidebar from "./LineSidebar.jsx";
import ViewToggle from "./ViewToggle.jsx";

gsap.registerPlugin(ScrollTrigger);

const TRACKS = ["all", "二游", "射击", "单机", "现场·行业"];
const TYPES = ["all", "深度", "采访", "专访"];
const PAGE_SIZE = 8;

function WorkCard({ w }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(6);

  return (
    <a
      ref={ref}
      className="work-card"
      href={w.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="work-card__cover"
        style={
          w.cover
            ? { backgroundImage: `url(${w.cover})`, backgroundPosition: w.coverPos }
            : undefined
        }
      >
        {w.hot && <span className="work-card__hot">{hotLabel(w)}</span>}
      </div>
      <div className="work-card__body">
        <div className="work-card__tags">
          <span className="tag">{w.track}</span>
          <span className="tag">{w.type}</span>
        </div>
        <h3 className="work-card__title">{w.title}</h3>
        <p className="work-card__summary">{w.summary}</p>
        <div className="work-card__meta">
          <span>游戏日报</span>
          <span>阅读 {readsLabel(w)}</span>
        </div>
      </div>
    </a>
  );
}

function WorkItem({ w }) {
  return (
    <a className="work-item" href={w.link} target="_blank" rel="noopener noreferrer">
      <div
        className="work-item__cover"
        style={
          w.cover
            ? { backgroundImage: `url(${w.cover})`, backgroundPosition: w.coverPos }
            : undefined
        }
      >
        {w.hot && <span className="work-item__hot">{hotLabel(w)}</span>}
      </div>
      <div className="work-item__body">
        <div className="work-item__tags">
          <span className="tag">{w.track}</span>
          <span className="tag">{w.type}</span>
        </div>
        <h3 className="work-item__title">{w.title}</h3>
        <p className="work-item__summary">{w.summary}</p>
        <div className="work-item__meta">
          <span>游戏日报</span>
          <span>阅读 {readsLabel(w)}</span>
        </div>
      </div>
    </a>
  );
}

export default function AllWorks() {
  const [track, setTrack] = useState("all");
  const [type, setType] = useState("all");
  const [view, setView] = useState("list");
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  const list = sortWorks(WORKS).filter((w) => {
    const okTrack = track === "all" || w.track === track;
    const okType = type === "all" || w.type === type;
    return okTrack && okType;
  });
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const pageList = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // 筛选或类型变化时重置到第一页
  useEffect(() => {
    setPage(1);
  }, [track, type]);

  // 宫格视图：卡片滚动 stagger（筛选/视图变化时触发，翻页不重触发）
  useEffect(() => {
    if (view !== "grid") return;
    const ctx = gsap.context(() => {
      gsap.from(".work-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: { trigger: ".works__grid", start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, [view, track, type]);

  // 竖向视图：滚动跟踪当前作品联动目录高亮
  useEffect(() => {
    if (view !== "list") return;
    const items = listRef.current?.querySelectorAll(".work-item");
    if (!items) return;
    const arr = Array.from(items);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(arr.indexOf(e.target));
        });
      },
      { threshold: 0.5, rootMargin: "-40% 0px -40% 0px" }
    );
    arr.forEach((it) => obs.observe(it));
    return () => obs.disconnect();
  }, [view, track, type, page]);

  const handleItemClick = (index) => {
    const items = listRef.current?.querySelectorAll(".work-item");
    items?.[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const goPage = (p) => {
    setPage(p);
    document.getElementById("works")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="works" id="works">
      <div className="container">
        <div className="section-head">
          <SectionTitle num="06">全部作品</SectionTitle>
          <ViewToggle view={view} onChange={setView} />
        </div>

        <div className="filters">
          <div className="filters__group">
            {TRACKS.map((t) => (
              <button
                key={t}
                className={`filter-btn ${track === t ? "is-active" : ""}`}
                onClick={() => setTrack(t)}
              >
                {t === "all" ? "全部" : t}
              </button>
            ))}
          </div>
          <div className="filters__group">
            {TYPES.map((t) => (
              <button
                key={t}
                className={`filter-btn ${type === t ? "is-active" : ""}`}
                onClick={() => setType(t)}
              >
                {t === "all" ? "全部类型" : t}
              </button>
            ))}
          </div>
        </div>

        {view === "list" ? (
          <div className="works__layout">
            <aside className="works__sidebar">
              <LineSidebar
                items={pageList.map((w) => w.title)}
                accentColor="#6d8dff"
                textColor="#bcc9e0"
                markerColor="#7b8aa8"
                fontSize={0.78}
                active={active}
                onItemClick={handleItemClick}
              />
            </aside>
            <div className="works__list" ref={listRef}>
              {pageList.map((w) => (
                <WorkItem key={w.link} w={w} />
              ))}
            </div>
          </div>
        ) : (
          <div className="works__grid">
            {pageList.map((w) => (
              <WorkCard key={w.link} w={w} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination__btn"
              onClick={() => goPage(page - 1)}
              disabled={page === 1}
            >
              上一页
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`pagination__page ${page === p ? "is-active" : ""}`}
                onClick={() => goPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="pagination__btn"
              onClick={() => goPage(page + 1)}
              disabled={page === totalPages}
            >
              下一页
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
