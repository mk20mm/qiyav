import Link from "next/link";
import { assetNavItems, methodSidebarGroups } from "./document-navigation";

export function MethodSidebar({ activeHref }: { activeHref: string }) {
  return (
    <aside className="method-library-sidebar" aria-label="方法论目录">
      {methodSidebarGroups.map((group) => (
        <section key={group.label}>
          <strong>{group.label}</strong>
          {group.items.map((item) => (
            <Link
              className={`${item.href === activeHref ? "is-active" : ""} ${item.featured ? "is-featured" : ""}`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </section>
      ))}
      <section>
        <strong>配套资产</strong>
        {assetNavItems.slice(1).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
      </section>
    </aside>
  );
}
