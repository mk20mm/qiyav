import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components";

const features = [
  ["判断价值", "先明确业务目标、收益、成本、风险与不做什么，避免让实现效率放大错误方向。", "#delivery-loop"],
  ["定义问题", "把模糊表达拆成业务规则、异常路径、数据口径和验收标准，让人和 AI 基于同一份事实工作。", "/method/02-clarify"],
  ["技术落地", "用领域边界、接口契约、ADR 和工作单，把任务拆成可以并行、验证和回收的工程单元。", "/method/04-design"],
  ["编排 AI", "把 Claude Code、Codex、规则和独立审查放进明确的交付流程，而不是只把它们当代码生成器。", "/method/12-ai-os"],
  ["验证结果", "用能失败的测试、同范围新旧核对、边界检查和故障场景，把“看起来对”逼成有证据的结果。", "/method/06-verify"],
  ["沉淀资产", "让规格、口径矩阵、决策记录、缺陷模式和复盘成为下一次交付的起点。", "/method/deliverables"],
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <header className="document-home-hero">
        <p>QIYA · AI-NATIVE 系统交付实践</p>
        <h1>把模糊任务落成可运行、<br />可迭代、可验证的系统</h1>
        <div>
          <Link className="document-button is-primary" href="#delivery-loop">从任务到交付闭环 <span>→</span></Link>
          <Link className="document-button" href="/cases/ecosystem-gmv">看企业项目</Link>
        </div>
      </header>

      <section className="document-home-feature-grid" aria-label="工程交付能力">
        {features.map(([title, detail, href], index) => (
          <Link href={href} key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <p>{detail}</p>
            <b aria-hidden="true">→</b>
          </Link>
        ))}
      </section>

      <section className="document-home-section" id="delivery-loop">
        <p className="document-kicker">DEVELOPER OPERATING SYSTEM</p>
        <h2>开发者的工作边界，<br />不该停在代码。</h2>
        <p className="document-lead">真实项目里，很多失败不是因为代码写不出来，而是方向、口径、边界和验证没有在开工前讲清楚。系统交付型开发者处理的是从业务目标到可靠系统的整条链路。</p>
        <div className="document-home-triad">
          <Link href="#delivery-loop"><span>01</span><h3>从任务到价值</h3><p>先判断为什么做、做成什么、什么不做，再进入实现。</p></Link>
          <Link href="/cases/data-sync-platform"><span>02</span><h3>从代码到系统</h3><p>用领域对象、同步语义、治理闭环和场景验收组织一个持续演进的平台。</p></Link>
          <Link href="/assets/spec-template"><span>03</span><h3>从一次到复用</h3><p>把规格、口径矩阵、ADR、工作单和缺陷库沉淀为下次的起点。</p></Link>
        </div>
      </section>

      <section className="document-home-section">
        <p className="document-kicker">DELIVERY LOOP</p>
        <h2>一条完整闭环，<br />而不是一组技巧。</h2>
        <p className="document-lead">从任何一个复杂任务开始，先恢复事实、再确认决策、最后验证结果。每一步都留下可以被复查和复用的产物。</p>
        <div className="document-loop" aria-label="系统交付闭环">
          {[
            "业务目标", "需求体检", "行为规格", "结构设计", "AI 执行", "验证闭环", "运行解答", "资产沉淀",
          ].map((step) => <span key={step}>{step}</span>)}
        </div>
      </section>

      <section className="document-home-section">
        <p className="document-kicker">EVIDENCE</p>
        <h2>能力需要证据，<br />而不是形容词。</h2>
        <div className="document-evidence-grid">
          <Link href="/cases/ecosystem-gmv"><span>企业项目</span><h3>生态店铺 GMV 清洗迁移</h3><p>从历史文档、任务、SQL 与调用关系还原口径，治理为九个平台执行器与统一编排控制。</p></Link>
          <Link href="/cases/data-sync-platform"><span>个人项目</span><h3>异构数据同步平台</h3><p>从“做一个同步平台”的模糊目标，拆成同步语义、Connector 抽象、位点提交顺序、脏数据旁路和故障注入清单。</p></Link>
          <Link href="/method/playbook-spec"><span>总规程</span><h3>把工程经验交给 AI</h3><p>将需求体检、规格、任务边界、验证和缺陷回流写成可重复执行的协作流程。</p></Link>
          <Link href="/assets/verification-template"><span>证据边界</span><h3>完成不只是代码合并</h3><p>将“已实现”“已验证”“待业务确认”和“待运行数据补证”明确分开。</p></Link>
        </div>
      </section>

      <section className="document-home-section document-home-fit">
        <p className="document-kicker">BEST FIT</p>
        <h2>适合复杂、模糊、<br />需要负责到底的任务。</h2>
        <div>
          <p>需求还不够清楚，但业务结果重要，需要先把问题定义对。</p>
          <p>系统不是 demo，而要长期运行、持续迭代、出了问题可以追踪与恢复。</p>
          <p>需要在速度、质量、成本、风险之间做取舍，而不是只追求更快完成实现。</p>
          <p>希望把 AI 纳入真实工程流程，而不是只把它当成代码生成器。</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
