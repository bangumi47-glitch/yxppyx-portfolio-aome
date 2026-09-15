import { lazy, Suspense, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import FeaturedProjects from "./components/FeaturedProjects.jsx";
import Sources from "./components/Sources.jsx";
import Skills from "./components/Skills.jsx";
import Method from "./components/Method.jsx";
import AllWorks from "./components/AllWorks.jsx";
import Footer from "./components/Footer.jsx";
import Grainient from "./components/Grainient.jsx";
import BackToTop from "./components/BackToTop.jsx";

gsap.registerPlugin(ScrollTrigger);

// 方法论页体积大，拆成独立 chunk，只有访问 #/method 时才加载
const MethodPage = lazy(() => import("./pages/MethodPage.jsx"));
const CopyPage = lazy(() => import("./pages/CopyPage.jsx"));

// hash 路由：#/method 进方法页，#/copy 进文案作品集页，其余 hash 留在首页走锚点
const getPage = () => {
  const h = window.location.hash;
  if (h.startsWith("#/method")) return "method";
  if (h.startsWith("#/copy")) return "copy";
  return "home";
};

export default function App() {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const onHash = () => setPage(getPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // 页面切换后的滚动：进方法页回顶部，回首页滚到对应板块
  useEffect(() => {
    if (page === "method" || page === "copy") {
      window.scrollTo(0, 0);
      return;
    }
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    // 等 React 把首页渲染出来再滚，找不到就下一帧重试
    let raf = 0;
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
      if (tries++ < 20) raf = requestAnimationFrame(tryScroll);
    };
    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [page]);

  // 静态模块的滚动动效（标题遮罩揭开 + 卡片 stagger + 图 reveal）
  useEffect(() => {
    if (page !== "home") return;
    const ctx = gsap.context(() => {
      // 模块标题：遮罩揭开 + 编号/装饰线淡入
      gsap.utils.toArray(".section-title").forEach((el) => {
        gsap.fromTo(
          el.querySelector(".section-title__text"),
          { yPercent: 110, immediateRender: true },
          {
            yPercent: 0,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
        gsap.to(el.querySelectorAll(".section-title__num, .section-title__line"), {
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });

      // 数据带：介绍 + 数字卡片
      gsap.from(".stats__desc", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".stats__intro", start: "top 85%" },
      });
      gsap.from(".stat", {
        y: 48,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".stats__grid", start: "top 82%" },
      });

      // 精选项目：卡片 stagger + 封面 reveal
      gsap.from(".feature-card", {
        y: 56,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".featured__grid", start: "top 80%" },
      });
      gsap.from(".feature-card__cover", {
        scale: 1.2,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".featured__grid", start: "top 80%" },
      });

      // 采访与信源：标签 stagger + 采访卡片 stagger
      gsap.from(".source", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".sources__list", start: "top 85%" },
      });
      gsap.from(".source-work", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".sources__works", start: "top 82%" },
      });

      // 个人优势：卡片 stagger（两个分组各自触发）
      gsap.utils.toArray(".skills__grid").forEach((grid) => {
        gsap.from(grid.querySelectorAll(".skill-card"), {
          y: 48,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: grid, start: "top 82%" },
        });
      });

      // 选题方法：流程步骤 + 四问卡片 stagger
      gsap.from(".method__step", {
        y: 32,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".method__flow", start: "top 85%" },
      });
      gsap.from(".gate", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".method__grid", start: "top 82%" },
      });

      // 底部收尾：进场
      gsap.from(".footer__inner > *", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".footer", start: "top 70%" },
      });
    });

    return () => ctx.revert();
  }, [page]);

  if (page === "method") {
    return (
      <Suspense fallback={null}>
        <MethodPage />
        <BackToTop />
      </Suspense>
    );
  }

  if (page === "copy") {
    return (
      <Suspense fallback={null}>
        <CopyPage />
        <BackToTop />
      </Suspense>
    );
  }

  return (
    <>
      <div className="app-bg" aria-hidden="true">
        <Grainient
          color1="#5eb8d8"
          color2="#2d6a9a"
          color3="#0d1f3a"
          timeSpeed={0.25}
          contrast={1.2}
          saturation={1.05}
          zoom={0.9}
        />
      </div>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FeaturedProjects />
        <Sources />
        <Skills />
        <Method />
        <AllWorks />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
