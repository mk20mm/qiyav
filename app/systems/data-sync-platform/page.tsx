import type { Metadata } from "next";
import { SyncPlatformDemo, type SyncScreenId } from "./sync-platform-demo";

export const metadata: Metadata = {
  title: "异构数据同步平台｜交互原型",
  description: "MySQL、SQL Server、PostgreSQL、Doris 的 CDC 与批量同步平台交互原型。",
  openGraph: {
    title: "异构数据同步平台｜交互原型",
    description: "从数据接入、任务运行、治理分析到业务预警的完整平台原型。",
    images: [],
  },
  twitter: {
    title: "异构数据同步平台｜交互原型",
    description: "从数据接入、任务运行、治理分析到业务预警的完整平台原型。",
    images: [],
  },
};

type DemoPageProps = Readonly<{
  searchParams: Promise<{ view?: string }>;
}>;

const screens: SyncScreenId[] = ["overview", "sources", "sync-tasks", "orchestration", "logs", "lineage", "users", "alerts"];
const legacyViewAliases: Record<string, SyncScreenId> = {
  connections: "sources",
  wizard: "sync-tasks",
  monitor: "sync-tasks",
  errors: "logs",
  logic: "orchestration",
};

export default async function DataSyncPlatformDemoPage({ searchParams }: DemoPageProps) {
  const { view } = await searchParams;
  const initialView = screens.includes(view as SyncScreenId)
    ? (view as SyncScreenId)
    : legacyViewAliases[view ?? ""] ?? "overview";

  return (
    <main className="sync-product-page">
      <SyncPlatformDemo initialView={initialView} />
    </main>
  );
}
