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
    title: "Custom Web Application Development",
    focus: "full production systems",
    desc: "Building custom web platforms from scratch, designed for scalability, performance, and long-term business operations.",
    bullets: [
      "Internal business systems",
      "Dashboards & admin panels",
      "CRM / ERP platforms",
      "Marketplace platforms",
      "API-driven applications",
    ],
    value: "Reliable and scalable systems built to support real business workflows.",
    visual: BuildFromScratchVisual,
  },
  {
    id: "2",
    title: "CMS & Platforms",
    focus: "content management & flexibility",
    desc: "Developing and customizing CMS platforms that make it easy for teams to manage and update website content.",
    bullets: [
      "Custom CMS website development",
      "WordPress themes & plugin development",
      "Drupal modules & customization",
      "Headless CMS architecture setup",
      "CMS migrations & upgrades",
    ],
    value: "Empowering teams to manage content efficiently while maintaining high performance.",
    visual: CMSVisual,
  },
  {
    id: "3",
    title: "Website Performance & Optimization",
    focus: "speed, stability & performance",
    desc: "Improving the performance of existing websites and web applications to ensure faster loading, better stability, and a smoother user experience.",
    bullets: [
      "Core Web Vitals improvement",
      "Advanced caching strategies",
      "Database optimization",
      "Server performance tuning",
      "Code refactoring",
    ],
    value: "Ensuring your application remains fast and reliable as your user base grows.",
    visual: ScalingVisual,
  },
  {
    id: "4",
    title: "API Development & Integrations",
    focus: "system connectivity & data exchange",
    desc: "Building reliable APIs and integrating third-party services to connect systems, automate workflows, and enable seamless data exchange between platforms.",
    bullets: [
      "REST / GraphQL API development",
      "Payment gateway integrations",
      "CRM integrations",
      "ERP integrations",
      "Third-party platform integrations",
    ],
    value: "Connected systems with reliable data flow and automated processes.",
    visual: APIVisual,
  },
  {
    id: "5",
    title: "SaaS MVP Development",
    focus: "startup product launch",
    desc: "Helping founders turn an idea into a working SaaS product quickly by building a focused MVP ready for early users and validation.",
    bullets: [
      "MVP architecture & product setup",
      "Core feature development",
      "User authentication & account system",
      "Basic billing & subscription setup",
      "Production deployment",
    ],
    value: "Launch faster, validate the product, and iterate based on real users.",
    visual: SaaSVisual,
  },
  {
    id: "6",
    title: "DevOps & Deployment Setup",
    focus: "cloud & automation",
    desc: "Setting up reliable deployment systems and cloud environments so applications run smoothly in production.",
    bullets: [
      "Cloud infrastructure configurations",
      "CI/CD deployment pipelines",
      "System monitoring & alerting",
      "Automated infrastructure provisioning",
      "Ensuring safe, zero-downtime releases",
    ],
    value: "Providing a secure, automated, and scalable foundation for your applications.",
    visual: DeploymentVisual,
  },
  {
    id: "7",
    title: "Web Application Maintenance & Support",
    focus: "ongoing reliability & support",
    desc: "Providing ongoing maintenance and support to keep applications running smoothly and addressing any issues that arise.",
    bullets: [
      "Regular system checks & updates",
      "Performance monitoring & optimization",
      "Security patches & updates",
      "Bug fixes & feature enhancements",
      "Technical documentation & training",
    ],
    value: "Ensuring your application remains stable and secure as it grows and evolves.",
    visual: MaintenanceVisual,
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
          I help businesses build, fix, and improve web applications across the full development lifecycle.
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
        className="pt-8 md:pt-10 bg-white px-6 md:px-12 pb-8 md:pb-10 relative z-30 rounded-b-2xl"
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
