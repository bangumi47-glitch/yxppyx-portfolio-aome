export default function ViewToggle({ view, onChange }) {
  return (
    <div className="view-toggle" role="group" aria-label="视图切换">
      <button
        className={`view-toggle__btn ${view === "list" ? "is-active" : ""}`}
        onClick={() => onChange("list")}
        title="竖向排列"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <line x1="2" y1="3" x2="14" y2="3" stroke="currentColor" strokeWidth="1.5" />
          <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="2" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <button
        className={`view-toggle__btn ${view === "grid" ? "is-active" : ""}`}
        onClick={() => onChange("grid")}
        title="宫格视图"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}
