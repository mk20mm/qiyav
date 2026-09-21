import type { CaseStudy } from "../../content";
import { FullDocument } from "../../full-document";

const platformModules = [
  ["数据源管理", "回答数据从哪里来、谁负责、用什么权限接入，以及连接是否健康。"],
  ["同步任务", "定义一条数据链路的对象、字段映射、运行方式、位点和失败恢复。"],
  ["任务编排", "管理多任务依赖、调度、节点重跑和最终业务数据发布。"],
  ["日志中心", "围绕运行实例、节点和批次组织日志，让异常可以被快速定位。"],
  ["数据血缘", "记录来源、转换规则和消费对象，用于影响分析与责任追踪。"],
  ["用户管理", "按角色、数据域和操作范围控制连接、任务和敏感数据权限。"],
  ["业务预警", "把技术异常转成业务可理解的风险，并形成定位、通知、确认闭环。"],
];

const coreObjects = [
  ["DataSource", "连接、认证、业务域与负责人"],
  ["SyncTask", "源目标、对象范围、映射与恢复策略"],
  ["Workflow", "节点依赖、调度规则与发布边界"],
  ["RunInstance", "一次真实运行的状态、批次和输出"],
  ["LineageEdge", "字段与数据集之间的来源和影响关系"],
  ["AlertRule", "指标、阈值、责任人和处置状态"],
];

const deliverySteps = [
  ["01", "还原真实需求", "先确认现有功能、业务使用者和事实边界，不从页面样式开始。"],
  ["02", "冻结领域模型", "先稳定数据源、任务、流程、实例、血缘和预警对象，再分模块实现。"],
  ["03", "拆成交付切片", "每个切片包含页面、状态、交互、异常和验收，不让 AI 一次改完整个平台。"],
  ["04", "交叉审查", "检查模块是否共享同一语义，避免页面名称相同但后端对象不一致。"],
  ["05", "场景验收", "用接入、运行、失败、追踪、影响分析和预警处置路径验证平台。"],
];

