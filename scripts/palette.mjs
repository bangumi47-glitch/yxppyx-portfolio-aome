// 分析目录里每张图的主色调 / 亮度 / 饱和度，用于按氛围筛选背景候选
// 用法：node scripts/palette.mjs <目录>
import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = process.argv[2];
const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort((a, b) => (parseInt(a) || 0) - (parseInt(b) || 0));

const rows = [];
for (const f of files) {
  const img = sharp(path.join(dir, f));
  const { dominant } = await img.stats();
  const { data } = await img.resize(1, 1, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
  const [r, g, b] = data;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;

  // 色相倾向描述
  let tone = "中性灰";
  if (sat > 0.12) {
    if (b >= r && b >= g) tone = r > g + 12 ? "紫调" : "冷蓝调";
    else if (g >= r && g >= b) tone = b > r + 15 ? "青调" : "绿调";
    else tone = b > g + 15 ? "品红调" : "暖橙调";
  }
  rows.push({
    file: f,
    lum: Math.round(lum),
    sat: sat.toFixed(2),
    hex: "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join(""),
    tone,
    dom: dominant,
  });
}

rows.sort((a, b) => a.lum - b.lum);

console.log("按亮度从暗到亮排列：");
console.log("序号".padEnd(6) + "亮度".padEnd(6) + "饱和".padEnd(7) + "主色".padEnd(10) + "色调");
for (const r of rows) {
  console.log(
    r.file.replace(/\.\w+$/, "").padEnd(6) +
      String(r.lum).padEnd(6) +
      r.sat.padEnd(7) +
      r.hex.padEnd(10) +
      r.tone
  );
}
