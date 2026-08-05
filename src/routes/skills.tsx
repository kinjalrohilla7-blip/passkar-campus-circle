import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Star, Users2 } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/passkar/app-shell";
import { Button } from "@/components/ui/button";
import { skills } from "@/lib/passkar-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills & Mentorship — PassKar" },
      {
        name: "description",
        content:
          "Teach, learn, exchange and mentor on campus. AI-matched skill sessions from seniors who have already done it.",
      },
      { property: "og:title", content: "Skills & Mentorship — PassKar" },
      {
        property: "og:description",
        content: "Pass on knowledge the same way you pass on a textbook.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

const tabs = ["All", "Teach", "Learn", "Exchange", "Mentorship"] as const;

function SkillsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const list = skills.filter((s) => tab === "All" || s.type === tab);

  return (
    <AppShell
      title="Skills"
      subtitle="The most valuable thing on campus was never an object. Teach one, learn one, trade one."
    >
      <div className="grid gap-8">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                tab === t
                  ? "border-forest bg-forest text-[color:var(--ivory)]"
                  : "border-border bg-card hover:bg-secondary",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {list.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="lift rounded-3xl border border-border bg-card p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="eyebrow">{s.type}</p>
                  <h2 className="mt-2 text-2xl leading-snug">{s.title}</h2>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-forest">
                  <Sparkles className="h-3.5 w-3.5" /> {s.match}% match
                </span>
              </div>

              <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">{s.blurb}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border/70 pt-5 text-sm">
                <span className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-forest text-[0.65rem] font-semibold text-[color:var(--ivory)]">
                    {s.mentor
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{s.mentor}</span>
                    <span className="block truncate text-xs text-muted-foreground">{s.batch}</span>
                  </span>
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-terracotta text-terracotta" /> {s.rating} (
                  {s.reviews})
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Users2 className="h-3.5 w-3.5" /> {s.sessions} sessions
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  className="rounded-xl"
                  onClick={() =>
                    toast.success("Request sent", {
                      description: `${s.mentor.split(" ")[0]} will confirm a slot in chat.`,
                    })
                  }
                >
                  Request a session
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-xl"
                  onClick={() => toast(`${s.reviews} reviews · average ${s.rating}/5`)}
                >
                  Read reviews
                </Button>
              </div>

              <div className="mt-6 rounded-2xl bg-secondary/60 px-5 py-4">
                <p className="eyebrow">Skill journey</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Learned from a senior → taught {s.sessions} juniors → {Math.round(s.sessions / 3)}{" "}
                  of them now teach it themselves.
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
