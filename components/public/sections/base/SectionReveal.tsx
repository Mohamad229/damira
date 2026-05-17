"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
  amount?: number;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  as = "div",
  amount = 0.18,
}: SectionRevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;

  if (reduceMotion) {
    const StaticComponent = as;

    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
