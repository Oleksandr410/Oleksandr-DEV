"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  BuildFromScratchVisual,
  CMSVisual,
  ScalingVisual,
  APIVisual,
  SaaSVisual,
  DeploymentVisual,
  MaintenanceVisual,
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
    id: "1",
    title: "B2B Systems & Custom Platforms",
    focus: "internal tools and client-facing platforms",
    desc: "Many B2B products start as spreadsheets, shared docs, or a mix of off-the-shelf tools. I build custom platforms when those stop scaling: admin dashboards, CRMs, ERP modules, and internal ops systems with proper roles, audit trails, and APIs the rest of your stack can connect to.",
    bullets: [
      "Custom admin dashboards and reporting",
      "CRM, ERP, and workflow tooling",
      "Role-based access, permissions, audit logs",
      "Multi-team workflows and approval chains",
      "Partner and client-facing B2B portals",
    ],
    value: "Your team stops working around the software and starts running the business on it.",
    visual: CMSVisual,
  },
  {
    id: "2",
    title: "SaaS Product Development",
    focus: "launch, billing, and early growth",
    desc: "Founders usually need a first version that real users can sign up for and pay for, not a six-month spec before anything ships. I build SaaS MVPs with the fundamentals in place: auth, subscriptions, core product logic, and a deployment setup you can iterate on every week.",
    bullets: [
      "SaaS architecture planned for growth from v1",
      "Auth, organizations, and account management",
      "Stripe or similar billing integration",
      "Core product features scoped for launch",
      "Production deploy with a clear path to v2",
    ],
    value: "A product you can put in front of customers, not a prototype that needs to be rebuilt.",
    visual: SaaSVisual,
  },
  {
    id: "3",
    title: "AI Engineering & Automation",
    focus: "practical AI inside your product",
    desc: "AI only matters if it saves time or unlocks something your product could not do before. I integrate LLMs, build agents for repetitive workflows, and automate handoffs between systems. For image and video use cases, I use OpenCV for detection, classification, and visual pipelines wired into your application.",
    bullets: [
      "LLM features embedded in your product",
      "AI agents for support, ops, or internal tasks",
      "Workflow automation across apps and APIs",
      "OpenCV for image and video processing",
      "Monitoring and evaluation so AI stays reliable in production",
    ],
    value: "Automation your team notices in the first month, not a strategy deck with nothing shipped.",
    visual: BuildFromScratchVisual,
  },
  {
    id: "4",
    title: "API Development & Integrations",
    focus: "connected systems, shared data",
    desc: "When sales lives in one tool, finance in another, and product data in a third, things break quietly. I design and build APIs, webhooks, and integrations so data moves once and stays consistent across payments, CRMs, ERPs, and the rest of your stack.",
    bullets: [
      "REST and GraphQL API design and development",
      "Payment, billing, and invoicing integrations",
      "CRM and ERP sync with two-way data flows",
      "Webhooks and event-driven architecture",
      "Third-party platform connectors and middleware",
    ],
    value: "Fewer manual exports, fewer sync bugs, and one place to trust the numbers.",
    visual: APIVisual,
  },
  {
    id: "5",
    title: "QA & Test Automation",
    focus: "quality before it hits production",
    desc: "I have joined enough projects where testing was added late and every release felt like a gamble. I set up automated tests and CI gates around the flows that actually break in production: auth, billing, permissions, and critical user journeys.",
    bullets: [
      "Test strategy matched to how you release",
      "Unit, integration, and E2E coverage",
      "CI pipelines that block bad deploys",
      "Regression suites for core business flows",
      "QA practices your team can keep running after handoff",
    ],
    value: "Confidence going into production, not a manual checklist and hope.",
    visual: MaintenanceVisual,
  },
  {
    id: "6",
    title: "Performance & Optimization",
    focus: "when load and latency become the problem",
    desc: "Slow applications lose users. Overloaded databases turn into emergencies. I profile what is actually slow, whether that is queries, API calls, or frontend bundles, fix the bottlenecks, and put structure in place so performance holds up as usage grows.",
    bullets: [
      "Performance audits and targeted profiling",
      "Database query and schema optimization",
      "API latency and throughput improvements",
      "Frontend speed and Core Web Vitals fixes",
      "Refactoring where code is the real bottleneck",
    ],
    value: "An application that stays responsive when traffic grows, not one that needs firefighting every quarter.",
    visual: ScalingVisual,
  },
  {
    id: "7",
    title: "DevOps & Deployment Setup",
    focus: "production you can operate",
    desc: "Getting to production should not mean manual deploys and crossed fingers. I set up cloud infrastructure, CI/CD, and monitoring on AWS, GCP, or Azure, structured so your team can deploy often and recover quickly when something goes wrong.",
    bullets: [
      "Cloud setup and environment management",
      "CI/CD for safe, repeatable releases",
      "Monitoring, logging, and alerting",
      "Infrastructure as code",
      "Rollback and zero-downtime deploy patterns",
    ],
    value: "Deploys your team can run without needing a specialist on call every time.",
    visual: DeploymentVisual,
  }
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
      className={`transition-all duration-300 ${isActive
        ? "opacity-100 translate-x-0"
        : "opacity-30 -translate-x-4"
        }`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-1 transition-all duration-300 rounded-full ${isActive ? 'h-8 bg-sky-500' : 'h-0 bg-transparent'}`} />
        <h3
          className={`font-bold transition-colors duration-300 ${isActive ? "text-sky-600 text-3xl" : "text-slate-500 text-2xl"
            }`}
        >
          {scenario.id}. {scenario.title}
        </h3>
      </div>
      <div className="pl-5 space-y-8">
        {/* Focus */}
        <div className={`transition-colors duration-300 text-base ${isActive ? "text-slate-600" : "text-slate-400"}`}>
          Focus: <span className={`font-bold ${isActive ? "text-sky-600" : "text-slate-500"}`}>{scenario.focus}</span>
        </div>

        {/* Description */}
        <div>
          <div className={`text-xs uppercase font-bold tracking-wider mb-3 ${isActive ? "text-slate-400" : "text-slate-300"}`}>
            Description
          </div>
          <div className={`pl-4 border-l-2 transition-colors duration-300 ${isActive ? "border-sky-300 text-slate-700" : "border-slate-200 text-slate-500"}`}>
            <p className="text-lg leading-relaxed">
              {scenario.desc}
            </p>
          </div>
        </div>

        {/* What I Offer */}
        <div>
          <div className={`text-xs uppercase font-bold tracking-wider mb-4 ${isActive ? "text-slate-400" : "text-slate-300"}`}>
            What I Offer
          </div>
          <ul className="space-y-3">
            {scenario.bullets.map((bullet: string, i: number) => (
              <li
                key={i}
                className={`flex items-center gap-3 transition-colors duration-300 text-base ${isActive ? "text-slate-600" : "text-slate-400"
                  }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${isActive ? "bg-sky-500" : "bg-slate-300"}`} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Value */}
        <div>
          <div className={`text-xs uppercase font-bold tracking-wider mb-3 ${isActive ? "text-slate-400" : "text-slate-300"}`}>
            Value
          </div>
          <p className={`transition-colors duration-300 text-base italic ${isActive ? "text-slate-700" : "text-slate-500"}`}>
            {scenario.value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WhatIDoCard() {
  const [activeTab, setActiveTab] = useState(0);

  const ActiveVisual = scenarios[activeTab].visual;

  return (
    <motion.article
      className="w-full lg:w-[960px] xl:w-[1161px] max-w-full rounded-3xl border-8 border-white bg-white shadow-2xl text-slate-800 flex flex-col relative mx-auto"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Header Section */}
      <motion.div
        className="pt-12 md:pt-20 px-6 md:px-12 md:text-left text-center max-w-3xl md:max-w-none relative z-10 bg-white"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center md:justify-start mb-4">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 mr-3"
            aria-hidden
          >
            <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <span className="text-xs sm:text-sm font-medium text-sky-600 tracking-wide">
            Services & Expertise
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2.5 sm:mb-3">
          What I Do
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
          I work with founders and product teams on B2B platforms and SaaS products. That usually means owning the build, the integrations, the AI pieces that save your team hours, and the test coverage that keeps production stable.
        </p>
      </motion.div>

      {/* Main Interactive Area - Desktop */}
      <div className="hidden lg:flex relative bg-white">

        {/* Left Side: Scrollable Text List (Natural Page Scroll) */}
        <div className="w-5/12 px-10 py-[20vh] flex flex-col gap-[35vh]">
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
          <div className="sticky top-[20vh] h-[60vh] flex flex-col items-center justify-center p-8 lg:p-12 overflow-visible">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[35rem] aspect-square bg-sky-100/40 rounded-full blur-3xl pointer-events-none transition-all duration-700 ease-in-out" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-[32rem] aspect-[4/3] flex items-center justify-center"
              >
                <ActiveVisual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Vertical Flow */}
      <div className="lg:hidden flex flex-col gap-16 px-6 py-10 bg-white">
        {scenarios.map((scenario, index) => {
          const Visual = scenario.visual;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col gap-8"
            >
              <div className="relative w-full aspect-[4/3] max-w-[28rem] mx-auto flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-sky-100/40 rounded-full blur-2xl pointer-events-none" />
                <div className="w-full h-full flex items-center justify-center">
                  <Visual />
                </div>
              </div>
              <div className="px-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-sky-500 rounded-full" />
                  <h3 className="text-xl font-bold text-slate-800">{scenario.id}. {scenario.title}</h3>
                </div>

                <div className="text-sm text-slate-600 pl-4">
                  Focus: <span className="font-bold text-sky-600">{scenario.focus}</span>
                </div>

                <div className="pl-4">
                  <div className="text-[10px] uppercase font-bold tracking-wider mb-2 text-slate-400">
                    Description
                  </div>
                  <div className="pl-3 border-l-2 border-sky-300 text-slate-700 text-sm leading-relaxed">
                    {scenario.desc}
                  </div>
                </div>

                <div className="pl-4">
                  <div className="text-[10px] uppercase font-bold tracking-wider mb-3 text-slate-400">
                    What I Offer
                  </div>
                  <ul className="space-y-2.5">
                    {scenario.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pl-4">
                  <div className="text-[10px] uppercase font-bold tracking-wider mb-2 text-slate-400">
                    Value
                  </div>
                  <p className="text-sm italic text-slate-700">
                    {scenario.value}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Section */}
      <motion.div
        className="pt-8 md:pt-10 bg-white px-6 md:px-12 pb-8 md:pb-10 relative rounded-b-2xl"
        variants={itemVariants}
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 md:mb-3">How I Work</h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            I own projects across the stack: architecture, implementation, deployment. When AI is the right fit, I integrate it properly with LLMs, agents, workflow automation, and OpenCV for vision work. I bring QA in early, around the flows that break in production, not after the first incident. The goal is systems your team can operate and extend long after the initial build.
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}
