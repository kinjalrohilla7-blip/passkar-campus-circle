import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Paperclip, Search, Send, ShieldCheck } from "lucide-react";

import { AppShell } from "@/components/passkar/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { conversations } from "@/lib/passkar-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — PassKar" },
      {
        name: "description",
        content: "Chat with verified students on your campus about borrowing, passing on and teaching.",
      },
      { property: "og:title", content: "Messages — PassKar" },
      { property: "og:description", content: "Verified student-to-student chat on your campus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const [activeId, setActiveId] = useState(conversations[0]!.id);
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<Record<string, string[]>>({});

  const active = conversations.find((c) => c.id === activeId)!;
  const sent = extra[activeId] ?? [];

  const send = () => {
    if (!draft.trim()) return;
    setExtra((p) => ({ ...p, [activeId]: [...(p[activeId] ?? []), draft.trim()] }));
    setDraft("");
  };

  return (
    <AppShell title="Messages" subtitle="Every person here is verified with a college email.">
      <div className="grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[20rem_1fr]">
        {/* List */}
        <div className="border-b border-border lg:border-r lg:border-b-0">
          <div className="relative p-4">
            <Search className="absolute top-1/2 left-7 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search chats" className="h-10 rounded-xl pl-9" />
          </div>
          <ul className="max-h-[22rem] overflow-y-auto lg:max-h-[34rem]">
            {conversations.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors",
                    c.id === activeId ? "bg-secondary" : "hover:bg-secondary/50",
                  )}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-xs font-semibold text-[color:var(--ivory)]">
                    {c.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-medium">{c.name}</span>
                      {c.verified && <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-forest" />}
                      <span className="ml-auto shrink-0 text-[0.65rem] text-muted-foreground">
                        {c.time}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {c.last}
                    </span>
                  </span>
                  {c.unread > 0 && (
                    <span className="mt-1 shrink-0 rounded-full bg-terracotta px-1.5 text-[0.65rem] font-semibold text-accent-foreground">
                      {c.unread}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Thread */}
        <div className="flex min-h-[30rem] flex-col">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-forest text-[0.65rem] font-semibold text-[color:var(--ivory)]">
              {active.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate text-sm font-medium">
                {active.name}
                {active.verified && <ShieldCheck className="h-3.5 w-3.5 text-forest" />}
              </p>
              <p className="truncate text-xs text-muted-foreground">{active.handle}</p>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-secondary/30 p-5">
            {active.messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                    m.from === "me"
                      ? "bg-forest text-[color:var(--ivory)]"
                      : "border border-border bg-card",
                  )}
                >
                  <p>{m.text}</p>
                  <p
                    className={cn(
                      "mt-1 text-[0.65rem]",
                      m.from === "me" ? "text-[color:var(--ivory)]/60" : "text-muted-foreground",
                    )}
                  >
                    {m.time}
                  </p>
                </div>
              </motion.div>
            ))}

            {sent.map((t, i) => (
              <div key={`s-${i}`} className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl bg-forest px-4 py-2.5 text-sm text-[color:var(--ivory)]">
                  {t}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.2 }}
                  className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                />
              ))}
              <span className="ml-1">{active.name.split(" ")[0]} is typing</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-border p-4">
            <Button variant="ghost" size="icon" aria-label="Attach file">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Write a message…"
              className="h-11 rounded-xl"
            />
            <Button onClick={send} size="icon" className="h-11 w-11 shrink-0 rounded-xl">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
