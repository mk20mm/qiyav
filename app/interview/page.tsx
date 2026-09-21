import type { Metadata } from "next";
import { PageIntro, SiteFooter, SiteHeader } from "../components";
import { FullDocument } from "../full-document";

export const metadata: Metadata = {
  title: "AI 工程实践面试表达｜QIYA",
  description: "用真实项目、判断过程与验证证据说明如何使用 AI 工具完成工程交付。",
  openGraph: { images: [] },
  twitter: { card: "summary", images: [] },
};

export default function InterviewPage() {
  return (
    <main>
      <SiteHeader />
      <PageIntro
        eyebrow="INTERVIEW / 表达参考"
        title="不证明会用工具，证明能把复杂问题交付到结果。"
        copy="围绕生态店铺 GMV 清洗迁移和数据集成平台，说明我做了哪些判断、如何约束 AI、怎样验证结果，以及哪些结论仍待数据补证。"
      />
      <article className="standalone-document section-shell">
        <FullDocument path="interview/index.md" />
      </article>
      <SiteFooter />
    </main>
  );
}
