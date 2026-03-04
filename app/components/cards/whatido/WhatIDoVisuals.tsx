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
                  animate={{ width: `${Math.random() * 40 + 20}%` }}
                  transition={{ delay: 1.2 + (i * 0.15), duration: 0.5 }}
                />
                <motion.div 
                  className="h-2 rounded-full bg-slate-200" 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.random() * 30 + 10}%` }}
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
                  animate={{ height: ["0%", `${40 + Math.random() * 50}%`, `${30 + Math.random() * 60}%`] }}
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
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Chaotic lines turning organized */}
      <svg className="w-48 h-48" viewBox="0 0 100 100">
        <motion.path
          d="M10 50 Q 30 10, 50 50 T 90 50"
          fill="transparent"
          stroke="url(#grad1)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M10 70 Q 40 90, 60 40 T 90 70"
          fill="transparent"
          stroke="url(#grad2)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>
      {/* Overlaying a structured grid fading in */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="w-32 h-2 bg-sky-400/40 rounded-full" />
        <div className="w-32 h-2 bg-sky-400/40 rounded-full" />
        <div className="w-32 h-2 bg-sky-400/40 rounded-full" />
      </motion.div>
    </div>
  );
};

export const CMSVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-48 h-48 border-2 border-dashed border-sky-200 rounded-xl p-2 flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-full h-12 bg-gradient-to-r from-sky-400/20 to-sky-300/10 rounded-lg border border-sky-100"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
          />
        ))}
        {/* Floating element entering from side */}
        <motion.div
          className="absolute -right-6 top-1/2 w-12 h-12 bg-sky-500 rounded-lg shadow-lg flex items-center justify-center text-white font-bold"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
        >
          +
        </motion.div>
      </div>
    </div>
  );
};

export const ScalingVisual = () => {
  return (
    <div className="relative w-full h-full flex items-end justify-center pb-12 gap-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="w-6 bg-gradient-to-t from-sky-500 to-sky-300 rounded-t-md"
          initial={{ height: 0 }}
          animate={{ height: i * 20 + 20 }}
          transition={{
            delay: i * 0.1,
            type: "spring",
            stiffness: 150,
            damping: 10,
          }}
        />
      ))}
      <motion.svg
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-16 overflow-visible"
        viewBox="0 0 100 50"
      >
        <motion.path
          d="M0 40 Q 25 30, 50 20 T 100 0"
          fill="transparent"
          stroke="#0ea5e9"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        />
        <motion.circle
          cx="100"
          cy="0"
          r="4"
          fill="#0ea5e9"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, type: "spring" }}
        />
      </motion.svg>
    </div>
  );
};

export const DeploymentVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative flex items-center justify-center w-24 h-24 bg-sky-100 rounded-2xl shadow-inner z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg className="w-10 h-10 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      </motion.div>

      {/* Pulsing nodes */}
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-sky-400 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            marginTop: "-6px",
            marginLeft: "-6px",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 1],
            x: Math.cos((angle * Math.PI) / 180) * 60,
            y: Math.sin((angle * Math.PI) / 180) * 60,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <motion.circle
          cx="50%"
          cy="50%"
          r="60"
          fill="none"
          stroke="#bae6fd"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
};
