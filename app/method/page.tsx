import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SiteFooter, SiteHeader } from "../components";
import { deliverySteps } from "../content";
import { methodChapters, methodParts } from "../method-content";

export const metadata: Metadata = {
  title: "交付方法｜QIYA Engineering Notes",
  description: "从定义问题、建立上下文到交叉审查和结果验收的 AI 辅助研发工作方法。",
};

const qualityGates = [
  {
    title: "业务口径",
    question: "金额、状态、归属和时间范围是否与业务定义一致？",
  },
  {
    title: "重复执行",
    question: "补跑、重试和并发触发是否会制造重复或脏数据？",
  },
  {
    title: "部分失败",
    question: "外部超时、空返回和单步失败会不会错误推进主状态？",
  },
  {
    title: "可观测",
    question: "日志、指标、外部单号和错误原因能否定位问题？",
  },
  {
    title: "恢复路径",
    question: "失败后能否补跑、重推、回滚或转人工处理？",
  },
  {
    title: "结果验收",
    question: "能否用行数、金额、差异和业务反馈证明结果正确？",
  },
];

export default function MethodPage() {
  return (
    <main>
      <SiteHeader />
      <PageIntro
        eyebrow="DELIVERY METHOD / AI 辅助研发"
        title="让模型提高执行效率，由工程师守住事实、边界和结果。"
        copy="我不会把会用某个模型当作核心优势。真正的差异在于：如何提供可信上下文、做出技术决策、发现模型错误，并把产出放进可验证的交付链路。"
      />

      <section className="method-thesis">
        <span>工作原则</span>
        <blockquote>
          AI 可以帮助我更快地阅读、比较、实现和审查，但业务规则、系统责任、风险取舍与最终验收必须由我负责。
        </blockquote>
      </section>

      <section className="section-shell method-full">
        <div className="section-heading">
          <div>
            <p className="section-label">SIX STEPS / 01</p>
            <h2>六步交付闭环</h2>
          </div>
          <p>每一步都必须留下可以检查的产物。</p>
        </div>
        <div className="method-list">
          {deliverySteps.map((item) => (
            <article key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell method-library-section">
        <div className="section-heading">
          <div>
            <p className="section-label">FULL PLAYBOOK / 02</p>
            <h2>完整方法论目录</h2>
          </div>
          <p>从认知、需求、设计、执行、验证、运行到实证，所有章节都以生态店铺 GMV 清洗迁移和数据集成平台作为贯穿案例。</p>
        </div>
        <div className="method-chapter-groups">
          {methodParts.map((part) => (
            <section key={part}>
              <h3>{part}</h3>
              <div>
                {methodChapters.filter((chapter) => chapter.part === part).map((chapter) => (
                  <Link href={`/method/${chapter.slug}`} key={chapter.slug}>
                    <span>{chapter.number}</span>
                    <strong>{chapter.title}</strong>
                    <p>{chapter.summary}</p>
                    <b aria-hidden="true">→</b>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="section-shell quality-section">
        <div className="section-heading">
          <div>
            <p className="section-label">QUALITY GATES / 03</p>
            <h2>模型生成代码以后，<br />我重点检查什么？</h2>
          </div>
        </div>
        <div className="gate-grid">
          {qualityGates.map((gate, index) => (
            <article key={gate.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{gate.title}</h3>
              <p>{gate.question}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell division-section">
        <div>
          <p className="section-label">RESPONSIBILITY / 04</p>
          <h2>AI 做什么，<br />我做什么。</h2>
        </div>
        <div className="division-grid">
          <article>
            <span>AI 辅助</span>
            <ul>
              <li>阅读遗留代码与旧文档</li>
              <li>梳理调用链和规则清单</li>
              <li>提出方案、反例与测试建议</li>
              <li>完成边界明确的实现和重构</li>
              <li>从独立视角辅助代码审查</li>
            </ul>
          </article>
          <article className="human-side">
            <span>本人负责</span>
            <ul>
              <li>定义业务目标与非目标</li>
              <li>核实关键事实与数据口径</li>
              <li>确定系统边界和技术方案</li>
              <li>裁决风险、异常与恢复策略</li>
              <li>用业务结果完成最终验收</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section-shell proof-section">
        <p className="section-label">APPLIED / 05</p>
        <h2>这套方法已经用在哪里？</h2>
        <div className="proof-list">
          <article><strong>生态店铺 GMV</strong><span>历史证据 → 口径还原 → 九平台迁移 → 统一编排与验收</span></article>
          <article><strong>业财结算</strong><span>状态主线 → 推送前校验 → 失败不推进 → 清理重推</span></article>
          <article><strong>供应链</strong><span>合同价格 → 订单路由 → 单据协同 → 履约库存</span></article>
          <article><strong>数据同步平台</strong><span>语义不变量 → Connector 边界 → 位点恢复 → 故障注入</span></article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
