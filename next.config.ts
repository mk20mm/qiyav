import type { NextConfig } from "next";

// GitHub Pages 项目站点部署在 https://<user>.github.io/<repo>/，需要 basePath。
// 本地开发时不设置；CI 中通过 NEXT_PUBLIC_BASE_PATH=/repo 注入。
// 若部署到用户站点（<user>.github.io 仓库），basePath 留空即可。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  // 静态导出不支持构建时图片优化管线
  images: { unoptimized: true },
};

export default nextConfig;
