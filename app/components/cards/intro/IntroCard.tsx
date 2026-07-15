"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BaseSplitCard from "../shared/BaseSplitCard";
import SkillBlock from "../shared/SkillBlock";
import CardSkillsDiagram from "../shared/CardSkillsDiagram";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const photoVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const SKILLS = {
  experience: {
    title: "QA & Experience",
    items: [
      "Test automation in CI",
      "10+ years shipping to production",
      "20+ apps delivered",
      "Fintech, SaaS, healthcare, B2B",
    ],
  },
  fullStack: {
    title: "Full-Stack",
    items: [
      "React, Next.js, Node.js",
      "Frontend through backend",
      "REST & GraphQL APIs",
      "Database design",
    ],
  },
  b2bSaas: {
    title: "B2B & SaaS",
    items: [
      "SaaS MVPs and platforms",
      "CRM, ERP, admin tools",
      "Multi-tenant setups",
      "Billing & subscriptions",
    ],
  },
  aiAutomation: {
    title: "AI & Automation",
    items: [
      "LLMs and agents in production",
      "Workflow automation",
      "OpenCV for vision tasks",
      "Third-party integrations",
    ],
  },
} as const;

export default function IntroCard() {
  return (
    <BaseSplitCard
      left={
        <motion.div
          className="flex-1 py-12 px-4 md:px-6 lg:px-0 lg:pl-12"
          variants={containerVariants}
        >
          <div className="flex flex-col justify-around h-full">
            <div>
              {/* Who I Am */}
              <motion.div className="flex items-center mb-2.5 sm:mb-3" variants={itemVariants}>
                <span
                  className="flex h-10 w-10 items-center p-[10px] mr-2 justify-center rounded-full bg-sky-100"
                  aria-hidden
                >
                  <Image
                    src="/logo.png"
                    alt=""
                    width={22}
                    height={22}
                    className="h-6 w-6 object-contain"
                  />
                </span>
                <span className="intro-card-label text-xs sm:text-sm font-medium text-sky-600">
                  Oleksandr - (:Oleks:)
                </span>
              </motion.div>

              <motion.h1
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2 sm:mb-2.5"
                variants={itemVariants}
              >
                Senior Full-Stack & AI Engineer
              </motion.h1>
              <motion.p
                className="text-sky-600 text-xs sm:text-sm font-medium mb-2.5 sm:mb-3"
                variants={itemVariants}
              >
                Automation & SaaS · B2B Systems · QA
              </motion.p>
              <motion.p
                className="text-slate-600 text-xs sm:text-sm md:text-base mb-5 max-w-2xl"
                variants={itemVariants}
              >
                10+ years building B2B apps, SaaS products, and the automation around them. I handle
                the full stack, wire up AI where it actually helps, and keep QA honest so things
                don&apos;t break in production.
              </motion.p>
            </div>

            {/* 4 sections around central icon */}
            <motion.div
              className="flex flex-col gap-6 md:flex-row md:gap-2 md:items-stretch md:justify-between text-black"
              variants={containerVariants}
            >
              {/* Left column: Full-Stack / AI & Automation */}
              <motion.div
                className="flex flex-col justify-between gap-6 md:text-right lg:gap-10 max-w-xs w-full"
                variants={itemVariants}
              >
                <SkillBlock
                  direct="left"
                  title={SKILLS.fullStack.title}
                  items={SKILLS.fullStack.items}
                />
                <SkillBlock
                  direct="left"
                  title={SKILLS.aiAutomation.title}
                  items={SKILLS.aiAutomation.items}
                />
              </motion.div>

              {/* Center: circular skills diagram */}
              <motion.div
                className="flex items-center justify-center px-0 w-full"
                variants={itemVariants}
              >
                <CardSkillsDiagram />
              </motion.div>

              {/* Right column: B2B & SaaS / QA & Experience */}
              <motion.div
                className="flex flex-col justify-between gap-6 lg:gap-10 max-w-xs w-full"
                variants={itemVariants}
              >
                <SkillBlock
                  direct="right"
                  title={SKILLS.b2bSaas.title}
                  items={SKILLS.b2bSaas.items}
                />
                <SkillBlock
                  direct="right"
                  title={SKILLS.experience.title}
                  items={SKILLS.experience.items}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      }
      right={
        <motion.div
          className="intro-card-photo relative hidden lg:block lg:w-80 lg:min-w-[20rem] lg:self-stretch shrink-0 overflow-hidden bg-slate-200"
          variants={photoVariants}
        >
          <Image
            src="/me.png"
            alt="Oleksandr(:Oleks:)"
            fill
            className="object-cover object-top z-0"
            sizes="320px"
            priority
            draggable={false}
          />
          <svg
            className="intro-card-curve hidden lg:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <mask id="intro-card-mask" maskContentUnits="objectBoundingBox">
                <rect width="1" height="1" fill="black" />
                <ellipse cx="-1.03" cy="0.5" ry="1" rx="1.2" fill="white" />
              </mask>
            </defs>
            <rect width="1" height="1" fill="white" mask="url(#intro-card-mask)" />
          </svg>
        </motion.div>
      }
    />
  );
}

