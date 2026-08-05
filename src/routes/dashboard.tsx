import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  GraduationCap,
  Leaf,
  PiggyBank,
  Sparkles,
  Users,
  Recycle,
} from "lucide-react";
import { motion } from "motion/react";

import { AppShell } from "@/components/passkar/app-shell";
import { ResourceCard } from "@/components/passkar/resource-card";
import { Counter } from "@/components/passkar/motion-primitives";
import { Button } from "@/components/ui/button";
import { activity, currentUser, resources } from "@/lib/passkar-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — PassKar" },
      {
        name: "description",
        content:
          "Your campus circular dashboard: AI recommendations, circular score, money saved and the seniors graduating from your department.",
      },
      { property: "og:title", content: "Dashboard — PassKar" },
      {
        property: "og:description",
        content: "AI recommendations, circular score and campus impact, personalised for you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { icon: PiggyBank, label: "Money saved", value: 18450, prefix: "₹", note: "this semester" },
  { icon: Recycle, label: "Resources rescued", value: 27, note: "by you" },
  { icon: Users, label: "Students helped", value: 41, note: "across 5 branches" },
  { icon: Leaf, label: "CO₂ avoided", value: 96, suffix: " kg", note: "verified" },
];

function Dashboard() {
  return (
    <AppShell
      title="Good evening, Priyansh."
      subtitle="You could save ₹4,200 this week. 3 seniors from Computer Science are graduating in the next 14 days."
    >
      <div className="grid gap-6">
        {/* Score + nudge */}
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-forest p-7 text-[color:var(--ivory)]"
          >
            <p className="eyebrow text-[color:var(--ivory)]/60">Campus circular score</p>
            <div className="mt-4 flex flex-wrap items-end gap-5">
              <Counter to={currentUser.circularScore} className="font-display text-6xl" />
              <p className="pb-2 text-sm text-[color:var(--ivory)]/70">
                +48 this month · top 4% of {currentUser.college}
              </p>
            </div>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-[color:var(--ivory)]/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-terracotta"
              />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["Passing", "92"],
                ["Borrowing", "74"],
                ["Teaching", "68"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-[color:var(--ivory)]/10 px-4 py-3">
                  <p className="text-xs text-[color:var(--ivory)]/60">{k}</p>
                  <p className="mt-1 font-display text-xl">{v}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-3xl border border-border bg-card p-7"
          >
            <div className="flex items-center gap-2 text-terracotta">
              <GraduationCap className="h-5 w-5" />
              <p className="eyebrow text-terracotta">Graduation radar</p>
            </div>
            <h2 className="mt-4 text-2xl leading-snug">
              3 seniors from your department are packing up.
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Sneha Kulkarni", "Passing 14 items · Books, drafter"],
                ["Devanshi Patil", "Selling calculator, monitor"],
                ["Ishan Barot", "Cycle + hostel essentials"],
              ].map(([n, d]) => (
                <li key={n} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                  <span>
                    <span className="font-medium">{n}</span>
                    <span className="block text-muted-foreground">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-6 w-full rounded-xl">
              <Link to="/legacy">Claim from the Legacy Wall</Link>
            </Button>
          </motion.section>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 * i }}
              className="lift rounded-3xl border border-border bg-card p-6"
            >
              <s.icon className="h-5 w-5 text-forest" strokeWidth={1.7} />
              <Counter
                to={s.value}
                prefix={s.prefix ?? ""}
                suffix={s.suffix ?? ""}
                className="mt-4 block font-display text-3xl"
              />
              <p className="mt-1 text-sm font-medium">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.note}</p>
            </motion.div>
          ))}
        </div>

        {/* AI recommendations */}
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" /> Today's AI recommendations
              </p>
              <h2 className="mt-2 text-2xl">Matched to your Semester 5 syllabus</h2>
            </div>
            <Button asChild variant="ghost" className="rounded-xl">
              <Link to="/resources">
                See all resources <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.slice(0, 3).map((r, i) => (
              <ResourceCard key={r.id} resource={r} index={i} />
            ))}
          </div>
        </section>

        {/* Activity */}
        <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-7">
            <h2 className="text-xl">Recent activity</h2>
            <ol className="mt-5 space-y-5">
              {activity.map((a, i) => (
                <motion.li
                  key={a.what}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex gap-4"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-terracotta" />
                  <div className="min-w-0">
                    <p className="text-[0.95rem]">
                      <span className="font-medium">{a.who}</span>{" "}
                      <span className="text-muted-foreground">{a.what}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{a.when}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-border bg-secondary/60 p-7">
            <p className="eyebrow">This week's nudge</p>
            <h2 className="mt-3 text-2xl leading-snug">
              Your drafter has been idle for 96 days.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Second-year Mechanical students start Engineering Drawing next week. Listing it for
              borrow would help four juniors and add 30 points to your circular score.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-xl">
                <Link to="/resources">List it for borrow</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-xl">
                <Link to="/impact">See my impact</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
