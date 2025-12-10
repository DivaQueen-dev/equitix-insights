import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export function Logo({ className, showText = true, size = "md", animate = true }: LogoProps) {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-lg" },
    md: { icon: "w-10 h-10", text: "text-xl" },
    lg: { icon: "w-14 h-14", text: "text-2xl" },
  };

  const Wrapper = animate ? motion.div : "div";
  const animateProps = animate
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: "easeOut" },
      }
    : {};

  return (
    <Link to="/" className={cn("flex items-center gap-2.5 group", className)}>
      <Wrapper {...animateProps}>
        <div
          className={cn(
            "relative rounded-xl bg-foreground flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105",
            sizes[size].icon
          )}
        >
          {/* Bull & Bear Icon */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[70%] h-[70%]"
          >
            {/* Bull (top-left, upward) */}
            <path
              d="M8 28C8 28 10 18 16 14C18 12.5 20 12 22 12.5C24 13 24 15 23 17C22 19 18 22 16 24C14 26 12 28 8 28Z"
              fill="hsl(var(--background))"
              className="opacity-90"
            />
            {/* Bull Horn */}
            <path
              d="M18 10L16 6M22 9L21 4"
              stroke="hsl(var(--background))"
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Bear (bottom-right, downward) */}
            <path
              d="M40 20C40 20 38 30 32 34C30 35.5 28 36 26 35.5C24 35 24 33 25 31C26 29 30 26 32 24C34 22 36 20 40 20Z"
              fill="hsl(var(--background))"
              className="opacity-90"
            />
            {/* Bear Ear */}
            <path
              d="M30 38L32 42M26 39L27 44"
              stroke="hsl(var(--background))"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Dividing line / chart line */}
            <path
              d="M6 36L14 28L22 32L30 20L38 24L42 12"
              stroke="hsl(var(--background))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            />
          </svg>
        </div>
      </Wrapper>
      {showText && (
        <span className={cn("font-semibold tracking-tight", sizes[size].text)}>
          Equitix
        </span>
      )}
    </Link>
  );
}

export function LogoMini({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-6 h-6 rounded-md bg-foreground flex items-center justify-center",
        className
      )}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[65%] h-[65%]"
      >
        <path
          d="M6 36L14 28L22 32L30 20L38 24L42 12"
          stroke="hsl(var(--background))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="42" cy="12" r="3" fill="hsl(var(--background))" />
      </svg>
    </div>
  );
}
