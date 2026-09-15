// 把目录里的图拼成一张缩略图总览，便于一次性浏览素材
// 用法：node scripts/contact-sheet.mjs <目录> <输出.jpg> [列数]
import sharp from "sharp";
import fs from "fs";
import path from "path";

const [dir, out, colsArg, cwArg, chArg] = process.argv.slice(2);
const COLS = Number(colsArg || 8);
const CW = Number(cwArg || 220);
const CH = Number(chArg || 124);

const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort((a, b) => (parseInt(a) || 0) - (parseInt(b) || 0));

const rows = Math.ceil(files.length / COLS);
const composites = [];

for (let i = 0; i < files.length; i++) {
  const buf = await sharp(path.join(dir, files[i]))
    .resize(CW, CH, { fit: "cover" })
    .toBuffer();
  const left = (i % COLS) * CW;
  const top = Math.floor(i / COLS) * CH;
  composites.push({ input: buf, left, top });

  // 左上角叠加编号，方便对照挑图
  const label = Buffer.from(
    `<svg width="${CW}" height="26"><rect width="${CW}" height="26" fill="rgba(0,0,0,0.62)"/>` +
      `<text x="8" y="19" font-family="sans-serif" font-size="17" font-weight="700" fill="#7fd4ff">` +
      `${files[i].replace(/\.\w+$/, "")}</text></svg>`
  );
  composites.push({ input: label, left, top });
}

await sharp({
  create: { width: COLS * CW, height: rows * CH, channels: 3, background: "#101018" },
})
  .composite(composites)
  .jpeg({ quality: 82 })
  .toFile(out);

console.log(`${files.length} 张 → ${out}（${COLS} 列，编号按文件名顺序，从左到右、从上到下）`);
