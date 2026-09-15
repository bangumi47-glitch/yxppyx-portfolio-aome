import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// 首屏胶片背景：四段各自独立的图组，段间不重样
// 素材共 68 张：hero-bg/1-55.jpg（含新增压缩图）+ 文章封面 13 张
const FILM_ROWS = [
  // 第 1 段（17 张）
  [
    "/hero-bg/1.jpg",
    "/hero-bg/5.jpg",
    "/hero-bg/9.jpg",
    "/hero-bg/13.jpg",
    "/hero-bg/17.jpg",
    "/hero-bg/21.jpg",
    "/hero-bg/25.jpg",
    "/hero-bg/29.jpg",
    "/hero-bg/33.jpg",
    "/hero-bg/37.jpg",
    "/hero-bg/41.jpg",
    "/hero-bg/45.jpg",
    "/hero-bg/49.jpg",
    "/hero-bg/53.jpg",
    "/covers/4.jpg",
    "/covers/9.jpg",
    "/covers/17.jpg",
  ],
  // 第 2 段（17 张）
  [
    "/hero-bg/2.jpg",
    "/hero-bg/6.jpg",
    "/hero-bg/10.jpg",
    "/hero-bg/14.jpg",
    "/hero-bg/18.jpg",
    "/hero-bg/22.jpg",
    "/hero-bg/26.jpg",
    "/hero-bg/30.jpg",
    "/hero-bg/34.jpg",
    "/hero-bg/38.jpg",
    "/hero-bg/42.jpg",
    "/hero-bg/46.jpg",
    "/hero-bg/50.jpg",
    "/hero-bg/54.jpg",
    "/covers/6.jpg",
    "/covers/10.jpg",
    "/covers/18.jpg",
  ],
  // 第 3 段（17 张）
  [
    "/hero-bg/3.jpg",
    "/hero-bg/7.jpg",
    "/hero-bg/11.jpg",
    "/hero-bg/15.jpg",
    "/hero-bg/19.jpg",
    "/hero-bg/23.jpg",
    "/hero-bg/27.jpg",
    "/hero-bg/31.jpg",
    "/hero-bg/35.jpg",
    "/hero-bg/39.jpg",
    "/hero-bg/43.jpg",
    "/hero-bg/47.jpg",
    "/hero-bg/51.jpg",
    "/hero-bg/55.jpg",
    "/covers/7.jpg",
    "/covers/13.jpg",
    "/covers/21.jpg",
  ],
  // 第 4 段（17 张）
  [
    "/hero-bg/4.jpg",
    "/hero-bg/8.jpg",
    "/hero-bg/12.jpg",
    "/hero-bg/16.jpg",
    "/hero-bg/20.jpg",
    "/hero-bg/24.jpg",
    "/hero-bg/28.jpg",
    "/hero-bg/32.jpg",
    "/hero-bg/36.jpg",
    "/hero-bg/40.jpg",
    "/hero-bg/44.jpg",
    "/hero-bg/48.jpg",
    "/hero-bg/52.jpg",
    "/covers/1.jpg",
    "/covers/8.jpg",
    "/covers/16.jpg",
    "/covers/22.jpg",
  ],
];

export default function Hero() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 开屏：四条胶片带从四个方向拉入，旋转也由 GSAP 接管
      const rows = gsap.utils.toArray(".hero__film-row");
      const offsets = [
        { xPercent: -130, yPercent: -70 },
        { xPercent: 130, yPercent: -35 },
        { xPercent: -130, yPercent: 35 },
        { xPercent: 130, yPercent: 70 },
      ];
      rows.forEach((row, i) => {
        gsap.set(row, {
          rotate: -7,
          opacity: 0,
          xPercent: offsets[i].xPercent,
          yPercent: offsets[i].yPercent,
        });
      });
      gsap.to(rows, {
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
        duration: 1.35,
        ease: "power3.out",
        stagger: 0.1,
      });

      // 标题初始位置交给 GSAP 设置：CSS 里不能再写 transform，否则会和 yPercent 叠加
      gsap.set(".hero__title-text", { yPercent: 110 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero__eyebrow", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.5)
        .to(".hero__title-text", { yPercent: 0, duration: 1.05 }, 0.65)
        .fromTo(".hero__subtitle", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 1.05)
        .fromTo(".hero__motto", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 1.2)
        .fromTo(".hero__cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 1.35)
        .fromTo(".hero__scroll", { opacity: 0 }, { opacity: 1, duration: 0.7 }, 1.6);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={ref}>
      <a className="hero__copywork" href="#/copy">
        文案作品集
      </a>
      <div className="hero__film" aria-hidden="true">
        {FILM_ROWS.map((images, row) => (
          <div className="hero__film-row" key={row}>
            <div
              className="hero__film-track"
              style={{
                animationDuration: "75s",
                animationDirection: row % 2 === 0 ? "normal" : "reverse",
              }}
            >
              {images.map((src, i) => (
                <img key={i} src={src} alt="" loading="lazy" />
              ))}
              {images.map((src, i) => (
                <img key={`d${i}`} src={src} alt="" loading="lazy" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="hero__content">
        <p className="hero__eyebrow">游戏产业深度报道</p>
        <h1 className="hero__title">
          <span className="hero__mask">
            <span className="hero__title-text">游戏内容与传播作品集</span>
          </span>
        </h1>
        <p className="hero__subtitle">二次元 + 射击赛道 · 一线采访 · 深度内容与社区洞察</p>
        <p className="hero__motto">把判断讲清楚，把产品讲明白。</p>
        <a className="hero__cta" href="#featured">
          查看精选作品
        </a>
      </div>
      <a className="hero__scroll" href="#stats" aria-label="向下滚动">
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}
