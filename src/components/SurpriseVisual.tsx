import { motion, useReducedMotion } from "framer-motion";
import {
  Award, Briefcase, Cloud, DoorOpen, Eye, Hand, HelpCircle, Heart, Infinity as InfinityIcon, Mail, Moon,
  Orbit, Puzzle, Sparkles, Star, Sun, Volume2, Waves, Zap, Wind, Gem, MousePointerClick, Smile, RotateCcw, Globe2,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { play, playWeird } from "@/lib/sound";
import type { Surprise } from "@/lib/surprises";

export const SURPRISE_ICON: Record<string, LucideIcon> = {
  superpower: Zap, trophy: Award, ceo: Briefcase, potato: Smile, answer: HelpCircle,
  galaxy: Orbit, liquid: Waves, storm: Sparkles, tunnel: InfinityIcon, island: Cloud,
  riddle: Puzzle, illusion: Eye, hidden: Moon, pattern: Gem, backwards: RotateCcw,
  reminder: Heart, highfive: Hand, letter: Mail, fortune: Sun, pocket: Star,
  creature: Eye, button: MousePointerClick, door: DoorOpen, planet: Globe2, sound: Volume2,
};

const pick = <T,>(arr: T[], not?: T) => {
  let v = arr[Math.floor(Math.random() * arr.length)];
  if (arr.length > 1) while (v === not) v = arr[Math.floor(Math.random() * arr.length)];
  return v;
};

function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface/60 ${className}`}>
      {children}
    </div>
  );
}

const btn = "min-h-11 rounded-full border border-gold/50 px-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/10";

/* ---------- Funny ---------- */
const POWERS = [
  "You can perfectly predict when toast is done — but only other people's toast.",
  "You can breathe underwater, but only in puddles.",
  "You can talk to plants. They are not interested.",
  "You can teleport — exactly 4 centimetres to the left.",
  "You always know what time it is in Iceland.",
  "You can turn invisible, but only when nobody is looking.",
  "You can fly, at walking speed, one inch off the ground.",
  "You can make any cup of tea exactly lukewarm.",
];
function Superpower() {
  const [p, setP] = useState(POWERS[0]);
  return (
    <Stage className="flex-col gap-6 p-8 text-center">
      <Zap className="h-14 w-14 text-gold" aria-hidden />
      <p aria-live="polite" className="font-display text-2xl leading-snug">{p}</p>
      <button className={btn} onClick={() => { play("pop"); setP(pick(POWERS, p)); }}>Reroll power</button>
    </Stage>
  );
}

function Trophy() {
  const [shine, setShine] = useState(0);
  return (
    <Stage className="flex-col gap-4 p-8 text-center">
      <div className="relative h-40 w-40">
        {Array.from({ length: Math.min(3 + shine, 14) }).map((_, i) => (
          <Sparkles key={i} className="animate-twinkle absolute h-4 w-4 text-gold" aria-hidden
            style={{ left: `${(i * 37) % 90}%`, top: `${(i * 53) % 70}%`, animationDelay: `${i * 0.3}s` }} />
        ))}
        <div className="absolute bottom-0 left-1/2 h-10 w-28 -translate-x-1/2 rounded-md bg-gold-gradient" />
        <div className="absolute bottom-10 left-1/2 h-3 w-20 -translate-x-1/2 rounded-t-md bg-gold-deep" />
      </div>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {shine === 0 ? "Plaque reads: “For Excellence in Being Here.”" : `Polished ${shine} time${shine > 1 ? "s" : ""}. It's never looked more invisible.`}
      </p>
      <button className={btn} onClick={() => { play("click"); setShine(shine + 1); }}>Polish trophy</button>
    </Stage>
  );
}

