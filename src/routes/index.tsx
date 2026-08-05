import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Bike,
  BookOpen,
  Calculator,
  FlaskConical,
  Guitar,
  NotebookPen,
  Recycle,
  Leaf,
  HeartHandshake,
} from "lucide-react";

import { PassKarLogo, PassKarMark } from "@/components/brand/PassKarLogo";
import { Button } from "@/components/ui/button";
import { Counter, Reveal, SectionHeading } from "@/components/passkar/motion-primitives";
import { images } from "@/lib/passkar-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PassKar — Pass More Than Things" },
      {
        name: "description",
        content:
          "PassKar is the AI-powered campus circular economy. Borrow, exchange, donate and pass on books, cycles, lab kits, skills and knowledge inside your university.",
      },
      { property: "og:title", content: "PassKar — Pass More Than Things" },
      {
        property: "og:description",
        content:
          "Nothing valuable should leave campus with a graduating student. PassKar keeps resources, skills and knowledge moving between students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const LOOP_PATH =
  "M 150 400 L 150 150 A 95 95 0 1 1 150 340 M 150 340 L 150 400";

const travellers = [
  { icon: BookOpen, label: "Engineering Graphics", delay: 0 },
  { icon: Calculator, label: "FX-991EX", delay: 2.2 },
  { icon: Bike, label: "Campus cycle", delay: 4.4 },
  { icon: Guitar, label: "Yamaha F310", delay: 6.6 },
  { icon: NotebookPen, label: "Python notes", delay: 8.8 },
  { icon: FlaskConical, label: "Lab coat", delay: 11 },
];

function LoopAnimation() {
  return (
    <div className="flex w-full justify-center">
      <div className="relative h-[460px] w-[300px] origin-center scale-[0.78] sm:scale-90 lg:scale-100">
        <svg viewBox="0 0 300 460" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d={LOOP_PATH}
            fill="none"
            stroke="currentColor"
            className="text-forest/12"
            strokeWidth={30}
            strokeLinecap="round"
          />
          <motion.path
            d={LOOP_PATH}
            fill="none"
            stroke="currentColor"
            className="text-forest"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="10 16"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d="M 178 318 L 150 340 L 178 362"
            fill="none"
            stroke="currentColor"
            className="text-terracotta"
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.6 }}
          />
        </svg>

        {travellers.map((t) => (
          <motion.div
            key={t.label}
            className="absolute top-0 left-0 -ml-6 -mt-6 grid h-12 w-12 place-items-center rounded-2xl border border-border bg-card shadow-soft"
            style={{ offsetPath: `path("${LOOP_PATH}")`, offsetRotate: "0deg" }}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 13.2, delay: t.delay, repeat: Infinity, ease: "linear" }}
          >
            <t.icon className="h-5 w-5 text-forest" strokeWidth={1.6} />
          </motion.div>
        ))}

        <div className="absolute right-0 bottom-2 max-w-[9.5rem] text-right">
          <p className="eyebrow">Now travelling</p>
          <p className="mt-1 text-sm text-muted-foreground">
            six objects, one loop, zero landfill
          </p>
        </div>
      </div>
    </div>
  );
}


