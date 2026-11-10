import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MysteryBox } from "./MysteryBox";
import { play } from "@/lib/sound";

/** ~2s cinematic: shake → light → lid → particles. Calls onDone once. */
export function OpeningSequence({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0); // 0 shake, 1 light, 2 open, 3 burst
  const done = useRef(false);
  const finish = () => { if (done.current) return; done.current = true; onDone(); };

  useEffect(() => {
    if (reduce) { const t = setTimeout(finish, 450); return () => clearTimeout(t); }
    play("shake");
    const ts = [
      setTimeout(() => setStage(1), 600),
      setTimeout(() => { setStage(2); play("reveal"); }, 1150),
      setTimeout(() => setStage(3), 1450),
      setTimeout(finish, 2100),
    ];
    return () => ts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div role="dialog" aria-modal="true" aria-label="Opening your box"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
      <p className="sr-only" aria-live="assertive">Opening your box…</p>
      <div className="relative flex h-72 w-72 items-center justify-center">
        <motion.div className="absolute inset-0 rounded-full bg-gold blur-3xl"
          animate={{ opacity: reduce ? 0.3 : [0, 0, 0.25, 0.6][stage], scale: [0.4, 0.5, 0.9, 1.4][stage] }}
          transition={{ duration: 0.5 }} />
        <motion.div
          animate={stage === 0 && !reduce ? { x: [0, -6, 6, -5, 5, -3, 3, 0], rotate: [0, -2, 2, -2, 2, 0] } : stage === 1 ? { x: [0, -2, 2, 0], scale: 1.04 } : { scale: 1.06 }}
          transition={{ duration: stage === 0 ? 0.6 : 0.4, repeat: stage === 1 ? 2 : 0 }}
          className="relative w-60">
          <MysteryBox open={stage >= 2 || !!reduce} glow={reduce ? 0.6 : [0, 0.4, 0.9, 1][stage]} className="w-full" />
        </motion.div>
        <AnimatePresence>
          {stage === 3 && Array.from({ length: 28 }).map((_, i) => {
            const a = (i / 28) * Math.PI * 2; const d = 110 + (i % 4) * 25;
            return (
              <motion.span key={i} className="absolute left-1/2 top-[40%] h-1.5 w-1.5 rounded-full bg-gold-soft"
                initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d - 30, opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }} />
            );
          })}
        </AnimatePresence>
      </div>
      <button onClick={finish} autoFocus
        className="mt-10 min-h-11 rounded-full px-5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">
        Skip animation
      </button>
    </motion.div>
  );
}
