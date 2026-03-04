"use client";

import { motion } from "framer-motion";

export const BuildFromScratchVisual = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Wireframe boxes floating and snapping into a structured layout */}
      <motion.div
        className="w-48 h-48 bg-sky-100/20 border-2 border-sky-400/30 rounded-xl flex flex-wrap gap-2 p-4 content-start"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-full h-10 bg-sky-400/40 rounded-md"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        <motion.div
          className="w-[calc(50%-0.25rem)] h-20 bg-sky-400/20 rounded-md"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
        <motion.div
          className="w-[calc(50%-0.25rem)] h-20 bg-sky-400/20 rounded-md"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />
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
