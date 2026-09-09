import { useRef } from "react";
import gsap from "gsap";

// 3D 倾斜翻转 + 涟漪定位（仅作品卡片使用）
// 鼠标移动时平滑倾斜，离开时用弹性缓动回弹归位
export default function useTilt(maxTilt = 8) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    gsap.to(el, {
      rotationX: -py * maxTilt,
      rotationY: px * maxTilt,
      y: -3,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 900,
      overwrite: "auto",
    });
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      rotationX: 0,
      rotationY: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.65)",
      transformPerspective: 900,
      overwrite: "auto",
    });
  };

  return { ref, handleMouseMove, handleMouseLeave };
}