function Ceo() {
  return (
    <Stage className="p-6">
      <motion.div initial={{ rotate: -8, y: 20, opacity: 0 }} animate={{ rotate: -3, y: 0, opacity: 1 }}
        className="w-full rounded-2xl border border-gold/40 bg-background p-6 shadow-gold">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Nothing Incorporated</p>
        <p className="mt-6 font-display text-3xl">You</p>
        <p className="text-sm text-muted-foreground">Chief Executive of Doing Nothing</p>
        <ul className="mt-6 space-y-1 text-xs text-muted-foreground">
          <li>Office hours: whenever, loosely</li>
          <li>Core skill: strategic napping</li>
          <li>Direct reports: one houseplant</li>
        </ul>
      </motion.div>
    </Stage>
  );
}

const MOVES = [
  { rotate: [0, -15, 15, 0], y: [0, -20, 0] },
  { x: [0, -30, 30, 0], rotate: [0, 10, -10, 0] },
  { scaleY: [1, 0.7, 1.2, 1], y: [0, 10, -25, 0] },
  { rotate: [0, 360] },
];
function Potato() {
  const [m, setM] = useState(0);
  const reduce = useReducedMotion();
  return (
    <Stage className="flex-col gap-4">
      <button aria-label="Change the potato's dance move" onClick={() => { play("pop"); setM((m + 1) % MOVES.length); }} className="rounded-full">
        <motion.svg viewBox="0 0 120 140" className="h-52 w-44" key={m}
          animate={reduce ? undefined : MOVES[m]} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}>
          <ellipse cx="60" cy="70" rx="44" ry="58" fill="var(--gold-deep)" />
          <circle cx="40" cy="50" r="3" fill="var(--box-side)" opacity=".5" /><circle cx="78" cy="96" r="4" fill="var(--box-side)" opacity=".5" />
          <circle cx="46" cy="62" r="7" fill="var(--foreground)" /><circle cx="74" cy="62" r="7" fill="var(--foreground)" />
          <circle cx="47" cy="63" r="3" fill="var(--background)" /><circle cx="75" cy="63" r="3" fill="var(--background)" />
          <path d="M44 86 Q60 100 76 86" stroke="var(--background)" strokeWidth="4" fill="none" strokeLinecap="round" />
        </motion.svg>
      </button>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground" aria-live="polite">
        Move: {["The Wiggle", "The Slide", "The Mash", "The Full Fry"][m]}
      </p>
    </Stage>
  );
}

const QA = [
  ["Why is the sky blue?", "Because it saw the sea first and didn't want to clash."],
  ["What's the meaning of life?", "Snacks. It has always been snacks."],
  ["Where do socks go?", "A small, thriving sock nation behind your washing machine."],
  ["Why do cats knock things off tables?", "Gravity research. They're very close to a breakthrough."],
  ["What is time?", "Roughly 4:15, last we checked."],
];
function Answer() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  return (
    <Stage className="flex-col gap-5 p-8 text-center">
      <p className="font-display text-3xl">{QA[i][0]}</p>
      <p aria-live="polite" className={`min-h-16 text-gold transition-opacity ${shown ? "opacity-100" : "opacity-0"}`}>{shown ? QA[i][1] : ""}</p>
      {shown
        ? <button className={btn} onClick={() => { setI((i + 1) % QA.length); setShown(false); }}>Ask another</button>
        : <button className={btn} onClick={() => { play("pop"); setShown(true); }}>Reveal the answer</button>}
    </Stage>
  );
}

/* ---------- Visual ---------- */
function Galaxy() {
  const stars = useMemo(() => Array.from({ length: 260 }, (_, i) => {
    const arm = i % 3; const t = i / 260;
    const r = 6 + t * 44; const a = t * 9 + arm * ((Math.PI * 2) / 3) + Math.sin(i * 12.9) * 0.3;
    return { x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r, s: 0.4 + ((i * 7) % 10) / 10, d: (i % 9) * 0.3 };
  }), []);
  return (
    <Stage className="bg-background">
      <div className="absolute inset-[35%] rounded-full bg-gold/40 blur-2xl" />
      <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full" aria-hidden>
        {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.s * 0.6} fill={i % 5 ? "var(--foreground)" : "var(--gold)"}
          className="animate-twinkle" style={{ animationDelay: `${s.d}s` }} />)}
        <circle cx="50" cy="50" r="3" fill="var(--gold-soft)" />
      </svg>
    </Stage>
  );
}

