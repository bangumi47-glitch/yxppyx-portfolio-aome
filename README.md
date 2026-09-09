# 游戏内容与传播作品集

个人作品集网站，展示游戏产业深度报道成果。

## 技术栈

- React 18 + Vite 6
- GSAP + ScrollTrigger（滚动动效）
- ogl（WebGL 渐变背景，Grainient 组件）

## 本地运行

```bash
npm install
npm run dev
```

访问 http://localhost:5173/

## 构建

```bash
npm run build
```

产物输出到 `dist/`。

## 页面结构

- 首页（`/`）：首屏胶片滚动 → 关于这份作品集 → 精选项目 → 采访与信源 → 个人优势（含游戏经历）→ 选题方法 → 全部作品 → 结尾
- 方法论页（`/#/method`）：四问硬闸 → 判断实例 → 方法体系

## 目录说明

```
src/
├── components/     页面组件
├── data/           作品数据（works.js）、方法论数据（method.js）
├── pages/          方法论独立页
├── hooks/          自定义 hook（3D 倾斜）
└── styles/         全局样式
public/
├── covers/         文章封面（22 张）
├── hero-bg/        首屏胶片背景（55 张）
├── games/          游戏经历背景图（5 张）
└── logo.jpg        头像
```
