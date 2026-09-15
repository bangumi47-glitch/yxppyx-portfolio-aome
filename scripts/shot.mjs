// 用 puppeteer 截图（正确处理 viewport，支持整页截图）
// 用法：node scripts/shot.mjs <url> <out.png> [width] [height|full]
import puppeteer from "puppeteer-core";

const [url, out, width = "1440", height = "900", scrollTo] = process.argv.slice(2);

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({
  width: Number(width),
  height: height === "full" ? 900 : Number(height),
  deviceScaleFactor: 1,
});
await page.goto(url, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500));

// scrollTo 支持 ".sel"、".sel@n"（第 n 个匹配）或 "bottom"（滚到页面最底）
if (scrollTo === "bottom") {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 1400));
} else if (scrollTo) {
  await page.evaluate((spec) => {
    const [sel, i] = spec.split("@");
    const el = document.querySelectorAll(sel)[Number(i || 0)];
    if (el) el.scrollIntoView({ block: "start" });
  }, scrollTo);
  await new Promise((r) => setTimeout(r, 1200));
}

await page.screenshot({ path: out, fullPage: height === "full" });
const dims = await page.evaluate(() => ({
  w: document.documentElement.scrollWidth,
  h: document.documentElement.scrollHeight,
}));
console.log(`已截图 ${out}  页面尺寸 ${dims.w}x${dims.h}`);
await browser.close();