export function DataSyncDeepDive({ item }: { item: CaseStudy }) {
  return (
    <div className="detail-layout sync-deep-dive-layout">
      <aside className="detail-aside">
        <p className="section-label">DESIGN PROCESS</p>
        <p>{item.role}</p>
        <div className="detail-index">
          <a href="#starting-point">01 / 起点判断</a>
          <a href="#decomposition">02 / 问题拆解</a>
          <a href="#domain-model">03 / 领域模型</a>
          <a href="#module-design">04 / 功能设计</a>
          <a href="#sync-semantics">05 / 同步语义</a>
          <a href="#orchestration-design">06 / 编排设计</a>
          <a href="#governance">07 / 治理闭环</a>
          <a href="#business-alerts">08 / 业务预警</a>
          <a href="#ai-delivery">09 / AI 协作</a>
          <a href="#evidence">10 / 交付边界</a>
          <a href="#complete-retrospective">11 / 完整复盘</a>
        </div>
      </aside>

      <div className="detail-body sync-deep-dive-body">
        <section id="starting-point">
          <span className="detail-number">01</span>
          <p className="section-label">STARTING POINT</p>
          <h2>第一步不是画七个页面，而是确定平台要形成什么闭环。</h2>
          <p>
            如果只按功能清单开发，最终很容易得到七套彼此独立的 CRUD。我的判断是：平台真正的主线应该是
            “数据接入 → 任务运行 → 问题追踪 → 影响分析 → 业务预警 → 责任人处置”。
            因此，七个模块必须共享任务、实例、数据对象和责任边界，而不是只共享一个导航栏。
          </p>
          <div className="thinking-flow" aria-label="数据平台业务闭环">
            {[
              "接入数据源", "定义同步任务", "组织任务编排", "记录运行日志", "建立数据血缘", "识别业务异常", "通知责任人",
            ].map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></div>)}
          </div>
        </section>

        <section id="decomposition">
          <span className="detail-number">02</span>
          <p className="section-label">PROBLEM DECOMPOSITION</p>
          <h2>把功能清单拆成接入、执行、治理和应用四层。</h2>
          <div className="platform-layer-grid">
            <article><span>01 / 接入层</span><strong>数据源管理</strong><p>处理连接、认证、网络、业务归属和最小权限。</p></article>
            <article><span>02 / 执行层</span><strong>同步任务 · 任务编排</strong><p>处理单链路执行与多任务依赖，分别控制恢复和发布。</p></article>
            <article><span>03 / 治理层</span><strong>日志中心 · 数据血缘 · 用户管理</strong><p>让运行可追踪、变更可分析、访问可控制。</p></article>
            <article><span>04 / 应用层</span><strong>业务预警</strong><p>把技术状态翻译成业务风险，并驱动处置闭环。</p></article>
          </div>
          <aside className="sync-decision-callout">
            <strong>关键判断</strong>
            <p>“同步任务”和“任务编排”必须拆开：前者保证一条链路可靠，后者保证多个节点按业务依赖完成一次交付。</p>
          </aside>
        </section>

        <section id="domain-model">
          <span className="detail-number">03</span>
          <p className="section-label">DOMAIN MODEL</p>
          <h2>先冻结核心对象，再决定每个页面展示什么。</h2>
          <div className="platform-domain-flow">
            <span>DataSource</span><b>→</b><span>SyncTask</span><b>→</b><span>Workflow</span><b>→</b><span>RunInstance</span><b>→</b><span>Alert</span>
            <small>Log、Lineage、User / Role 贯穿运行全过程</small>
          </div>
          <div className="domain-object-grid">
            {coreObjects.map(([name, description]) => <article key={name}><code>{name}</code><p>{description}</p></article>)}
          </div>
          <p>
            页面之间通过这些对象关联：从一条业务预警可以找到指标数据集，再沿血缘定位同步任务和编排节点，最后通过运行实例、日志和用户权限找到问题与责任人。
          </p>
        </section>

        <section id="module-design">
          <span className="detail-number">04</span>
          <p className="section-label">MODULE RATIONALE</p>
          <h2>每个模块都要回答一个不同的问题。</h2>
          <div className="module-rationale-grid">
            {platformModules.map(([name, description], index) => (
              <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong><p>{description}</p></article>
            ))}
          </div>
        </section>

        <section id="sync-semantics">
          <span className="detail-number">05</span>
          <p className="section-label">SYNC SEMANTICS</p>
          <h2>同步可靠性不能依赖“任务通常不会失败”。</h2>
          <div className="architecture-list">
            {item.architecture?.map((decision, index) => (
              <article key={decision.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{decision.title}</h3><p>{decision.description}</p></div></article>
            ))}
          </div>
          <div className="sync-sequence-compact">
            <span>读取数据</span><b>→</b><span>标准化与映射</span><b>→</b><span>目标端幂等写入</span><b>→</b><span>提交 Checkpoint</span>
          </div>
          <p>顺序的核心是“宁可重复，不可丢失”：写入成功后再提交位点，崩溃最多产生可治理的重复，不会静默跳过尚未落库的数据。</p>
        </section>

        <section id="orchestration-design">
          <span className="detail-number">06</span>
          <p className="section-label">ORCHESTRATION DESIGN</p>
          <h2>编排不仅描述依赖，还要定义失败后的业务边界。</h2>
          <div className="sync-context-grid">
            <article><small>节点契约</small><ul><li>输入数据集和前置任务明确</li><li>输出行数、金额、耗时和状态留痕</li><li>节点失败不允许下游继续发布错误数据</li><li>支持从当前节点或指定范围重跑</li></ul></article>
            <article><small>流程状态</small><ul><li>草稿、已发布、运行中、暂停、失败、完成</li><li>发布后变更需要新版本</li><li>每次运行生成独立 RunInstance</li><li>重跑保留原失败实例用于复盘</li></ul></article>
          </div>
          <aside className="sync-decision-callout"><strong>为什么要版本化？</strong><p>如果编排定义被直接覆盖，历史实例将无法解释。流程版本与运行实例绑定，才能回答“这批数据当时按哪套规则生成”。</p></aside>
        </section>

        <section id="governance">
          <span className="detail-number">07</span>
          <p className="section-label">OBSERVABILITY & GOVERNANCE</p>
          <h2>日志、血缘和权限必须在任务创建时进入设计。</h2>
          <div className="governance-triad">
            <article><span>LOG</span><strong>日志回答“发生了什么”</strong><p>围绕运行实例、节点、批次和 Trace ID 记录，不把错误留在无法补偿的文本里。</p></article>
            <article><span>LINEAGE</span><strong>血缘回答“影响了什么”</strong><p>记录表级和字段级来源、转换规则以及下游报表、指标和预警。</p></article>
            <article><span>ACCESS</span><strong>权限回答“谁可以处理”</strong><p>角色决定操作能力，数据域决定可见范围，敏感字段默认脱敏。</p></article>
          </div>
        </section>

        <section id="business-alerts">
          <span className="detail-number">08</span>
          <p className="section-label">BUSINESS ALERT LOOP</p>
          <h2>业务预警的价值，是把异常变成可执行动作。</h2>
          <div className="business-loop-flow">
            <span>指标异常</span><b>→</b><span>识别数据对象</span><b>→</b><span>沿血缘定位</span><b>→</b><span>检查任务与日志</span><b>→</b><span>通知责任人</span><b>→</b><span>确认与复盘</span>
          </div>
          <div className="validation-table" role="table" aria-label="平台场景验收">
            {[
              ["GMV 与订单口径差异超过阈值", "定位对应 ADS 表、聚合节点、源表与规则负责人"],
              ["库存同步延迟", "找到运行实例、最后成功批次、错误日志和影响报表"],
              ["敏感字段被无权限用户访问", "拒绝访问并记录审计事件，通知平台管理员"],
            ].map(([scenario, expected]) => <div role="row" key={scenario}><strong role="cell">{scenario}</strong><span role="cell">{expected}</span></div>)}
          </div>
        </section>

        <section id="ai-delivery">
          <span className="detail-number">09</span>
          <p className="section-label">AI-ASSISTED DELIVERY</p>
          <h2>AI 提高实现速度，我负责让结果属于同一个系统。</h2>
          <p>使用 Claude Code、Codex 等工具辅助代码分析、页面实现、测试和文档整理；真正需要本人持续控制的是事实来源、领域模型、任务边界、跨模块一致性和验收标准。</p>
          <div className="delivery-step-list">
            {deliverySteps.map(([code, title, description]) => <article key={code}><span>{code}</span><div><strong>{title}</strong><p>{description}</p></div></article>)}
          </div>
        </section>

        <section className="sync-evidence-section" id="evidence">
          <span className="detail-number">10</span>
          <p className="section-label">DELIVERABLES & EVIDENCE</p>
          <h2>当前能展示什么，以及接下来要补什么。</h2>
          <div className="sync-proof-grid">{item.results.map((result) => <article key={result}>{result}</article>)}</div>
          <div className="sync-evidence-boundary"><strong>证据边界</strong><p>{item.boundary}</p></div>
        </section>

        <section className="full-case-retrospective" id="complete-retrospective">
          <span className="detail-number">11</span>
          <p className="section-label">COMPLETE RETROSPECTIVE</p>
          <h2>从页面结构继续读到系统语义、任务拆分与故障验证。</h2>
          <p className="full-chapter-note">以下为异构数据同步平台的完整复盘：从同步语义、Connector 边界到位点恢复、故障注入和系统级交付验证。</p>
          <FullDocument path="cases/data-sync-platform.md" />
        </section>
      </div>
    </div>
  );
}
