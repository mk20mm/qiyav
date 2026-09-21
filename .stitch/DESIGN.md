# Design System: QIYA V1 · 系统交付实践

## 1. Visual Theme & Atmosphere

An editorial engineering journal, not a SaaS landing page. The site should feel like a well-typeset practice notebook: paper, ink, numbered evidence, and long-form Chinese reading. Density sits at 5 — enough air for long titles, tight enough to hold case grids and method sidebars. Variance is 6 — left-aligned heroes, uneven column splits, numbered indexes instead of equal card rows. Motion is restrained (4): reading-progress bar, hover translate, staggered list reveal. No cinematic chrome.

The personality is evidence-first. Every page must make “what is proven / what is still pending” visible. Kickers are uppercase English labels (CASE NOTES, DELIVERY LOOP). Headlines are Chinese, tight tracking, weight-driven hierarchy. Metadata and numbers use monospace.

## 2. Color Palette & Roles

- **Paper Canvas** (#F3F0EA) — Page background. Warm, slightly yellow paper, never cool gray-blue SaaS fill.
- **Pure Sheet** (#FFFcf7) — Elevated reading surfaces, template blocks, search dialog.
- **Charcoal Ink** (#1C1917) — Primary text. Off-black stone, never #000000.
- **Muted Graphite** (#6B6560) — Secondary copy, leads, descriptions.
- **Whisper Rule** (rgba(28,25,23,0.10)) — Hairline dividers and table rules.
- **Deep Teal** (#1A5F7A) — Single accent. CTAs, active nav, section kickers, focus rings. Saturation kept below 80%.
- **Teal Ink** (#12485C) — Hover / pressed accent.
- **Bronze Signal** (#9A5B2E) — Sparse tertiary for evidence-boundary callouts only.
- **Error Clay** (#B42318) — Inline errors and ERROR log level.

Dark mode (site already supports it): invert to **Night Paper** (#161412) canvas, **Ink Sheet** (#1F1C19) surfaces, **Paper Text** (#EDE8E1). Keep Deep Teal as accent.

## 3. Typography Rules

- **Display / Headlines:** Space Grotesk — track-tight (−0.04em to −0.06em), weights 600–720. Chinese fallback: PingFang SC / Microsoft YaHei. Hierarchy by weight and color, not screaming size.
- **Body:** IBM Plex Sans — relaxed leading 1.65, measure max 65ch. Chinese body at 16–18px.
- **Mono / Labels:** JetBrains Mono — kickers, step numbers (01 / 02), timestamps, template code, tech chips.
- **Banned:** Inter, generic Georgia/Times, gradient text on large headlines, emoji.

Scale: display 56–88px clamp; section H2 36–56px; article H1 40–64px; body 16–18px; kicker 11–12px uppercase 0.08em.

## 4. Component Stylings

* **Site header:** Sticky glass bar, 54px, hairline bottom. Brand left: “QIYA · 系统交付实践”. Desktop nav: 首页, 交付闭环, dropdowns 证据 / 方法论 / 资产包, 关于. Tools: search trigger with ⌕ + “搜索” + kbd Ctrl K, theme toggle, hamburger on small screens. Reading-progress hairline under the bar.
* **Buttons:** Compact, 4px corners (not pills). Primary = Deep Teal fill, white label, tactile −1px on press. Secondary = outline / faint teal wash. No outer glow.
* **Cards:** Use only when a case or asset is a destination. Paper Sheet on Paper Canvas, 1px Whisper Rule, 8–12px corners, almost no shadow. Featured case may span two columns. Never three equal marketing cards.
* **Evidence boundary:** Left bronze rule + “证据边界” label. Distinguishes proven vs pending. Required on case and fieldnote pages.
* **Tech chips:** Hairline outline, mono 11px, no colorful pill rainbow.
* **Search overlay:** Centered dialog on dimmed paper. Input row, result list with title + meta, footer hints ↑↓ Enter Esc.
* **Method sidebar:** Sticky grouped TOC (总规程 / 认知 / 需求 / 设计 / 执行 / 验证 / 运行 / 实证). Active item: teal rule + ink weight.
* **Asset template:** Full-width code block on slightly darker paper, mono, copy-ready.
* **Loaders:** Skeleton blocks matching section geometry. No circular spinner.
* **Footer:** Sparse: copyright, about, method, cases. No social icon soup.

## 5. Layout Principles

Max content width 1120–1240px, page gutter 20–40px. Left-aligned heroes — never centered marketing stacks. Home uses an asymmetric feature grid (2-up / featured span), a horizontal delivery-loop strip, and an evidence index — not a 3-column equal card row. Case detail is a long editorial article with a sticky in-page anchor nav. Method chapter is sidebar + article. Asset is narrow reading column + wide template. Product console (data-sync) is a dense 8-density cockpit: topbar + left module nav + main workspace, same tokens, tighter rhythm.

Mobile < 768px: single column, dropdowns collapse into a full-height directory, 44px tap targets, headlines via clamp().

## 6. Motion & Interaction

Spring-like 180–240ms on hover color and 2px lift. Reading-progress scales on X. Lists stagger 40–80ms. Search dialog fades + 8px rise. Animate transform/opacity only. No bouncing chevrons, no “scroll to explore”.

## 7. Anti-Patterns (Banned)

- No Inter, no purple/neon glow, no generic Apple-blue clone of the current site
- No 3-column equal feature cards, no centered hero with three CTAs
- No fake metrics (99.9% uptime, 18.5k deploys). Only numbers already in the product copy
- No “Elevate / Seamless / Unleash / Next-Gen”
- No emoji, no Unsplash lifestyle photos, no illustration mascots
- No overlapping text/images
- Do not invent production KPIs. If a result is unverified, show 证据边界, not a dashboard number
