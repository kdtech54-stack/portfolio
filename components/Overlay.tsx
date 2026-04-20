"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface TextSectionProps {
  children: React.ReactNode;
  scrollProgress: MotionValue<number>;
  start: number;
  end: number;
  alignment?: "center" | "left" | "right";
  yParallax?: number;
}

function TextSection({
  children,
  scrollProgress,
  start,
  end,
  alignment = "center",
  yParallax = 0,
}: TextSectionProps) {
  const opacity = useTransform(scrollProgress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [start, end], [yParallax, -yParallax]);
  const scale = useTransform(scrollProgress, [start, start + 0.05, end - 0.05, end], [0.9, 1, 1, 0.9]);

  const alignmentClasses = {
    center: "items-center justify-center text-center",
    left: "items-center justify-start text-left pl-8 md:pl-20",
    right: "items-center justify-end text-right pr-8 md:pr-20",
  };

  return (
    <motion.div
      className={`absolute inset-0 flex ${alignmentClasses[alignment]} px-6 pointer-events-none`}
      style={{ opacity, y, scale }}
    >
      <div className="max-w-4xl">{children}</div>
    </motion.div>
  );
}

function AnimatedText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.4, 0.4, 0]);
  const blurIntensity = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none sticky top-0 h-screen w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
        style={{ opacity: bgOpacity }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ filter: blurIntensity, opacity: useTransform(scrollYProgress, [0, 0.1], [0.5, 0]) }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      </motion.div>

      <TextSection
        scrollProgress={scrollYProgress}
        start={0}
        end={0.18}
        alignment="center"
        yParallax={50}
      >
        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />
          <AnimatedText
            text="KARTIK SHARMA"
            className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-[0.2em] bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent"
            delay={0.1}
          />
          <AnimatedText
            text="VIDEO EDITOR"
            className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.5em] text-red-400/80 mt-4"
            delay={0.5}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>
      </TextSection>

      <TextSection
        scrollProgress={scrollYProgress}
        start={0.22}
        end={0.42}
        alignment="left"
        yParallax={60}
      >
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            className="block text-sm tracking-[0.4em] text-white/30 mb-6 uppercase"
          >
            What I do
          </motion.span>
          <AnimatedText
            text="Crafting stories"
            className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight"
            delay={0}
          />
          <AnimatedText
            text="frame by frame."
            className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-white/70"
            delay={0.3}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            className="mt-8 text-lg text-white/40 max-w-md leading-relaxed"
          >
            Professional video editing for commercials, music videos,
            documentaries, and brand content. Transforming raw footage
            into compelling visual narratives.
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />
      </TextSection>

      <TextSection
        scrollProgress={scrollYProgress}
        start={0.52}
        end={0.72}
        alignment="right"
        yParallax={60}
      >
        <div className="relative text-right">
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            className="block text-sm tracking-[0.4em] text-white/30 mb-6 uppercase"
          >
            Tools of trade
          </motion.span>
          <AnimatedText
            text="Premiere Pro"
            className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight"
            delay={0}
          />
          <AnimatedText
            text="After Effects."
            className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-white/70"
            delay={0.3}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            className="mt-8 text-lg text-white/40 max-w-md ml-auto leading-relaxed"
          >
            Expert in Adobe Creative Suite, DaVinci Resolve,
            and color grading. Delivering broadcast-quality
            edits with precision and style.
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          className="absolute -right-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
        />
      </TextSection>

      <TextSection
        scrollProgress={scrollYProgress}
        start={0.82}
        end={0.98}
        alignment="center"
        yParallax={30}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          className="text-center"
        >
          <span className="text-sm tracking-[0.5em] text-white/30 uppercase">
            Let&apos;s create your next
          </span>
          <div className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 tracking-wider">
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Masterpiece
            </span>
          </div>
        </motion.div>
      </TextSection>
    </div>
  );
}