function Landing() {
  return (
    <div className="min-h-screen canvas-warm">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
          <Link to="/">
            <PassKarLogo />
          </Link>
          <nav className="ml-auto hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <Link to="/resources" className="transition-colors hover:text-foreground">
              Resources
            </Link>
            <Link to="/skills" className="transition-colors hover:text-foreground">
              Skills
            </Link>
            <Link to="/legacy" className="transition-colors hover:text-foreground">
              Legacy Wall
            </Link>
            <Link to="/impact" className="transition-colors hover:text-foreground">
              Impact
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-6">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/auth">Sign in</Link>
            </Button>
            <Button asChild className="rounded-xl">
              <Link to="/auth">Join your campus</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Opening: resources never stop moving */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            UN SDG 12 · Campus circular economy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-xl mt-6 text-[3.2rem] sm:text-[4.5rem] lg:text-[5rem]"
          >
            Resources never
            <br />
            stop moving.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            A book, a calculator, a cycle, a guitar, a set of Python notes, a lab coat. On most
            campuses they end in a cardboard box in May. On PassKar they keep travelling —
            student to student, batch to batch.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" className="h-12 rounded-xl px-6 text-base">
              <Link to="/auth">
                Start passing things on
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-forest/25 px-6 text-base"
            >
              <Link to="/resources">Browse campus resources</Link>
            </Button>
          </motion.div>
          <p className="mt-8 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">4,100+ students</span> across 12
            departments · <span className="font-medium text-foreground">₹38.2L</span> kept in
            student pockets
          </p>
        </div>

        <LoopAnimation />
      </section>

      {/* The waste loop */}
      <section className="border-y border-border/60 bg-secondary/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="The problem"
            title="Every May, a campus quietly throws away its own memory."
            description="Not because students don't care — because there is no system that connects the person leaving with the person arriving."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Seniors discard what still works",
                body: "Drafters, lab coats, cycles and four years of notes get sold to the scrap dealer at ₹12 a kilo because packing them home is harder.",
              },
              {
                n: "02",
                title: "Juniors buy the exact same things",
                body: "A first-year spends ₹18,000 in the first month on items that already exist three floors above them, barely used.",
              },
              {
                n: "03",
                title: "Knowledge disappears with people",
                body: "The person who cracked that lab, that interview, that professor's paper pattern graduates — and takes the map with them.",
              },
            ].map((c, i) => (
              <Reveal key={c.n} delay={i * 0.08}>
                <article className="lift h-full rounded-3xl border border-border bg-card p-7">
                  <span className="font-display text-4xl text-terracotta/80">{c.n}</span>
                  <h3 className="mt-5 text-xl">{c.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="How PassKar works"
          title="One loop, four ways to keep something alive."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Recycle, title: "Pass on", body: "Hand an item to a verified junior in your department in two taps." },
            { icon: HeartHandshake, title: "Borrow", body: "Take a drafter for one semester instead of buying it for one month of use." },
            { icon: Leaf, title: "Donate", body: "Send surplus into the first-year pool and watch where it travels next." },
            { icon: BookOpen, title: "Teach", body: "Pass skills the same way — DSA, tabla, MATLAB, interview prep." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <article className="lift h-full rounded-3xl border border-border bg-card p-7">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-forest">
                  <c.icon className="h-5 w-5" strokeWidth={1.7} />
                </div>
                <h3 className="mt-5 text-lg">{c.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Journey teaser */}
      <section className="border-y border-border/60 bg-forest text-[color:var(--ivory)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow text-[color:var(--ivory)]/60">The signature feature</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Every object carries its own biography.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[color:var(--ivory)]/75">
              PassKar records the journey of a resource — who owned it, who repaired it, how much
              money it has saved and how many students it has carried through a semester.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 h-12 rounded-xl bg-[color:var(--ivory)] px-6 text-base text-forest hover:bg-[color:var(--ivory)]/90"
            >
              <Link to="/resources/$id" params={{ id: "engineering-graphics" }}>
                See a real resource journey
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={0.12}>
            <ol className="relative space-y-6 border-l border-[color:var(--ivory)]/25 pl-8">
              {[
                ["Rahul, Batch 2024", "Bought new in 2021 for ₹640"],
                ["Sneha, Batch 2026", "Added a colour-coded index"],
                ["Aman, Batch 2027", "Cleared the subject with it"],
                ["Priyansh, Batch 2028", "Currently reading"],
                ["Ready for its next student", "November 2026"],
              ].map(([who, note], i) => (
                <motion.li
                  key={who}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-forest bg-terracotta" />
                  <p className="font-display text-xl">{who}</p>
                  <p className="text-sm text-[color:var(--ivory)]/65">{note}</p>
                </motion.li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Impact */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Measured impact" title="What one campus did in two semesters." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: 3820000, prefix: "₹", label: "kept in student pockets" },
            { value: 11460, label: "resources rescued from waste" },
            { value: 4128, label: "students helped by a senior" },
            { value: 26.4, decimals: 1, suffix: " t", label: "CO₂ emissions avoided" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="rounded-3xl border border-border bg-card p-7">
                <Counter
                  to={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                  decimals={s.decimals ?? 0}
                  className="font-display text-4xl text-forest"
                />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { src: images.books, alt: "Used engineering textbooks passed between students" },
            { src: images.cycle, alt: "A campus cycle listed for its next owner" },
            { src: images.guitar, alt: "A shared acoustic guitar from the music club" },
          ].map((img) => (
            <Reveal key={img.alt}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={1024}
                height={768}
                className="h-56 w-full rounded-3xl border border-border object-cover"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-border/60 bg-secondary/50">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <PassKarMark className="mx-auto h-10 w-10 text-forest" />
          <h2 className="mt-8 font-display text-4xl leading-tight sm:text-5xl">
            Nothing valuable should leave campus with a graduating student.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Pass more than things. Pass what you learned.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-xl px-6 text-base">
              <Link to="/auth">Verify your college email</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-xl px-6 text-base">
              <Link to="/legacy">Read the Legacy Wall</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
          <PassKarLogo />
          <p className="text-sm text-muted-foreground sm:ml-auto">
            PassKar · Pass More Than Things · Built for UN SDG 12
          </p>
        </div>
      </footer>
    </div>
  );
}
