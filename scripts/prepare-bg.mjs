// 从 hero-bg 素材生成文案作品集各页面的背景图
//   分类页：低模糊（用户要求「不用太模糊」）
//   作品集详情页 / 作品内容页：高模糊，只留色调与明暗，保证不干扰阅读
// 用法：node scripts/prepare-bg.mjs
import sharp from "sharp";
import fs from "fs";

const SRC_DIR = "bg-src";
const OUT_DIR = "public/copywork/bg";

// 作品页：重度模糊 + 压对比。压对比是为了把原图里的主体（人物/建筑）彻底化开，
// 只留下色调和明暗，否则模糊后仍会形成一块吸住视线的暗斑。
const HEAVY = { blur: 50, brightness: 0.72, linear: [0.75, 14] };
const LIGHT = { blur: 13, brightness: 0.82, linear: null }; // 分类页：保留可辨识度

const JOBS = [
  { id: 'index', ...LIGHT },
  { id: 'zhongmo', ...HEAVY },
  { id: 'zhongmo-worldview', ...HEAVY },
  { id: 'zhongmo-protagonist', ...HEAVY },
  { id: 'zhongmo-idol-group', ...HEAVY },
  { id: 'zhongmo-plot', ...HEAVY },
  { id: 'lengxian', ...HEAVY },
  { id: 'lengxian-story', ...HEAVY },
  { id: 'lengxian-script', ...HEAVY },
  { id: 'lengxian-narrative', ...HEAVY },
  { id: 'xinghen', ...HEAVY },
  { id: 'xinghen-worldview', ...HEAVY },
  { id: 'xinghen-character', ...HEAVY },
  { id: 'xinghen-story', ...HEAVY },
  { id: 'xinghen-dialogue', ...HEAVY },
  { id: 'yinyuan', ...HEAVY },
  { id: 'yinyuan-character', ...HEAVY },
  { id: 'yinyuan-world', ...HEAVY },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const job of JOBS) {
  const src = `${SRC_DIR}/${job.id}.jpg`;
  if (!fs.existsSync(src)) {
    console.log(`跳过（缺文件）: ${src}`);
    continue;
  }
  const out = `${OUT_DIR}/${job.id}.webp`;
  const before = fs.statSync(src).size;

  let pipe = sharp(src)
    .resize(2560, 1440, { fit: "cover", position: "center" })
    .blur(job.blur);
  // linear(a, b) = a × 输入 + b：a 小于 1 即压低对比，b 补偿被压掉的亮度
  if (job.linear) pipe = pipe.linear(job.linear[0], job.linear[1]);
  await pipe
    .modulate({ brightness: job.brightness })
    .webp({ quality: 72, effort: 6 })
    .toFile(out);

  const after = fs.statSync(out).size;
  console.log(
    `${job.id.padEnd(22)} blur=${String(job.blur).padStart(2)}  ` +
      `${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`
  );
}
