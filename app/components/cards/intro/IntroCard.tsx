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
    title: "Experience",
    items: [
      "10+ years of experience",
      "20+ production apps shipped",
      "Fintech, e‑commerce, SaaS, healthcare",
    ],
  },
  fullStack: {
    title: "Full-Stack",
    items: [
      "End-to-end web apps",
      "Custom frontends & backends",
      "REST / GraphQL APIs",
      "Scalable data models",
    ],
  },
  cms: {
    title: "CMS",
    items: [
      "Custom CMS themes",
      "Reusable content components",
      "Headless CMS setups",
      "SEO & performance tuning",
    ],
  },
  devops: {
    title: "DevOps",
    items: [
      "Cloud environments (AWS / GCP / Azure)",
      "CI/CD pipelines",
      "Monitoring & alerting",
    ],
  },
} as const;

export default function IntroCard() {
  return (
    <BaseSplitCard
      left={
        <motion.div
          className="flex-1 py-12 px-4 md:px-6 lg:px-0 lg:pl-12 z-50"
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
                  Randy - r@andi
                </span>
              </motion.div>

              <motion.h1
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2.5 sm:mb-3"
                variants={itemVariants}
              >
                Senior Full Stack & CMS Developer
              </motion.h1>
              <motion.p
                className="text-slate-600 text-xs sm:text-sm md:text-base mb-5 max-w-2xl"
                variants={itemVariants}
              >
                Full-stack and CMS developer with 10+ years of experience building and maintaining
                scalable web applications from architecture to deployment.
              </motion.p>
            </div>

            {/* 4 sections around central icon */}
            <motion.div
              className="flex flex-col gap-6 md:flex-row md:gap-2 md:items-stretch md:justify-between text-black"
              variants={containerVariants}
            >
              {/* Left column: Full-Stack / DevOps */}
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
                  title={SKILLS.devops.title}
                  items={SKILLS.devops.items}
                />
              </motion.div>

              {/* Center: circular skills diagram */}
              <motion.div
                className="flex items-center justify-center px-0 w-full"
                variants={itemVariants}
              >
                <CardSkillsDiagram />
              </motion.div>

              {/* Right column: CMS / Experience */}
              <motion.div
                className="flex flex-col justify-between gap-6 lg:gap-10 max-w-xs w-full"
                variants={itemVariants}
              >
                <SkillBlock
                  direct="right"
                  title={SKILLS.cms.title}
                  items={SKILLS.cms.items}
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
          className="intro-card-photo relative hidden lg:block w-full h-64 sm:h-80 lg:w-80 lg:min-w-[20rem] lg:h-auto lg:min-h-[480px] bg-slate-200 shrink-0"
          variants={photoVariants}
        >
          <Image
            src="/me.png"
            alt="Randy"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1023px) 100vw, 24rem"
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

