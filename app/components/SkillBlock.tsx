"use client";

import { motion } from "framer-motion";

type SkillBlockProps = {
  title: string;
  items: readonly string[];
  direct: "left" | "right";
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: (direct: "left" | "right") => ({
    opacity: 0,
    x: direct === "left" ? -8 : 8,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function SkillBlock({ title, items, direct }: SkillBlockProps) {
  return (
    <div>
      <h2 className="text-sm sm:text-base font-semibold text-slate-800 mb-1.5">{title}</h2>
      <motion.ul
        className="text-xs sm:text-sm text-slate-600 space-y-2"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item) => (
          <motion.li
            className={`${direct === "right" ? "border-l-2 border-[#388ae775] pl-2" : "border-l-2 pl-2 md:border-r-2 md:border-l-0 md:pl-0 border-[#388ae775] md:pr-2"}`}
            key={item}
            variants={itemVariants}
            custom={direct}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

