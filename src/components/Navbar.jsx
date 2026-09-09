import { useEffect, useState } from "react";

const LINKS = [
  { href: "#featured", label: "精选" },
  { href: "#sources", label: "采访" },
  { href: "#skills", label: "优势" },
  { href: "#method", label: "方法" },
  { href: "#works", label: "全部作品" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <a className="navbar__logo" href="#top">
          <img className="navbar__logo-img" src="/logo.jpg" alt="logo" />
          <span>游戏内容与传播作品集</span>
        </a>
        <nav className="navbar__links">
          {LINKS.map((l) => (
            <a key={l.href} className="navbar__link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
