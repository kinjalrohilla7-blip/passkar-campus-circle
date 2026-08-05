import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CalendarDays, HeartHandshake, MapPin, Search, ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/passkar/app-shell";
import { Button } from "@/components/ui/button";
import { communityGroups } from "@/lib/passkar-data";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — PassKar" },
      {
        name: "description",
        content:
          "Campus Champions, study groups, project teams, donation drives, lost & found and campus events — the people behind the circular campus.",
      },
      { property: "og:title", content: "Community — PassKar" },
      {
        property: "og:description",
        content: "Champions, study groups, drives and events across your campus.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityPage,
});

function Panel({
  title,
  eyebrow,
  children,
  delay = 0,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      className="rounded-3xl border border-border bg-card p-7"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-2xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </motion.section>
  );
}

function CommunityPage() {
  const { champions, studyGroups, projectTeams, drives, lostFound, events } = communityGroups;

  return (
    <AppShell
      title="Community"
      subtitle="Verified people make a circular campus work. These are the students holding it together."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel eyebrow="Verified volunteers" title="Campus Champions">
          <ul className="space-y-5">
            {champions.map((c) => (
              <li key={c.name} className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest text-xs font-semibold text-[color:var(--ivory)]">
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 font-medium">
                    {c.name}
                    <ShieldCheck className="h-4 w-4 text-forest" />
                  </p>
                  <p className="text-sm text-muted-foreground">{c.role}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {c.rescued} items verified · {c.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="mt-6 w-full rounded-xl"
            onClick={() => toast.success("Application sent to the Champions council")}
          >
            Apply to be a Champion
          </Button>
        </Panel>

        <Panel eyebrow="Learn together" title="Study Groups" delay={0.05}>
          <ul className="space-y-4">
            {studyGroups.map((g) => (
              <li
                key={g.name}
                className="lift rounded-2xl border border-border/70 bg-secondary/40 px-5 py-4"
              >
                <p className="font-medium">{g.name}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {g.members} members
                  </span>
                  <span>{g.when}</span>
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel eyebrow="Build together" title="Project Teams" delay={0.1}>
          <ul className="space-y-4">
            {projectTeams.map((t) => (
              <li key={t.name} className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.members} members · {t.need}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="shrink-0 rounded-xl"
                  onClick={() => toast.success(`Request sent to ${t.name}`)}
                >
                  Join
                </Button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel eyebrow="Give together" title="Donation Drives" delay={0.15}>
          <ul className="space-y-5">
            {drives.map((d) => (
              <li key={d.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{d.name}</p>
                  <span className="text-xs text-muted-foreground">{d.when}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Goal: {d.goal} · {d.progress}% there
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${d.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-terracotta"
                  />
                </div>
              </li>
            ))}
          </ul>
          <Button
            className="mt-6 w-full rounded-xl"
            onClick={() => toast.success("You're on the volunteer list for Handover Week")}
          >
            <HeartHandshake className="mr-2 h-4 w-4" /> Volunteer for a drive
          </Button>
        </Panel>

        <Panel eyebrow="Campus radar" title="Lost & Found" delay={0.2}>
          <ul className="space-y-4">
            {lostFound.map((l) => (
              <li key={l.item} className="flex items-start gap-3">
                <Search className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={1.7} />
                <div className="min-w-0">
                  <p className="font-medium">{l.item}</p>
                  <p className="text-sm text-muted-foreground">
                    {l.where} · {l.when}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="mt-6 w-full rounded-xl"
            onClick={() => toast("Post published to the campus board")}
          >
            Report something lost or found
          </Button>
        </Panel>

        <Panel eyebrow="What's on" title="Campus Events" delay={0.25}>
          <ul className="space-y-4">
            {events.map((e) => (
              <li key={e.name} className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium">{e.name}</p>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {e.when}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" /> {e.going} going
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
