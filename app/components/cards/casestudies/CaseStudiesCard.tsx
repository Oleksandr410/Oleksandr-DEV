"use client";

import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
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

const caseStudies = [
  {
    id: "cs-1",
    clientType: "E-Commerce Brand",
    title: "Headless Migration & Performance Optimization",
    description:
      "Migrated a legacy monolithic e-commerce platform to a modern headless architecture using Next.js and Shopify Storefront API. This shift resolved severe bottleneck issues during high-traffic events.",
    results: [
      "Reduced page load time by 45%",
      "Increased conversion rate by 18%",
      "Zero downtime during Black Friday event",
    ],
    techStack: ["Next.js", "Shopify", "Tailwind CSS", "Vercel"],
  },
  {
    id: "cs-2",
    clientType: "Fintech Startup",
    title: "Real-time Transaction Dashboard",
    description:
      "Built a secure, real-time admin portal for a fintech startup to monitor thousands of daily transactions, manage risk profiles, and generate complex financial reports.",
    results: [
      "Reduced report generation time from hours to seconds",
      "Handled 10k+ concurrent websocket connections",
      "Implemented strict Role-Based Access Control (RBAC)",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "WebSockets"],
  },
  {
    id: "cs-3",
    clientType: "Healthcare Provider",
    title: "HIPAA-Compliant Patient Portal",
    description:
      "Developed a secure patient portal allowing users to access lab results, schedule appointments, and communicate with healthcare providers directly, ensuring full HIPAA compliance.",
    results: [
      "Streamlined appointment booking process",
      "End-to-end encrypted messaging",
      "Seamless integration with legacy EHR systems",
    ],
    techStack: ["Next.js", "GraphQL", "AWS", "Prisma"],
  },
  {
    id: "cs-4",
    clientType: "SaaS Company",
    title: "B2B Multi-tenant Platform Restructure",
    description:
      "Rescued a failing SaaS product by refactoring its core architecture. Transitioned to a multi-tenant database strategy and cleaned up technical debt to restore system stability and developer velocity.",
    results: [
      "Eliminated critical database locking issues",
      "Reduced server hosting costs by 30%",
      "Enabled rapid feature development",
    ],
    techStack: ["TypeScript", "Express", "MongoDB", "Redis"],
  },
];

export default function CaseStudiesCard() {
  return (
    <motion.article
      className="w-full lg:w-[960px] xl:w-[1161px] max-w-full rounded-3xl border-8 border-white bg-white shadow-2xl text-slate-800 flex flex-col relative mx-auto overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Header Section */}
      <motion.div
        className="pt-12 md:pt-20 px-6 md:px-12 text-center md:text-left relative z-10 bg-white"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center md:justify-start mb-4">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 mr-3"
            aria-hidden
          >
            <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </span>
          <span className="text-xs sm:text-sm font-medium text-sky-600 tracking-wide">
            Proven Results
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2.5 sm:mb-3">
          Case Studies
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0 mb-8 md:mb-12">
          Real-world examples of how I've helped businesses overcome technical challenges and achieve their goals through robust software engineering.
        </p>
      </motion.div>

      {/* Grid Section */}
      <div className="px-6 md:px-12 pb-12 md:pb-20 relative bg-white z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className="flex flex-col h-full bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-sky-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle gradient hover background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex-1">
                <div className="text-[10px] uppercase font-bold tracking-wider mb-2 text-sky-500">
                  {study.clientType}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-sky-700 transition-colors">
                  {study.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {study.description}
                </p>

                <div className="mb-8">
                  <div className="text-[10px] uppercase font-bold tracking-wider mb-3 text-slate-400">
                    Key Outcomes
                  </div>
                  <ul className="space-y-2">
                    {study.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <svg className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-snug">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies at the bottom */}
              <div className="relative z-10 pt-6 border-t border-slate-200 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {study.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-white text-slate-600 text-xs font-medium rounded-md border border-slate-200 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
