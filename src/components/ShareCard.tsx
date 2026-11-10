import { Sparkles } from "lucide-react";
import { BRAND } from "@/config/brand";
import { CATEGORY_LABEL, type Surprise } from "@/lib/surprises";
import { SURPRISE_ICON } from "./SurpriseVisual";
import { Wordmark } from "./SiteChrome";

export function ShareCard({ surprise, url }: { surprise: Surprise; url: string }) {
  const Icon = SURPRISE_ICON[surprise.visual ?? ""] ?? Sparkles;
  const host = url.replace(/^https?:\/\//, "").split("/")[0];
  return (
    <figure aria-label="Share card preview"
      className="bg-ambient relative mx-auto flex aspect-[4/5] w-full max-w-xs flex-col items-center justify-between overflow-hidden rounded-3xl border border-gold/40 p-7 text-center shadow-gold">
      <Wordmark className="text-base" />
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gold/10 ring-1 ring-gold/50">
          <Icon className="h-12 w-12 text-gold" aria-hidden />
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{CATEGORY_LABEL[surprise.category]} surprise</p>
        <p className="font-display text-3xl leading-tight">{surprise.title}</p>
      </div>
      <figcaption className="space-y-1">
        <p className="font-display text-lg italic text-gold">{BRAND.invitation}</p>
        <p className="text-xs text-muted-foreground">{host}</p>
      </figcaption>
    </figure>
  );
}
