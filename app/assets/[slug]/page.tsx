import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components";
import { assets, getAsset } from "../../asset-content";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return assets.map((asset) => ({ slug: asset.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const asset = getAsset(slug);
  if (!asset) return {};
  return {
    title: `${asset.title}｜QIYA 资产包`,
    description: asset.summary,
    openGraph: { title: asset.title, description: asset.summary, images: [] },
    twitter: { card: "summary", title: asset.title, description: asset.summary, images: [] },
  };
}

export default async function AssetPage({ params }: PageProps) {
  const { slug } = await params;
  const asset = getAsset(slug);
  if (!asset) notFound();

  return (
    <main>
      <SiteHeader />
      <article className="asset-page">
        <header>
          <p className="section-label">ASSET KIT / 可直接使用</p>
          <h1>{asset.title}</h1>
          <p>{asset.summary}</p>
        </header>
        <section className="asset-use-when">
          <strong>什么时候使用</strong>
          <p>{asset.useWhen}</p>
        </section>
        <section className="asset-template">
          <div><p className="section-label">TEMPLATE</p><h2>复制后按项目事实填写。</h2></div>
          <pre><code>{asset.template}</code></pre>
        </section>
        <Link className="text-link" href={asset.related}>阅读对应的方法说明 <span>→</span></Link>
        <nav className="asset-related" aria-label="相关资产包">
          {assets.filter((item) => item.slug !== asset.slug).map((item) => (
            <Link href={`/assets/${item.slug}`} key={item.slug}>
              {item.title}<span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </article>
      <SiteFooter />
    </main>
  );
}
