export type DocumentNavItem = {
  label: string;
  href: string;
  featured?: boolean;
};

export type DocumentNavGroup = {
  label: string;
  items: DocumentNavItem[];
};

export const methodSidebarGroups: DocumentNavGroup[] = [
  {
    label: "总规程",
    items: [{ label: "★ 把这一页交给你的 AI", href: "/method/playbook-spec", featured: true }],
  },
  {
    label: "第一部分：认知",
    items: [
      { label: "01. 工程师价值没有消失", href: "/method/01-thesis" },
      { label: "02. AI-native 工程交付者", href: "/method/02-ai-native-engineer" },
    ],
  },
  {
    label: "第二部分：需求",
    items: [
      { label: "03. 需求体检", href: "/method/02-clarify" },
      { label: "04. 需求反问清单", href: "/method/03-questioning" },
      { label: "05. 从需求到规格", href: "/method/04-spec" },
    ],
  },
  {
    label: "第三部分：设计",
    items: [
      { label: "06. 上下文工程", href: "/method/03-context" },
      { label: "07. 规格驱动开发", href: "/method/04-design" },
      { label: "08. 架构边界", href: "/method/08-boundaries" },
    ],
  },
  {
    label: "第四部分：执行",
    items: [
      { label: "09. Agent 执行", href: "/method/05-agent" },
      { label: "10. Agent 工作单", href: "/method/09-agent-task" },
      { label: "11. 多 Agent 编排", href: "/method/10-multi-agent" },
      { label: "12. 工具工作台", href: "/method/11-workbench" },
      { label: "13. AI 工程操作系统", href: "/method/12-ai-os" },
    ],
  },
  {
    label: "第五部分：验证",
    items: [
      { label: "14. 验证闭环", href: "/method/06-verify" },
      { label: "15. AI 代码缺陷库", href: "/method/13-defect-library" },
    ],
  },
  {
    label: "第六部分：运行与解答",
    items: [
      { label: "16. 运行排查与业务解答", href: "/method/operate" },
      { label: "17. 交付物标准", href: "/method/deliverables" },
    ],
  },
  {
    label: "第七部分：实证",
    items: [{ label: "18. 方法论如何放大", href: "/method/07-case" }],
  },
];

export const evidenceNavItems: DocumentNavItem[] = [
  { label: "生态店铺 GMV 清洗迁移", href: "/cases/ecosystem-gmv" },
  { label: "供应链订单与履约中台", href: "/cases/supply-chain" },
  { label: "激励结算与业财一体化", href: "/cases/finance-settlement" },
  { label: "异构数据同步平台复盘", href: "/cases/data-sync-platform" },
  { label: "AI 研发工作台参考", href: "/fieldnotes/harness" },
  { label: "方法论如何放大", href: "/method/07-case" },
];

export const methodNavItems: DocumentNavItem[] = [
  { label: "总规程（可复制给 AI）", href: "/method/playbook-spec", featured: true },
  { label: "认知：价值上移", href: "/method/01-thesis" },
  { label: "需求：体检与规格", href: "/method/02-clarify" },
  { label: "设计：上下文与边界", href: "/method/03-context" },
  { label: "执行：工作单与编排", href: "/method/05-agent" },
  { label: "AI 工程操作系统", href: "/method/12-ai-os" },
  { label: "验证：闭环与缺陷库", href: "/method/06-verify" },
  { label: "运行：排查与业务解答", href: "/method/operate" },
  { label: "交付物标准", href: "/method/deliverables" },
];

export const assetNavItems: DocumentNavItem[] = [
  { label: "总规程（可复制）", href: "/method/playbook-spec", featured: true },
  { label: "需求体检清单", href: "/assets/checklist" },
  { label: "需求到规格模板", href: "/assets/spec-template" },
  { label: "Agent 工作单模板", href: "/assets/agent-task-template" },
  { label: "验收与验证清单", href: "/assets/verification-template" },
  { label: "AI 代码缺陷检查表", href: "/assets/defect-library" },
];
