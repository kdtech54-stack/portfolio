"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/config";

interface Project {
  title: string;
  client: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  duration: string;
}

const projects: Project[] = [
  {
    title: "Neon Dreams",
    client: "Artist Name",
    category: "Music Video",
    description: "A cyberpunk-inspired music video with VFX shots, motion graphics overlays, and automated color grading.",
    tags: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    year: "2024",
    duration: "4:32",
  },
  {
    title: "Mountain Soul",
    client: "Adventure Co.",
    category: "Documentary",
    description: "A 30-minute documentary following a team's summit attempt with award-winning cinematography.",
    tags: ["DaVinci Resolve", "Color Grading", "Sound Design"],
    year: "2024",
    duration: "28:45",
  },
  {
    title: "Electric Pulse",
    client: "TechBrand Inc.",
    category: "Commercial",
    description: "High-energy product launch video with motion graphics and kinetic typography.",
    tags: ["After Effects", "Mocha", "Cinema 4D"],
    year: "2023",
    duration: "1:15",
  },
  {
    title: "Midnight Run",
    client: "Fashion Nova",
    category: "Commercial",
    description: "Runway collection reveal with sync-to-beat transitions and VFX overlays.",
    tags: ["Premiere Pro", "Speed Ramping", "VFX"],
    year: "2023",
    duration: "2:45",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Projects() {
  return (
    <section 
      className="relative py-40 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-baseline gap-4">
            <span className="text-sm font-mono text-white/30">01</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight" style={{ color: COLORS.text }}>
              Selected Work
            </h2>
          </div>
          <p className="mt-6 text-xl text-white/40 max-w-2xl ml-14">
            A curation of projects crafted with precision and creative vision.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-0 md:ml-14"
        >
          {projects.map((project, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ 
                backgroundColor: COLORS.glass,
                border: "1px solid rgba(255,255,255,0.06)"
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124, 58, 237, 0.1), transparent 40%)`
                }}
              />

              <div className="relative z-10 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-white/30">{project.year}</span>
                    <span className="w-px h-4 bg-white/10" />
                    <span className="text-xs text-white/40">{project.category}</span>
                  </div>
                  <span className="text-xs font-mono text-white/30">{project.duration}</span>
                </div>

                <h3 
                  className="text-2xl font-semibold tracking-tight mb-2 group-hover:text-white transition-colors"
                  style={{ color: COLORS.text }}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-white/50 mb-6">{project.client}</p>

                <p className="text-sm text-white/40 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1.5 text-xs font-medium rounded-full"
                      style={{ 
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.5)"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 right-0 h-px origin-left"
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.accent}, transparent)` 
                }}
              />
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <button
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full"
            style={{ 
              border: "1px solid rgba(255,255,255,0.15)", 
              color: "rgba(255,255,255,0.7)" 
            }}
          >
            <span className="text-sm tracking-wider">View All Projects</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}