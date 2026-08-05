import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import { AppShell } from "@/components/passkar/app-shell";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/components/passkar/resource-card";
import { Counter } from "@/components/passkar/motion-primitives";
import { currentUser, resources } from "@/lib/passkar-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — PassKar" },
      {
        name: "description",
        content: "Your verified campus profile, listings, circular score and everything you have passed on.",
      },
      { property: "og:title", content: "Your Profile — PassKar" },
      { property: "og:description", content: "Verified student profile and circular history." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppShell title="Profile" subtitle={`${currentUser.college} · verified college email`}>
      <div className="grid gap-6">
        <section className="grid gap-6 rounded-3xl border border-border bg-card p-8 sm:grid-cols-[auto_1fr]">
          <span className="grid h-20 w-20 place-items-center rounded-3xl bg-forest font-display text-2xl text-[color:var(--ivory)]">
            {currentUser.initials}
          </span>
          <div className="min-w-0">
            <h2 className="flex flex-wrap items-center gap-2 font-display text-3xl">
              {currentUser.name}
              <ShieldCheck className="h-5 w-5 text-forest" />
            </h2>
            <p className="mt-2 text-muted-foreground">
              {currentUser.branch} · {currentUser.semester} · {currentUser.residence}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{currentUser.email}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-4">
              {[
                { label: "Circular score", value: currentUser.circularScore },
                { label: "Saved (₹)", value: currentUser.savedThisSemester, prefix: "₹" },
                { label: "Rescued", value: currentUser.rescued },
                { label: "Helped", value: currentUser.helped },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-secondary/60 px-4 py-3">
                  <Counter
                    to={s.value}
                    prefix={s.prefix ?? ""}
                    className="font-display text-2xl text-forest"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-xl">
                <Link to="/resources">Manage listings</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/settings">Edit profile</Link>
              </Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl">Currently passed on by you</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.slice(2, 5).map((r, i) => (
              <ResourceCard key={r.id} resource={r} index={i} />
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
