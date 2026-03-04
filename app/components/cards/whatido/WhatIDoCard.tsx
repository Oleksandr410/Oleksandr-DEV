"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  BuildFromScratchVisual,
  FixingProjectsVisual,
  CMSVisual,
  ScalingVisual,
  DeploymentVisual,
} from "./WhatIDoVisuals";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
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

const scenarios = [
  {
    title: "Building From Scratch & MVP",
    desc: "Planning the overall architecture and building your product step by step from an idea to a stable first version.",
    bullets: [
      "Rapid MVP (Minimum Viable Product) development",
      "Frontend interface development",
      "Backend APIs & microservices",
      "Database architecture & design",
      "AI API integrations (OpenAI, Anthropic, etc.)",
    ],
    visual: BuildFromScratchVisual,
  },
  {
    title: "CMS & Platforms",
    desc: "Building flexible structures that empower teams to manage website content easily without constant developer help.",
    bullets: [
      "Custom WordPress themes & plugins",
      "Headless CMS architecture setup",
      "Reusable content component libraries",
      "Decoupled frontend & content layers",
      "AI-assisted content generation workflows",
    ],
    visual: CMSVisual,
  },
  {
    title: "Stabilizing Projects",
    desc: "Rescuing difficult-to-maintain codebases by identifying bottlenecks and refactoring for long-term stability.",
    bullets: [
      "Comprehensive system review & auditing",
      "Technical debt identification",
      "Database query optimization",
      "Frontend logic simplification",
      "Automated code testing & quality checks",
    ],
    visual: FixingProjectsVisual,
  },
  {
    title: "Scaling & Performance",
    desc: "Analyzing and resolving system slowdowns to keep growing applications fast, reliable, and user-friendly.",
    bullets: [
      "System bottleneck analysis",
      "Advanced caching strategies",
      "Data structure & query optimization",
      "API performance resolution",
      "Automated data processing pipelines",
    ],
    visual: ScalingVisual,
  },
  {
    title: "Deployment & Infra",
    desc: "Setting up robust cloud environments and pipelines to ensure safe updates and reliable production systems.",
    bullets: [
      "Cloud infrastructure configurations",
      "CI/CD deployment pipelines",
      "System monitoring & alerting",
      "Automated infrastructure provisioning",
      "Ensuring safe, zero-downtime releases",
    ],
    visual: DeploymentVisual,
  },
];

function ScrollMenuItem({
  scenario,
  index,
  activeTab,
  setActiveTab,
}: {
  scenario: any;
  index: number;
  activeTab: number;
  setActiveTab: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Trigger when the item is near the center of the viewport
  const isInView = useInView(ref, {
    margin: "-40% 0px -40% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setActiveTab(index);
    }
  }, [isInView, index, setActiveTab]);

  const isActive = activeTab === index;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isActive
          ? "opacity-100 translate-x-0"
          : "opacity-30 -translate-x-4"
        }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-1 transition-all duration-700 rounded-full ${isActive ? 'h-8 bg-sky-500' : 'h-0 bg-transparent'}`} />
        <h3
          className={`font-bold transition-colors duration-700 ${isActive ? "text-sky-600 text-3xl" : "text-slate-500 text-2xl"
            }`}
        >
          {scenario.title}
        </h3>
      </div>
      <div className="pl-5">
        <p
          className={`transition-colors duration-700 text-lg leading-relaxed mb-6 ${isActive ? "text-slate-700" : "text-slate-500"
            }`}
        >
          {scenario.desc}
        </p>
        <ul className="space-y-3">
          {scenario.bullets.map((bullet: string, i: number) => (
            <li
              key={i}
              className={`flex items-start gap-3 transition-colors duration-700 text-base ${isActive ? "text-slate-600" : "text-slate-400"
                }`}
            >
              <svg
                className={`w-5 h-5 shrink-0 mt-0.5 transition-colors duration-700 ${isActive ? "text-sky-500" : "text-slate-300"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function WhatIDoCard() {
  const [activeTab, setActiveTab] = useState(0);

  const ActiveVisual = scenarios[activeTab].visual;

  return (
    <motion.article
      className="w-full max-w-6xl rounded-3xl border-8 border-white bg-white shadow-2xl text-slate-800 flex flex-col relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Header Section */}
      <motion.div
        className="pt-10 md:pt-16 px-6 md:px-12 text-center max-w-3xl mx-auto mb-8 lg:mb-0 relative z-10 bg-white"
        variants={itemVariants}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
          What I Do
        </h2>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
          I help businesses build, fix, and improve web applications across the full development lifecycle.
        </p>
      </motion.div>

      {/* Main Interactive Area - Desktop */}
      <div className="hidden lg:flex relative border-t border-slate-100 bg-white">

        {/* Left Side: Scrollable Text List (Natural Page Scroll) */}
        <div className="w-5/12 border-r border-slate-100 px-10 py-[20vh] flex flex-col gap-[35vh]">
          {scenarios.map((scenario, index) => (
            <ScrollMenuItem
              key={index}
              scenario={scenario}
              index={index}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>

        {/* Right Side: Sticky Stage */}
        <div className="w-7/12 relative">
          {/* This container sticks to the screen while the user scrolls down the left side */}
          <div className="sticky top-[20vh] h-[60vh] flex flex-col items-center justify-center p-12 overflow-hidden bg-slate-50/30 border border-slate-100 rounded-3xl m-8 shadow-inner">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-sky-100/40 rounded-full blur-3xl pointer-events-none transition-all duration-700 ease-in-out" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <ActiveVisual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Vertical Flow */}
      <div className="lg:hidden flex flex-col gap-12 px-6 py-10 border-t border-slate-100 bg-white">
        {scenarios.map((scenario, index) => {
          const Visual = scenario.visual;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col gap-6"
            >
              <div className="h-72 bg-slate-50/50 border border-slate-100 rounded-3xl relative shadow-inner overflow-hidden flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-100/40 rounded-full blur-2xl pointer-events-none" />
                <Visual />
              </div>
              <div className="px-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-6 bg-sky-500 rounded-full" />
                  <h3 className="text-xl font-bold text-slate-800">{scenario.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4 pl-4">{scenario.desc}</p>
                <ul className="space-y-2 pl-4">
                  {scenario.bullets.map((bullet: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 shrink-0 mt-0.5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Section */}
      <motion.div
        className="pt-8 md:pt-10 border-t border-slate-100 bg-white px-6 md:px-12 pb-8 md:pb-10 relative z-30 rounded-b-2xl"
        variants={itemVariants}
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 md:mb-3">How I Work</h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            I focus on writing code that is clear, maintainable, and scalable. My goal is not only to deliver features quickly but also to build systems that remain stable as the product evolves. Clients work with me when they need someone who understands both the deep technical details and the broad architecture of their application.
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}
