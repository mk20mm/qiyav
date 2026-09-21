import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the QIYA documentation homepage with real project notes", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /QIYA Engineering Notes｜企业系统交付实践/);
  assert.match(html, /企业系统交付/);
  assert.match(html, /把模糊任务/);
  assert.match(html, /生态店铺 GMV 清洗迁移/);
  assert.match(html, /异构数据同步平台/);
  assert.match(html, /搜索站内内容/);
  assert.match(html, /aria-haspopup="menu"/);
  assert.match(html, /切换为深色主题/);
  assert.match(html, /交付闭环/);
  assert.match(html, /方法论/);
  assert.match(html, /资产包/);
  assert.match(html, /需求体检清单/);
  assert.match(html, /开发者的工作边界/);
  assert.doesNotMatch(html, /打开交互演示|平台演示/);
  assert.doesNotMatch(html, /相似款识图|知识库检索/);
  assert.match(html, /http:\/\/localhost:3000\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/);
});

test("case detail routes emit record-specific metadata and theme-specific thinking", async () => {
  for (const [path, title, themedCopy] of [
    ["/cases/ecosystem-gmv", "生态店铺 GMV 清洗迁移", /难点不是重写 SQL，而是把历史链路还原成可验证的业务口径/],
    ["/cases/supply-chain", "供应链订单与履约中台", /先确定合同、订单与库存分别由谁负责/],
    ["/cases/finance-settlement", "激励结算与业财一体化", /结算的核心不是调通接口，而是任何状态都不能错/],
    ["/cases/data-sync-platform", "异构数据同步平台", /第一步不是画七个页面，而是确定平台要形成什么闭环/],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`${title}｜QIYA Project Note`));
    assert.match(html, new RegExp(title));
    assert.match(html, themedCopy);
    if (path === "/cases/data-sync-platform") {
      assert.match(html, /DESIGN PROCESS/);
      assert.match(html, /DOMAIN MODEL/);
      assert.match(html, /业务预警的价值，是把异常变成可执行动作/);
      assert.match(html, /AI 提高实现速度，我负责让结果属于同一个系统/);
      assert.doesNotMatch(html, /打开完整演示|查看任务编排|直接进入演示/);
    }
    if (path === "/cases/ecosystem-gmv") {
      assert.match(html, /EVIDENCE TRAIL/);
      assert.match(html, /Kettle 链路报告/);
      assert.match(html, /save=false/);
      assert.match(html, /只有平台生成全部成功才刷新 GMV 汇总/);
    }
    assert.doesNotMatch(html, /http:\/\/localhost\/og\.png/);
  }
});

test("method library renders the adapted delivery chapters and record-specific metadata", async () => {
  const indexResponse = await render("/method");
  assert.equal(indexResponse.status, 200);
  const indexHtml = await indexResponse.text();
  assert.match(indexHtml, /完整方法论目录/);
  assert.match(indexHtml, /生态店铺 GMV 清洗迁移/);
  assert.doesNotMatch(indexHtml, /账单接口|bill-api|尹庆|site-v3/);

  const detailResponse = await render("/method/02-clarify");
  assert.equal(detailResponse.status, 200);
  const detailHtml = await detailResponse.text();
  assert.match(detailHtml, /需求体检：先找出未声明的决定｜QIYA 交付方法/);
  assert.match(detailHtml, /生态店铺 GMV/);
  assert.match(detailHtml, /FULL CHAPTER/);
  assert.match(detailHtml, /八维体检/);
  assert.match(detailHtml, /旧规则分散在历史文档、任务、SQL 和数据库调用关系中/);
  assert.match(detailHtml, /第一部分：认知/);
  assert.match(detailHtml, /配套资产/);
  assert.doesNotMatch(detailHtml, /账单接口|bill-api|尹庆/);
  assert.doesNotMatch(detailHtml, /http:\/\/localhost\/og\.png/);
});

test("renders the migrated long-form notes with explicit evidence boundaries", async () => {
  for (const [path, expected] of [
    ["/fieldnotes/harness", /它不是“已经全部生产运行”的成果声明/],
    ["/interview", /会用 Claude Code、Codex.*没有区分度/],
    ["/essays", /延伸思考/],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, expected);
    assert.doesNotMatch(html, /账单接口|bill-api|尹庆|业务代码零手写/);
  }

  const caseResponse = await render("/cases/data-sync-platform");
  const caseHtml = await caseResponse.text();
  assert.match(caseHtml, /COMPLETE RETROSPECTIVE/);
  assert.match(caseHtml, /异构数据同步平台：系统级交付完整复盘/);
  assert.match(caseHtml, /我组织 AI 交付了一个系统/);
  assert.match(caseHtml, /峰值吞吐、端到端延迟、稳定运行时长与故障次数/);
});

test("data integration prototype renders every functional deep link", async () => {
  for (const [path, expected] of [
    ["/systems/data-sync-platform?view=overview", /异构数据同步运行总览/],
    ["/systems/data-sync-platform?view=sources", /数据源管理/],
    ["/systems/data-sync-platform?view=sync-tasks", /同步任务/],
    ["/systems/data-sync-platform?view=orchestration", /任务编排/],
    ["/systems/data-sync-platform?view=logs", /日志中心/],
    ["/systems/data-sync-platform?view=lineage", /数据血缘/],
    ["/systems/data-sync-platform?view=users", /用户管理/],
    ["/systems/data-sync-platform?view=alerts", /业务预警/],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, expected);
    assert.match(html, /界面原型 · 示例数据/);
  }
});

test("asset package routes provide reusable engineering templates", async () => {
  for (const [path, expected] of [
    ["/assets/checklist", /需求体检清单/],
    ["/assets/spec-template", /需求到规格模板/],
    ["/assets/agent-task-template", /Agent 工作单模板/],
    ["/assets/verification-template", /验收与验证清单/],
    ["/assets/defect-library", /AI 代码缺陷检查表/],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, expected);
    assert.match(html, /什么时候使用/);
    assert.doesNotMatch(html, /账单接口|bill-api|尹庆/);
  }
});

test("starter preview source has been removed and social card exists", async () => {
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../app/cases/[slug]/page.tsx", import.meta.url));
  await access(new URL("../app/method/page.tsx", import.meta.url));
  await access(new URL("../app/method/[slug]/page.tsx", import.meta.url));
  await access(new URL("../app/method-content.ts", import.meta.url));
  await access(new URL("../app/document-navigation.ts", import.meta.url));
  await access(new URL("../app/method-sidebar.tsx", import.meta.url));
  await access(new URL("../app/asset-content.ts", import.meta.url));
  await access(new URL("../app/site-navigation.tsx", import.meta.url));
  await access(new URL("../app/about/page.tsx", import.meta.url));
  await access(new URL("../app/systems/data-sync-platform/sync-platform-demo.tsx", import.meta.url));
  await access(new URL("../app/cases/[slug]/data-sync-deep-dive.tsx", import.meta.url));
  await access(new URL(".openai/hosting.json", projectRoot));
});
