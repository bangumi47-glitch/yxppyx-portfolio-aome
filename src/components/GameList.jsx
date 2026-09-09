import { useState } from "react";

// 游戏经历：数据来自简历，按类型分类
// 每个类型配一张代表游戏的背景图
const GAMES = [
  {
    type: "全部",
    bg: "/games/fps.jpg",
    list: [],
  },
  {
    type: "二次元",
    bg: "/games/acg.jpg",
    list: [
      { name: "重返未来 1999", hours: "955h", note: "" },
      { name: "物华弥新", hours: "699h", note: "" },
      { name: "鸣潮", hours: "580h", note: "536 成就" },
      { name: "崩坏 3", hours: "300h", note: "" },
      { name: "赛马娘", hours: "300h", note: "" },
      { name: "明日方舟", hours: "200h", note: "" },
      { name: "原神", hours: "180h", note: "" },
      { name: "战双帕弥什", hours: "138h", note: "" },
      { name: "明日方舟：终末地", hours: "50h", note: "" },
      { name: "白银之城", hours: "50h", note: "" },
    ],
  },
  {
    type: "射击",
    bg: "/games/fps.jpg",
    list: [
      { name: "CSGO", hours: "1780h", note: "完美 A、5E 2200" },
      { name: "穿越火线", hours: "1000h", note: "" },
      { name: "卡拉彼丘", hours: "500h", note: "" },
      { name: "逆战", hours: "500h", note: "" },
      { name: "战地风云系列", hours: "400h", note: "" },
      { name: "无畏契约", hours: "300h", note: "黄金一" },
      { name: "使命召唤系列", hours: "300h", note: "" },
      { name: "求生之路系列", hours: "300h", note: "" },
      { name: "三角洲行动", hours: "200h", note: "全面战场三赛季统帅" },
    ],
  },
  {
    type: "开放世界",
    bg: "/games/openworld.jpg",
    list: [
      { name: "GTA 系列", hours: "1000h", note: "全成就" },
      { name: "刺客信条系列", hours: "200h", note: "" },
      { name: "黑道圣徒系列", hours: "100h", note: "" },
    ],
  },
  {
    type: "RPG",
    bg: "/games/rpg.jpg",
    list: [
      { name: "怪物猎人世界", hours: "100h", note: "" },
      { name: "巫师三", hours: "80h", note: "" },
      { name: "逸剑风云决", hours: "60h", note: "65/110" },
      { name: "神之天平", hours: "30h", note: "51/99" },
      { name: "无主之地 3", hours: "20h", note: "" },
    ],
  },
  {
    type: "其他",
    bg: "/games/other.jpg",
    list: [
      { name: "虐杀原形系列", hours: "300h", note: "" },
      { name: "杀手系列", hours: "200h", note: "" },
      { name: "生化危机系列", hours: "150h", note: "" },
      { name: "行尸走肉系列", hours: "100h", note: "全成就" },
      { name: "吸血鬼 Vampyr", hours: "100h", note: "" },
      { name: "绝地求生", hours: "100h", note: "" },
      { name: "只狼影逝二度", hours: "50h", note: "24/34" },
      { name: "方舟生存进化", hours: "50h", note: "16/32" },
      { name: "消逝的光芒", hours: "50h", note: "" },
      { name: "禁闭求生", hours: "50h", note: "" },
      { name: "底特律化身为人", hours: "30h", note: "27/48" },
    ],
  },
];

// 「全部」页展示各类型的代表游戏
const ALL = [
  { name: "CSGO", type: "射击", hours: "1780h", note: "完美 A、5E 2200" },
  { name: "穿越火线", type: "射击", hours: "1000h", note: "" },
  { name: "GTA 系列", type: "开放世界", hours: "1000h", note: "全成就" },
  { name: "重返未来 1999", type: "二次元", hours: "955h", note: "" },
  { name: "物华弥新", type: "二次元", hours: "699h", note: "" },
  { name: "鸣潮", type: "二次元", hours: "580h", note: "536 成就" },
  { name: "卡拉彼丘", type: "射击", hours: "500h", note: "" },
  { name: "逆战", type: "射击", hours: "500h", note: "" },
  { name: "战地风云系列", type: "射击", hours: "400h", note: "" },
  { name: "崩坏 3", type: "二次元", hours: "300h", note: "" },
  { name: "赛马娘", type: "二次元", hours: "300h", note: "" },
  { name: "虐杀原形系列", type: "其他", hours: "300h", note: "" },
  { name: "无畏契约", type: "射击", hours: "300h", note: "黄金一" },
  { name: "明日方舟", type: "二次元", hours: "200h", note: "" },
  { name: "刺客信条系列", type: "开放世界", hours: "200h", note: "" },
  { name: "杀手系列", type: "其他", hours: "200h", note: "" },
];

export default function GameList() {
  const [active, setActive] = useState(0);
  const current = GAMES[active];
  const list = active === 0 ? ALL : current.list;

  return (
    <div className="games" style={{ backgroundImage: `url(${current.bg})` }}>
      <div className="games__veil" aria-hidden="true" />

      <div className="games__inner">
        <div className="games__head">
          <h3 className="games__title">游戏经历</h3>
          <span className="games__total">13000+ 小时 · 40+ 款</span>
        </div>

        <div className="games__tabs">
          {GAMES.map((g, i) => (
            <button
              key={g.type}
              className={`games__tab ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {g.type}
            </button>
          ))}
        </div>

        <ul className="games__list">
          {list.map((g) => (
            <li className="games__item" key={g.name}>
              <span className="games__name">{g.name}</span>
              {g.note && <span className="games__note">{g.note}</span>}
              <span className="games__hours">{g.hours}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
