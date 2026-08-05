import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Coins,
  Leaf,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/passkar/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/passkar/motion-primitives";
import { resources } from "@/lib/passkar-data";

export const Route = createFileRoute("/resources/$id")({
  loader: ({ params }) => {
    const resource = resources.find((r) => r.id === params.id);
    if (!resource) throw notFound();
    return { resource };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Resource unavailable — PassKar" }, { name: "robots", content: "noindex" }],
      };
    }
    const { resource } = loaderData;
    return {
      meta: [
        { title: `${resource.title} — PassKar` },
        {
          name: "description",
          content: `${resource.condition} condition, ${resource.hands} students so far. ${resource.description.slice(0, 110)}`,
        },
        { property: "og:title", content: `${resource.title} — PassKar` },
        { property: "og:description", content: resource.description.slice(0, 150) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ResourceDetail,
});

function ResourceDetail() {
  const { resource } = Route.useLoaderData();

  const impact = [
    { icon: Coins, label: "Money saved", value: resource.moneySaved, prefix: "₹" },
    { icon: Leaf, label: "CO₂ saved", value: resource.co2Saved, suffix: " kg", decimals: 1 },
    { icon: Users, label: "Students helped", value: resource.studentsHelped },
    { icon: Wrench, label: "Remaining life", value: resource.remainingLife, suffix: "%" },
  ];

  return (
    <AppShell title={resource.title} subtitle={`${resource.category} · ${resource.subcategory}`}>
      <Link
        to="/resources"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All resources
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-8">
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            src={resource.image}
            alt={resource.title}
            width={1024}
            height={768}
            className="h-[22rem] w-full rounded-3xl border border-border object-cover"
          />

          <section>
            <p className="eyebrow">About this resource</p>
            <p className="mt-3 text-lg leading-relaxed text-foreground/90">
              {resource.description}
            </p>
          </section>

          {/* Journey */}
          <section className="rounded-3xl border border-border bg-card p-7">
            <p className="eyebrow">Resource journey</p>
            <h2 className="mt-2 text-2xl">
              {resource.hands} students. One object. Still going.
            </h2>

            <ol className="relative mt-8 space-y-7 border-l border-border pl-8">
              {resource.journey.map((step, i) => {
                const isLast = i === resource.journey.length - 1;
                return (
                  <motion.li
                    key={step.name + i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.1, type: "spring", stiffness: 300 }}
                      className={`absolute -left-[9px] mt-1.5 h-[18px] w-[18px] rounded-full border-[3px] border-card ${
                        isLast ? "bg-terracotta" : "bg-forest"
                      }`}
                    />
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="font-display text-xl">{step.name}</p>
                      <span className="text-xs text-muted-foreground">{step.batch}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-forest">{step.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {step.date}
                      {step.note ? ` · ${step.note}` : ""}
                    </p>
                  </motion.li>
                );
              })}
            </ol>
          </section>

          {/* Impact */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {impact.map((s) => (
              <div key={s.label} className="rounded-3xl border border-border bg-secondary/50 p-5">
                <s.icon className="h-4.5 w-4.5 text-forest" strokeWidth={1.7} />
                <Counter
                  to={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                  decimals={s.decimals ?? 0}
                  className="mt-3 block font-display text-2xl"
                />
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </section>

          {/* Repairs */}
          <section className="rounded-3xl border border-border bg-card p-7">
            <p className="eyebrow">Repair history</p>
            <ul className="mt-4 space-y-3">
              {resource.repairs.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm">
                  <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" strokeWidth={1.7} />
                  {r}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sticky action panel */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-7">
            <Badge variant="secondary" className="rounded-full font-normal">
              {resource.mode}
            </Badge>
            <p className="mt-4 font-display text-3xl text-forest">{resource.price}</p>

            <dl className="mt-6 space-y-3 text-sm">
              {[
                ["Condition", `${resource.condition} · ${resource.conditionScore}/100`],
                ["Department", resource.department],
                ["Distance", resource.distance],
                ["Hands so far", `${resource.hands} students`],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${resource.conditionScore}%` }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-forest"
              />
            </div>

            <Button
              className="mt-6 h-12 w-full rounded-xl text-base"
              onClick={() =>
                toast.success("Request sent", {
                  description: `${resource.owner} will get back to you in chat.`,
                })
              }
            >
              {resource.mode === "Sell" ? "Request to buy" : `Request to ${resource.mode.toLowerCase()}`}
            </Button>
            <Button asChild variant="outline" className="mt-3 h-11 w-full rounded-xl">
              <Link to="/messages">
                <MessageCircle className="mr-2 h-4 w-4" /> Message {resource.owner.split(" ")[0]}
              </Link>
            </Button>
          </div>

          <div className="mt-5 rounded-3xl border border-border bg-secondary/50 p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-forest text-sm font-semibold text-[color:var(--ivory)]">
                {resource.owner
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="min-w-0">
                <p className="truncate font-medium">{resource.owner}</p>
                <p className="text-xs text-muted-foreground">{resource.ownerBatch}</p>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-forest">
              <ShieldCheck className="h-4 w-4" />
              {resource.verified
                ? "College email + Campus Champion verified"
                : "College email verified"}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {resource.distance}
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
