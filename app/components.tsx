import Link from "next/link";
import type { CaseStudy } from "./content";
import { SiteNavigation } from "./site-navigation";

export function SiteHeader() {
  return <SiteNavigation />;
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>QIYA Engineering Notes</strong>
        <span>企业系统、数据链路与 AI 应用实践记录</span>
      </div>
      <div className="footer-links">
        <Link href="/about">关于</Link>
        <Link href="/method">方法论</Link>
        <Link href="/cases">项目复盘</Link>
      </div>
    </footer>
  );
}

export function CaseCard({ item, featured = false }: { item: CaseStudy; featured?: boolean }) {
  return (
    <Link className={`case-card accent-${item.accent} ${featured ? "case-card-featured" : ""}`} href={`/cases/${item.slug}`}>
      <div className="case-card-top">
        <span className="case-number">{item.number}</span>
        <span className="case-kind">{item.kind}</span>
      </div>
      <div>
        <p className="case-subtitle">{item.subtitle}</p>
        <h3>{item.title}</h3>
        <p className="case-summary">{item.summary}</p>
      </div>
      <div className="case-card-bottom">
        <span>{item.tech.slice(0, 6).join(" · ")}</span>
        <strong aria-hidden="true">→</strong>
      </div>
    </Link>
  );
}

export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="page-intro">
      <p className="section-label">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  );
}
