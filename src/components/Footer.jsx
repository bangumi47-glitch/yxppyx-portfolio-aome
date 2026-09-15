import { useEffect, useRef, useState } from "react";

const EMAIL = "3069291598@qq.com";

const STRENGTHS = [
  {
    label: "懂玩家",
    text: "13000+ 小时多品类体验，长期追踪 B 站、NGA、小黑盒，能读懂玩家真正在意什么",
  },
  {
    label: "懂内容",
    text: "3 个月 22 篇深度稿，其中 6 篇 10w+；6 篇制作人专访，其中 2 家独家",
  },
  {
    label: "懂方法",
    text: "有一套可复用的选题判断方法，从发现到成稿有完整流程，不只靠灵感",
  },
  {
    label: "能协作",
    text: "主持过 8 场大型活动，对接过多方团队，习惯把想法推进到落地",
  },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // 降级：旧浏览器用临时输入框选中复制
      const input = document.createElement("textarea");
      input.value = EMAIL;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="footer" id="about">
      <div className="footer__inner">
        <div className="footer__layout">
          <div className="footer__card">
            <img className="footer__avatar" src="/logo.jpg" alt="谢煜泉" />
            <h2 className="footer__name">谢煜泉</h2>
            <span className="footer__line" aria-hidden="true" />
            <p className="footer__role">游戏文案策划/游戏品牌营销 · 求职中</p>
            <p className="footer__bio">二次元射击大手子</p>

            <button className="footer__mail" type="button" onClick={handleCopy}>
              {EMAIL}
            </button>

            {copied && (
              <span className="footer__toast" role="status">
                邮箱已复制
              </span>
            )}
          </div>

          <div className="footer__pitch">
            <p className="footer__intent">求职意向：游戏文案策划/游戏品牌营销</p>

            <div className="footer__block">
              <h3 className="footer__block-title">为什么想做</h3>
              <p className="footer__block-text">
                在游戏里投入一万三千小时，在游戏媒体写了三个月深度稿。这两段经历让我相信，
                真正打动玩家的内容，往往是最懂他们的那个。我想站在产品这一边，
                把品牌与价值，落实为可触碰、可感知、可参与的实际结果。
              </p>
            </div>

            <div className="footer__block">
              <h3 className="footer__block-title">为什么能做</h3>
              <ul className="footer__strengths">
                {STRENGTHS.map((s) => (
                  <li className="footer__strength" key={s.label}>
                    <span className="footer__strength-label">{s.label}</span>
                    <span className="footer__strength-text">{s.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="footer__copyright">© 2026 游戏内容与传播作品集</p>
      </div>
    </footer>
  );
}
