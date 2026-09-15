// 一次性数据整理：把「设定补充」段落标记为 note: true
//   1. 删掉作为分隔标签的 {"t": "设定补充："} 这一项（渲染时改用区块标题）
//   2. 其后连续的段落项统一加 "note": true
// 用法：node scripts/mark-notes.mjs [--apply]
import fs from "fs";

const FILE = "src/data/copy.js";
const APPLY = process.argv.includes("--apply");
const lines = fs.readFileSync(FILE, "utf8").split("\n");

const markers = [];
lines.forEach((l, i) => {
  if (/^\s*"t": "设定补充："\s*$/.test(l)) markers.push(i);
});

const tLines = new Set();
const delLines = new Set();
const skipped = [];

for (const m of markers) {
  delLines.add(m - 1); // {
  delLines.add(m); //   "t": "设定补充："
  delLines.add(m + 1); // },
  let j = m + 3;
  while (j < lines.length && /^\s*"t": ".+"\s*$/.test(lines[j])) {
    tLines.add(j);
    j += 3;
  }
  // 越界或格式不符时留个痕迹
  if (j < lines.length && !/^\s*[\]}]/.test(lines[j])) skipped.push({ marker: m, stopAt: j });
}

console.log(`找到 ${markers.length} 处「设定补充」，共 ${tLines.size} 个段落待标记`);
if (skipped.length) console.log("异常终止点：", skipped);

const out = [];
for (let i = lines.length - 1; i >= 0; i--) {
  if (delLines.has(i)) continue;
  if (tLines.has(i)) {
    const indent = lines[i].match(/^\s*/)[0];
    out.unshift(indent + '"note": true');
    out.unshift(lines[i].replace(/\s+$/, "") + ",");
    continue;
  }
  out.unshift(lines[i]);
}

if (APPLY) {
  fs.writeFileSync(FILE, out.join("\n"));
  console.log("已写入", FILE);
} else {
  fs.writeFileSync(FILE + ".preview", out.join("\n"));
  console.log("预览写入 " + FILE + ".preview，加 --apply 才覆盖原文件");
}
