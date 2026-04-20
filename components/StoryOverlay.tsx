"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { COLORS } from "@/lib/config";

export default function StoryOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: KARTIK (0 – 0.18)
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.13, 0.18], [1, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.18], [0, -50]);

  // Section 2: Craft stories (0.22 – 0.42)
  const opacity2 = useTransform(scrollYProgress, [0.18, 0.25, 0.35, 0.42], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.18, 0.42], [-50, 0]);

  // Section 3: Design meets storytelling (0.45 – 0.62)
  const opacity3 = useTransform(scrollYProgress, [0.42, 0.48, 0.56, 0.62], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.42, 0.62], [50, 0]);

  // Section 4: Masterpieces (0.68 – 0.88)
  const opacity4 = useTransform(scrollYProgress, [0.65, 0.72, 0.82, 0.88], [0, 1, 1, 0]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10"
    >
      {/* Section 1: KARTIK — center */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 text-center"
      >
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white">
          KARTIK
        </h1>
        <p className="text-base md:text-xl lg:text-2xl font-light tracking-[0.3em] md:tracking-[0.4em] mt-4 md:mt-6 text-white/60">
          VIDEO EDITOR
        </p>
        <div className="absolute bottom-12 md:bottom-16 flex flex-col items-center gap-3 md:gap-4">
          <span className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-white/30 uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 md:h-12 bg-gradient-to-b from-white/40 to-transparent"
          />
        </div>
      </motion.div>

      {/* Section 2: Craft stories — left aligned */}
      <motion.div
        style={{ opacity: opacity2, x: x2 }}
        className="sticky top-0 h-screen flex items-center justify-start px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-xs sm:max-w-sm">
          <span className="text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] text-white/25 mb-4 md:mb-6 block uppercase">
            What I do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
            I craft immersive<br />visual stories.
          </h2>
          <p className="mt-4 md:mt-6 text-sm md:text-lg text-white/40 max-w-xs md:max-w-sm">
            Transforming raw footage into compelling narratives
            that captivate audiences and bring stories to life.
          </p>
        </div>
      </motion.div>

      {/* Section 3: Design meets storytelling — right aligned */}
      <motion.div
        style={{ opacity: opacity3, x: x3 }}
        className="sticky top-0 h-screen flex items-center justify-end px-6 md:px-16 lg:px-24 text-right"
      >
        <div className="max-w-xs sm:max-w-sm text-right">
          <span className="text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] text-white/25 mb-4 md:mb-6 block uppercase">
            Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
            Where design<br />meets storytelling.
          </h2>
          <p className="mt-4 md:mt-6 text-sm md:text-lg text-white/40 max-w-xs md:max-w-sm text-right">
            Using industry-standard tools to deliver broadcast-quality
            content that stands out.
          </p>
        </div>
      </motion.div>

      {/* Section 4: Masterpieces — center */}
      <motion.div
        style={{ opacity: opacity4 }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center px-4"
      >
        <span className="text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] text-white/25 uppercase">
          The result
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-4 md:mt-6 tracking-wider text-white">
          Masterpieces
        </h2>
      </motion.div>
    </div>
  );
}