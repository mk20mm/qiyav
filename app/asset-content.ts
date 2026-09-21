export type AssetDefinition = {
  slug: string;
  title: string;
  summary: string;
  useWhen: string;
  template: string;
  related: string;
};

export const assets: AssetDefinition[] = [
  {
    slug: "checklist",
    title: "需求体检清单",
    summary: "在 AI 动手前，把业务语义、技术事实、风险边界和验收要求拆出来。",
    useWhen: "需求来自口头描述、旧文档或零散聊天记录，且写错后会影响数据、外部系统或长期维护时使用。",
    template: `【业务目标】\n- 为什么做：\n- 做成后的可观察结果：\n- 明确不做什么：\n\n【事实与口径】\n- 已证实的历史链路/代码位置：\n- 仍待业务确认的规则：\n- 数据源、日期、金额、归属口径：\n\n【风险与边界】\n- 失败、重试、部分成功如何处理：\n- 哪些写入或外部动作不可逆：\n- 允许修改与禁止修改的范围：\n\n【验收】\n- 正常路径：\n- 异常路径：\n- 需要的数据核对或运行证据：`,
    related: "/method/02-clarify",
  },
  {
    slug: "spec-template",
    title: "需求到规格模板",
    summary: "把业务语言变成可以实现、测试和审查的输入输出、规则与异常契约。",
    useWhen: "核心规则已经有事实依据，需要冻结跨模块协作方式和可验证行为时使用。",
    template: `【目标与范围】\n- 目标：\n- 包含模块：\n- 非目标：\n\n【输入与输出】\n- 输入参数、来源与校验：\n- 输出字段、状态与可观察结果：\n\n【行为规则】\nWHEN ... THEN 系统 SHALL ...\nWHILE ... THE SYSTEM SHALL ...\nIF ... THEN 系统 SHALL ...\n\n【失败语义】\n- 错误码：\n- 是否重试、继续或停止：\n- 哪些副作用必须禁止：\n\n【验收矩阵】\n- 用例：\n- 预期：\n- 证据位置：`,
    related: "/method/04-spec",
  },
  {
    slug: "agent-task-template",
    title: "Agent 工作单模板",
    summary: "把一句提示升级成边界明确、可独立审查的工程任务。",
    useWhen: "需要让 AI 处理遗留代码分析、局部实现、测试或审查，又不能让它自行改变业务决策时使用。",
    template: `【目标】\n本单完成后，必须新增什么可验证能力：\n\n【已知事实】\n- 已证实结论：\n- 需引用的文件/文档：\n\n【允许范围】\n- 可修改文件或模块：\n\n【禁止事项】\n- 不得改变的业务口径：\n- 不得跨越的模块边界：\n- 不得发生的副作用：\n\n【验收】\n- 必跑命令或测试：\n- 必须覆盖的异常场景：\n\n【汇报】\n1. 完成内容\n2. 修改文件\n3. 关键判断与依据\n4. 验证结果\n5. 风险与待确认项`,
    related: "/method/09-agent-task",
  },
  {
    slug: "verification-template",
    title: "验收与验证清单",
    summary: "区分功能完成、边界正确、数据口径一致和生产运行证据，避免“测试绿了就算完成”。",
    useWhen: "涉及数据迁移、外部系统、批处理、状态变化或高影响规则变更时使用。",
    template: `【规格符合】\n- 模块边界与禁止依赖：\n- 输入输出与错误契约：\n\n【行为验证】\n- 正常路径：\n- 预览/只读路径：\n- 异常与失败路径：\n- 重试、重跑或恢复路径：\n\n【数据与影响面】\n- 新旧同范围对照：\n- 行数/金额/关键维度差异：\n- 下游影响与回归：\n\n【证据边界】\n- 已由代码/测试证明：\n- 已由运行记录证明：\n- 待业务确认：\n- 待持续采集：`,
    related: "/method/06-verify",
  },
  {
    slug: "defect-library",
    title: "AI 代码缺陷检查表",
    summary: "把反复出现的默认假设和越界行为提前变成审查项。",
    useWhen: "AI 参与实现、代码审查或重构时，按风险选择检查项，而不是只看代码风格。",
    template: `【事实】\n- 是否把猜测写成了业务规则？\n- 是否引用了过期文档或错误的数据源？\n\n【边界】\n- 是否越过模块契约直接访问内部实现？\n- 是否把平台/客户/渠道特例塞进总控？\n\n【副作用】\n- preview 是否产生了写入、删除或外部调用？\n- 部分失败是否被包装为完整成功？\n\n【数据】\n- 日期、金额、空值、映射兜底是否明确？\n- 重跑后的结果是否可追溯？\n\n【测试】\n- 测试是否先失败过？\n- 是否覆盖异常、恢复和真实边界？\n- 是否为了让测试通过而弱化生产逻辑或断言？`,
    related: "/method/13-defect-library",
  },
];

export function getAsset(slug: string) {
  return assets.find((asset) => asset.slug === slug);
}
