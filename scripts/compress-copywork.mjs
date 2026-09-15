// 压缩文案作品集素材：草图 PNG/JPG → WebP
// 用法：node scripts/compress-copywork.mjs [--apply]
//   不带 --apply 时只输出到 .compressed/ 预览，带 --apply 时替换原文件
import sharp from "sharp";
import fs from "fs";
import path from "path";

const ROOT = "public/copywork/sketches";
const OUT = "public/copywork/.compressed";
const MAX_EDGE = 1600; // 最长边上限（2x 屏在 800px 展示宽度下仍清晰）
const QUALITY = 82;
const APPLY = process.argv.includes("--apply");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
  );
}

const files = walk(ROOT).filter((f) => /\.(png|jpe?g)$/i.test(f));
let before = 0;
let after = 0;
const mapping = [];

for (const file of files) {
  const meta = await sharp(file).metadata();
  const stat = fs.statSync(file);
  before += stat.size;

  const scale = Math.min(1, MAX_EDGE / Math.max(meta.width, meta.height));
  const targetW = Math.round(meta.width * scale);

  const rel = path.relative(ROOT, file).replace(/\.(png|jpe?g)$/i, ".webp");
  const outPath = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  let pipe = sharp(file).resize({ width: targetW, withoutEnlargement: true });
  // 有 alpha 的 PNG 保留透明通道，其余走 RGB 更省体积
  if (!meta.hasAlpha) pipe = pipe.flatten({ background: "#ffffff" });

  await pipe.webp({ quality: QUALITY, effort: 6 }).toFile(outPath);

  const outSize = fs.statSync(outPath).size;
  after += outSize;
  mapping.push({ from: file, to: outPath });

  console.log(
    `${(stat.size / 1048576).toFixed(1)}MB → ${(outSize / 1024).toFixed(0)}KB  ` +
      `${meta.width}x${meta.height} → ${targetW}x${Math.round(meta.height * scale)}  ${rel}`
  );
}

console.log(
  `\n合计：${(before / 1048576).toFixed(1)}MB → ${(after / 1048576).toFixed(2)}MB` +
    `（压缩到 ${((after / before) * 100).toFixed(1)}%）`
);
fs.writeFileSync(path.join(OUT, "_mapping.json"), JSON.stringify(mapping, null, 2));

if (APPLY) {
  for (const { from, to } of mapping) {
    fs.copyFileSync(to, from.replace(/\.(png|jpe?g)$/i, ".webp"));
    fs.unlinkSync(from);
  }
  console.log("已替换原文件（PNG/JPG 已删除）");
} else {
  console.log("预览模式：结果在 public/copywork/.compressed/，加 --apply 才替换原文件");
}
