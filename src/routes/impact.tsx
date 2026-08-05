import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Award, Coins, Leaf, Recycle, Trash2 } from "lucide-react";

import { AppShell } from "@/components/passkar/app-shell";
import { Counter } from "@/components/passkar/motion-primitives";
import { achievements, campusBreakdown, semesterStats } from "@/lib/passkar-data";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact Dashboard — PassKar" },
      {
        name: "description",
        content:
          "Campus circular score, money saved, resources reused, waste prevented and CO₂ avoided — measured every semester.",
      },
      { property: "og:title", content: "Impact Dashboard — PassKar" },
      { property: "og:description", content: "The measurable side of a circular campus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImpactPage,
});

const headline = [
  { icon: Coins, label: "Money saved", value: 3820000, prefix: "₹" },
  { icon: Recycle, label: "Resources reused", value: 11460 },
  { icon: Trash2, label: "Waste prevented", value: 8.6, suffix: " t", decimals: 1 },
  { icon: Leaf, label: "CO₂ avoided", value: 26.4, suffix: " t", decimals: 1 },
];

function ImpactPage() {
  return (
    <AppShell
      title="Impact"
      subtitle="Sardar Patel Institute of Technology · Academic year 2026, measured against UN SDG 12."
    >
      <div className="grid gap-6">
        <div className="rounded-3xl border border-border bg-forest p-8 text-[color:var(--ivory)]">
          <p className="eyebrow text-[color:var(--ivory)]/60">Campus circular score</p>
          <div className="mt-3 flex flex-wrap items-end gap-6">
            <Counter to={91} className="font-display text-6xl" />
            <p className="pb-2 text-sm text-[color:var(--ivory)]/70">
              +12 vs last semester · 2nd among 34 campuses in Maharashtra
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {headline.map((h) => (
            <div key={h.label} className="lift rounded-3xl border border-border bg-card p-6">
              <h.icon className="h-5 w-5 text-forest" strokeWidth={1.7} />
              <Counter
                to={h.value}
                prefix={h.prefix ?? ""}
                suffix={h.suffix ?? ""}
                decimals={h.decimals ?? 0}
                className="mt-4 block font-display text-3xl"
              />
              <p className="mt-1 text-sm text-muted-foreground">{h.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-3xl border border-border bg-card p-7">
            <p className="eyebrow">Semester statistics</p>
            <h2 className="mt-2 text-2xl">Money kept in student pockets</h2>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={semesterStats}>
                  <defs>
                    <linearGradient id="savedFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--forest)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--forest)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--ink-muted)" fontSize={12} tickLine={false} />
                  <YAxis stroke="var(--ink-muted)" fontSize={12} tickLine={false} width={48} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 14,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="saved"
                    stroke="var(--forest)"
                    strokeWidth={2.5}
                    fill="url(#savedFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-7">
            <p className="eyebrow">Where the reuse happens</p>
            <h2 className="mt-2 text-2xl">Items by category</h2>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campusBreakdown} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="var(--ink-muted)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--muted)" }}
                    contentStyle={{
                      borderRadius: 14,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                    }}
                  />
                  <Bar dataKey="value" fill="var(--terracotta)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <section className="rounded-3xl border border-border bg-card p-7">
          <p className="eyebrow">Achievements</p>
          <h2 className="mt-2 text-2xl">Your circular milestones</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((a) => (
              <div
                key={a.name}
                className={`rounded-2xl border p-5 ${
                  a.done ? "border-forest/30 bg-secondary/60" : "border-dashed border-border"
                }`}
              >
                <Award
                  className={`h-5 w-5 ${a.done ? "text-terracotta" : "text-muted-foreground"}`}
                  strokeWidth={1.7}
                />
                <p className="mt-3 font-medium">{a.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{a.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
