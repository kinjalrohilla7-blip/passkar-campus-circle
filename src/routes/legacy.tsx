import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Quote } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/passkar/app-shell";
import { Button } from "@/components/ui/button";
import { legacyPosts } from "@/lib/passkar-data";

export const Route = createFileRoute("/legacy")({
  head: () => ({
    meta: [
      { title: "Legacy Wall — PassKar" },
      {
        name: "description",
        content:
          "Graduating students leave behind books, notes, roadmaps, interview experiences, projects and mentorship for the batches that follow.",
      },
      { property: "og:title", content: "Legacy Wall — PassKar" },
      {
        property: "og:description",
        content: "What seniors leave behind when they leave campus.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LegacyPage,
});

function LegacyPage() {
  return (
    <AppShell
      title="Legacy Wall"
      subtitle="Before they walk out of the gate, seniors leave something behind. Not objects only — the map."
    >
      <div className="grid gap-8">
        <section className="rounded-3xl border border-border bg-forest p-8 text-[color:var(--ivory)]">
          <Quote className="h-7 w-7 opacity-60" />
          <p className="mt-5 max-w-3xl font-display text-2xl leading-snug sm:text-3xl">
            "Somebody left me their notes in 2022 and I graduated because of them. This is the
            only way I know how to pay it back."
          </p>
          <p className="mt-5 text-sm text-[color:var(--ivory)]/70">
            Tanvi Shirke · Batch 2024 · Computer Science
          </p>
          <Button
            className="mt-7 rounded-xl bg-[color:var(--ivory)] text-forest hover:bg-[color:var(--ivory)]/90"
            onClick={() => toast.success("Your Legacy Wall draft has been started")}
          >
            Leave your legacy
          </Button>
        </section>

        <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5">
          {legacyPosts.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
              className="lift break-inside-avoid rounded-3xl border border-border bg-card p-6"
            >
              <p className="eyebrow">{p.type}</p>
              <h2 className="mt-3 text-xl leading-snug">{p.title}</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{p.body}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border/70 pt-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-[0.65rem] font-semibold text-forest">
                  {p.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.author}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.batch}</p>
                </div>
                <button
                  onClick={() => toast("Thanked " + p.author.split(" ")[0])}
                  className="ml-auto flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-terracotta"
                >
                  <Heart className="h-4 w-4" /> {p.reactions}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
