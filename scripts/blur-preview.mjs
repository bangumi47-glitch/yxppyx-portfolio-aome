// 把指定编号的素材做成「模糊后」的预览拼贴，用于挑背景图
// 用法：node scripts/blur-preview.mjs <输出.jpg> <编号,编号,...>
import sharp from "sharp";
import fs from "fs";
import path from "path";

const [out, idsArg] = process.argv.slice(2);
const SRC = "public/hero-bg";
const ids = idsArg.split(",").map((s) => s.trim());

const COLS = 5;
const CW = 340;
const CH = 191;

const composites = [];
for (let i = 0; i < ids.length; i++) {
  const id = ids[i];
  const file = fs
    .readdirSync(SRC)
    .find((f) => f.replace(/\.\w+$/, "") === id);
  if (!file) {
    console.log("找不到:", id);
    continue;
  }
  const buf = await sharp(path.join(SRC, file))
    .resize(1600, 900, { fit: "cover", position: "center" })
    .blur(30)
    .modulate({ brightness: 0.82 })
    .resize(CW, CH)
    .toBuffer();
  composites.push({
    input: buf,
    left: (i % COLS) * CW,
    top: Math.floor(i / COLS) * CH,
  });
}

const rows = Math.ceil(composites.length / COLS);
await sharp({
  create: { width: COLS * CW, height: rows * CH, channels: 3, background: "#101018" },
})
  .composite(composites)
  .jpeg({ quality: 85 })
  .toFile(out);

console.log(`模糊预览 ${composites.length} 张 → ${out}`);
console.log("顺序（左→右，上→下）:", ids.slice(0, composites.length).join("  "));