function Liquid() {
  return (
    <Stage className="bg-background">
      <div className="absolute inset-0 blur-2xl">
        <div className="animate-blob absolute left-[10%] top-[15%] h-1/2 w-1/2 rounded-full bg-gold/70" />
        <div className="animate-blob absolute right-[8%] top-[30%] h-1/2 w-1/2 rounded-full bg-gold-deep" style={{ animationDelay: "-3s" }} />
        <div className="animate-blob absolute bottom-[8%] left-[25%] h-2/5 w-1/2 rounded-full bg-foreground/40" style={{ animationDelay: "-6s" }} />
      </div>
      <p className="relative font-display text-lg italic text-foreground/80">it never settles</p>
    </Stage>
  );
}

function Storm() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const g = c.getContext("2d"); if (!g) return;
    const gold = getComputedStyle(document.documentElement).getPropertyValue("--gold").trim() || "#C6A45D";
    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; };
    resize();
    const P = Array.from({ length: reduce ? 60 : 180 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, vx: 0, vy: 0 }));
    const target = { x: c.width / 2, y: c.height / 2 };
    const move = (e: PointerEvent) => { const r = c.getBoundingClientRect(); target.x = (e.clientX - r.left) * dpr; target.y = (e.clientY - r.top) * dpr; };
    c.addEventListener("pointermove", move); c.addEventListener("pointerdown", move);
    let raf = 0; let t = 0;
    const loop = () => {
      t += 0.01;
      if (!reduce) { g.fillStyle = "rgba(16,16,16,0.25)"; g.fillRect(0, 0, c.width, c.height); } else g.clearRect(0, 0, c.width, c.height);
      g.fillStyle = gold;
      for (const p of P) {
        const dx = target.x - p.x, dy = target.y - p.y; const d = Math.hypot(dx, dy) + 1;
        p.vx = (p.vx + (dx / d) * 0.6 - dy / d * 0.4) * 0.96; p.vy = (p.vy + (dy / d) * 0.6 + dx / d * 0.4) * 0.96;
        if (!reduce) { p.x += p.vx; p.y += p.vy; }
        g.beginPath(); g.arc(p.x, p.y, 1.6 * dpr, 0, Math.PI * 2); g.fill();
      }
      if (!reduce) raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); c.removeEventListener("pointermove", move); c.removeEventListener("pointerdown", move); };
  }, [reduce]);
  return (
    <Stage className="bg-background">
      <canvas ref={ref} className="h-full w-full touch-none" aria-label="Golden particles that follow your pointer" role="img" />
      <p className="pointer-events-none absolute bottom-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Move to conduct</p>
    </Stage>
  );
}

function Tunnel() {
  return (
    <Stage className="bg-background">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="animate-tunnel absolute aspect-square w-3/5 rounded-2xl border-2 border-gold/70"
          style={{ animationDelay: `${-i * 0.4}s` }} />
      ))}
      <div className="absolute h-3 w-3 rounded-full bg-gold-soft shadow-gold" />
    </Stage>
  );
}

function Island() {
  return (
    <Stage className="bg-background">
      <Cloud className="animate-float absolute left-6 top-10 h-12 w-12 text-foreground/20" aria-hidden />
      <Cloud className="animate-float absolute bottom-12 right-6 h-16 w-16 text-foreground/15" style={{ animationDelay: "-2s" }} aria-hidden />
      <svg viewBox="0 0 200 200" className="animate-float h-4/5 w-4/5" aria-hidden>
        <path d="M30 110 L170 110 L120 175 L100 190 L75 165 Z" fill="var(--box-top)" />
        <path d="M30 110 L170 110 L160 120 L40 120 Z" fill="var(--gold-deep)" />
        <rect x="96" y="70" width="8" height="42" fill="var(--box-side)" />
        <circle cx="100" cy="62" r="24" fill="var(--gold)" opacity=".85" />
        <circle cx="86" cy="70" r="14" fill="var(--gold-deep)" opacity=".8" />
        <path d="M60 175 Q62 190 58 198" stroke="var(--gold)" strokeWidth="2" opacity=".5" fill="none" />
      </svg>
    </Stage>
  );
}

