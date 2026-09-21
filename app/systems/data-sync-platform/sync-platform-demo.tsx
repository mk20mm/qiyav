"use client";

import Link from "next/link";
import { useState } from "react";

export type SyncScreenId =
  | "overview"
  | "sources"
  | "sync-tasks"
  | "orchestration"
  | "logs"
  | "lineage"
  | "users"
  | "alerts";

type SyncPlatformDemoProps = Readonly<{ initialView?: SyncScreenId }>;
type TaskState = "运行中" | "已暂停";
type LogLevel = "全部" | "INFO" | "WARN" | "ERROR";

const screens: Array<{ id: SyncScreenId; label: string; code: string }> = [
  { id: "overview", label: "平台总览", code: "01" },
  { id: "sources", label: "数据源管理", code: "02" },
  { id: "sync-tasks", label: "同步任务", code: "03" },
  { id: "orchestration", label: "任务编排", code: "04" },
  { id: "logs", label: "日志中心", code: "05" },
  { id: "lineage", label: "数据血缘", code: "06" },
  { id: "users", label: "用户管理", code: "07" },
  { id: "alerts", label: "业务预警", code: "08" },
];

const moduleDescriptions: Record<Exclude<SyncScreenId, "overview">, string> = {
  sources: "连接、认证与归属",
  "sync-tasks": "配置、运行与恢复",
  orchestration: "依赖、调度与发布",
  logs: "定位、筛选与追踪",
  lineage: "影响分析与责任定位",
  users: "角色、数据域与权限",
  alerts: "规则、通知与处置闭环",
};

const dataSources = [
  { id: "mysql-ec", name: "电商交易库", type: "MySQL", owner: "交易域", usage: "订单 / 退款", tone: "blue" },
  { id: "sqlserver-e3", name: "E3 业务库", type: "SQL Server", owner: "履约域", usage: "销货单 / 库存", tone: "cyan" },
  { id: "postgres-finance", name: "结算服务库", type: "PostgreSQL", owner: "财务域", usage: "发票 / 结算单", tone: "violet" },
  { id: "doris-warehouse", name: "经营分析仓", type: "Doris", owner: "数据平台", usage: "ODS / DWD / ADS", tone: "amber" },
];

const orchestrationNodes = [
  { id: "extract", code: "N01", title: "采集订单数据", type: "同步任务", detail: "trade_order → ods_trade_order" },
  { id: "clean", code: "N02", title: "字段清洗", type: "转换任务", detail: "金额、平台、时间统一" },
  { id: "mapping", code: "N03", title: "业务口径映射", type: "规则任务", detail: "平台与事业部归属" },
  { id: "aggregate", code: "N04", title: "GMV 聚合", type: "计算任务", detail: "日 / 平台 / 品类汇总" },
  { id: "quality", code: "N05", title: "数据质检", type: "校验任务", detail: "行数、金额与空值检查" },
  { id: "publish", code: "N06", title: "发布主题表", type: "发布任务", detail: "ads_ecosystem_gmv_daily" },
];

const logs = [
  { time: "10:42:18", level: "INFO", task: "生态 GMV 日清", message: "抖音订单增量读取完成，进入清洗节点" },
  { time: "10:42:21", level: "WARN", task: "生态 GMV 日清", message: "发现 3 条平台编码缺失记录，已进入异常旁路" },
  { time: "10:42:25", level: "INFO", task: "生态 GMV 日清", message: "GMV 聚合节点完成，等待数据质检" },
  { time: "10:43:02", level: "ERROR", task: "库存同步", message: "E3 接口连续超时，任务已按规则暂停" },
  { time: "10:43:10", level: "INFO", task: "结算数据同步", message: "Checkpoint 已提交，当前批次处理完成" },
];

const users = [
  { id: "u01", name: "陈晓", team: "数据平台", role: "平台管理员", scope: "全部数据域", status: "正常" },
  { id: "u02", name: "李雯", team: "经营分析", role: "任务开发者", scope: "交易域 / 商品域", status: "正常" },
  { id: "u03", name: "周凯", team: "供应链", role: "业务观察者", scope: "供应链域", status: "正常" },
  { id: "u04", name: "王宁", team: "外部协作", role: "只读访客", scope: "指定报表", status: "已停用" },
];

