// 作品数据。字段说明：
//   title    文章标题
//   summary  一句话摘要
//   track    题材：二游 / 射击 / 单机 / 现场·行业
//   type     类型：深度 / 专访
//   reads    阅读量（万），10w+ 填 10 且 hot 为 true
//   hot      true 表示 10w+
//   link     公众号原文链接
//   cover    封面图路径（public/covers/ 下），抓取后填充
//   featured true 表示进入「精选项目」大卡片
export const WORKS = [
  {
    title: "55亿，让《三角洲行动》赢的不只是“人多”",
    summary: "哪儿来这么多鼠鼠？",
    track: "射击",
    type: "深度",
    reads: 8.3,
    hot: false,
    link: "https://mp.weixin.qq.com/s/lq_ewA3ibiz3gRGdAghw_w",
    cover: "/covers/1.jpg",
    featured: false,
  },
  {
    title: "腾讯鹰角库洛，都在用AI做同一件事",
    summary: "玩家最爱的“AI赛博女儿”",
    track: "现场·行业",
    type: "深度",
    reads: 3.4,
    hot: false,
    link: "https://mp.weixin.qq.com/s/L-fQGBxRVI9KzYQJB2myug",
    cover: "/covers/2.jpg",
    featured: false,
  },
  {
    title: "无滤镜手机自拍！带你看完今年BW上最美的50组Coser！",
    summary: "最好看的Coser都在这里了！",
    track: "现场·行业",
    type: "深度",
    reads: 1.4,
    hot: false,
    link: "https://mp.weixin.qq.com/s/LXp5cHeaCtK8IrvQaXkojQ",
    cover: "/covers/3.jpg",
    featured: false,
  },
  {
    title: "鹰角“大胆”的答案，有了？",
    summary: "用玩法留住玩家",
    track: "二游",
    type: "深度",
    reads: 2.2,
    hot: false,
    link: "https://mp.weixin.qq.com/s/r4Yqsn4KoD2L6-AxAfHHVg",
    cover: "/covers/4.jpg",
    featured: false,
  },
  {
    title: "对话《古剑》项目负责人：不背“国产之光”包袱，慢慢做好游戏",
    summary: "烛龙没丢老本行",
    track: "单机",
    type: "采访",
    reads: 1.5,
    hot: false,
    link: "https://mp.weixin.qq.com/s/6EhaozdRyRWOmhJktgvy9A",
    cover: "/covers/5.jpg",
    featured: false,
  },
  {
    title: "被判“过气”后，它怎么又在二游里复兴了？",
    summary: "再度崛起",
    track: "二游",
    type: "深度",
    reads: 10,
    hot: true,
    link: "https://mp.weixin.qq.com/s/I0oYjJHzNgrUv7sScsc7jg",
    cover: "/covers/6.jpg",
    featured: true,
  },
  {
    title: "二游美学巅峰还是太“猛”了",
    summary: "1999回到了它最擅长的地方",
    track: "二游",
    type: "深度",
    reads: 20,
    hot: true,
    link: "https://mp.weixin.qq.com/s/vcc-FfGnLNsIInElfp4Xlw",
    cover: "/covers/7.jpg",
    featured: true,
  },
  {
    title: "爆肝20小时后，我觉得二游赛道要变天了",
    summary: "最有3A感的二游",
    track: "二游",
    type: "深度",
    reads: 5.8,
    hot: false,
    link: "https://mp.weixin.qq.com/s/aHFkBdybvG_s3yCyBAsGZg",
    cover: "/covers/8.jpg",
    featured: false,
  },
  {
    title: "首曝被500万人围观，对话开发团队：一群“臭打游戏的”要做机甲美少女",
    summary: "新一个机甲“大将”",
    track: "二游",
    type: "专访",
    reads: 4.6,
    hot: false,
    link: "https://mp.weixin.qq.com/s/RS4-444ywg_-3ctThHgD0Q",
    cover: "/covers/9.jpg",
    exclusive: true,
    featured: true,
  },
  {
    title: "米哈游“赌”赢了",
    summary: "也赚麻了",
    track: "二游",
    type: "深度",
    reads: 10,
    hot: true,
    link: "https://mp.weixin.qq.com/s/Ymh3eimxVsfFIWBjJKyL4A",
    cover: "/covers/10.jpg",
    featured: true,
  },
  {
    title: "无滤镜现场直拍，ChinaJoy上最美的25组Coser",
    summary: "无滤镜无美颜生图！",
    track: "现场·行业",
    type: "深度",
    reads: 20,
    hot: true,
    link: "https://mp.weixin.qq.com/s/iqmPCIcTn6LmYXkxV_uOBQ",
    cover: "/covers/11.jpg",
    coverPos: "center top",
    featured: true,
  },
  {
    title: "对话ChinaJoy上被玩家“开香槟”的游戏：还有硬仗要打",
    summary: "不惧任何“意见”！",
    track: "现场·行业",
    type: "采访",
    reads: 2.4,
    hot: false,
    link: "https://mp.weixin.qq.com/s/czMYs_qCFprTy9WxGvPwAA",
    cover: "/covers/12.jpg",
    featured: false,
  },
  {
    title: "该给米哈游即将“关服”的六字游戏盖棺定论了",
    summary: "严肃退坑“空月之歌”",
    track: "二游",
    type: "深度",
    reads: 20,
    hot: true,
    link: "https://mp.weixin.qq.com/s/nHdwOteynqVSbjUhpqUqQg",
    cover: "/covers/13.jpg",
    featured: true,
  },
  {
    title: "对话腾讯最新3A：老外做的游戏，怎么让中国玩家“认”？",
    summary: "三亿鼠标的“新”梦想",
    track: "单机",
    type: "采访",
    reads: 2.7,
    hot: false,
    link: "https://mp.weixin.qq.com/s/4xiAYQlglDCRS15ngtIr0A",
    cover: "/covers/14.jpg",
    featured: false,
  },
  {
    title: "对话拿到腾讯投资的制作人：黑神话之后，为何还做西幻单机",
    summary: "拭目以待",
    track: "单机",
    type: "采访",
    reads: 4.4,
    hot: false,
    link: "https://mp.weixin.qq.com/s/7oEOvWkThPZHuGnx1aukuQ",
    cover: "/covers/15.jpg",
    featured: false,
  },
  {
    title: "鹰角凭什么成了二游“梗王”？",
    summary: "又“出圈”了",
    track: "二游",
    type: "深度",
    reads: 3.3,
    hot: false,
    link: "https://mp.weixin.qq.com/s/kEjghfNC3_4Oi7yn2s-jFg",
    cover: "/covers/16.jpg",
    featured: false,
  },
  {
    title: "《鸣潮》怎么又“起飞”了？",
    summary: "“飞”起来了",
    track: "二游",
    type: "深度",
    reads: 4.9,
    hot: false,
    link: "https://mp.weixin.qq.com/s/iF-mni41gJA2x_poi8IqRg",
    cover: "/covers/17.jpg",
    featured: false,
  },
  {
    title: "米哈游《源初之结》科隆首曝：多元神话题材+组队战斗",
    summary: "正式亮相！",
    track: "二游",
    type: "深度",
    reads: 3.6,
    hot: false,
    link: "https://mp.weixin.qq.com/s/rkyIeQCdb7cobxp51_d47w",
    cover: "/covers/18.jpg",
    featured: false,
  },
  {
    title: "27分钟的实机演示，让《GTA6》亮出了王牌",
    summary: "引领下一个十年！",
    track: "单机",
    type: "深度",
    reads: 5.2,
    hot: false,
    link: "https://mp.weixin.qq.com/s/JkyDyn2PRKiV1_JIQy5hbA",
    cover: "/covers/19.jpg",
    featured: false,
  },
  {
    title: "专访腾讯接手的50亿爆款制作人：中国也是它的“主战场”",
    summary: "“另类”大作",
    track: "单机",
    type: "专访",
    reads: 2.8,
    hot: false,
    link: "https://mp.weixin.qq.com/s/W2rJBMTWH1Ecu61jqus6ew",
    cover: "/covers/20.jpg",
    exclusive: true,
    featured: true,
  },
  {
    title: "从搜打撤到“游乐场”：三角洲不“卷”了？",
    summary: "越来越有活儿了",
    track: "射击",
    type: "深度",
    reads: 10,
    hot: true,
    link: "https://mp.weixin.qq.com/s/LEy4dvr03DOGDdAFb17BHg",
    cover: "/covers/21.jpg",
    featured: true,
  },
  {
    title: "爱上一个二游角色，到底有多难？",
    summary: "不该被忽视的体验",
    track: "二游",
    type: "深度",
    reads: 4,
    hot: false,
    link: "https://mp.weixin.qq.com/s/-fwLJ0ZWC5U7SWttnp_NOQ",
    cover: "/covers/22.jpg",
    featured: false,
  },
];

