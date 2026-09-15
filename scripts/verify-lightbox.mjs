import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new", args: ["--no-sandbox","--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const cases = [
  ["草图", "http://localhost:5173/#/copy/xinghen", ".sketch__img"],
  ["正文插图", "http://localhost:5173/#/copy/xinghen/character", ".cw-img"],
];
for (const [name, url, sel] of cases) {
  await page.goto(url, { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1200));
  const exists = await page.$(sel);
  if (!exists) { console.log(`SKIP ${name}: 该页无 ${sel}`); continue; }
  await page.evaluate((s) => document.querySelector(s).scrollIntoView({block:"center"}), sel);
  await new Promise(r => setTimeout(r, 400));
  await page.click(sel);
  await new Promise(r => setTimeout(r, 700));
  const opened = await page.evaluate(() => !!document.querySelector(".lightbox"));
  const bodyLocked = await page.evaluate(() => getComputedStyle(document.body).overflow);
  await page.keyboard.press("Escape");
  await new Promise(r => setTimeout(r, 500));
  const closed = await page.evaluate(() => !document.querySelector(".lightbox"));
  const unlocked = await page.evaluate(() => getComputedStyle(document.body).overflow);
  const ok = opened && closed && bodyLocked === "hidden" && unlocked !== "hidden";
  console.log(`${ok ? "OK  " : "FAIL"} ${name}  打开=${opened} 锁滚动=${bodyLocked} Esc关闭=${closed} 解锁=${unlocked}`);
}
await browser.close();