const initialAlerts = [
  { id: "A-2408", level: "高", title: "生态 GMV 与订单口径差异超阈值", source: "ads_ecosystem_gmv_daily", value: "差异 3.7%", status: "待确认" },
  { id: "A-2407", level: "中", title: "供应链库存同步延迟", source: "inventory_to_doris", value: "延迟 18 min", status: "待确认" },
  { id: "A-2405", level: "低", title: "结算任务出现字段空值", source: "finance_settlement_daily", value: "空值 12 条", status: "已确认" },
];

export function SyncPlatformDemo({ initialView = "overview" }: SyncPlatformDemoProps) {
  const [screen, setScreen] = useState<SyncScreenId>(initialView);
  const [testedSources, setTestedSources] = useState<string[]>(["mysql-ec", "doris-warehouse"]);
  const [taskState, setTaskState] = useState<TaskState>("运行中");
  const [selectedNode, setSelectedNode] = useState("aggregate");
  const [logLevel, setLogLevel] = useState<LogLevel>("全部");
  const [selectedUser, setSelectedUser] = useState("u02");
  const [lineageFocus, setLineageFocus] = useState<"上游" | "下游">("下游");
  const [alerts, setAlerts] = useState(initialAlerts);

  const switchScreen = (id: SyncScreenId) => {
    setScreen(id);
    window.history.replaceState(null, "", `?view=${id}`);
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts((current) => current.map((item) => item.id === id ? { ...item, status: "已确认" } : item));
  };

  return (
    <div className="sync-app integration-app">
      <header className="sync-topbar">
        <div className="sync-product-name">
          <Link href="/cases/data-sync-platform" aria-label="返回异构数据同步平台案例">QIYA</Link>
          <span>/</span>
          <strong>Heterogeneous Data Sync</strong>
        </div>
        <div className="sync-top-actions">
          <span className="platform-environment"><i /> 开发环境</span>
          <span className="demo-data-label">界面原型 · 示例数据</span>
          <Link href="/cases/data-sync-platform">返回项目复盘</Link>
        </div>
      </header>

      <div className="sync-app-layout integration-layout">
        <aside className="sync-sidebar" aria-label="数据集成平台功能导航">
          <div className="sync-sidebar-title">
            <span>DATA PLATFORM</span>
            <strong>数据集成与应用</strong>
          </div>
          <nav className="sync-nav">
            {screens.map((item) => (
              <button className={screen === item.id ? "active" : ""} key={item.id} onClick={() => switchScreen(item.id)} type="button">
                <span>{item.code}</span>{item.label}
              </button>
            ))}
          </nav>
          <div className="sync-sidebar-rule">
            <span>平台主线</span>
            <strong>接入 → 运行 → 治理</strong>
            <p>业务预警可以反查任务、日志、血缘和责任人。</p>
          </div>
        </aside>

        <section className="sync-workspace integration-workspace">
          {screen === "overview" && <OverviewScreen onNavigate={switchScreen} />}
          {screen === "sources" && <SourcesScreen tested={testedSources} onTest={(id) => setTestedSources((current) => current.includes(id) ? current : [...current, id])} />}
          {screen === "sync-tasks" && <SyncTasksScreen taskState={taskState} onToggle={() => setTaskState((current) => current === "运行中" ? "已暂停" : "运行中")} onNavigate={switchScreen} />}
          {screen === "orchestration" && <OrchestrationScreen selectedNode={selectedNode} onSelect={setSelectedNode} />}
          {screen === "logs" && <LogsScreen level={logLevel} onLevel={setLogLevel} />}
          {screen === "lineage" && <LineageScreen focus={lineageFocus} onFocus={setLineageFocus} />}
          {screen === "users" && <UsersScreen selected={selectedUser} onSelect={setSelectedUser} />}
          {screen === "alerts" && <AlertsScreen alerts={alerts} onAcknowledge={acknowledgeAlert} />}
        </section>
      </div>
    </div>
  );
}

