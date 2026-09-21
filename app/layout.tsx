import type { Metadata } from "next";
import "./globals.css";

const title = "QIYA Engineering Notes｜企业系统交付实践";
const description = "围绕供应链、经营数据、业财系统与企业 AI 集成整理的工程实践文档。";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export async function generateMetadata(): Promise<Metadata> {
  // 静态导出时无请求头可用，站点地址在构建期通过环境变量确定。
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const image = `${origin}/og.png`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url: origin,
      images: [{ url: image, width: 1672, height: 941, alt: "QIYA｜把复杂业务交付成可靠系统" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href={`${basePath}/favicon.svg`} type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('qiya-theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}})()` }} />
      </head>
      <body className="docs-site">{children}</body>
    </html>
  );
}
