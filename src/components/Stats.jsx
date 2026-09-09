import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle.jsx";

const STATS = [
  { value: 22, decimals: 0, suffix: "", label: "原创深度稿" },
  { value: 6, decimals: 0, suffix: "", label: "制作人专访" },
  { value: 5.4, decimals: 1, suffix: "w", label: "平均单篇阅读" },
  { value: 6, decimals: 0, suffix: "", label: "篇 10w+" },
  { value: 3, decimals: 0, suffix: "", label: "篇 20w+" },
];

function StatItem({ value, decimals, suffix, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    let started = false;
    let raf = 0;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            obs.disconnect();
            const duration = 1100;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay((value * eased).toFixed(decimals) + suffix);
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.6 }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, decimals, suffix]);

  return (
    <div className="stat" ref={ref}>
      <span className="stat__value">{display}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats" id="stats">
      <div className="container stats__inner">
        <div className="stats__intro">
          <SectionTitle num="01">关于这份作品集</SectionTitle>
          <p className="stats__desc">
            专注二次元与射击赛道的内容作者，三个月独立完成 22 篇产业深度稿件与 6
            篇制作人专访，从选题、采访到成稿发布全程独立推进。
          </p>
        </div>
        <div className="stats__grid">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
