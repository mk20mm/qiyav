import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteFooter, SiteHeader } from "../components";

export const metadata: Metadata = {
  title: "关于本站｜QIYA Engineering Notes",
  description: "这份工程实践文档的内容定位、资料来源与阅读方式。",
};

const capabilityRows = [
  ["业务领域", "供应链订单与履约、合同价格、仓库库存、生态 GMV、经营分析、业财结算"],
  ["Java 与数据", "Java、Spring Boot、MyBatis-Plus、MySQL、Redis、SQL、任务编排、批量处理"],
  ["系统集成", "REST/OpenAPI、接口鉴权、状态协同、文件与附件、E3、易快报、聚水潭、蓝凌"],
  ["AI 工程协作", "上下文组织、任务拆分、Agent 工作单、独立审查、故障验证与结果验收"],
  ["工程方法", "需求梳理、系统边界、数据口径、异常恢复、代码审查、测试与上线验收"],
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <PageIntro
        eyebrow="ABOUT THIS SITE"
        title="关于这份工程实践文档。"
        copy="这里不整理泛化的技术名词，而是记录真实业务系统中的问题、决策、实现和证据边界，方便阅读、复盘与持续补充。"
      />

      <section className="section-shell profile-grid">
        <div className="profile-statement">
          <p className="section-label">CONTENT POSITION</p>
          <h2>记录问题、决策与证据</h2>
          <p>
            内容来自企业应用开发和独立系统设计实践，重点关注数据口径、系统边界、状态一致性、异常恢复以及结果如何被验证。
          </p>
          <div className="profile-tags">
            <span>供应链</span>
            <span>经营数据</span>
            <span>业财系统</span>
            <span>企业 AI</span>
          </div>
        </div>
        <div className="profile-target">
          <p className="section-label">READING PATH</p>
          <ol>
            <li><span>01</span><strong>从项目复盘了解业务复杂度</strong></li>
            <li><span>02</span><strong>从关键决策了解技术判断</strong></li>
            <li><span>03</span><strong>从证据边界区分事实与推断</strong></li>
          </ol>
        </div>
      </section>

      <section className="section-shell experience-section">
        <p className="section-label">CONTENT SOURCES</p>
        <div className="timeline">
          <article>
            <div className="timeline-date">01 / BUSINESS</div>
            <div>
              <h2>真实企业项目</h2>
              <h3>项目问题与交付结果</h3>
              <p>供应链、生态 GMV 和业财结算等案例，按统一结构整理本人责任、关键决策和已验证结果。</p>
            </div>
          </article>
          <article>
            <div className="timeline-date">02 / PRACTICE</div>
            <div>
              <h2>独立系统设计</h2>
              <h3>架构推演与验证方法</h3>
              <p>通过异构数据同步平台补充数据接入、任务编排、日志追踪、血缘治理、权限控制和业务预警等系统设计内容。</p>
            </div>
          </article>
          <article>
            <div className="timeline-date">03 / METHOD</div>
            <div>
              <h2>方法论沉淀</h2>
              <h3>AI 辅助研发的责任边界</h3>
              <p>记录从问题定义、上下文还原、方案决策到交叉审查和结果验收的完整交付过程。</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell capability-table-section">
        <p className="section-label">CAPABILITY MAP</p>
        <div className="capability-table">
          {capabilityRows.map(([name, content]) => (
            <div key={name}>
              <strong>{name}</strong>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-contact">
        <p className="section-label">READ NEXT</p>
        <h2>从一篇项目复盘开始阅读。</h2>
        <div>
          <Link className="button button-light" href="/cases">浏览项目文章</Link>
          <Link className="button button-secondary" href="/method">查看交付方法</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
