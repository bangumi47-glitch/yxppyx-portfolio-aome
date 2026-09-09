// 把 works.js 里的 cover: "" 按顺序替换为 /covers/N.jpg
const fs = require("fs");
const file = "D:/游戏日报/作品集/src/data/works.js";
let code = fs.readFileSync(file, "utf8");
let i = 0;
code = code.replace(/cover: ""/g, () => `cover: "/covers/${++i}.jpg"`);
fs.writeFileSync(file, code);
console.log("updated", i, "covers");
