"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

type BaseSplitCardProps = {
  left: ReactNode;
  right: ReactNode;
  className?: string;
};

export default function BaseSplitCard({ left, right, className }: BaseSplitCardProps) {
  return (
    <motion.article
      className={`intro-card w-full max-w-6xl rounded-3xl border-8 border-white bg-white shadow-2xl overflow-hidden flex flex-col lg:flex-row ${
        className ?? ""
      }`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {left}
      {right}
    </motion.article>
  );
}