/* ---------- Puzzle ---------- */
function Riddle() {
  const [left, setLeft] = useState(60);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (revealed || left <= 0) return;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left, revealed]);
  const done = revealed || left <= 0;
  return (
    <Stage className="flex-col gap-5 p-8 text-center">
      <p className="font-display text-5xl tabular-nums text-gold" aria-label={`${left} seconds left`}>{left}s</p>
      <p className="font-display text-2xl leading-snug">The more of me you take, the more you leave behind. What am I?</p>
      <p aria-live="polite" className="min-h-6 text-gold">{done ? "Footsteps." : ""}</p>
      {!done && <button className={btn} onClick={() => setRevealed(true)}>I give up — reveal</button>}
    </Stage>
  );
}

function Illusion() {
  const rows = 8, cols = 9;
  return (
    <Stage className="bg-foreground p-0">
      <svg viewBox={`0 0 ${cols * 20} ${rows * 20}`} className="h-full w-full" role="img" aria-label="Café wall illusion: rows of offset tiles that look tilted but are perfectly parallel">
        {Array.from({ length: rows }).map((_, r) => {
          const off = [0, 5, 10, 5][r % 4];
          return (
            <g key={r}>
              {Array.from({ length: cols + 1 }).map((_, c) => c % 2 === 0 && (
                <rect key={c} x={c * 20 + off - 10} y={r * 20} width="20" height="20" fill="var(--background)" />
              ))}
              <rect x="0" y={r * 20 + 19.5} width={cols * 20} height="1" fill="var(--muted-foreground)" />
            </g>
          );
        })}
      </svg>
    </Stage>
  );
}

