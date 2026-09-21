"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { assetNavItems, evidenceNavItems, methodNavItems } from "./document-navigation";
import { methodChapters } from "./method-content";

type AnchorItem = { href: string; label: string };
type MenuLink = { href: string; label: string; meta?: string };

const evidenceLinks: MenuLink[] = evidenceNavItems;
const methodOverviewLinks: MenuLink[] = methodNavItems;
const assetLinks: MenuLink[] = assetNavItems;

const practiceLinks: MenuLink[] = [
  { href: "/fieldnotes/harness", label: "AI 研发工作台", meta: "Harness 结构参考" },
  { href: "/interview", label: "面试表达", meta: "用真实证据讲清 AI 协作" },
  { href: "/essays", label: "工程随笔", meta: "方法背后的判断" },
];

const searchEntries: MenuLink[] = [
  { href: "/", label: "QIYA 工程实践概览", meta: "首页" },
  ...evidenceLinks,
  ...methodChapters.map((chapter) => ({
    href: `/method/${chapter.slug}`,
    label: chapter.title,
    meta: chapter.part,
  })),
  ...practiceLinks,
  ...assetLinks,
  { href: "/about", label: "关于这份工程实践文档", meta: "关于" },
];

function matchesPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Dropdown({
  label,
  links,
  pathname,
  open,
  onToggle,
  onNavigate,
}: {
  label: string;
  links: MenuLink[];
  pathname: string;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const active = links.some((link) => matchesPath(pathname, link.href));

  return (
    <div className={`header-dropdown ${open ? "is-open" : ""}`}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        className={active ? "is-active" : ""}
        onClick={onToggle}
        type="button"
      >
        {label}<i className="nav-caret" aria-hidden="true" />
      </button>
      <div className="header-dropdown-panel" role="menu">
        {links.map((link) => (
          <Link href={link.href} key={`${link.href}-${link.label}`} onClick={onNavigate} role="menuitem">
            <strong>{link.label}</strong>
            {link.meta && <small>{link.meta}</small>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState(0);
  const [dark, setDark] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("zh-CN");
    if (!keyword) return searchEntries.slice(0, 9);
    return searchEntries.filter((entry) => (
      `${entry.label} ${entry.meta ?? ""}`.toLocaleLowerCase("zh-CN").includes(keyword)
    )).slice(0, 12);
  }, [query]);

  useEffect(() => {
    const stored = window.localStorage.getItem("qiya-theme");
    const shouldUseDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = shouldUseDark ? "dark" : "light";
    const frame = window.requestAnimationFrame(() => setDark(shouldUseDark));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const closeDropdown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && !target.closest(".header-dropdown")) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", closeDropdown);
    return () => document.removeEventListener("pointerdown", closeDropdown);
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(window.scrollY / available, 1) : 0);
      setShowTop(window.scrollY > 520);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => searchInput.current?.focus(), 40);
    document.body.classList.toggle("has-modal-open", searchOpen || mobileOpen);
    return () => document.body.classList.remove("has-modal-open");
  }, [searchOpen, mobileOpen]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setOpenMenu(null);
      setMobileOpen(false);
      setSearchOpen(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("qiya-theme", next ? "dark" : "light");
  };

  const closeNavigation = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <>
      <div className="site-header-shell">
        <header className="site-header">
          <Link className="brand" href="/" aria-label="QIYA 首页" onClick={closeNavigation}>
            <span>QIYA · 系统交付实践</span>
          </Link>

          <nav className="desktop-navigation" aria-label="主导航">
            <Link className={matchesPath(pathname, "/") ? "is-active" : ""} href="/">首页</Link>
            <Link href="/#delivery-loop">交付闭环</Link>
            <Dropdown
              label="证据"
              links={evidenceLinks}
              pathname={pathname}
              open={openMenu === "evidence"}
              onToggle={() => setOpenMenu(openMenu === "evidence" ? null : "evidence")}
              onNavigate={closeNavigation}
            />
            <Dropdown
              label="方法论"
              links={methodOverviewLinks}
              pathname={pathname}
              open={openMenu === "method"}
              onToggle={() => setOpenMenu(openMenu === "method" ? null : "method")}
              onNavigate={closeNavigation}
            />
            <Dropdown
              label="资产包"
              links={assetLinks}
              pathname={pathname}
              open={openMenu === "assets"}
              onToggle={() => setOpenMenu(openMenu === "assets" ? null : "assets")}
              onNavigate={closeNavigation}
            />
            <Link className={matchesPath(pathname, "/about") ? "is-active" : ""} href="/about">关于</Link>
          </nav>

          <div className="header-tools">
            <button className="search-trigger" onClick={() => setSearchOpen(true)} type="button" aria-label="搜索站内内容">
              <span aria-hidden="true">⌕</span><b>搜索</b><kbd>Ctrl K</kbd>
            </button>
            <button className="theme-trigger" onClick={toggleTheme} type="button" aria-label={dark ? "切换为浅色主题" : "切换为深色主题"}>
              <span aria-hidden="true">{dark ? "☀" : "◐"}</span>
            </button>
            <button
              className={`mobile-trigger ${mobileOpen ? "is-open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
              aria-expanded={mobileOpen}
              aria-label="打开站点目录"
            >
              <i /><i />
            </button>
          </div>
        </header>
        <span className="reading-progress" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div className={`mobile-navigation ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-navigation-inner">
          <Link href="/" onClick={closeNavigation}>首页</Link>
          <Link href="/#delivery-loop" onClick={closeNavigation}>交付闭环</Link>
          <section>
            <strong>证据</strong>
            {evidenceLinks.map((link) => <Link href={link.href} key={`mobile-${link.href}`} onClick={closeNavigation}>{link.label}</Link>)}
          </section>
          <section>
            <strong>方法论</strong>
            {methodOverviewLinks.map((link) => <Link href={link.href} key={`mobile-${link.href}-${link.label}`} onClick={closeNavigation}>{link.label}<small>{link.meta}</small></Link>)}
          </section>
          <section>
            <strong>资产包</strong>
            {assetLinks.map((link) => <Link href={link.href} key={`mobile-${link.href}`} onClick={closeNavigation}>{link.label}</Link>)}
          </section>
          <Link href="/about" onClick={closeNavigation}>关于本站</Link>
        </div>
      </div>

      {searchOpen && (
        <div className="search-overlay" role="presentation" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setSearchOpen(false);
        }}>
          <section className="search-dialog" role="dialog" aria-modal="true" aria-label="站内搜索">
            <div className="search-input-row">
              <span aria-hidden="true">⌕</span>
              <input
                ref={searchInput}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelectedResult(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setSelectedResult((current) => Math.min(current + 1, results.length - 1));
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setSelectedResult((current) => Math.max(current - 1, 0));
                  }
                  if (event.key === "Enter" && results[selectedResult]) {
                    event.preventDefault();
                    setSearchOpen(false);
                    router.push(results[selectedResult].href);
                  }
                }}
                placeholder="搜索项目、方法或系统……"
                aria-label="搜索内容"
              />
              <button onClick={() => setSearchOpen(false)} type="button">ESC</button>
            </div>
            <div className="search-results">
              {results.length ? results.map((entry) => (
                <Link
                  className={results[selectedResult] === entry ? "is-selected" : ""}
                  href={entry.href}
                  key={`search-${entry.href}-${entry.label}`}
                  onClick={() => setSearchOpen(false)}
                  onMouseEnter={() => setSelectedResult(results.indexOf(entry))}
                >
                  <span><strong>{entry.label}</strong><small>{entry.meta}</small></span><b aria-hidden="true">↗</b>
                </Link>
              )) : <p>没有找到匹配内容。可以尝试“GMV”“数据平台”或“验证”。</p>}
            </div>
            <footer><span>↑↓ 浏览</span><span>Enter 打开</span><span>Esc 关闭</span></footer>
          </section>
        </div>
      )}

      <button
        className={`back-to-top ${showTop ? "is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        type="button"
        aria-label="回到顶部"
      >
        ↑
      </button>
    </>
  );
}

export function ActiveAnchorNav({
  items,
  className,
  label,
}: {
  items: AnchorItem[];
  className?: string;
  label: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.href.replace(/^#/, "") ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.href.replace(/^#/, "")))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const updateFromScroll = () => {
      const marker = window.scrollY + Math.min(window.innerHeight * 0.3, 240);
      let current = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop <= marker) current = section.id;
      }
      setActiveId(current);
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateFromScroll);
  }, [items]);

  return (
    <nav className={`${className ?? ""} active-anchor-nav`} aria-label={label}>
      {items.map((item) => {
        const id = item.href.replace(/^#/, "");
        return <a className={activeId === id ? "is-active" : ""} href={item.href} key={item.href}>{item.label}</a>;
      })}
    </nav>
  );
}
