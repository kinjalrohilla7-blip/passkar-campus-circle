import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { toast } from "sonner";

import { PassKarLogo, PassKarMark } from "@/components/brand/PassKarLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in to PassKar — Your campus circle" },
      {
        name: "description",
        content:
          "Verify your college email to join your campus circular economy on PassKar. Borrow, exchange, donate and pass on resources and skills.",
      },
      { property: "og:title", content: "Sign in to PassKar" },
      {
        property: "og:description",
        content: "Verify your college email and join your university's circular economy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

const branches = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Telecommunication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
];

function AuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"details" | "verify">("details");

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Editorial panel */}
      <aside className="relative hidden flex-col justify-between bg-forest p-12 text-[color:var(--ivory)] lg:flex">
        <Link to="/" className="flex items-center gap-2.5 text-[color:var(--ivory)]">
          <PassKarMark className="h-7 w-7" strokeWidth={5} />
          <span className="font-display text-xl">PassKar</span>
        </Link>

        <div className="max-w-md">
          <p className="eyebrow text-[color:var(--ivory)]/60">Pass more than things</p>
          <h2 className="mt-5 font-display text-[3rem] leading-[1.05]">
            Your campus already owns everything you need.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--ivory)]/75">
            We verify every member with a college email, so the person handing you a drafter at
            8 a.m. is genuinely two floors above you.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 border-t border-[color:var(--ivory)]/20 pt-8">
          {[
            ["4,128", "verified students"],
            ["11,460", "items rescued"],
            ["₹38.2L", "saved together"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-2xl">{v}</p>
              <p className="mt-1 text-xs text-[color:var(--ivory)]/60">{l}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Forms */}
      <main className="flex items-center justify-center px-4 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden">
            <Link to="/">
              <PassKarLogo />
            </Link>
          </div>

          {step === "verify" ? (
            <div className="mt-8">
              <button
                onClick={() => setStep("details")}
                className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-forest">
                <Mail className="h-5 w-5" />
              </div>
              <h1 className="mt-6 font-display text-3xl">Check your college inbox</h1>
              <p className="mt-3 text-muted-foreground">
                We sent a 6-digit code to your university email. Only verified students can enter
                the campus circle.
              </p>

              <div className="mt-8">
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} className="h-12 w-12 text-lg" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                className="mt-8 h-12 w-full rounded-xl text-base"
                onClick={() => {
                  toast.success("College email verified", {
                    description: "Welcome to the PassKar campus circle.",
                  });
                  navigate({ to: "/dashboard" });
                }}
              >
                Verify & enter campus
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <button
                className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground"
                onClick={() => toast("Code resent to your college email")}
              >
                Resend code
              </button>
            </div>
          ) : (
            <Tabs defaultValue="signup" className="mt-8">
              <h1 className="font-display text-3xl">Welcome to your campus circle</h1>
              <p className="mt-2 text-muted-foreground">
                Sardar Patel Institute of Technology · 4,128 students inside
              </p>

              <TabsList className="mt-7 grid w-full grid-cols-2 rounded-xl bg-secondary p-1">
                <TabsTrigger value="signin" className="rounded-lg">
                  Sign in
                </TabsTrigger>
                <TabsTrigger value="signup" className="rounded-lg">
                  Sign up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-7 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="si-email">College email</Label>
                  <Input
                    id="si-email"
                    type="email"
                    placeholder="priyansh.m22@spit.ac.in"
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="si-pass">Password</Label>
                  <Input id="si-pass" type="password" placeholder="••••••••" className="h-11 rounded-xl" />
                </div>
                <Button
                  className="h-12 w-full rounded-xl text-base"
                  onClick={() => {
                    toast.success("Signed in as Priyansh");
                    navigate({ to: "/dashboard" });
                  }}
                >
                  Sign in
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Only college-issued email addresses are accepted.
                </p>
              </TabsContent>

              <TabsContent value="signup" className="mt-7 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="su-name">Full name</Label>
                  <Input id="su-name" placeholder="Priyansh Mehra" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="su-email">College email</Label>
                  <Input
                    id="su-email"
                    type="email"
                    placeholder="name.roll@college.ac.in"
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Branch</Label>
                    <Select defaultValue={branches[0]}>
                      <SelectTrigger className="h-11 w-full rounded-xl">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Semester</Label>
                    <Select defaultValue="5">
                      <SelectTrigger className="h-11 w-full rounded-xl">
                        <SelectValue placeholder="Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                          <SelectItem key={s} value={String(s)}>
                            Semester {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Where do you stay?</Label>
                  <RadioGroup defaultValue="hosteller" className="grid grid-cols-2 gap-3">
                    {[
                      ["hosteller", "Hosteller"],
                      ["day", "Day Scholar"],
                    ].map(([value, label]) => (
                      <Label
                        key={value}
                        htmlFor={value}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-normal transition-colors has-[button[data-state=checked]]:border-forest has-[button[data-state=checked]]:bg-secondary"
                      >
                        <RadioGroupItem value={value} id={value} />
                        {label}
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <Button
                  className="h-12 w-full rounded-xl text-base"
                  onClick={() => setStep("verify")}
                >
                  Continue to email verification
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>

                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  Your listings stay inside your university. No outsiders, no marketplace spam.
                </p>
              </TabsContent>
            </Tabs>
          )}
        </motion.div>
      </main>
    </div>
  );
}
