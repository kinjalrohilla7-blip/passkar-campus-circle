import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Boxes,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Menu,
  MessageCircle,
  Search,
  Settings,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { motion } from "motion/react";

import { PassKarLogo } from "@/components/brand/PassKarLogo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/passkar-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resources", label: "Resources", icon: Boxes },
  { to: "/skills", label: "Skills", icon: Sparkles },
  { to: "/community", label: "Community", icon: Users },
  { to: "/impact", label: "Impact", icon: LineChart },
  { to: "/legacy", label: "Legacy Wall", icon: GraduationCap },
  { to: "/messages", label: "Messages", icon: MessageCircle, badge: 7 },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1">
      {nav.map((item) => {
        const active = pathname === item.to || pathname.startsWith(item.to + "/");
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-forest text-[color:var(--ivory)]"
                : "text-foreground/75 hover:bg-sidebar-accent hover:text-foreground",
            )}
          >
            <item.icon className="h-[1.05rem] w-[1.05rem] shrink-0" strokeWidth={1.8} />
            <span className="min-w-0 truncate">{item.label}</span>
            {"badge" in item && item.badge ? (
              <span
                className={cn(
                  "ml-auto rounded-full px-2 py-0.5 text-[0.65rem] font-semibold",
                  active ? "bg-[color:var(--ivory)]/20" : "bg-terracotta text-accent-foreground",
                )}
              >
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-5">
      <Link to="/" onClick={onNavigate} className="px-1">
        <PassKarLogo />
      </Link>

      <div className="rounded-2xl border border-border/70 bg-card px-4 py-3.5">
        <p className="eyebrow">Circular score</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-3xl text-forest">{currentUser.circularScore}</span>
          <span className="text-xs text-muted-foreground">top 4% on campus</span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-terracotta"
          />
        </div>
      </div>

      <NavList onNavigate={onNavigate} />

      <div className="mt-auto rounded-2xl bg-forest px-4 py-4 text-[color:var(--ivory)]">
        <p className="text-xs opacity-70">Graduation week</p>
        <p className="mt-1 font-display text-lg leading-snug">
          3 seniors in your department are passing things on.
        </p>
        <Link
          to="/legacy"
          onClick={onNavigate}
          className="mt-3 inline-flex text-xs font-medium underline underline-offset-4 opacity-90 hover:opacity-100"
        >
          Open Legacy Wall
        </Link>
      </div>
    </div>
  );
}

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[17.5rem] border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarInner />
      </aside>

      <div className="lg:pl-[17.5rem]">
        <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5 sm:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[17.5rem] bg-sidebar p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SidebarInner onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>

            <div className="relative hidden min-w-0 flex-1 sm:block">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search books, cycles, skills, seniors…"
                className="h-10 rounded-xl border-border/80 bg-card pl-9"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.8} />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-terracotta" />
              </Button>
              <Link
                to="/profile"
                className="grid h-9 w-9 place-items-center rounded-full bg-forest text-xs font-semibold text-[color:var(--ivory)]"
              >
                {currentUser.initials}
              </Link>
            </div>
          </div>
        </header>

        <motion.main
          key={title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10"
        >
          <div className="mb-8">
            <h1 className="font-display text-3xl leading-tight sm:text-[2.6rem]">{title}</h1>
            {subtitle && (
              <p className="mt-2 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {children}
        </motion.main>
      </div>
    </div>
  );
}
