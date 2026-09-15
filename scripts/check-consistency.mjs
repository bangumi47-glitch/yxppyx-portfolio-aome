import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new", args: ["--no-sandbox","--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const grab = async (url, sels) => {
  await page.goto(url, { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1100));
  return page.evaluate((sels) => {
    const pick = (el, props) => {
      const c = getComputedStyle(el);
      const o = {};
      for (const p of props) o[p] = c[p];
      return o;
    };
    const out = {};
    for (const [key, sel] of Object.entries(sels)) {
      const el = document.querySelector(sel);
      out[key] = el ? pick(el, ["padding","borderRadius","borderColor","backgroundColor","fontSize","fontWeight","boxShadow"]) : null;
    }
    return out;
  }, sels);
};

console.log("=== 分类页 作品集卡片 ===");
console.log(JSON.stringify(await grab("http://localhost:5173/#/copy", {
  card: ".ci-card", title: ".ci-card__title", desc: ".ci-card__desc", foot: ".ci-card__meta",
  secTitle: ".mps__section-title",
}), null, 1));

console.log("\n=== 详情页 作品卡片 ===");
console.log(JSON.stringify(await grab("http://localhost:5173/#/copy/lengxian", {
  card: ".copy-card--link", title: ".copy-card__title", desc: ".copy-card__summary", foot: ".copy-card__more-link",
  secTitle: ".mps__section-title",
}), null, 1));

await browser.close();
