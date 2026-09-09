// 板块标题：编号 + 遮罩揭开文字 + 装饰线
export default function SectionTitle({ num, children }) {
  return (
    <h2 className="section-title">
      <span className="section-title__num">{num}</span>
      <span className="section-title__mask">
        <span className="section-title__text">{children}</span>
      </span>
      <span className="section-title__line" aria-hidden="true" />
    </h2>
  );
}
