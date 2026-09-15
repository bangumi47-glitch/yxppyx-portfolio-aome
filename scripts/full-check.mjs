import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new", args: ["--no-sandbox", "--disable-gpu"],
});

const pages = [
  ["首页", "/"],
  ["方法页", "/#/method"],
  ["文案分类页", "/#/copy"],
  ["终末余响", "/#/copy/zhongmo"],
  ["  世界观大纲", "/#/copy/zhongmo/worldview"],
  ["  主角设定", "/#/copy/zhongmo/protagonist"],
  ["  天选偶像", "/#/copy/zhongmo/idol-group"],
  ["  剧情大纲", "/#/copy/zhongmo/plot"],
  ["冷线", "/#/copy/lengxian"],
  ["  商业回收", "/#/copy/lengxian/story"],
  ["  脏活", "/#/copy/lengxian/script"],
  ["  活性伪装涂层", "/#/copy/lengxian/narrative"],
  ["星痕", "/#/copy/xinghen"],
  ["  世界观设定", "/#/copy/xinghen/worldview"],
  ["  角色设定", "/#/copy/xinghen/character"],
  ["  专属剧情", "/#/copy/xinghen/story"],
  ["  对话台本", "/#/copy/xinghen/dialogue"],
];

let problems = 0;
for (const [name, path] of pages) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 90)); });
  page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message.slice(0, 90)));
  page.on("requestfailed", (r) => errs.push("404/失败: " + r.url().split("/").pop().slice(0, 50)));

  try {
    await page.goto("http://localhost:5173" + path, { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 900));
    const info = await page.evaluate(() => ({
      text: document.body.innerText.trim().length,
      sections: document.querySelectorAll(".cw-section").length,
      cards: document.querySelectorAll(".copy-card, .ci-card").length,
      tocItems: document.querySelectorAll(".line-sidebar__item").length,
      sketches: document.querySelectorAll(".sketch__img").length,
      bg: !!document.querySelector(".page-bg"),
      top: !!document.querySelector(".back-to-top"),
    }));
    const flag = errs.length ? "ERR " : info.text < 200 ? "EMPTY" : "OK  ";
    if (errs.length || info.text < 200) problems++;
    console.log(
      `${flag}${name.padEnd(16)} 文字${String(info.text).padStart(6)} 卡片${String(info.cards || info.sections).padStart(3)} 目录${String(info.tocItems).padStart(3)} 草图${String(info.sketches).padStart(3)} 背景${info.bg ? "有" : "无"}`
    );
    errs.slice(0, 3).forEach((e) => console.log("        ! " + e));
  } catch (e) {
    problems++;
    console.log(`FAIL ${name.padEnd(16)} ${e.message.slice(0, 70)}`);
  }
  await page.close();
}

console.log(`\n有问题的页面：${problems} / ${pages.length}`);
await browser.close();
