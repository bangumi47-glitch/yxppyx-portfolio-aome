import { useEffect } from "react";
import "./Lightbox.css";

// 点击图片放大查看：遮罩 + 原图，Esc 或点遮罩关闭
export default function Lightbox({ src, caption, onClose }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // 打开期间锁滚动
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="关闭">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <figure className="lightbox__figure">
        <img className="lightbox__img" src={src} alt={caption || ""} />
        {caption && <figcaption className="lightbox__caption">{caption}</figcaption>}
      </figure>
    </div>
  );
}