type NavigateProps = Readonly<{ onNavigate: (id: SyncScreenId) => void }>;

function OverviewScreen({ onNavigate }: NavigateProps) {
  return (
    <div className="sync-screen">
      <ScreenHeading eyebrow="PLATFORM OVERVIEW" title="异构数据同步运行总览" description="总览只呈现需要判断的状态：数据是否接通、任务是否健康、链路是否可追踪、业务是否出现异常。" />
      <div className="sync-metric-grid">
        <MetricCard value="12" label="数据源" detail="数据库、API 与数仓连接" />
        <MetricCard value="38" label="同步任务" detail="全量、增量与定时批处理" />
        <MetricCard value="09" label="编排流程" detail="跨任务依赖与业务发布链路" />
        <MetricCard value="07" label="待处理预警" detail="示例数据，不代表生产指标" />
      </div>
      <div className="integration-overview-grid">
        <section className="sync-panel platform-health-panel">
          <div className="panel-heading"><div><span>PLATFORM HEALTH</span><h2>今日运行状态</h2></div><button onClick={() => onNavigate("logs")} type="button">查看日志</button></div>
          <div className="health-rings">
            <article><strong>126</strong><span>运行实例</span><small>完成 118 · 运行 5 · 异常 3</small></article>
            <article><strong>93.6%</strong><span>示例成功率</span><small>仅用于说明看板信息结构</small></article>
            <article><strong>5.2m</strong><span>平均时长</span><small>按实例口径展示</small></article>
          </div>
        </section>
        <section className="sync-panel domain-status-panel">
          <div className="panel-heading"><div><span>BUSINESS DOMAINS</span><h2>业务域状态</h2></div></div>
          <div className="domain-status-list">
            <div><span><i className="ok" />交易与 GMV</span><strong>正常</strong></div>
            <div><span><i className="warn" />供应链库存</span><strong>延迟</strong></div>
            <div><span><i className="ok" />业财结算</span><strong>正常</strong></div>
            <div><span><i className="alert" />业务预警</span><strong>7 项</strong></div>
          </div>
        </section>
      </div>
      <section className="sync-panel module-map-panel">
        <div className="panel-heading"><div><span>FUNCTION MAP</span><h2>平台能力地图</h2></div><small>点击进入对应模块</small></div>
        <div className="platform-module-grid">
          {screens.slice(1).map((item) => <button key={item.id} onClick={() => onNavigate(item.id)} type="button"><span>{item.code}</span><strong>{item.label}</strong><small>{moduleDescriptions[item.id as Exclude<SyncScreenId, "overview">]}</small></button>)}
        </div>
      </section>
    </div>
  );
}

type SourcesProps = Readonly<{ tested: string[]; onTest: (id: string) => void }>;

function SourcesScreen({ tested, onTest }: SourcesProps) {
  return (
    <div className="sync-screen">
      <ScreenHeading eyebrow="SOURCE MANAGEMENT" title="数据源管理" description="连接信息不只是技术配置，还需要记录业务归属、使用范围、权限和健康状态。" />
      <div className="source-summary"><span>全部 12</span><span>数据库 8</span><span>API 3</span><span>数仓 1</span><button type="button">＋ 新建数据源</button></div>
      <div className="connector-grid source-card-grid">
        {dataSources.map((source) => {
          const isTested = tested.includes(source.id);
          return (
            <article className={`connector-card connector-${source.tone}`} key={source.id}>
              <div className="connector-icon">{source.type.slice(0, 2).toUpperCase()}</div>
              <div><span>{source.owner}</span><h2>{source.name}</h2><p>{source.type} · {source.usage}</p></div>
              <button className={isTested ? "tested" : ""} onClick={() => onTest(source.id)} type="button">{isTested ? "连接正常" : "测试连接"}</button>
            </article>
          );
        })}
      </div>
      <section className="sync-panel source-governance-panel">
        <div className="panel-heading"><div><span>ACCESS GOVERNANCE</span><h2>接入前检查</h2></div></div>
        <div className="source-checks"><span>连接信息加密</span><span>最小读取权限</span><span>业务责任人</span><span>字段敏感等级</span><span>连接健康检查</span></div>
      </section>
    </div>
  );
}

