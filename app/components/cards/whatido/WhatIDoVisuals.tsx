"use client";

import { motion } from "framer-motion";

export const BuildFromScratchVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      {/* Background construction grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-30">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: "linear-gradient(#bae6fd 1px, transparent 1px), linear-gradient(90deg, #bae6fd 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>

      {/* Background AI Automation nodes feeding into the MVP */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_12px_rgba(56,189,248,1)]"
            initial={{ opacity: 0, x: (i % 2 === 0 ? -150 : 150), y: -100 + i * 40 }}
            animate={{
              opacity: [0, 1, 0],
              x: 0,
              y: 0,
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.3 + 1.0,
              ease: "circInOut"
            }}
          />
        ))}
      </div>

      {/* Main MVP Window */}
      <motion.div
        className="relative w-full h-full bg-white/95 backdrop-blur-md border border-sky-200 rounded-2xl flex flex-col p-4 shadow-2xl z-10 overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        style={{ perspective: 1000 }}
      >
        {/* Top Header / Nav Bar */}
        <div className="flex gap-3 items-center mb-4">
          <div className="flex gap-1.5">
            <motion.div className="w-3 h-3 rounded-full bg-red-400" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
            <motion.div className="w-3 h-3 rounded-full bg-amber-400" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} />
            <motion.div className="w-3 h-3 rounded-full bg-green-400" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
          </div>
          <motion.div
            className="flex-1 h-6 bg-slate-100 rounded-md relative overflow-hidden"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-200/40 to-transparent w-1/2"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </motion.div>
          {/* AI Sparkle Icon indicating AI integration */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.2, type: "spring", bounce: 0.6 }}
            className="w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-sky-400 to-sky-500 rounded-lg text-white shadow-md shrink-0 relative"
          >
            <motion.div
              className="absolute inset-0 bg-white rounded-lg opacity-20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 z-10">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="flex gap-4 flex-1 h-full relative">
          {/* Construction scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-sky-400/50 shadow-[0_0_8px_#38bdf8] z-20"
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
          />

          {/* Left Column (Lists/Data/Code) */}
          <motion.div
            className="w-5/12 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-3 p-3 relative overflow-hidden shadow-inner"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
          >
            {/* Animated Code lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div key={i} className="flex gap-2 items-center">
                <motion.div
                  className="h-2 rounded-full bg-sky-200"
                  initial={{ width: 0 }}
                  animate={{ width: `${(i * 17) % 40 + 20}%` }}
                  transition={{ delay: 1.2 + (i * 0.15), duration: 0.5 }}
                />
                <motion.div
                  className="h-2 rounded-full bg-slate-200"
                  initial={{ width: 0 }}
                  animate={{ width: `${(i * 23) % 30 + 10}%` }}
                  transition={{ delay: 1.3 + (i * 0.15), duration: 0.5 }}
                />
              </motion.div>
            ))}

            {/* Simulated building blocks snapping into place */}
            <div className="mt-auto flex flex-col gap-2">
              <motion.div
                className="w-full h-8 bg-white border border-slate-200 shadow-sm rounded-md flex items-center px-2 gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, type: "spring" }}
              >
                <div className="w-4 h-4 rounded bg-indigo-100" />
                <div className="h-2 rounded bg-slate-100 w-16" />
              </motion.div>
              <motion.div
                className="w-full h-8 bg-sky-50 border border-sky-100 shadow-sm rounded-md flex items-center px-2 gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.2, type: "spring" }}
              >
                <div className="w-4 h-4 rounded bg-sky-200" />
                <div className="h-2 rounded bg-sky-100 w-20" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column (Dashboard / Visualization / UI) */}
          <motion.div
            className="flex-1 bg-white border border-slate-100 rounded-xl relative overflow-hidden shadow-sm flex flex-col p-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
          >
            {/* AI processing wave inside the dashboard indicating automation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-sky-100/30 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            />

            <div className="flex justify-between items-center mb-4 relative z-10">
              <motion.div
                className="w-16 h-3 bg-slate-200 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              />
              <motion.div
                className="w-8 h-3 bg-sky-200 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, type: "spring" }}
              />
            </div>

            {/* Dynamic Data Chart Simulation */}
            <div className="flex-1 flex items-end justify-between gap-1.5 relative z-10 pb-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={`bar-${i}`}
                  className="w-full bg-gradient-to-t from-sky-400 to-sky-300 rounded-t-sm"
                  initial={{ height: "0%" }}
                  animate={{ height: ["0%", `${40 + (i * 13 % 50)}%`, `${30 + (i * 17 % 60)}%`] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2 + i * 0.1
                  }}
                />
              ))}
            </div>

            {/* Floating UI Elements appearing */}
            <motion.div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-white/90 backdrop-blur border border-slate-100 shadow-md rounded-lg flex items-center justify-around px-2 z-20"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.5, type: "spring", bounce: 0.5 }}
            >
              <motion.div className="w-5 h-5 rounded-md bg-slate-100" whileHover={{ scale: 1.1 }} />
              <motion.div className="w-6 h-6 rounded-md bg-gradient-to-tr from-sky-400 to-sky-300 shadow-sm flex items-center justify-center" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <div className="w-2 h-2 bg-white rounded-sm" />
              </motion.div>
              <motion.div className="w-5 h-5 rounded-md bg-slate-100" whileHover={{ scale: 1.1 }} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export const FixingProjectsVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      {/* Background scanner grid */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-20">
        <div className="w-full h-full bg-[linear-gradient(rgba(56,189,248,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.5)_1px,transparent_1px)] bg-[size:1rem_1rem]" />
        {/* Sweeping scanner line */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/30 to-sky-400/50 border-b border-sky-400"
          initial={{ y: "-100%" }}
          animate={{ y: "200%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative w-full max-w-sm h-full flex items-center justify-center">
        {/* Chaotic / Tangled state disappearing */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
        >
          <svg className="w-48 h-48 opacity-60" viewBox="0 0 100 100">
            {[...Array(5)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${10 + i * 10} ${80 - i * 10} Q ${30 + (i * 15 % 40)} ${10 + (i * 25 % 80)}, ${90 - i * 5} ${20 + i * 15}`}
                fill="transparent"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            ))}
            {/* Bug nodes */}
            <circle cx={30} cy={40} r={4} fill="#ef4444" className="shadow-[0_0_8px_#ef4444]" />
            <circle cx={70} cy={60} r={3} fill="#ef4444" />
            <circle cx={50} cy={80} r={5} fill="#ef4444" />
          </svg>
        </motion.div>

        {/* Structured / Fixed state appearing */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1, ease: "backOut", repeat: Infinity, repeatDelay: 3 }}
        >
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={`block-${i}`}
                className="w-12 h-16 bg-white border-2 border-sky-300 rounded-lg shadow-lg flex flex-col items-center justify-center gap-2 relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2 + i * 0.2 }}
              >
                <div className="w-6 h-1.5 bg-sky-200 rounded-full" />
                <div className="w-8 h-1.5 bg-sky-100 rounded-full" />
                <motion.div
                  className="absolute -top-2 -right-2 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center shadow-md text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.6 + i * 0.1, type: "spring" }}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Organized connecting lines */}
          <div className="w-32 h-2 flex justify-between">
            <div className="w-0.5 h-8 bg-sky-400/50 mx-auto" />
          </div>
          <div className="w-48 h-12 bg-sky-50 border-2 border-sky-400/50 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-sky-400/20"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <div className="flex gap-2 relative z-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-6 h-2 bg-sky-400 rounded-full shadow-sm" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const CMSVisual = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="flex w-full max-w-[32rem] items-stretch justify-between gap-2 sm:gap-6 relative z-10">
        
        {/* Left: CMS Editor (Backend) */}
        <motion.div 
          className="flex-[0.45] bg-white border-2 border-slate-200 rounded-xl shadow-lg flex flex-col overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="bg-slate-100 px-3 py-2.5 flex items-center gap-2 border-b border-slate-200">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="ml-2 text-[9px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">CMS / Content</div>
          </div>
          
          {/* Body */}
          <div className="p-3 flex flex-col flex-1 relative bg-white">
            {/* Reusable Content Blocks */}
            {[
              { color: "bg-sky-50", borderColor: "#7dd3fc", start: 0.1, ai: false },
              { color: "bg-indigo-50", borderColor: "#818cf8", start: 0.3, ai: true },
              { color: "bg-emerald-50", borderColor: "#34d399", start: 0.5, ai: false },
            ].map((block, i) => (
              <motion.div
                key={`cms-block-${i}`}
                className={`w-full h-10 border-2 rounded-lg flex items-center px-2 relative origin-top ${block.color}`}
                animate={{ 
                  opacity: [0, 0, 1, 1, 0], 
                  scale: [0.9, 0.9, 1, 1, 0.9], 
                  marginBottom: [0, 0, 10, 10, 0],
                  borderColor: ["#e2e8f0", "#e2e8f0", block.borderColor, block.borderColor, "#e2e8f0"],
                  borderStyle: ["dashed", "dashed", "solid", "solid", "dashed"]
                }}
                transition={{ 
                  duration: 8, 
                  times: [0, block.start, block.start + 0.05, 0.85, 0.95], 
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              >
                <div className="w-4 h-4 rounded bg-white/70 mr-2" />
                <div className="flex-1 h-2 rounded-full bg-white/70" />
                
                {/* AI Generation Sparkle */}
                {block.ai && (
                  <motion.div
                    className="absolute -right-2 -top-2 w-6 h-6 bg-gradient-to-tr from-violet-500 to-fuchsia-400 rounded-md shadow-md flex items-center justify-center text-white"
                    animate={{ 
                      scale: [0, 0, 1.2, 1, 1, 0],
                      rotate: [-180, -180, 10, 0, 0, -180]
                    }}
                    transition={{ 
                      duration: 8, 
                      times: [0, block.start + 0.02, block.start + 0.08, block.start + 0.1, 0.85, 0.95], 
                      repeat: Infinity 
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Middle: Decoupled API Flow */}
        <div className="flex-[0.1] flex items-center justify-center relative min-w-[3rem]">
          {/* Dashed connector line */}
          <div className="absolute w-full h-0.5 bg-slate-200" style={{ backgroundImage: "linear-gradient(90deg, #94a3b8 50%, transparent 50%)", backgroundSize: "8px 2px" }} />
          
          {/* Flowing JSON data packets */}
          {[0.12, 0.32, 0.52].map((start, i) => (
            <motion.div
              key={`packet-${i}`}
              className="absolute left-0 w-8 h-5 bg-slate-800 rounded text-[7px] font-mono text-sky-300 flex items-center justify-center shadow-lg border border-slate-600 z-20"
              animate={{ 
                x: ["0%", "0%", "200%", "250%", "250%"], 
                opacity: [0, 1, 1, 0, 0], 
                scale: [0.5, 1, 1, 0.5, 0.5] 
              }}
              transition={{ 
                duration: 8,
                times: [0, start, start + 0.08, start + 0.1, 1],
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {"{ }"}
            </motion.div>
          ))}
          
          <div className="absolute -top-6 text-[10px] font-bold text-sky-500 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full shadow-sm">API</div>
        </div>

        {/* Right: Frontend Website */}
        <motion.div 
          className="flex-[0.45] bg-white border-2 border-slate-200 rounded-xl shadow-lg flex flex-col overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Browser Header */}
          <div className="bg-slate-50 px-3 py-2.5 border-b border-slate-200 flex justify-between items-center">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Live Site</div>
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
            </svg>
          </div>
          
          {/* Rendered Frontend Blocks */}
          <div className="p-3 flex flex-col bg-slate-50 flex-1">
            {[
              { bg: "bg-sky-400", start: 0.2 },
              { bg: "bg-indigo-400", start: 0.4 },
              { bg: "bg-emerald-400", start: 0.6 },
            ].map((block, i) => (
              <motion.div
                key={`front-block-${i}`}
                className="w-full bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden flex flex-col origin-top"
                animate={{ 
                  opacity: [0, 0, 1, 1, 0], 
                  height: [0, 0, 44, 44, 0],
                  marginBottom: [0, 0, 8, 8, 0]
                }}
                transition={{ 
                  duration: 8, 
                  times: [0, block.start, block.start + 0.05, 0.85, 0.95], 
                  repeat: Infinity,
                  ease: "backOut"
                }}
              >
                <div className={`w-full h-1.5 ${block.bg}`} />
                <div className="p-2 flex flex-col gap-1.5">
                  <div className="w-2/3 h-1.5 bg-slate-200 rounded-full" />
                  <div className="w-full h-1.5 bg-slate-100 rounded-full" />
                  <div className="w-5/6 h-1.5 bg-slate-100 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export const ScalingVisual = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      {/* Background Load Balancer concept */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center gap-10 mt-6">

        {/* Main Bottleneck Server (Capsule style) */}
        <div className="relative">
          {/* Pressure Gauge Arc */}
          <div className="absolute -top-[1.125rem] left-1/2 -translate-x-1/2 w-14 h-7 overflow-hidden flex items-end justify-center z-10">
            <svg viewBox="0 0 100 50" className="w-full h-full drop-shadow-sm">
              {/* Background track */}
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />

              {/* Animated Gauge filling up then dropping as scaling kicks in */}
              <motion.path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="url(#speedGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ strokeDasharray: "125", strokeDashoffset: 125 }}
                animate={{ strokeDashoffset: [125, 20, 20, 100, 80, 100] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="speedGradient">
                  <stop offset="0%" stopColor="#4ade80" /> {/* Emerald 400 */}
                  <stop offset="60%" stopColor="#22c55e" /> {/* Emerald 500 */}
                  <stop offset="100%" stopColor="#ef4444" /> {/* Red 500 at the very tip for pressure */}
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* New Capsule Design for main server */}
          <motion.div
            className="w-48 h-16 bg-white rounded-2xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] flex items-center px-4 gap-3 relative z-20"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-4 h-4 rounded-full bg-red-400 shrink-0 shadow-[0_0_10px_rgba(248,113,113,0.5)]"
              animate={{ opacity: [1, 0.4, 1], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="flex-1 h-5 bg-slate-50 rounded-full overflow-hidden relative shadow-inner border border-slate-100">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full"
                animate={{ width: ["90%", "100%", "30%", "40%", "30%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scaling Router lines */}
        <div className="w-80 h-16 relative">
          {/* Central distribution node */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-sky-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)] z-10"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 320 64" preserveAspectRatio="none">
            {/* Smooth bezier curves for distribution */}
            <path d="M 160 0 C 160 32, 40 32, 40 64" fill="none" stroke="#bae6fd" strokeWidth="2.5" strokeDasharray="6 6" />
            <path d="M 160 0 C 160 32, 160 32, 160 64" fill="none" stroke="#bae6fd" strokeWidth="2.5" strokeDasharray="6 6" />
            <path d="M 160 0 C 160 32, 280 32, 280 64" fill="none" stroke="#bae6fd" strokeWidth="2.5" strokeDasharray="6 6" />

            {/* Packets distributing smoothly */}
            {[
              { path: "M 160 0 C 160 32, 40 32, 40 64", delay: 0 },
              { path: "M 160 0 C 160 32, 160 32, 160 64", delay: 0.5 },
              { path: "M 160 0 C 160 32, 280 32, 280 64", delay: 1 },
              { path: "M 160 0 C 160 32, 40 32, 40 64", delay: 1.5 },
              { path: "M 160 0 C 160 32, 160 32, 160 64", delay: 2 },
              { path: "M 160 0 C 160 32, 280 32, 280 64", delay: 2.5 },
            ].map((p, i) => (
              <circle
                key={`packet-${i}`}
                cx={0}
                cy={0}
                r="5"
                fill="#38bdf8"
                style={{ filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.8))' }}
              >
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  path={p.path}
                  begin={`${p.delay}s`}
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.2;0.8;1"
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${p.delay}s`}
                />
              </circle>
            ))}
          </svg>
        </div>

        {/* Distributed Scaled Nodes */}
        <div className="flex gap-8 w-full justify-center mt-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-20 h-20 bg-white border border-slate-100 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 + 0.5 }}
            >
              <div className="flex gap-1.5 items-end h-8">
                <motion.div className="w-2.5 bg-emerald-400 rounded-sm" animate={{ height: [8, 16, 8] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} />
                <motion.div className="w-2.5 bg-emerald-300 rounded-sm" animate={{ height: [12, 24, 12] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 + 0.2 }} />
                <motion.div className="w-2.5 bg-emerald-200 rounded-sm" animate={{ height: [16, 8, 16] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 + 0.4 }} />
              </div>
              <div className="w-10 h-2 bg-slate-100 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DeploymentVisual = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      {/* Background Cloud / Infra grid */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      </div>

      {/* CI/CD Pipeline Flow */}
      <div className="w-full max-w-sm flex items-center justify-between relative z-10 mb-8 px-4">
        {/* Connecting line */}
        <div className="absolute left-10 right-10 h-1 bg-slate-100 rounded-full top-1/2 -translate-y-1/2 z-0" />
        <motion.div
          className="absolute left-10 h-1 bg-sky-400 rounded-full top-1/2 -translate-y-1/2 z-0"
          initial={{ width: "0%" }}
          animate={{ width: "calc(100% - 5rem)" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Pipeline Nodes */}
        {[
          { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", label: "Build", delay: 0 },
          { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Test", delay: 1 },
          { icon: "M5 13l4 4L19 7", label: "Deploy", delay: 2 }
        ].map((node, i) => (
          <div key={i} className="flex flex-col items-center gap-2 relative z-10 bg-white/50 backdrop-blur-sm p-1 rounded-xl">
            <motion.div
              className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 shadow-md flex items-center justify-center text-slate-400"
              animate={{
                borderColor: ["#e2e8f0", "#38bdf8", "#e2e8f0"],
                color: ["#94a3b8", "#38bdf8", "#94a3b8"],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: node.delay }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={node.icon} />
              </svg>
            </motion.div>
            <span className="text-xs font-semibold text-slate-500">{node.label}</span>
          </div>
        ))}
      </div>

      {/* Production Cloud Environment (Zero Downtime) */}
      <div className="w-full max-w-sm flex items-center justify-between relative z-10 px-6">
        {/* Blue Server */}
        <motion.div
          className="w-24 h-24 bg-white border-2 border-sky-200 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 relative overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-sky-50/50" />
          <svg className="w-8 h-8 text-sky-400 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2m-2-4h.01M17 16h.01" />
          </svg>
          <div className="text-xs font-bold text-sky-500 z-10">V1 (Blue)</div>
        </motion.div>

        {/* Load Balancer / Switcher */}
        <div className="flex flex-col items-center relative z-20">
          <motion.div
            className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-sky-500 rounded-full shadow-lg flex items-center justify-center text-white"
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute top-12 whitespace-nowrap text-[10px] font-bold bg-green-100 border border-green-200 text-green-600 px-2 py-0.5 rounded-full shadow-sm"
            animate={{ opacity: [0, 1, 0], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            Zero Downtime
          </motion.div>
        </div>

        {/* Green Server */}
        <motion.div
          className="w-24 h-24 bg-white border-2 border-emerald-200 rounded-xl shadow-lg flex flex-col items-center justify-center gap-2 relative overflow-hidden"
          initial={{ opacity: 0.5, scale: 0.95 }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1, 0.95] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <motion.div
            className="absolute inset-0 bg-emerald-50/50"
            animate={{ y: ["100%", "0%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <svg className="w-8 h-8 text-emerald-500 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
          <div className="text-xs font-bold text-emerald-600 z-10">V2 (Green)</div>
        </motion.div>
      </div>
    </div>
  );
};
