import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components";
import { getMethodChapter, methodChapters } from "../../method-content";
import { FullDocument } from "../../full-document";
import { MethodSidebar } from "../../method-sidebar";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return methodChapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getMethodChapter(slug);
  if (!chapter) return {};

  const title = `${chapter.title}｜QIYA 交付方法`;
  return {
    title,
    description: chapter.summary,
    openGraph: { title, description: chapter.summary, images: [] },
    twitter: { card: "summary", title, description: chapter.summary, images: [] },
  };
}

export default async function MethodChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getMethodChapter(slug);
  if (!chapter) notFound();

  const index = methodChapters.findIndex((item) => item.slug === slug);
  const previous = index > 0 ? methodChapters[index - 1] : null;
  const next = index < methodChapters.length - 1 ? methodChapters[index + 1] : null;

  return (
    <main>
      <SiteHeader />

      <article className="method-article">
        <header className="method-article-hero">
          <p className="section-label">{chapter.part}</p>
          <span>{chapter.number}</span>
          <h1>{chapter.title}</h1>
          <p>{chapter.summary}</p>
        </header>

        <div className="method-article-layout">
          <MethodSidebar activeHref={`/method/${slug}`} />

          <div className="method-article-body">
            <section id="thesis">
              <p className="section-label">THESIS / 核心主张</p>
              <blockquote>{chapter.thesis}</blockquote>
            </section>

            <section id="actions">
              <p className="section-label">OPERATING STEPS / 执行动作</p>
              <h2>把原则变成可以检查的动作。</h2>
              <ol>
                {chapter.actions.map((action) => <li key={action}>{action}</li>)}
              </ol>
            </section>

            <section id="deliverables">
              <p className="section-label">OUTPUTS / 交付物</p>
              <h2>每个阶段都要留下可复用的产物。</h2>
              <div className="method-output-grid">
                {chapter.deliverables.map((deliverable, itemIndex) => (
                  <article key={deliverable}>
                    <span>{String(itemIndex + 1).padStart(2, "0")}</span>
                    <strong>{deliverable}</strong>
                  </article>
                ))}
              </div>
            </section>

            <section className="method-applied" id="applied">
              <p className="section-label">APPLIED CASE / 项目映射</p>
              <h2>这条方法如何落到真实项目？</h2>
              <p>{chapter.appliedTo}</p>
              <div>
                <Link href="/cases/ecosystem-gmv">生态店铺 GMV 清洗迁移</Link>
                <Link href="/cases/data-sync-platform">异构数据同步平台</Link>
              </div>
            </section>

            <section className="full-chapter-section" id="full-chapter">
              <p className="section-label">FULL CHAPTER / 完整正文</p>
              <h2>从结论摘要，继续读到判断依据和执行细节。</h2>
              <p className="full-chapter-note">正文保留 site-v3 的完整论证结构，并将贯穿示例改写为生态店铺 GMV 清洗迁移；原作者身份、原演示案例和未经证实的个人成果不进入本站。</p>
              <FullDocument path={`methodology/${slug}.md`} />
            </section>
          </div>
        </div>
      </article>

      <nav className="method-pager" aria-label="方法论章节翻页">
        {previous ? <Link href={`/method/${previous.slug}`}><span>上一章</span><strong>{previous.title}</strong></Link> : <span />}
        {next ? <Link href={`/method/${next.slug}`}><span>下一章</span><strong>{next.title}</strong></Link> : <span />}
      </nav>

      <SiteFooter />
    </main>
  );
}
