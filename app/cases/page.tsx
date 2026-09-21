import type { Metadata } from "next";
import { CaseCard, PageIntro, SiteFooter, SiteHeader } from "../components";
import { caseStudies } from "../content";

export const metadata: Metadata = {
  title: "项目复盘｜QIYA Engineering Notes",
  description: "生态店铺 GMV 清洗迁移、供应链、业财结算和异构数据同步平台的工程复盘。",
};

export default function CasesPage() {
  const companyCases = caseStudies.filter((item) => item.kind === "企业项目");
  const personalCases = caseStudies.filter((item) => item.kind === "个人项目");

  return (
    <main>
      <SiteHeader />
      <PageIntro
        eyebrow="CASE NOTES / 项目复盘"
        title="从业务问题到系统决策。"
        copy="每篇文章都按业务问题、责任范围、关键决策、已验证结果和证据边界展开。能证明的直接记录，尚未取得生产数据的明确标注。"
      />

      <section className="section-shell case-group">
        <div className="group-heading">
          <span>01</span>
          <div>
            <p className="section-label">BUSINESS CASES</p>
            <h2>企业项目</h2>
          </div>
        </div>
        <div className="case-grid">
          {companyCases.map((item, index) => (
            <CaseCard item={item} featured={index === 0} key={item.slug} />
          ))}
        </div>
      </section>

      <section className="section-shell case-group personal-group">
        <div className="group-heading">
          <span>02</span>
          <div>
            <p className="section-label">SYSTEM DESIGN</p>
            <h2>独立设计案例</h2>
            <p>用于记录系统设计与 Agent 协作方法，与企业项目分开呈现。</p>
          </div>
        </div>
        <div className="case-grid case-grid-single">
          {personalCases.map((item) => (
            <CaseCard item={item} featured key={item.slug} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