type SyncTaskProps = Readonly<{ taskState: TaskState; onToggle: () => void; onNavigate: (id: SyncScreenId) => void }>;

function SyncTasksScreen({ taskState, onToggle, onNavigate }: SyncTaskProps) {
  return (
    <div className="sync-screen">
      <ScreenHeading eyebrow="SYNC TASKS" title="同步任务" description="单个任务负责一条明确的数据链路：读取什么、写到哪里、如何映射、失败后从哪里恢复。" />
      <div className="task-toolbar"><div><button className="active" type="button">全部任务</button><button type="button">运行中</button><button type="button">异常</button></div><button className="primary-action" type="button">＋ 新建同步任务</button></div>
      <section className="sync-panel integration-task-list">
        <div className="integration-table-head"><span>任务名称</span><span>数据链路</span><span>模式</span><span>最近运行</span><span>状态</span><span>操作</span></div>
        <div><strong>生态 GMV 订单同步</strong><span>MySQL → Doris</span><span>全量 + CDC</span><span>2 分钟前</span><i className={taskState === "运行中" ? "status-running" : "status-paused"}>{taskState}</i><button onClick={onToggle} type="button">{taskState === "运行中" ? "暂停" : "恢复"}</button></div>
        <div><strong>E3 库存同步</strong><span>SQL Server → Doris</span><span>定时批量</span><span>18 分钟前</span><i className="status-paused">已暂停</i><button onClick={() => onNavigate("logs")} type="button">查日志</button></div>
        <div><strong>结算数据同步</strong><span>PostgreSQL → Doris</span><span>CDC</span><span>刚刚</span><i className="status-running">运行中</i><button onClick={() => onNavigate("lineage")} type="button">看血缘</button></div>
      </section>
      <div className="task-design-strip">
        <article><span>01</span><strong>选择数据源</strong><small>权限与连接校验</small></article><b>→</b>
        <article><span>02</span><strong>定义对象</strong><small>表、字段与过滤范围</small></article><b>→</b>
        <article><span>03</span><strong>配置映射</strong><small>类型、口径与清洗规则</small></article><b>→</b>
        <article><span>04</span><strong>设置恢复</strong><small>位点、重试与异常旁路</small></article>
      </div>
    </div>
  );
}

type OrchestrationProps = Readonly<{ selectedNode: string; onSelect: (id: string) => void }>;

function OrchestrationScreen({ selectedNode, onSelect }: OrchestrationProps) {
  const selected = orchestrationNodes.find((node) => node.id === selectedNode)!;
  return (
    <div className="sync-screen">
      <ScreenHeading eyebrow="TASK ORCHESTRATION" title="任务编排" description="编排解决的不是单任务怎么跑，而是多个同步、清洗、校验和发布节点如何按依赖完成一次业务交付。" />
      <section className="sync-panel orchestration-header"><div><span>WORKFLOW / DEMO</span><h2>生态 GMV 日清链路</h2><p>每日 02:00 · 失败停止下游 · 支持节点重跑</p></div><div><i className="status-running">已发布</i><button type="button">运行一次</button></div></section>
      <div className="orchestration-layout">
        <section className="sync-panel dag-panel" aria-label="任务编排节点图">
          <div className="dag-flow">
            {orchestrationNodes.map((node, index) => (
              <div className="dag-node-wrap" key={node.id}>
                <button className={selectedNode === node.id ? "selected" : ""} onClick={() => onSelect(node.id)} type="button"><span>{node.code}</span><strong>{node.title}</strong><small>{node.type}</small></button>
                {index < orchestrationNodes.length - 1 && <b>→</b>}
              </div>
            ))}
          </div>
        </section>
        <aside className="sync-panel node-inspector"><span>SELECTED NODE</span><h2>{selected.title}</h2><p>{selected.detail}</p><dl><div><dt>失败策略</dt><dd>停止下游并告警</dd></div><div><dt>重跑范围</dt><dd>当前节点及下游</dd></div><div><dt>输出留痕</dt><dd>行数、金额、耗时</dd></div></dl><button type="button">编辑节点配置</button></aside>
      </div>
    </div>
  );
}

