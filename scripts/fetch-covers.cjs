// 抓取公众号封面图：从作品清单读取链接，解析 og:image，下载到 public/covers/
// 用法：node scripts/fetch-covers.js
const fs = require("fs");
const path = require("path");

const LIST = "D:/游戏日报/整理简历/作品清单.txt";
const OUT_DIR = "D:/游戏日报/作品集/public/covers";

const text = fs.readFileSync(LIST, "utf8");
const links = text.split(/\r?\n/).filter((l) => l.startsWith("https://"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getCover(link) {
  const res = await fetch(link, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "zh-CN,zh;q=0.9",
    },
  });
  if (!res.ok) return null;
  const html = await res.text();
  let m =
    html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  if (m) return m[1].replace(/&amp;/g, "&");
  m = html.match(/var\s+msg_cdn_url\s*=\s*["']([^"']+)["']/);
  if (m) return m[1];
  return null;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let ok = 0;
  for (let i = 0; i < links.length; i++) {
    const idx = i + 1;
    const link = links[i];
    try {
      const cover = await getCover(link);
      if (!cover) {
        console.log(`${idx}\tNO_COVER`);
        await sleep(800);
        continue;
      }
      const img = await fetch(cover);
      const buf = Buffer.from(await img.arrayBuffer());
      if (buf.length < 1000) {
        console.log(`${idx}\tSMALL(${buf.length}B)`);
      } else {
        fs.writeFileSync(path.join(OUT_DIR, `${idx}.jpg`), buf);
        ok++;
        console.log(`${idx}\tOK(${(buf.length / 1024).toFixed(0)}KB)`);
      }
    } catch (e) {
      console.log(`${idx}\tERROR\t${e.message}`);
    }
    await sleep(800);
  }
  console.log(`\n完成：${ok}/${links.length} 张封面已下载`);
}

main();