function Hidden() {
  const target = 29;
  const [found, setFound] = useState(false);
  const [miss, setMiss] = useState(0);
  return (
    <Stage className="flex-col gap-3 p-5">
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: 49 }).map((_, i) => {
          const isMoon = i === target;
          const Icon = isMoon ? Moon : Star;
          return (
            <button key={i} aria-label={found && isMoon ? "Moon found" : `Hiding spot ${i + 1}`}
              onClick={() => { if (isMoon) { play("reveal"); setFound(true); } else setMiss(miss + 1); }}
              className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-gold/10 ${found && isMoon ? "bg-gold/30" : ""}`}>
              <Icon className="h-5 w-5 text-gold" style={{ transform: `rotate(${(i * 47) % 360}deg)` }} aria-hidden />
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {found ? `Found it${miss ? ` after ${miss} miss${miss > 1 ? "es" : ""}` : " first try!"}` : "Find the moon"}
      </p>
    </Stage>
  );
}

function Pattern() {
  const opts = [24, 32, 30, 64];
  const [choice, setChoice] = useState<number | null>(null);
  return (
    <Stage className="flex-col gap-6 p-8 text-center">
      <p className="font-display text-4xl tracking-wide">2 · 4 · 8 · 16 · <span className="text-gold">?</span></p>
      <div className="grid grid-cols-2 gap-3">
        {opts.map((o) => (
          <button key={o} onClick={() => setChoice(o)} aria-pressed={choice === o}
            className={`min-h-12 w-24 rounded-xl border font-display text-2xl transition-colors ${choice === o ? (o === 32 ? "border-gold bg-gold/20" : "border-destructive") : "border-border hover:border-gold"}`}>
            {o}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="min-h-6 text-sm text-gold">
        {choice === null ? "" : choice === 32 ? "Correct — each number doubles." : "Not quite. Look at how each step grows."}
      </p>
    </Stage>
  );
}

function Backwards() {
  const msg = "You are more curious than most. That's a superpower.";
  const [flipped, setFlipped] = useState(false);
  return (
    <Stage className="flex-col gap-6 p-8 text-center">
      <motion.p animate={{ scaleX: flipped ? 1 : -1 }} className="font-display text-2xl leading-snug" aria-live="polite"
        aria-label={flipped ? msg : "A mirrored secret message"}>{msg}</motion.p>
      <button className={btn} onClick={() => { play("pop"); setFlipped(!flipped); }}>{flipped ? "Mirror it again" : "Flip the message"}</button>
    </Stage>
  );
}

/* ---------- Wholesome ---------- */
const REMINDERS = ["Drink a glass of water.", "Unclench your jaw. Drop your shoulders.", "You're allowed to rest.", "Text someone you miss.", "Look at something far away for 20 seconds.", "You've survived every hard day so far."];
function Reminder() {
  const [r, setR] = useState(REMINDERS[0]);
  return (
    <Stage className="flex-col gap-6 p-8 text-center">
      <Heart className="h-10 w-10 text-gold" aria-hidden />
      <motion.p key={r} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} aria-live="polite" className="font-display text-3xl leading-snug">{r}</motion.p>
      <button className={btn} onClick={() => setR(pick(REMINDERS, r))}>Another reminder</button>
    </Stage>
  );
}

function HighFive() {
  const [n, setN] = useState(0);
  return (
    <Stage className="flex-col gap-4">
      <motion.button key={n} aria-label="Give a high five" onClick={() => { play("pop"); setN(n + 1); }}
        initial={{ scale: 1 }} animate={n ? { scale: [1, 1.3, 1], rotate: [0, -12, 0] } : {}}
        className="flex h-40 w-40 items-center justify-center rounded-full bg-gold/10 shadow-gold">
        <Hand className="h-20 w-20 text-gold" aria-hidden />
      </motion.button>
      <p aria-live="polite" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {n === 0 ? "Up high!" : n < 5 ? `${n} high five${n > 1 ? "s" : ""}. Nice.` : `${n}! Legendary palm energy.`}
      </p>
    </Stage>
  );
}

function Letter() {
  const [open, setOpen] = useState(false);
  return (
    <Stage className="p-6">
      {!open ? (
        <button onClick={() => { play("reveal"); setOpen(true); }} aria-label="Open the envelope"
          className="flex flex-col items-center gap-3 rounded-2xl p-4">
          <Mail className="h-24 w-24 text-gold" aria-hidden />
          <span className="font-display text-xl italic">To you.</span>
        </button>
      ) : (
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="rounded-xl bg-foreground p-6 text-background">
          <p className="font-display text-lg leading-relaxed">
            Dear you,<br />Thank you for the small things nobody notices — the patience, the effort, the showing up. They count. You count.<br />
            <span className="italic">— A box that's glad you opened it</span>
          </p>
        </motion.div>
      )}
    </Stage>
  );
}

const FORTUNES = ["A small win is closer than you think.", "Someone will laugh at your joke this week. Genuinely.", "A good surprise is already on its way.", "Tomorrow's coffee will be excellent.", "An old idea of yours is about to make sense."];
function Fortune() {
  const [f, setF] = useState(FORTUNES[0]);
  return (
    <Stage className="flex-col gap-6 p-8 text-center">
      <Sun className="animate-spin-slow h-16 w-16 text-gold" aria-hidden />
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Today's forecast</p>
      <motion.p key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-live="polite" className="font-display text-2xl">{f}</motion.p>
      <button className={btn} onClick={() => setF(pick(FORTUNES, f))}>Another forecast</button>
    </Stage>
  );
}

const NOTES = ["You make rooms warmer.", "Your laugh is contagious.", "You're doing better than you think.", "Someone is grateful you exist.", "Your weirdness is the good kind."];
function Pocket() {
  const [note, setNote] = useState<string | null>(null);
  return (
    <Stage className="flex-col gap-5 p-8 text-center">
      {note && <motion.p key={note} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} aria-live="polite"
        className="rounded-lg bg-foreground px-5 py-4 font-display text-xl text-background">{note}</motion.p>}
      <button onClick={() => { play("pop"); setNote(pick(NOTES, note ?? undefined)); }} aria-label="Reach into the pocket"
        className="flex h-32 w-40 items-end justify-center rounded-b-[3rem] rounded-t-md border-2 border-dashed border-gold/60 bg-gold/10 pb-4 text-xs uppercase tracking-[0.2em] text-gold">
        Reach in
      </button>
    </Stage>
  );
}

/* ---------- Weird ---------- */
const GUESSES = [["A cat?", "It purred. Then it beeped. Then it apologised."], ["A cloud?", "It rained, briefly, on itself. Inconclusive."], ["A potato?", "It looks offended. Different box, apparently."], ["A friend?", "It blinked twice. We think that means yes."]];
function Creature() {
  const [g, setG] = useState<number | null>(null);
  const reduce = useReducedMotion();
  return (
    <Stage className="flex-col gap-4 p-6">
      <motion.svg viewBox="0 0 120 100" className="h-36 w-44" animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2 }} aria-hidden>
        <path d="M15 85 Q10 30 60 25 Q110 30 105 85 Z" fill="var(--gold-deep)" />
        <path d="M30 28 L22 5 M90 28 L100 8" stroke="var(--gold)" strokeWidth="3" />
        <circle cx="38" cy="55" r="12" fill="var(--foreground)" /><circle cx="70" cy="50" r="7" fill="var(--foreground)" /><circle cx="88" cy="62" r="5" fill="var(--foreground)" />
        <circle cx="40" cy="56" r="5" fill="var(--background)" /><circle cx="71" cy="51" r="3" fill="var(--background)" /><circle cx="88" cy="63" r="2" fill="var(--background)" />
        <path d="M50 75 Q60 70 70 76" stroke="var(--background)" strokeWidth="3" fill="none" />
      </motion.svg>
      <div className="grid grid-cols-2 gap-2">
        {GUESSES.map(([q], i) => <button key={q} className="min-h-11 rounded-xl border border-border px-3 text-sm hover:border-gold" onClick={() => setG(i)}>{q}</button>)}
      </div>
      <p aria-live="polite" className="min-h-10 text-center text-sm text-gold">{g !== null ? GUESSES[g][1] : ""}</p>
    </Stage>
  );
}

function FloatingButton() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tries, setTries] = useState(0);
  const [pressed, setPressed] = useState(false);
  const flee = () => {
    if (tries >= 6 || pressed) return;
    setTries(tries + 1);
    setPos({ x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 220 });
  };
  return (
    <Stage className="flex-col">
      <motion.button animate={pos} transition={{ type: "spring", stiffness: 300, damping: 18 }}
        onPointerEnter={(e) => e.pointerType === "mouse" && flee()}
        onClick={() => { if (tries < 6) flee(); else { play("reveal"); setPressed(true); } }}
        className="min-h-12 rounded-full bg-gold-gradient px-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-gold">
        {pressed ? "Thank you" : "Press me"}
      </motion.button>
      <p aria-live="polite" className="absolute bottom-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {pressed ? "It finally trusts you." : tries >= 6 ? "Okay, okay. It's tired. Go on." : `Attempts: ${tries}`}
      </p>
    </Stage>
  );
}

const DOOR_MSG = ["Another door.", "Still doors.", "A slightly smaller door.", "This one's painted gold. Fancy.", "Did you hear knocking?", "It's doors all the way down."];
function Door() {
  const [depth, setDepth] = useState(0);
  const scale = Math.max(0.45, 1 - depth * 0.07);
  return (
    <Stage className="flex-col gap-4">
      <motion.button key={depth} initial={{ scale: scale + 0.1, opacity: 0 }} animate={{ scale, opacity: 1 }}
        onClick={() => { play("click"); setDepth(depth + 1); }} aria-label={`Open door number ${depth + 1}`}
        className="relative h-56 w-32 rounded-t-full border-4 border-gold bg-surface-raised">
        <span className="absolute right-3 top-1/2 h-3 w-3 rounded-full bg-gold" />
      </motion.button>
      <p aria-live="polite" className="text-sm text-muted-foreground">{depth === 0 ? "Knock knock." : `Door ${depth}: ${DOOR_MSG[(depth - 1) % DOOR_MSG.length]}`}</p>
    </Stage>
  );
}

function Planet() {
  const [day, setDay] = useState(true);
  return (
    <Stage className="bg-background">
      <button onClick={() => { play("pop"); setDay(!day); }} aria-label={`Spin time forward. It is currently ${day ? "day" : "night"}`} className="relative h-64 w-64 rounded-full">
        <div className="animate-spin-slow absolute inset-0" style={{ animationDuration: "8s" }}>
          <Moon className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 text-foreground/70" aria-hidden />
        </div>
        <motion.div animate={{ rotate: day ? 0 : 180 }} transition={{ type: "spring", stiffness: 60 }}
          className={`absolute inset-10 rounded-full transition-colors duration-700 ${day ? "bg-gold" : "bg-gold-deep/60"}`}>
          <div className="absolute left-1/2 top-[-14px] h-4 w-4 -translate-x-1/2 bg-foreground [clip-path:polygon(50%_0,100%_50%,100%_100%,0_100%,0_50%)]" />
          <div className="absolute left-1/4 top-1/3 h-6 w-10 rounded-full bg-gold-deep/50" />
          <div className="absolute bottom-1/4 right-1/4 h-8 w-8 rounded-full bg-gold-deep/50" />
        </motion.div>
      </button>
      <p className="pointer-events-none absolute bottom-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{day ? "Day" : "Night"} · tap to spin</p>
    </Stage>
  );
}

const SOUND_NAMES = ["A falling robot", "A tiny xylophone escape", "Two ghosts disagreeing", "A frog with a laser"];
function SoundSurprise() {
  const [n, setN] = useState<number | null>(null);
  return (
    <Stage className="flex-col gap-6 p-8 text-center">
      <motion.div animate={n !== null ? { scale: [1, 1.2, 1] } : {}} key={n}><Wind className="h-16 w-16 text-gold" aria-hidden /></motion.div>
      <button className={btn} onClick={() => { const v = n === null ? 0 : n + 1; setN(v); playWeird(v); }}>
        {n === null ? "Play the sound" : "Play another"}
      </button>
      <p aria-live="polite" className="min-h-6 text-sm text-muted-foreground">{n === null ? "This plays sound when pressed." : `Our best guess: ${SOUND_NAMES[n % 4]}.`}</p>
    </Stage>
  );
}

const MAP: Record<string, () => ReactNode> = {
  superpower: Superpower, trophy: Trophy, ceo: Ceo, potato: Potato, answer: Answer,
  galaxy: Galaxy, liquid: Liquid, storm: Storm, tunnel: Tunnel, island: Island,
  riddle: Riddle, illusion: Illusion, hidden: Hidden, pattern: Pattern, backwards: Backwards,
  reminder: Reminder, highfive: HighFive, letter: Letter, fortune: Fortune, pocket: Pocket,
  creature: Creature, button: FloatingButton, door: Door, planet: Planet, sound: SoundSurprise,
};

export function SurpriseVisual({ surprise }: { surprise: Surprise }) {
  const C = surprise.visual ? MAP[surprise.visual] : undefined;
  if (!C) {
    const Icon = SURPRISE_ICON[surprise.visual ?? ""] ?? Sparkles;
    return <Stage><Icon className="h-24 w-24 text-gold" aria-hidden /></Stage>;
  }
  return <C />;
}