type LogsProps = Readonly<{ level: LogLevel; onLevel: (level: LogLevel) => void }>;

function LogsScreen({ level, onLevel }: LogsProps) {
  const visibleLogs = level === "全部" ? logs : logs.filter((item) => item.level === level);
  return (
    <div className="sync-screen">
      <ScreenHeading eyebrow="LOG CENTER" title="日志中心" description="日志以运行实例为主线关联任务、节点、数据批次和错误上下文，目标是定位问题而不是堆积文本。" />
      <div className="log-toolbar"><div>{(["全部", "INFO", "WARN", "ERROR"] as LogLevel[]).map((item) => <button className={level === item ? "active" : ""} key={item} onClick={() => onLevel(item)} type="button">{item}</button>)}</div><label>搜索任务或 Trace ID <input aria-label="搜索任务或 Trace ID" placeholder="输入关键字" /></label></div>
      <section className="sync-panel log-console">
        <div className="log-console-head"><span>时间</span><span>级别</span><span>任务 / 实例</span><span>日志内容</span></div>
        {visibleLogs.map((item) => <div key={`${item.time}-${item.level}`}><span>{item.time}</span><i className={`log-${item.level.toLowerCase()}`}>{item.level}</i><strong>{item.task}</strong><p>{item.message}</p></div>)}
      </section>
      <div className="log-context-strip"><span>Trace 上下文</span><strong>任务定义</strong><b>→</b><strong>运行实例</strong><b>→</b><strong>编排节点</strong><b>→</b><strong>数据批次</strong><b>→</b><strong>错误记录</strong></div>
    </div>
  );
}

type LineageProps = Readonly<{ focus: "上游" | "下游"; onFocus: (value: "上游" | "下游") => void }>;

function LineageScreen({ focus, onFocus }: LineageProps) {
  return (
    <div className="sync-screen">
      <ScreenHeading eyebrow="DATA LINEAGE" title="数据血缘" description="血缘不是装饰图，它要回答字段从哪里来、经过哪些规则、改动后会影响哪些报表和预警。" />
      <div className="lineage-toolbar"><div><button className={focus === "上游" ? "active" : ""} onClick={() => onFocus("上游")} type="button">查看上游</button><button className={focus === "下游" ? "active" : ""} onClick={() => onFocus("下游")} type="button">查看下游</button></div><span>当前对象：<strong>ads_ecosystem_gmv_daily.gmv_amount</strong></span></div>
      <section className="sync-panel lineage-canvas">
        <div className={`lineage-column ${focus === "上游" ? "focused" : ""}`}><small>SOURCE</small><article><span>MySQL</span><strong>trade_order.pay_amount</strong></article><article><span>MySQL</span><strong>trade_refund.refund_amount</strong></article></div>
        <b>→</b>
        <div className="lineage-column"><small>PROCESS</small><article><span>清洗规则</span><strong>金额精度统一</strong></article><article><span>业务规则</span><strong>GMV = 支付 - 退款</strong></article></div>
        <b>→</b>
        <div className={`lineage-column ${focus === "下游" ? "focused" : ""}`}><small>APPLICATION</small><article><span>ADS</span><strong>生态 GMV 日报</strong></article><article><span>预警</span><strong>GMV 口径差异规则</strong></article></div>
      </section>
      <section className="sync-panel impact-panel"><div><span>IMPACT ANALYSIS</span><h2>变更影响</h2></div><p>如果修改 <code>pay_amount</code> 的精度或统计口径，将影响 2 个清洗节点、1 张 ADS 主题表、1 个经营日报和 1 条业务预警规则。</p></section>
    </div>
  );
}

