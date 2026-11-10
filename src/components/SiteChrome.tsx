import { Link } from "@tanstack/react-router";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { BRAND } from "@/config/brand";
import { loadSoundPreference, setSoundEnabled, useSoundEnabled } from "@/lib/sound";

export function SoundToggle() {
  const on = useSoundEnabled();
  useEffect(() => loadSoundPreference(), []);
  return (
    <button
      type="button"
      onClick={() => setSoundEnabled(!on)}
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
    >
      {on ? <Volume2 className="h-4 w-4" aria-hidden /> : <VolumeX className="h-4 w-4" aria-hidden />}
      <span>Sound {on ? "on" : "off"}</span>
    </button>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-xl font-semibold tracking-[0.18em] ${className}`}>
      {BRAND.name.replace("?", "")}
      <span className="text-gold">?</span>
    </span>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="bg-ambient flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" aria-label={`${BRAND.name} home`} className="rounded-md">
          <Wordmark />
        </Link>
        <SoundToggle />
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="mx-auto w-full max-w-6xl px-5 py-8 text-center text-xs tracking-wide text-muted-foreground sm:px-8">
        <p>
          {BRAND.name} · Free digital surprises. No accounts, no prizes, no tricks — just mystery.
        </p>
      </footer>
    </div>
  );
}
