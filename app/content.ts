export type CaseStudy = {
  slug: string;
  number: string;
  kind: "企业项目" | "个人项目";
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  challenge: string;
  decisions: string[];
  results: string[];
  boundary: string;
  tech: string[];
  accent: "teal" | "blue" | "amber" | "lime" | "violet";
  invariants?: Array<{ title: string; description: string }>;
  architecture?: Array<{ title: string; description: string }>;
  validation?: Array<{ scenario: string; expected: string }>;
  lessons?: string[];
  evidenceTrail?: Array<{ phase: string; title: string; description: string }>;
  narrative?: {
    challengeLabel: string;
    challengeTitle: string;
    decisionsLabel: string;
    decisionsTitle: string;
    resultsLabel: string;
    resultsTitle: string;
    boundaryTitle: string;
    indexLabels: [string, string, string, string];
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ecosystem-gmv",
    number: "01",
    kind: "企业项目",
    title: "生态店铺 GMV 清洗迁移",
    subtitle: "从历史 Kettle 链路到九平台 Java 编排",
    summary:
      "从历史 Kettle 任务、数仓文档、源表与字段血缘中还原旧口径，再迁移为九个平台服务、统一规则治理与可预览、可补跑的 Java 总控链路。",
    role: "负责旧链路还原、迁移边界、平台模块划分、规则复核、总控编排与验收路径设计。",
    challenge:
      "旧逻辑分散在 Kettle 作业、历史文档、多个数据源和数据库调用中；天猫、得物、京东、抖音、快手、拼多多、微信视频号、社交与唯品在销售、退款、日期、品类和事业部口径上各不相同。迁移难点不是重写 SQL，而是证明新链路没有丢掉旧口径。",
    decisions: [
      "先把 Kettle 链路、源表、目标表、唯一键和字段映射整理成可追踪的规则地图，再决定 Java 迁移边界。",
      "采用“平台差异隔离、公共流程统一”：九个平台分别保留取数与退款规则，总控统一日期解析、选择执行、失败策略、结果汇总和通知。",
      "把预览与写入明确分开：save=false 只计算，save=true 才删除指定范围旧数据并写入；目标表受配置白名单约束。",
      "只有平台生成全部成功才刷新 GMV 汇总；平台失败时保留平台结果并跳过汇总，避免把部分结果包装成完整结果。",
      "将品类与事业部规则从平台实现中抽离，补充未匹配池、规则追踪和影响预览，逐步把临时排查变成治理能力。",
    ],
    results: [
      "当前代码已形成抖音、京东、快手、拼多多、唯品、微信视频号、天猫、得物和社交九个平台执行器及独立 Service/Mapper 边界。",
      "统一入口支持全量或指定平台、手工日期或平台日期字典、预览或写入、失败继续或立即停止，并返回未知平台与失败平台清单。",
      "运行结果记录生成/落库行数、平台日期范围、GMV/GSV、耗时、错误与警告；全平台成功后刷新汇总，并可发送执行通知。",
      "已补充目标表白名单、天猫生成测试、规则管理测试和配置测试；新旧同范围金额对账与长期生产成功率仍需持续采集。",
    ],
    boundary:
      "历史链路文档、九个平台实现、总控代码和现有测试能够证明迁移结构与运行控制已形成；新旧链路同范围对账、性能变化、生产成功率和下游完整同步仍需运行记录补齐。",
    tech: ["Java", "Spring Boot", "MyBatis-Plus", "MySQL", "任务编排", "批量处理"],
    accent: "teal",
    narrative: {
      challengeLabel: "RULE RECONSTRUCTION",
      challengeTitle: "难点不是重写 SQL，而是把历史链路还原成可验证的业务口径。",
      decisionsLabel: "MIGRATION DESIGN",
      decisionsTitle: "先建立规则地图，再决定哪些统一、哪些隔离。",
      resultsLabel: "CHAIN ACCEPTANCE",
      resultsTitle: "迁移是否完成，要看结果能否校验、定位和补跑。",
      boundaryTitle: "迁移结构已经落地，同范围对账和生产运行仍需继续验证。",
      indexLabels: ["历史链路", "迁移策略", "链路验收", "证据边界"],
    },
    evidenceTrail: [
      {
        phase: "01 / DISCOVER",
        title: "从历史任务和数仓文档建立规则地图",
        description: "以 KJB/KTR 链路报告、GMV 清洗总纲、字段映射图和唯一键对照表定位源表、目标表、字段口径、日期逻辑及下游同步。",
      },
      {
        phase: "02 / RECONSTRUCT",
        title: "逐平台还原取数、退款和品类规则",
        description: "按平台记录销售来源、退款算法、品类匹配顺序、事业部归属和特殊日期逻辑，并对得物、唯品、快手等特殊分支单独核验。",
      },
      {
        phase: "03 / MIGRATE",
        title: "迁移为九个平台服务与统一总控",
        description: "平台 Service/Mapper 保留差异，总控负责平台选择、日期范围、预览/写入、失败策略、平台结果和汇总刷新。",
      },
      {
        phase: "04 / GOVERN",
        title: "把规则排查继续收敛为治理能力",
        description: "围绕统一规则表、未匹配池、单条命中解释、规则影响预览和回刷任务继续建设可解释、可复核的规则治理闭环。",
      },
    ],
    invariants: [
      { title: "口径优先", description: "任何迁移实现都必须能回指历史来源、字段、公式和生效范围，不能以代码跑通代替业务正确。" },
      { title: "差异隔离", description: "平台特殊取数、退款与品类逻辑留在平台边界内，总控不复制平台规则。" },
      { title: "预览先行", description: "写入前可以只计算并检查平台范围、日期、行数与金额，预览不删除也不插入数据。" },
      { title: "范围可控", description: "平台和日期范围可以明确选择，失败平台能够定位，不要求每次全量重做。" },
      { title: "汇总完整", description: "只有平台生成全部成功才刷新汇总，部分失败不能覆盖成完整统计结果。" },
    ],
    architecture: [
      {
        title: "历史证据层",
        description: "保留 Kettle 链路报告、数仓清洗总纲、字段映射与唯一键说明，作为迁移规则的事实来源，而不是只读最终 Java 代码反推业务。",
      },
      {
        title: "平台策略层",
        description: "九个平台分别拥有 Controller、Service、Mapper 与模型，封装各自取数、退款、品类和日期差异，并共享统一品类事业部规则能力。",
      },
      {
        title: "编排与治理层",
        description: "总控统一平台筛选、日期解析、预览/保存、失败策略、运行结果、汇总刷新和通知；规则治理负责未匹配、解释、补规则与回刷。",
      },
    ],
    validation: [
      { scenario: "save=false 预览", expected: "只计算并返回结果，不删除、不插入，也不刷新 GMV 汇总" },
      { scenario: "指定平台与日期范围", expected: "只执行选中平台，并保留每个平台实际使用的开始、结束日期" },
      { scenario: "未知平台或单平台失败", expected: "返回失败平台和原因；continueOnError 决定继续还是停止" },
      { scenario: "任一平台生成失败", expected: "跳过汇总刷新，避免部分数据进入完整汇总" },
      { scenario: "测试与正式环境切换", expected: "目标表由 profile 配置并受白名单约束，降低误写正式表风险" },
      { scenario: "执行结果核对", expected: "能够按平台检查生成/落库行数、GMV/GSV、日期范围、耗时、警告和错误" },
    ],
    lessons: [
      "迁移第一步应该是建立可查询的数据血缘和规则目录，而不是先把旧 SQL 翻译成 Java。",
      "规则需要能解释为什么命中或未命中；否则规则表只是把硬编码从代码搬到了数据库。",
      "旧 Kettle 与新 Java 链路在切换前需要同范围双跑和金额对账，代码结构完成不等于迁移验收完成。",
    ],
  },
  {
    slug: "supply-chain",
    number: "02",
    kind: "企业项目",
    title: "供应链订单与履约中台",
    subtitle: "从合同价格到订单履约与仓库库存",
    summary:
      "围绕供应链完整链路划分系统责任，连接中台、E3、聚水潭与蓝凌，统一订单路由、外部单据和异常留痕。",
    role: "主导合同价格至仓库库存的供应链核心链路建设与技术决策。",
    challenge:
      "合同价格、商品订单和仓库库存分布在多个系统，平台与业务类型又决定不同单据路径；边界不清会造成重复推送、状态脱节和库存口径不一致。",
    decisions: [
      "以合同与价格为业务源头，以订单履约和库存变化为落点，按端到端链路设计。",
      "明确中台与 E3、聚水潭、蓝凌的数据归属和状态协同边界。",
      "根据平台、成本类型、供应商、店铺、仓库和渠道设计订单路由。",
      "统一采购入库、商品移仓、批发销货单据关联，保留外部单号和处理状态。",
    ],
    results: [
      "覆盖合同台账、集团供价、调价、自营商品、团购分销、库存预警与移仓等业务。",
      "完成蓝凌合同、E3 商品/订单及聚水潭商品、移仓和库存相关协同。",
      "形成多系统单据可追踪、异常可定位的供应链核心链路。",
    ],
    boundary:
      "业务范围和跨系统链路有提交证据；订单量、推送成功率和库存改善效果需生产指标补证。",
    tech: ["Java", "Spring Boot", "MySQL", "REST API", "E3", "聚水潭", "蓝凌"],
    accent: "blue",
    narrative: {
      challengeLabel: "VALUE CHAIN OWNERSHIP",
      challengeTitle: "先确定合同、订单与库存分别由谁负责。",
      decisionsLabel: "PLATFORM BOUNDARIES",
      decisionsTitle: "围绕履约主线划分中台与外部系统的责任边界。",
      resultsLabel: "FULFILLMENT TRACEABILITY",
      resultsTitle: "让每张单据、每次路由和每个状态变化都能追踪。",
      boundaryTitle: "链路范围已经明确，规模与效率需要生产数据证明。",
      indexLabels: ["链路责任", "系统边界", "履约结果", "证据边界"],
    },
  },
  {
    slug: "finance-settlement",
    number: "03",
    kind: "企业项目",
    title: "激励结算与业财一体化",
    subtitle: "跨系统状态一致性与失败恢复",
    summary:
      "串联智能发票识别、E3 金额比对和易快报单据协同，让结算主数据、部门归属、附件与外部状态保持一致。",
    role: "负责方案设计、状态边界、多维映射规则和异常恢复机制。",
    challenge:
      "发票、销货单和报销单据跨系统流转，任何外部调用异常都可能污染内部主状态，造成金额、部门或单据不一致。",
    decisions: [
      "以结算主数据作为状态主线，明确发票识别、E3 查询和易快报推送的职责边界。",
      "金额对账、部门归属、附件流转和单据回写通过后，主状态才允许推进。",
      "建立“主体＋业务类型＋费用承担＋平台/品类”的部门映射，并提供通用兜底。",
      "外部调用失败不推进；保留错误和外部状态，支持清理关联后重新推送。",
    ],
    results: [
      "完成发票字段解析、E3 销货单及明细查询与金额比对。",
      "完成易快报附件上传、单据协同、附件预览和多维部门映射。",
      "覆盖拆分、转交、财务更正以及外部单据异常后的清理重推。",
    ],
    boundary:
      "功能链路与异常机制有提交证据；月均单据量、规则命中率和平均恢复时间仍需补证。",
    tech: ["Java", "Spring Boot", "智能识别 API", "E3", "易快报", "对象存储"],
    accent: "amber",
    narrative: {
      challengeLabel: "SETTLEMENT RISK",
      challengeTitle: "结算的核心不是调通接口，而是任何状态都不能错。",
      decisionsLabel: "STATE CONSISTENCY",
      decisionsTitle: "以结算主数据为主线，控制跨系统状态推进。",
      resultsLabel: "FINANCE LOOP",
      resultsTitle: "金额、部门、附件和外部单据形成可恢复闭环。",
      boundaryTitle: "功能闭环有实现依据，业务效率仍需结算数据补证。",
      indexLabels: ["结算风险", "状态设计", "闭环结果", "证据边界"],
    },
  },
  {
    slug: "data-sync-platform",
    number: "04",
    kind: "个人项目",
    title: "异构数据同步平台",
    subtitle: "CDC 与批量同步的系统级交付复盘",
    summary:
      "一个类 CloudCanal 的异构数据同步平台：支持 MySQL、SQL Server、PostgreSQL、Doris 之间的数据同步，覆盖 CDC 实时同步与批量同步，并对接 Doris 数仓分层。",
    role: "架构师和编排者：定义同步语义、拆解系统分层、组织上下文、分配 Agent 工作单，并验证系统语义不变量。",
    challenge:
      "平台不是把七个菜单拼在一起，而是要让数据源、同步任务、编排实例、运行日志、血缘关系、用户权限和业务预警共享同一套任务与状态语义，并能从业务异常反查到具体链路。",
    decisions: [
      "以数据源、同步任务、编排流程、运行实例和业务预警作为核心领域对象，页面与后端围绕同一状态模型组织。",
      "将单任务的数据搬运与多任务的依赖编排分开，避免同步配置、调度规则和业务流程相互耦合。",
      "日志、血缘和预警不作为上线后的附加能力，而是在任务定义时同步建立可观测和影响分析关系。",
      "同步底层采用 Connector 抽象、至少一次交付与目标端幂等，任务失败保留位点和错误记录，支持恢复与重放。",
    ],
    results: [
      "覆盖 CDC 实时同步、批量同步、字段映射与类型转换、数据清洗、断点续传、失败重试、脏数据记录与重放、监控告警等系统能力。",
      "形成 Connector 抽象、任务状态模型、至少一次交付与目标端幂等、位点恢复和错误记录的统一设计。",
      "将需求体检、系统级不变量、结构决策、Agent 工作单和故障注入贯穿同一条交付闭环。",
    ],
    boundary:
      "支持数据源类型数、同步表规模、峰值吞吐、端到端延迟、稳定运行时长与故障次数，仍需要以实际运行记录持续补充；页面示例数据不作为生产规模证明。",
    tech: ["Java", "Spring Boot", "CDC", "MySQL", "SQL Server", "PostgreSQL", "Doris"],
    accent: "violet",
    invariants: [
      { title: "可恢复", description: "任务中断后从持久化位点继续，不重新执行全量。" },
      { title: "幂等", description: "同一变更事件重复消费，目标端不产生重复数据。" },
      { title: "隔离", description: "单任务失败不影响其他任务，脏数据不阻断主链路。" },
      { title: "可观测", description: "任务状态、吞吐、延迟、失败数和最后位点可查询。" },
      { title: "不静默", description: "任何失败都留下可追踪、可修正、可重放的记录。" },
    ],
    architecture: [
      {
        title: "Connector 双向抽象",
        description: "源端统一产出标准变更事件，目标端统一消费，把读取语义、类型系统和写入模型的差异限制在各自 Connector 内。",
      },
      {
        title: "先写入，后提交位点",
        description: "提前提交位点会在崩溃时丢数据；延后提交最多带来重复，由目标端幂等消化，以提交顺序换取崩溃安全。",
      },
      {
        title: "脏数据旁路与重放",
        description: "坏数据携带原始内容和失败原因进入错误记录，主任务继续运行，人工修正后可以重新投递。",
      },
    ],
    validation: [
      { scenario: "同步中途终止任务并重启", expected: "从最近位点继续，不重跑全量、不丢失数据" },
      { scenario: "重放同一批变更事件", expected: "目标端保持幂等，不产生重复记录" },
      { scenario: "混入类型溢出或约束冲突数据", expected: "坏数据进入错误记录，主任务继续，可修正重放" },
      { scenario: "目标端临时不可用后恢复", expected: "按失败等级重试，恢复后继续写入" },
      { scenario: "大表全量初始化", expected: "采用游标分页，内存保持稳定" },
      { scenario: "仅依据监控信息排查异常", expected: "能够定位到具体任务、延迟来源与最后位点" },
    ],
    lessons: [
      "DDL 变更策略应该进入第一版规格，而不是在接入新字段时临时补充。",
      "监控指标需要与任务模型同时定稿，避免各模块后补指标导致口径分裂。",
      "Connector 应通过统一契约测试强制语义一致，而不只依赖人工审查。",
    ],
  },
];

export const deliverySteps = [
  {
    step: "01",
    title: "定义问题",
    text: "明确业务目标、责任边界、不可接受的风险和最终验收方式。",
  },
  {
    step: "02",
    title: "建立上下文",
    text: "从旧文档、代码、SQL、日志和调用关系中还原事实，并区分已验证、推断与待确认。",
  },
  {
    step: "03",
    title: "作出决策",
    text: "比较方案后确定数据归属、模块边界、状态推进、失败补偿和验证口径。",
  },
  {
    step: "04",
    title: "分批实现",
    text: "拆成边界清晰、可以独立验证的小任务，利用 AI 提高分析、编码和文档效率。",
  },
  {
    step: "05",
    title: "交叉审查",
    text: "检查金额口径、幂等、部分失败、空返回、状态推进、日志指标和人工兜底。",
  },
  {
    step: "06",
    title: "结果验收",
    text: "用行数、金额、差异、状态、耗时、重推结果和业务反馈判断是否真正完成。",
  },
];
