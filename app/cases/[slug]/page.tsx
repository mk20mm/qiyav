import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components";
import { caseStudies } from "../../content";
import { DataSyncDeepDive } from "./data-sync-deep-dive";
import { ActiveAnchorNav } from "../../site-navigation";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = caseStudies.find((entry) => entry.slug === slug);
  if (!item) return {};

  return {
    title: `${item.title}｜QIYA Project Note`,
    description: item.summary,
    openGraph: {
      title: `${item.title}｜QIYA Project Note`,
      description: item.summary,
      images: [],
    },
    twitter: {
      title: `${item.title}｜QIYA Project Note`,
      description: item.summary,
      images: [],
    },
  };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = caseStudies.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const currentIndex = caseStudies.findIndex((entry) => entry.slug === slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];
  const hasSystemDeepDive = Boolean(item.invariants?.length);
  const narrative = item.narrative ?? {
    challengeLabel: "BUSINESS PROBLEM",
    challengeTitle: "先理解问题，才进入实现。",
    decisionsLabel: "KEY DECISIONS",
    decisionsTitle: "我负责的不是任务列表，而是关键取舍。",
    resultsLabel: "VERIFIED RESULTS",
    resultsTitle: "用已经完成的结果说话。",
    boundaryTitle: "不把推断包装成成果。",
    indexLabels: ["业务问题", "关键决策", "已验证结果", "证据边界"] as [string, string, string, string],
  };
  const detailIndex = [
    ...(item.evidenceTrail ? [{ href: "#evidence-trail", label: "00 / 迁移证据链" }] : []),
    { href: "#challenge", label: `01 / ${narrative.indexLabels[0]}` },
    { href: "#decisions", label: `02 / ${narrative.indexLabels[1]}` },
    { href: "#results", label: `03 / ${narrative.indexLabels[2]}` },
    ...(hasSystemDeepDive ? [
      { href: "#invariants", label: "04 / 系统不变量" },
      { href: "#architecture", label: "05 / 架构决策" },
      { href: "#validation", label: "06 / 故障验证" },
      { href: "#lessons", label: "07 / 复盘改进" },
    ] : []),
    { href: "#boundary", label: `${hasSystemDeepDive ? "08" : "04"} / ${narrative.indexLabels[3]}` },
  ];

  return (
    <main>
      <SiteHeader />

      <article className={`case-detail accent-${item.accent}`}>
        <header className="case-detail-hero">
          <div className="detail-meta">
            <span>{item.number}</span>
            <span>{item.kind}</span>
          </div>
          <p className="section-label">CASE STUDY / 项目复盘</p>
          <h1>{item.title}</h1>
          <p className="detail-lead">{item.summary}</p>
          <div className="tech-list" aria-label="相关技术">
            {item.tech.map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        </header>

        {item.slug === "data-sync-platform" && (
          <section className="sync-demo-entry">
            <div className="sync-demo-entry-copy">
              <p className="section-label">SYSTEM OVERVIEW</p>
              <h2>七个核心模块，组成一条数据交付链路。</h2>
              <p>从数据源接入、同步任务和依赖编排，到日志追踪、数据血缘、用户权限和业务预警，系统围绕一条完整的数据交付路径组织。</p>
            </div>
            <div className="sync-demo-entry-preview" aria-label="数据同步平台界面预览">
              <div className="preview-toolbar"><span>DATAFLOW CONSOLE / DEMO</span><i /></div>
              <div className="preview-layout">
                <div className="preview-nav"><span className="active">平台总览</span><span>数据源管理</span><span>同步任务</span><span>数据血缘</span><span>业务预警</span></div>
                <div className="preview-main">
                  <h3>异构数据同步运行总览</h3>
                  <div className="preview-metrics"><span>数据源<strong>12</strong></span><span>同步任务<strong>38</strong></span><span>待处理预警<strong>7</strong></span></div>
                  <div className="preview-chart">{[35, 52, 44, 68, 62, 82, 75, 90, 72].map((height, index) => <i key={`${height}-${index}`} style={{ height: `${height}%` }} />)}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {item.slug === "data-sync-platform" && (
          <section className="sync-screenshot-section" aria-labelledby="sync-screenshot-title">
            <div className="sync-screenshot-heading">
              <div>
                <p className="section-label">MODULE OVERVIEW</p>
                <h2 id="sync-screenshot-title">功能不是菜单堆叠，而是一条治理闭环。</h2>
              </div>
              <p>页面中的数量、任务名称和运行结果用于说明模块关系，不作为线上业绩证明。</p>
            </div>
            <div className="case-capability-grid">
              {[
                ["sources", "01", "数据源管理", "连接、认证、归属与健康检查"],
                ["sync-tasks", "02", "同步任务", "配置、运行、恢复与结果留痕"],
                ["orchestration", "03", "任务编排", "依赖、调度、节点重跑与发布"],
                ["logs", "04", "日志中心", "按实例、节点和批次追踪问题"],
                ["lineage", "05", "数据血缘", "来源、加工规则与变更影响"],
                ["users", "06", "用户管理", "角色、数据域与敏感权限"],
                ["alerts", "07", "业务预警", "异常发现、定位、通知与确认"],
              ].map(([, code, title, description]) => (
                <article key={title}>
                  <span>{code}</span><strong>{title}</strong><small>{description}</small>
                </article>
              ))}
            </div>
          </section>
        )}

        {item.slug === "data-sync-platform" ? (
          <DataSyncDeepDive item={item} />
        ) : (
        <div className="detail-layout">
          <aside className="detail-aside">
            <p className="section-label">RESPONSIBILITY</p>
            <p>{item.role}</p>
            <ActiveAnchorNav className="detail-index" items={detailIndex} label="案例目录" />
          </aside>

          <div className="detail-body">
            {item.evidenceTrail && (
              <section id="evidence-trail">
                <span className="detail-number">00</span>
                <p className="section-label">EVIDENCE TRAIL</p>
                <h2>先把历史线索串成证据链，再开始迁移。</h2>
                <div className="evidence-timeline">
                  {item.evidenceTrail.map((evidence) => (
                    <article key={evidence.phase}>
                      <span>{evidence.phase}</span>
                      <div>
                        <h3>{evidence.title}</h3>
                        <p>{evidence.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
            <section id="challenge">
              <span className="detail-number">01</span>
              <p className="section-label">{narrative.challengeLabel}</p>
              <h2>{narrative.challengeTitle}</h2>
              <p>{item.challenge}</p>
            </section>

            <section id="decisions">
              <span className="detail-number">02</span>
              <p className="section-label">{narrative.decisionsLabel}</p>
              <h2>{narrative.decisionsTitle}</h2>
              <ol className="decision-list">
                {item.decisions.map((decision) => <li key={decision}>{decision}</li>)}
              </ol>
            </section>

            <section id="results">
              <span className="detail-number">03</span>
              <p className="section-label">{narrative.resultsLabel}</p>
              <h2>{narrative.resultsTitle}</h2>
              <ul className="result-list">
                {item.results.map((result) => <li key={result}>{result}</li>)}
              </ul>
            </section>

            {item.invariants && (
              <section id="invariants">
                <span className="detail-number">04</span>
                <p className="section-label">SYSTEM INVARIANTS</p>
                <h2>先定义系统必须始终成立的性质。</h2>
                <div className="invariant-grid">
                  {item.invariants.map((invariant) => (
                    <article key={invariant.title}>
                      <strong>{invariant.title}</strong>
                      <p>{invariant.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {item.architecture && (
              <section id="architecture">
                <span className="detail-number">05</span>
                <p className="section-label">ARCHITECTURE DECISIONS</p>
                <h2>三个决定系统能否恢复的结构选择。</h2>
                <div className="architecture-list">
                  {item.architecture.map((decision, index) => (
                    <article key={decision.title}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h3>{decision.title}</h3>
                        <p>{decision.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {item.validation && (
              <section id="validation">
                <span className="detail-number">06</span>
                <p className="section-label">FAILURE INJECTION</p>
                <h2>主动制造失败，验证系统语义。</h2>
                <div className="validation-table" role="table" aria-label="故障注入验证清单">
                  {item.validation.map((check) => (
                    <div role="row" key={check.scenario}>
                      <strong role="cell">{check.scenario}</strong>
                      <span role="cell">{check.expected}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {item.lessons && (
              <section id="lessons">
                <span className="detail-number">07</span>
                <p className="section-label">RETROSPECTIVE</p>
                <h2>如果重新开始，会提前做什么？</h2>
                <ol className="decision-list">
                  {item.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}
                </ol>
              </section>
            )}

            <section className="boundary-block" id="boundary">
              <span className="detail-number">{hasSystemDeepDive ? "08" : "04"}</span>
              <p className="section-label">EVIDENCE BOUNDARY</p>
              <h2>{narrative.boundaryTitle}</h2>
              <p>{item.boundary}</p>
            </section>
          </div>
        </div>
        )}
      </article>

      <section className="next-case">
        <span>下一个案例</span>
        <Link href={`/cases/${next.slug}`}>
          <strong>{next.title}</strong>
          <span>→</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
