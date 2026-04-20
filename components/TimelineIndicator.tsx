"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { COLORS, FRAME_COUNT } from "@/lib/config";

export default function TimelineIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const currentFrame = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div 
      ref={containerRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3"
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        className="w-px h-32 md:h-48 relative"
      >
        <div 
          className="absolute inset-0 rounded-full"
          style={{ 
            background: `linear-gradient(to bottom, transparent, ${COLORS.accent}, ${COLORS.accent}, transparent)`,
            boxShadow: `0 0 10px ${COLORS.accent}, 0 0 20px ${COLORS.accent}80`
          }}
        />
        <motion.div
          style={{ height: progressWidth }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-transparent via-accent to-transparent rounded-full"
        />
      </motion.div>

      <motion.div
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }}
        className="flex flex-col items-center gap-1"
      >
        <span 
          className="text-xs font-mono tabular-nums"
          style={{ color: COLORS.accent }}
        >
          {Math.round(FRAME_COUNT * 0.1)}f
        </span>
        <span className="text-[10px] text-white/20 uppercase tracking-wider">frame</span>
      </motion.div>

      <motion.div
        style={{
          height: useTransform(scrollYProgress, [0, 1], ["100%", "0%"]),
          opacity: glowOpacity,
          backgroundColor: COLORS.accent,
          boxShadow: `0 0 10px ${COLORS.accent}`
        }}
        className="w-1.5 h-1.5 rounded-full"
      />

      <motion.div
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 0])
        }}
        className="flex flex-col items-center gap-1"
      >
        <span 
          className="text-xs font-mono tabular-nums"
          style={{ color: COLORS.accent }}
        >
          {Math.round(FRAME_COUNT * 0.9)}f
        </span>
        <span className="text-[10px] text-white/20 uppercase tracking-wider">end</span>
      </motion.div>
    </div>
  );
}