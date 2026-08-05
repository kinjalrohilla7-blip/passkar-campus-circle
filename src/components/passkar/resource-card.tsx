import { Link } from "@tanstack/react-router";
import { MapPin, ShieldCheck, Repeat } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import type { Resource } from "@/lib/passkar-data";

const modeStyles: Record<Resource["mode"], string> = {
  Borrow: "bg-secondary text-secondary-foreground",
  Sell: "bg-forest text-[color:var(--ivory)]",
  Donate: "bg-terracotta text-accent-foreground",
  Exchange: "bg-card text-forest border border-forest/30",
};

export function ResourceCard({ resource, index = 0 }: { resource: Resource; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/resources/$id"
        params={{ id: resource.id }}
        className="lift block h-full overflow-hidden rounded-3xl border border-border bg-card"
      >
        <div className="relative">
          <img
            src={resource.image}
            alt={resource.title}
            loading="lazy"
            width={1024}
            height={768}
            className="h-48 w-full object-cover"
          />
          <span
            className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium ${modeStyles[resource.mode]}`}
          >
            {resource.mode}
          </span>
          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur">
            <Repeat className="h-3 w-3" /> {resource.hands} hands
          </span>
        </div>

        <div className="p-5">
          <p className="eyebrow">{resource.subcategory}</p>
          <h3 className="mt-2 line-clamp-2 text-lg leading-snug">{resource.title}</h3>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="rounded-full font-normal">
              {resource.condition}
            </Badge>
            <span className="text-xs text-muted-foreground">{resource.department}</span>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-border/70 pt-4">
            <div className="min-w-0">
              <p className="truncate font-display text-lg text-forest">{resource.price}</p>
              <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" /> {resource.distance}
              </p>
            </div>
            {resource.verified && (
              <span className="flex shrink-0 items-center gap-1 text-xs text-forest">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
