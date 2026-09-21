import type { Metadata } from "next";
import { PageIntro, SiteFooter, SiteHeader } from "../components";
import { FullDocument } from "../full-document";

export const metadata: Metadata = {
  title: "工程随笔｜QIYA",
  description: "关于 AI 工程化、企业系统边界和交付方法的延伸思考。",
  openGraph: { images: [] },
  twitter: { card: "summary", images: [] },
};

export default function EssaysPage() {
  return (
    <main>
      <SiteHeader />
      <PageIntro
        eyebrow="ESSAYS / 延伸思考"
        title="方法之外，还要解释为什么这样判断。"
        copy="收录从真实项目继续抽象出来的工程判断；不重复堆技术名词，只讨论边界、证据和交付。"
      />
      <article className="standalone-document section-shell">
        <FullDocument path="essays/index.md" />
      </article>
      <SiteFooter />
    </main>
  );
}
