"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef, useRef, useState } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline";
  size?: "sm" | "md" | "lg";
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, children, variant = "filled", size = "md", onMouseMove, onMouseLeave, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-5 py-2 text-sm h-10",
      md: "px-6 py-3 text-[18px] h-12",
      lg: "px-7 py-3.5 text-[18px] h-14",
    };

    const internalRef = useRef<HTMLButtonElement>(null);
    const [glowPos, setGlowPos] = useState<{ x: number; y: number } | null>(null);

    const mergedRef = (node: HTMLButtonElement | null) => {
      (internalRef as React.RefObject<HTMLButtonElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.RefObject<HTMLButtonElement | null>).current = node;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = internalRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setGlowPos(null);
      onMouseLeave?.(e);
    };

    if (variant === "outline") {
      return (
        <motion.button
          ref={ref as React.RefObject<HTMLButtonElement>}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "relative rounded-[5px] text-white font-sans font-normal items-center justify-center",
            "before:absolute before:inset-0 before:rounded-[5px] before:opacity-0 before:transition-opacity",
            "hover:before:opacity-100 before:brand-gradient-bg",
            "overflow-hidden transition-all duration-300",
            sizeClasses[size],
            className
          )}
          {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
        >
          <span className="relative z-10">{children}</span>
        </motion.button>
      );
    }

    return (
      <motion.button
        ref={mergedRef}
        initial={{
          boxShadow:
            "0 0 0 0px rgba(227,172,119,0), 0 0 0px rgba(227,172,119,0), 0 0 0px rgba(227,172,119,0)",
        }}
        whileHover={{
          boxShadow:
            "0 0 0 1px #e3ac77, " +
            "5px 0 12px rgba(227,172,119,0.45), " +
            "0 8px 16px rgba(227,172,119,0.55)",
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative group rounded-[5px] text-white font-sans font-normal",
          "bg-brand-gold items-center justify-center",
          "overflow-hidden cursor-pointer",
          sizeClasses[size],
          className
        )}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {/* Vòng tròn đỏ follow cursor thay thế gradient sweep */}
        {glowPos && (
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle 110px at ${glowPos.x}px ${glowPos.y}px, rgba(188,10,0,0.85) 0%, rgba(188,10,0,0.3) 40%, transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
