import type { Metadata } from "next";
import { PageIntro, SiteFooter, SiteHeader } from "../../components";
import { FullDocument } from "../../full-document";

export const metadata: Metadata = {
  title: "AI 研发工作台参考｜QIYA",
  description: "把规则、上下文、任务、工具与验证组织为可复用的 AI 协作工作台。",
  openGraph: { images: [] },
  twitter: { card: "summary", images: [] },
};

export default function HarnessFieldnotePage() {
  return (
    <main>
      <SiteHeader />
      <PageIntro
        eyebrow="FIELD NOTE / 工作台笔记"
        title="AI 协作不是多开几个窗口，而是给每次交付装上护栏。"
        copy="这是一份可复用的工作台结构参考。哪些部分已经实际采用、哪些仍待补证，会明确写出，不把设计设想包装成生产成果。"
      />
      <article className="standalone-document section-shell">
        <div className="evidence-boundary">
          <strong>证据边界</strong>
          <p>Claude Code、Codex 等工具已参与代码分析、任务拆分、实现和测试；完整的多 Agent 工作台仍属于持续建设的方法设计。</p>
        </div>
        <FullDocument path="fieldnotes/harness.md" />
      </article>
      <SiteFooter />
    </main>
  );
}
