import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell } from "@/components/passkar/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { currentUser } from "@/lib/passkar-data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — PassKar" },
      {
        name: "description",
        content: "Manage your campus profile, notification preferences and privacy on PassKar.",
      },
      { property: "og:title", content: "Settings — PassKar" },
      { property: "og:description", content: "Profile, notifications and privacy preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

const toggles = [
  ["Graduation radar", "Tell me when seniors in my branch start passing things on", true],
  ["AI recommendations", "Match listings to my semester syllabus", true],
  ["Borrow reminders", "Remind me two days before a return date", true],
  ["Legacy Wall digest", "Weekly summary of new senior posts", false],
] as const;

function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Everything about how PassKar behaves for you.">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-border bg-card p-7">
          <p className="eyebrow">Account</p>
          <h2 className="mt-2 text-2xl">Campus identity</h2>
          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue={currentUser.name} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">College email</Label>
              <Input
                id="email"
                defaultValue={currentUser.email}
                readOnly
                className="h-11 rounded-xl bg-secondary/60"
              />
              <p className="text-xs text-muted-foreground">
                Verified. Changing this requires re-verification.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostel">Hostel / block</Label>
              <Input id="hostel" defaultValue="Block C · Room 214" className="h-11 rounded-xl" />
            </div>
            <Button
              className="rounded-xl"
              onClick={() => toast.success("Profile updated")}
            >
              Save changes
            </Button>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-7">
          <p className="eyebrow">Notifications</p>
          <h2 className="mt-2 text-2xl">What reaches you</h2>
          <ul className="mt-6 space-y-5">
            {toggles.map(([title, note, on]) => (
              <li key={title} className="flex items-start justify-between gap-5">
                <div className="min-w-0">
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{note}</p>
                </div>
                <Switch defaultChecked={on} className="mt-1 shrink-0" />
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl bg-secondary/60 p-5">
            <p className="font-medium">Leaving campus soon?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Turn on graduation mode and PassKar will help you hand over everything you own in
              one guided flow.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => toast.success("Graduation mode enabled")}
              >
                Enable graduation mode
              </Button>
              <Button asChild variant="ghost" className="rounded-xl">
                <Link to="/legacy">Write a Legacy post</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
