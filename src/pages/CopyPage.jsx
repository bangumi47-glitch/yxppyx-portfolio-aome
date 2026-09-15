import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import LineSidebar from "../components/LineSidebar.jsx";
import Lightbox from "../components/Lightbox.jsx";
import {
  COPY_CLAIM,
  COPY_STATS,
  SKETCHES,
  COLLECTIONS,
  INDEX_BG,
  COLLECTION_BG,
  WORK_BG,
} from "../data/copy.js";

// 解析 hash → [collectionId, workId]（可能为空数组）
function parseHash() {
  return window.location.hash.replace(/^#\/copy\/?/, "").split("/").filter(Boolean);
}

function Hero({ title, lead, desc, stats, back, backLabel }) {
  return (
    <header className="mps__hero">
      <div className="container">
        <a className="mps__back" href={back}>
          ← {backLabel}
        </a>
        <h1 className="mps__title">{title}</h1>
        {lead && <p className="mps__lead">{lead}</p>}
        {desc && <p className="mps__desc">{desc}</p>}
        {stats && (
          <div className="mps__stats">
            {stats.map((s) => (
              <div className="mps__stat" key={s.label}>
                <span className="mps__stat-value">{s.value}</span>
                <span className="mps__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

// ===== 第 1 层：作品集分类列表 + 草图素材 =====
function CopyIndex() {
  return (
    <div className="mps">
      <Hero
        title="文案作品集"
        lead={COPY_CLAIM.lead}
        desc={COPY_CLAIM.desc}
        stats={COPY_STATS}
        back="#top"
        backLabel="返回作品集"
      />

      <div className="container mps__layout">
        <div className="mps__content">
          <h2 className="mps__section-title">
            <span className="mps__section-num">01</span>作品集
          </h2>
          <div className="ci-grid">
            {COLLECTIONS.map((c) => (
              <a className="ci-card" key={c.id} href={`#/copy/${c.id}`}>
                <div className="ci-card__head">
                  <h3 className="ci-card__title">{c.title}</h3>
                  <span className="tag">{c.source}</span>
                </div>
                <p className="ci-card__desc">{c.desc}</p>
                <div className="ci-card__meta">{c.works.length} 份作品 · 点击进入</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 第 2 层：作品集详情 =====
function CopyCollection({ collection, onZoom }) {
  // 该作品集对应的草图素材（《冷线》《星痕》有，《终末余响》没有）
  const sketches = SKETCHES[collection.id];

  return (
    <div className="mps">
      <Hero
        title={collection.title}
        desc={collection.desc}
        back="#/copy"
        backLabel="文案作品集"
      />
      <div className="container mps__layout">
        <div className="mps__content">
          <h2 className="mps__section-title">
            <span className="mps__section-num">01</span>作品
          </h2>
          <div className="copy-grid">
            {collection.works.map((w) => (
              <a
                className="copy-card copy-card--link"
                key={w.id}
                href={`#/copy/${collection.id}/${w.id}`}
              >
                <div className="copy-card__head">
                  <h3 className="copy-card__title">{w.title}</h3>
                  <span className="tag">{w.ability}</span>
                </div>
                <p className="copy-card__summary">{w.summary}</p>
                <span className="copy-card__more-link">查看完整内容 →</span>
              </a>
            ))}
          </div>

          {sketches && (
            <>
              <h2 className="mps__section-title" style={{ marginTop: 72 }}>
                <span className="mps__section-num">02</span>草图与素材
              </h2>
              <div className="sketches__grid" style={{ marginTop: 28 }}>
                {sketches.items.map((s) => (
                  <figure className="sketch" key={s.src}>
                    <img
                      className="sketch__img"
                      src={s.src}
                      alt={s.caption}
                      loading="lazy"
                      onClick={() => onZoom({ src: s.src, caption: s.caption })}
                    />
                    <figcaption className="sketch__caption">{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== 第 3 层：作品内容（左侧目录 + 正文 + 配图/视频） =====
function CopyWork({ collection, work, onZoom }) {
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  // 内容按展示需求分三段：开头视频 / 正文 / 末尾设定补充
  const { videoItem, bodyItems, noteItems } = useMemo(
    () => ({
      videoItem: work.content.find((i) => i.video) || null,
      bodyItems: work.content.filter((i) => !i.video && !i.note),
      noteItems: work.content.filter((i) => i.note),
    }),
    [work]
  );

  // 各篇的标题起点不一样（有的从 h1 起，有的从 h2 起），
  // 所以按本篇最浅的那一级当作「大标题」，取它和下面一级
  const baseLevel = useMemo(() => {
    const levels = bodyItems.filter((i) => i.h).map((i) => i.h);
    return levels.length ? Math.min(...levels) : 1;
  }, [bodyItems]);

  const toc = useMemo(
    () =>
      bodyItems
        .map((item, i) => ({ ...item, idx: i }))
        .filter((item) => item.h && item.h <= baseLevel + 1),
    [bodyItems, baseLevel]
  );

  // 正文按大标题拆块，每块单独一张卡片
  const sections = useMemo(() => {
    const groups = [];
    let cur = null;
    bodyItems.forEach((item, i) => {
      if (item.h === baseLevel) {
        cur = { heading: item, headingIdx: i, items: [] };
        groups.push(cur);
      } else {
        if (!cur) {
          cur = { heading: null, headingIdx: -1, items: [] };
          groups.push(cur);
        }
        cur.items.push({ item, idx: i });
      }
    });
    return groups;
  }, [bodyItems, baseLevel]);

  // 滚动联动目录高亮
  useEffect(() => {
    const els = toc
      .map((t) => document.getElementById(`cw-${t.idx}`))
      .filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.id.replace("cw-", ""));
            setActive(toc.findIndex((t) => t.idx === idx));
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [toc, work.id]);

  const handleClick = (index) => {
    const t = toc[index];
    document.getElementById(`cw-${t.idx}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const headingTag = (level) => (level === 1 ? "h2" : level === 2 ? "h3" : level === 3 ? "h4" : "h5");

// 词条式段落：「短标签：解释」——把标签挑出来做阅读锚点
// 句读仍排除（避免整句被误判），但允许空格和括号，否则「父亲 · 阿尔贝托·晨星」这类人名会被漏掉
const TERM_RE = /^([^：:，。；！？、\n]{2,22})[：:]\s*(\S.*)$/;

// 碎片化叙事的段落标记（①～⑳），这类内容每个序号自成一个片段
const FRAGMENT_RE = /^[①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳]/;

function BodyText({ text, className = "cw-p" }) {
  if (FRAGMENT_RE.test(text)) {
    return <p className={`${className} cw-fragment__lead`}>{text}</p>;
  }
  const term = text.match(TERM_RE);
  if (term) {
    return (
      <p className={className}>
        <span className="cw-p__term">{term[1]}</span>
        <span className="cw-p__sep">：</span>
        {term[2]}
      </p>
    );
  }
  return <p className={className}>{text}</p>;
}

// PDF 里的表格转成文本后，会变成一行行用 | 分隔的段落。
// 这里把连续的这种行合并回一张表，渲染成真正的 <table>。
const TABLE_ROW_RE = /\|/;

function isTableRow(item) {
  return Boolean(item.t && !item.h && !item.img && !item.video && TABLE_ROW_RE.test(item.t));
}

// 把连续的表格行聚成一个 table 条目，其余原样透传
function coalesceTables(items) {
  const out = [];
  let cur = null;
  for (const entry of items) {
    if (isTableRow(entry.item)) {
      if (!cur) {
        cur = { table: [], idx: entry.idx };
        out.push(cur);
      }
      cur.table.push(entry.item.t);
    } else {
      cur = null;
      out.push(entry);
    }
  }
  return out;
}

// 连续的插图合并成一行并排显示（各自独占一行会拉得很长）
function coalesceImages(items) {
  const out = [];
  let cur = null;
  for (const entry of items) {
    if (entry.item && entry.item.img) {
      if (!cur) {
        cur = { imgs: [], idx: entry.idx };
        out.push(cur);
      }
      cur.imgs.push(entry.item.img);
    } else {
      cur = null;
      out.push(entry);
    }
  }
  return out;
}

function DataTable({ rows }) {
  const cells = rows.map((r) =>
    r.split("|").map((c) => c.trim())
  );
  const [head, ...body] = cells;
  return (
    <div className="cw-table-wrap">
      <table className="cw-table">
        <thead>
          <tr>
            {head.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}>
              {row.map((c, ci) => (
                <td key={ci}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 把内容切成独立成块的单元。
// 有标题时按「这一节里最浅的那级标题」切，而不是写死某个层级 ——
// 各章深浅不一（有的势力是 h3、有的派系是 h2），写死会漏切或切错。
// 没有标题时才退回按序号切（碎片化叙事的 ①～⑧）。
// 二者互斥，否则正文里形如「①轻度区…」的列表项也会被单独切成一块。
function groupBlocks(items) {
  const levels = items.filter((e) => e.item.h).map((e) => e.item.h);
  const subLevel = levels.length ? Math.min(...levels) : null;
  const groups = [];
  let cur = null;
  for (const entry of items) {
    const isSplit = subLevel
      ? entry.item.h === subLevel
      : FRAGMENT_RE.test(entry.item.t || "");
    if (isSplit) {
      cur = [entry];
      groups.push(cur);
    } else {
      if (!cur) {
        cur = [];
        groups.push(cur);
      }
      cur.push(entry);
    }
  }
  return groups;
}

  return (
    <div className="mps" ref={ref}>
      <Hero
        title={work.title}
        desc={work.summary}
        back={`#/copy/${collection.id}`}
        backLabel={collection.title}
      />

      <div className="container mps__layout mps__layout--read">
        {toc.length > 0 && (
          <aside className="mps__sidebar">
            <LineSidebar
              items={toc.map((t) => (t.h === baseLevel + 1 ? `　${t.t}` : t.t))}
              accentColor="#6d8dff"
              textColor="#bcc9e0"
              markerColor="#7b8aa8"
              fontSize={0.78}
              active={active}
              onItemClick={handleClick}
            />
          </aside>
        )}

        <div className="mps__content">
          {videoItem && (
            <figure className="cw-media cw-media--lead">
              <video
                className="cw-video"
                src={videoItem.video}
                controls
                controlsList="nodownload"
                disablePictureInPicture
                preload="none"
              />
              {videoItem.caption && (
                <figcaption className="cw-media-caption">{videoItem.caption}</figcaption>
              )}
            </figure>
          )}

          {sections.map((sec, si) => (
            <Fragment key={si}>
              {sec.heading && (
                <h2 className="cw-heading cw-h1 cw-group-title" id={`cw-${sec.headingIdx}`}>
                  {sec.heading.t}
                </h2>
              )}
              {groupBlocks(sec.items).map((frag, fi) => (
                <section className="cw-section" key={fi}>
                  {coalesceImages(coalesceTables(frag)).map((entry) => {
                    if (entry.table) {
                      return <DataTable rows={entry.table} key={`tbl-${entry.idx}`} />;
                    }
                    if (entry.imgs) {
                      return (
                        <div className="cw-imgrow" key={`imgs-${entry.idx}`}>
                          {entry.imgs.map((src, i) => (
                            <img
                              className="cw-img"
                              src={src}
                              alt=""
                              loading="lazy"
                              key={i}
                              onClick={() => onZoom({ src })}
                            />
                          ))}
                        </div>
                      );
                    }
                    const { item, idx } = entry;
                    if (item.h) {
                      const rel = item.h - baseLevel + 1;
                      const Tag = headingTag(rel);
                      return (
                        <Tag className={`cw-heading cw-h${rel}`} id={`cw-${idx}`} key={idx}>
                          {item.t}
                        </Tag>
                      );
                    }
                    return <BodyText text={item.t} key={idx} />;
                  })}
                </section>
              ))}
            </Fragment>
          ))}

          {noteItems.length > 0 && (
            <section className="cw-notes">
              <h2 className="cw-notes__title">设定补充</h2>
              {noteItems.map((item, i) => (
                <BodyText text={item.t} className="cw-note" key={i} />
              ))}
            </section>
          )}

          <div className="cw-actions">
            <a className="copy-card__dl" href={work.download} download>
              下载 PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== 分发器 =====
export default function CopyPage() {
  const [parts, setParts] = useState(parseHash);
  const [zoom, setZoom] = useState(null);
  const key = parts.join("/");

  useEffect(() => {
    const onHash = () => setParts(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  const [collectionId, workId] = parts;
  const collection = collectionId
    ? COLLECTIONS.find((c) => c.id === collectionId)
    : null;
  const work =
    collection && workId
      ? collection.works.find((w) => w.id === workId)
      : null;

  let body;
  if (!collection) {
    body = <CopyIndex />;
  } else if (work) {
    body = <CopyWork collection={collection} work={work} onZoom={setZoom} />;
  } else {
    body = <CopyCollection collection={collection} onZoom={setZoom} />;
  }

  // 背景分三级：单篇作品用自己的图 → 作品集详情页用该套的图 → 分类页用入口图
  const bg = work
    ? WORK_BG[collection.id]?.[work.id] || COLLECTION_BG[collection.id]
    : collection
      ? COLLECTION_BG[collection.id]
      : INDEX_BG;

  return (
    <div className="copy-page">
      <div
        className="page-bg"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden="true"
      />
      {body}
      <Lightbox src={zoom?.src} caption={zoom?.caption} onClose={() => setZoom(null)} />
    </div>
  );
}
