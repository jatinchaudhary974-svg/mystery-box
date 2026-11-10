import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const goldButton = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold uppercase tracking-[0.22em] transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gold-gradient text-primary-foreground shadow-gold hover:brightness-110 active:scale-[0.98]",
        outline: "border border-gold/50 text-gold hover:bg-gold/10",
        ghost: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export type GoldButtonVariant = VariantProps<typeof goldButton>["variant"];
export const gb = (variant?: GoldButtonVariant, className?: string) => cn(goldButton({ variant }), className);
