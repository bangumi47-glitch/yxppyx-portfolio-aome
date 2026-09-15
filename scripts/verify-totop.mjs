import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new", args: ["--no-sandbox","--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const pages = [
  ["首页", "http://localhost:5173/"],
  ["方法页", "http://localhost:5173/#/method"],
  ["文案分类页", "http://localhost:5173/#/copy"],
  ["作品内容页", "http://localhost:5173/#/copy/zhongmo/worldview"],
];
for (const [name, url] of pages) {
  await page.goto(url, { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1300));
  const read = () => page.evaluate(() => {
    const el = document.querySelector(".back-to-top");
    if (!el) return "缺失";
    const c = getComputedStyle(el);
    return `${c.visibility}/${c.opacity}`;
  });
  const before = await read();
  await page.evaluate(() => window.scrollTo(0, 1800));
  await new Promise(r => setTimeout(r, 700));
  const after = await read();
  await page.evaluate(() => document.querySelector(".back-to-top")?.click());
  await new Promise(r => setTimeout(r, 1600));
  const y = await page.evaluate(() => Math.round(window.scrollY));
  const ok = before === "hidden/0" && after === "visible/1" && y === 0;
  console.log(`${ok ? "OK  " : "FAIL"} ${name.padEnd(6)} 初始=${before.padEnd(9)} 滚动后=${after.padEnd(10)} 点击后scrollY=${y}`);
}
await browser.close();
