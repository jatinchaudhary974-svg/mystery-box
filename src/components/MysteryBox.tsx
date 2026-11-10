import { motion } from "framer-motion";
import { useId } from "react";

interface Props {
  open?: boolean;
  glow?: number; // 0..1
  className?: string;
}

/** A single identical mystery box drawn in SVG. */
export function MysteryBox({ open = false, glow = 0, className }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`f${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--box-top)" />
          <stop offset="1" stopColor="var(--box-side)" />
        </linearGradient>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--gold-soft)" />
          <stop offset="0.5" stopColor="var(--gold)" />
          <stop offset="1" stopColor="var(--gold-deep)" />
        </linearGradient>
        <radialGradient id={`l${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--gold-soft)" stopOpacity="0.95" />
          <stop offset="1" stopColor="var(--gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="100" cy="184" rx="70" ry="8" fill="var(--background)" opacity="0.7" />

      {/* inner light */}
      <ellipse cx="100" cy="82" rx="95" ry="70" fill={`url(#l${id})`} opacity={glow} />

      {/* body */}
      <rect x="38" y="86" width="124" height="94" rx="6" fill={`url(#f${id})`} stroke="var(--border)" />
      <rect x="92" y="86" width="16" height="94" fill={`url(#g${id})`} />
      <rect x="38" y="86" width="124" height="6" fill="var(--background)" opacity="0.35" />
      <text x="100" y="146" textAnchor="middle" fontFamily="var(--font-display)" fontSize="34" fill="var(--gold)" opacity="0.0">?</text>

      {/* lid */}
      <motion.g
        style={{ transformOrigin: "34px 86px", transformBox: "view-box" }}
        animate={open ? { rotate: -28, y: -26, x: -6 } : { rotate: 0, y: 0, x: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
      >
        <rect x="32" y="68" width="136" height="22" rx="5" fill="var(--box-top)" stroke="var(--border)" />
        <rect x="92" y="68" width="16" height="22" fill={`url(#g${id})`} />
        {/* bow */}
        <path d="M100 68 C 80 40, 58 52, 72 66 Z" fill={`url(#g${id})`} />
        <path d="M100 68 C 120 40, 142 52, 128 66 Z" fill={`url(#g${id})`} />
        <circle cx="100" cy="66" r="6" fill="var(--gold-soft)" />
      </motion.g>
    </svg>
  );
}
