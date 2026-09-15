// 布局测量：找出横向溢出的元素
// 用法：node scripts/measure.mjs [url] [width]
import puppeteer from "puppeteer-core";

const URL = process.argv[2] || "http://localhost:5173/#/copy/lengxian/story";
const WIDTH = Number(process.argv[3] || 390);

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: 900 });
await page.goto(URL, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1200));

const report = await page.evaluate(() => {
  const doc = document.documentElement;
  const out = {
    viewport: window.innerWidth,
    htmlScrollWidth: doc.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    offenders: [],
    keyWidths: [],
  };

  const sel = [".mps", ".mps__hero", ".mps__layout", ".mps__sidebar", ".mps__content",
               ".cw-body", ".cw-media--lead", ".cw-video", ".cw-notes", ".mps__title"];
  for (const s of sel) {
    const el = document.querySelector(s);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    out.keyWidths.push({
      sel: s,
      left: Math.round(r.left),
      right: Math.round(r.right),
      width: Math.round(r.width),
      gridCols: getComputedStyle(el).gridTemplateColumns,
    });
  }

  // 全量扫描：任何右边界超过视口的元素
  for (const el of document.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.right > window.innerWidth + 1 && r.width > 0) {
      out.offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || "").toString().slice(0, 60),
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
      });
    }
  }
  out.offenders = out.offenders.slice(0, 15);
  return out;
});

console.log("视口宽度:", report.viewport);
console.log("html.scrollWidth:", report.htmlScrollWidth, "| body.scrollWidth:", report.bodyScrollWidth);
console.log("\n关键元素宽度:");
for (const k of report.keyWidths) {
  console.log(`  ${k.sel.padEnd(18)} left=${String(k.left).padStart(5)} right=${String(k.right).padStart(5)} w=${String(k.width).padStart(5)}  grid=[${k.gridCols}]`);
}
console.log("\n超出视口的元素:");
for (const o of report.offenders) {
  console.log(`  ${o.tag}.${o.cls}  left=${o.left} right=${o.right} w=${o.width}`);
}
if (!report.offenders.length) console.log("  （无）");

await browser.close();
