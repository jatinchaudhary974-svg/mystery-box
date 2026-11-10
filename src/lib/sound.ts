import { useSyncExternalStore } from "react";

let enabled = false;
const listeners = new Set<() => void>();
let ctx: AudioContext | null = null;

export function setSoundEnabled(v: boolean) {
  enabled = v;
  try { localStorage.setItem("wi-sound", v ? "1" : "0"); } catch { /* ignore */ }
  listeners.forEach((l) => l());
  if (v) play("click");
}

export function loadSoundPreference() {
  try {
    if (localStorage.getItem("wi-sound") === "1") { enabled = true; listeners.forEach((l) => l()); }
  } catch { /* ignore */ }
}

export function useSoundEnabled() {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => enabled,
    () => false,
  );
}

function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "sine", vol = 0.08, endFreq?: number) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime + start;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (endFreq) o.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

export type SoundName = "click" | "shake" | "reveal" | "pop";

/** Plays a UI sound only if the user has enabled sound. */
export function play(name: SoundName, force = false) {
  if (!enabled && !force) return;
  const a = audio();
  if (a?.state === "suspended") void a.resume();
  switch (name) {
    case "click": tone(660, 0, 0.08, "triangle", 0.05); break;
    case "pop": tone(500, 0, 0.12, "sine", 0.07, 900); break;
    case "shake": [0, 0.12, 0.24, 0.36].forEach((s) => tone(110, s, 0.1, "triangle", 0.06)); break;
    case "reveal": [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.08, 0.6, "sine", 0.06)); break;
  }
}

/** A deliberately odd sound for the "Unexpected Sound" surprise (user-triggered). */
export function playWeird(variant: number) {
  const a = audio();
  if (!a) return;
  if (a.state === "suspended") void a.resume();
  const v = variant % 4;
  if (v === 0) { tone(900, 0, 0.5, "sawtooth", 0.04, 80); tone(120, 0.45, 0.3, "square", 0.04, 600); }
  if (v === 1) [0, 0.09, 0.18, 0.27, 0.36].forEach((s, i) => tone(300 + i * 220, s, 0.08, "square", 0.04));
  if (v === 2) { tone(200, 0, 0.9, "sine", 0.08, 1400); tone(203, 0, 0.9, "sine", 0.06, 1350); }
  if (v === 3) { tone(60, 0, 0.25, "sawtooth", 0.07, 40); tone(1800, 0.25, 0.15, "sine", 0.05, 2400); }
}
