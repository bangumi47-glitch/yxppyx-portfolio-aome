// 把《终末余响》剧情大纲里超过 200 字的段落按句号拆开
// 用法：node scripts/split-paragraphs.mjs [--apply]
import fs from "fs";

const FILE = "src/data/copy.js";
const WORK = '"id": "plot"';
const MAX = 200;
const MIN_TAIL = 60; // 尾段短于这个字数就并回上一段
const APPLY = process.argv.includes("--apply");

// 按句末标点断句，累积到接近上限就断开
function splitLong(text) {
  if (text.length <= MAX) return [text];
  const sentences = text.match(/[^。！？]*[。！？]|[^。！？]+$/g) || [text];
  const parts = [];
  let cur = "";
  for (const s of sentences) {
    if (cur && cur.length + s.length > MAX) {
      parts.push(cur);
      cur = s;
    } else {
      cur += s;
    }
  }
  if (cur) parts.push(cur);
  // 尾段太短会显得零碎，并回上一段
  if (parts.length > 1 && parts[parts.length - 1].length < MIN_TAIL) {
    parts[parts.length - 2] += parts[parts.length - 1];
    parts.pop();
  }
  return parts;
}

const src = fs.readFileSync(FILE, "utf8");
const start = src.indexOf(WORK);
if (start < 0) throw new Error("没找到 plot 作品");

// 取该作品 content 数组的范围
const cStart = src.indexOf('"content": [', start);
const cEnd = src.indexOf("\n        ]", cStart);
const block = src.slice(cStart, cEnd);

let changed = 0;
let added = 0;
const replaced = block.replace(
  /(\{\s*\n\s*"t": ")((?:[^"\\]|\\.){200,})("\s*\n\s*\})/g,
  (m, pre, body, post) => {
    const parts = splitLong(body);
    if (parts.length <= 1) return m;
    changed++;
    added += parts.length - 1;
    const indent = pre.match(/\n(\s*)/)?.[1] ?? "            ";
    const itemIndent = indent.slice(0, -2);
    return parts
      .map((p) => `${itemIndent}{\n${indent}"t": "${p}"\n${itemIndent}}`)
      .join(",\n");
  }
);

console.log(`超过 ${MAX} 字的段落：${changed} 个，拆分后新增 ${added} 段`);

if (APPLY) {
  fs.writeFileSync(FILE, src.slice(0, cStart) + replaced + src.slice(cEnd));
  console.log("已写入", FILE);
} else {
  console.log("预览模式，加 --apply 才写入");
}