// 手动置顶顺序（按公众号原文链接匹配），这三篇固定排在列表最前
const PINNED = [
  "https://mp.weixin.qq.com/s/Ymh3eimxVsfFIWBjJKyL4A", // 1 米哈游“赌”赢了
  "https://mp.weixin.qq.com/s/nHdwOteynqVSbjUhpqUqQg", // 2 该给米哈游即将“关服”的六字游戏盖棺定论了
  "https://mp.weixin.qq.com/s/I0oYjJHzNgrUv7sScsc7jg", // 3 被判“过气”后，它怎么又在二游里复兴了？
];

// 阅读量文案：20w+ / 10w+ / 具体万数
export function readsLabel(w) {
  if (!w.hot) return `${w.reads}万`;
  return w.reads >= 20 ? "20万+" : "10万+";
}

// 封面角标文案
export function hotLabel(w) {
  return w.reads >= 20 ? "20w+" : "10w+";
}

// 排序：手动置顶 → 10w+ → 专访 → 其余按阅读量降序
export function sortWorks(list) {
  return [...list].sort((a, b) => {
    const pa = PINNED.indexOf(a.link);
    const pb = PINNED.indexOf(b.link);
    const za = pa === -1 ? Infinity : pa;
    const zb = pb === -1 ? Infinity : pb;
    if (za !== zb) return za - zb;

    const ha = a.hot ? 0 : 1;
    const hb = b.hot ? 0 : 1;
    if (ha !== hb) return ha - hb;

    const ia = a.type === "专访" ? 0 : 1;
    const ib = b.type === "专访" ? 0 : 1;
    if (ia !== ib) return ia - ib;

    return (b.reads || 0) - (a.reads || 0);
  });
}
