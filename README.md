# QIYA_V1｜孙国兵的企业 AI 与系统交付实践

这是一个用于演示和复盘的个人工程实践文档站，重点回答项目背后的问题：

- 处理过什么真实业务；
- 在项目中负责什么；
- 做过哪些技术决策；
- 如何使用 AI 提高研发效率；
- 如何验证结果并控制风险。

## 内容结构

- `/`：个人定位、核心证据、代表项目和能力地图；
- `/cases`：全部项目证据；
- `/cases/[slug]`：项目详情，按业务问题、个人责任、关键决策、已验证结果和证据边界展开；
- `/method`：AI 辅助研发六步工作法、质量门禁和完整方法论目录；
- `/method/[slug]`：认知、需求、设计、执行、验证、运行与实证章节；
- `/about`：内容定位、资料来源和阅读路径。

## 证据边界

### 真实企业项目

- 生态店铺 GMV 清洗迁移；
- 供应链订单与履约中台；
- 激励结算与业财一体化；
- 异构数据同步平台系统设计。

以上项目来自现有代码、提交记录、项目文档和本人职责确认。没有生产数据支撑的性能、成功率和业务收益不写精确数字。

### 个人项目

- 异构数据同步平台。

该案例用于展示系统设计、Agent 协作、故障恢复和验证思路，不归入公司任职成果。正式对外使用前，应补齐可运行仓库、自动化测试和演示记录。

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

正式构建：

```bash
npm run build
```

## 部署到 GitHub Pages

站点已配置为静态导出（`output: "export"`），推送到 GitHub 后由 Actions 自动构建发布。

1. 在 GitHub 新建仓库（任意名字均可，用户站点 `<user>.github.io` 或项目站点皆可）；
2. 仓库 Settings → Pages → Source 选择 **GitHub Actions**；
3. 推送 `main` 分支，`.github/workflows/deploy.yml` 会自动构建并把 `dist/client` 发布到 Pages。

项目站点（`<user>.github.io/<repo>`）的 `basePath` 由 workflow 从仓库名自动推导，无需手动配置。本地预览带前缀的构建结果：

```bash
NEXT_PUBLIC_BASE_PATH="/<repo>" NEXT_PUBLIC_SITE_URL="https://<user>.github.io/<repo>" npm run build
```

> 说明：带 `basePath` 构建时，vinext 会按 URL 路径镜像输出（首页为 `<basePath>.html`，其余在 `<basePath>/` 目录下），workflow 中的「Flatten basePath output」步骤会将其展平到产物根目录，以适配 GitHub Pages 项目站点的挂载方式。

## 后续补证优先级

1. GMV 同范围新旧链路耗时和对账结果；
2. 供应链覆盖店铺、仓库、订单量和推送成功率；
3. 业财结算月均单据量、规则命中率和异常恢复耗时；
4. 知识库规模、请求量和人工采用反馈；
5. 数据同步平台可运行仓库、故障注入测试和演示视频。
