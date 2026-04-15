"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline";
  size?: "sm" | "md" | "lg";
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, children, variant = "filled", size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "px-5 py-2 text-sm h-10",
      md: "px-6 py-3 text-[18px] h-12",
      lg: "px-7 py-3.5 text-[18px] h-14",
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
        ref={ref as React.RefObject<HTMLButtonElement>}
        initial={{
          boxShadow:
            "0 0 0 0px rgba(227,172,119,0), 0 0 0px rgba(227,172,119,0), 0 0 0px rgba(227,172,119,0)",
        }}
        whileHover={{
          boxShadow:
            // 1. Viền vàng mỏng bao quanh
            "0 0 0 1px #e3ac77, " +
            // 2. Gold glow cạnh phải
            "5px 0 12px rgba(227,172,119,0.45), " +
            // 3. Gold glow cạnh đáy — mạnh hơn phải
            "0 8px 16px rgba(227,172,119,0.55)",
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={cn(
          "relative group rounded-[5px] text-white font-sans font-normal",
          "bg-brand-gold items-center justify-center",
          "overflow-hidden cursor-pointer",
          sizeClasses[size],
          className
        )}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {/* Gradient (đỏ → cam) loang từ dưới lên khi hover */}
        <span
          className="brand-gradient-bg absolute inset-0 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
          aria-hidden="true"
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

GradientButton.displayName = "GradientButton";

export default GradientButton;
