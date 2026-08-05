import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal } from "lucide-react";

import { AppShell } from "@/components/passkar/app-shell";
import { ResourceCard } from "@/components/passkar/resource-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, resources } from "@/lib/passkar-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Campus Resources — PassKar" },
      {
        name: "description",
        content:
          "Browse books, electronics, furniture, hostel essentials, cycles, lab equipment, instruments and sports gear shared by students on your campus.",
      },
      { property: "og:title", content: "Campus Resources — PassKar" },
      {
        property: "og:description",
        content: "Eight categories of student-owned resources, ready to borrow, buy or receive.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const activeCategory = categories.find((c) => c.slug === active) ?? null;
  const list = resources.filter((r) => {
    const catOk = !active || r.categorySlug === active;
    const q = query.trim().toLowerCase();
    const qOk =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q);
    return catOk && qOk;
  });

  return (
    <AppShell
      title="Resources"
      subtitle="Eight broad categories. Everything listed here belongs to a verified student on your campus."
    >
      <div className="grid gap-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by item, branch or hostel block…"
              className="h-11 rounded-xl bg-card pl-9"
            />
          </div>
          <Button variant="outline" className="h-11 rounded-xl">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>

        {/* Categories */}
        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => {
              const isActive = active === c.slug;
              return (
                <motion.button
                  key={c.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  onClick={() => setActive(isActive ? null : c.slug)}
                  className={cn(
                    "lift rounded-3xl border p-5 text-left",
                    isActive
                      ? "border-forest bg-forest text-[color:var(--ivory)]"
                      : "border-border bg-card",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-lg">{c.name}</h3>
                    <span
                      className={cn(
                        "text-xs",
                        isActive ? "text-[color:var(--ivory)]/70" : "text-muted-foreground",
                      )}
                    >
                      {c.count}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed",
                      isActive ? "text-[color:var(--ivory)]/75" : "text-muted-foreground",
                    )}
                  >
                    {c.note}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Subcategories */}
        {activeCategory && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <p className="eyebrow">{activeCategory.name} · subcategories</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activeCategory.sub.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-forest/40 hover:bg-secondary"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Listings */}
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl">
              {activeCategory ? activeCategory.name : "Live on campus right now"}
            </h2>
            <p className="text-sm text-muted-foreground">{list.length} listings</p>
          </div>

          {list.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-border p-12 text-center">
              <p className="font-display text-xl">Nothing matches yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another category, or post a request — 4,128 students will see it.
              </p>
              <Button className="mt-5 rounded-xl" onClick={() => { setActive(null); setQuery(""); }}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((r, i) => (
                <ResourceCard key={r.id} resource={r} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