type UsersProps = Readonly<{ selected: string; onSelect: (id: string) => void }>;

function UsersScreen({ selected, onSelect }: UsersProps) {
  const current = users.find((user) => user.id === selected)!;
  return (
    <div className="sync-screen">
      <ScreenHeading eyebrow="USER & ACCESS" title="用户管理" description="权限围绕角色、数据域和操作范围组合，避免把平台管理员权限复制给每一个任务开发者。" />
      <div className="user-summary-grid"><MetricCard value="24" label="平台用户" detail="内部成员与受控访客" /><MetricCard value="04" label="角色模板" detail="管理员、开发者、观察者、访客" /><MetricCard value="06" label="数据域" detail="按业务域隔离查看与操作范围" /></div>
      <div className="user-management-layout">
        <section className="sync-panel user-table">
          <div className="user-table-head"><span>用户</span><span>团队</span><span>角色</span><span>状态</span></div>
          {users.map((user) => <button className={selected === user.id ? "selected" : ""} key={user.id} onClick={() => onSelect(user.id)} type="button"><strong>{user.name}</strong><span>{user.team}</span><span>{user.role}</span><i className={user.status === "正常" ? "status-running" : "status-paused"}>{user.status}</i></button>)}
        </section>
        <aside className="sync-panel permission-panel"><span>PERMISSION SCOPE</span><h2>{current.name}</h2><p>{current.team} · {current.role}</p><dl><div><dt>数据范围</dt><dd>{current.scope}</dd></div><div><dt>任务权限</dt><dd>查看 · 编辑 · 运行</dd></div><div><dt>敏感字段</dt><dd>默认脱敏</dd></div></dl><button type="button">调整权限</button></aside>
      </div>
    </div>
  );
}

type AlertItem = (typeof initialAlerts)[number];
type AlertsProps = Readonly<{ alerts: AlertItem[]; onAcknowledge: (id: string) => void }>;

function AlertsScreen({ alerts, onAcknowledge }: AlertsProps) {
  return (
    <div className="sync-screen">
      <ScreenHeading eyebrow="BUSINESS ALERTS" title="业务预警" description="预警从技术指标走向业务结果：发现异常后，可以沿血缘定位数据源、任务、规则和责任人。" />
      <div className="alert-rule-strip"><div><span>启用规则</span><strong>16</strong></div><div><span>待确认</span><strong>{alerts.filter((item) => item.status === "待确认").length}</strong></div><div><span>通知渠道</span><strong>企微 · 邮件</strong></div><button type="button">＋ 新建预警规则</button></div>
      <div className="business-alert-list">
        {alerts.map((alert) => (
          <article className={`business-alert alert-${alert.level}`} key={alert.id}>
            <div><span>{alert.id}</span><i>{alert.level}优先级</i></div>
            <div><h2>{alert.title}</h2><p>{alert.source}</p></div>
            <strong>{alert.value}</strong>
            <button disabled={alert.status === "已确认"} onClick={() => onAcknowledge(alert.id)} type="button">{alert.status}</button>
          </article>
        ))}
      </div>
      <section className="sync-panel alert-loop-panel"><div className="panel-heading"><div><span>CLOSED LOOP</span><h2>预警处置闭环</h2></div></div><div><span>业务指标异常</span><b>→</b><span>定位血缘对象</span><b>→</b><span>检查任务与日志</span><b>→</b><span>通知责任人</span><b>→</b><span>确认与复盘</span></div></section>
    </div>
  );
}

type ScreenHeadingProps = Readonly<{ eyebrow: string; title: string; description: string }>;

function ScreenHeading({ eyebrow, title, description }: ScreenHeadingProps) {
  return <header className="sync-screen-heading"><div><span>{eyebrow}</span><h1>{title}</h1></div><p>{description}</p></header>;
}

type MetricCardProps = Readonly<{ value: string; label: string; detail: string }>;

function MetricCard({ value, label, detail }: MetricCardProps) {
  return <article className="sync-metric-card"><strong>{value}</strong><div><span>{label}</span><small>{detail}</small></div></article>;
}
