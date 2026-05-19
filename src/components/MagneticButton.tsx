"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  as = "button",
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const translateX = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const translateY = useTransform(y, [-0.5, 0.5], [-8, 8]);
  const rotationX = useTransform(rotateX, [-0.5, 0.5], [5, -5]);
  const rotationY = useTransform(rotateY, [-0.5, 0.5], [-5, 5]);

  function handlePointerMove(e: React.PointerEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
    rotateX.set(py);
    rotateY.set(px);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }

  const Tag = as as ElementType;

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: translateX, y: translateY, rotateX: rotationX, rotateY: rotationY }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        className={className}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
