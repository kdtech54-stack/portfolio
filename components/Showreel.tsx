"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/lib/config";

interface VideoItem {
  id: number;
  title: string;
  client: string;
  category: string;
  views: string;
  duration: string;
}

const videos: VideoItem[] = [
  { id: 1, title: "Neon Nights", client: "Artist Name", category: "Music Video", views: "2.5M", duration: "4:32" },
  { id: 2, title: "Mountain Summit", client: "Adventure Co", category: "Documentary", views: "890K", duration: "28:45" },
  { id: 3, title: "Electric Dreams", client: "TechBrand", category: "Commercial", views: "1.2M", duration: "1:15" },
  { id: 4, title: "Midnight Run", client: "Fashion Nova", category: "Commercial", views: "750K", duration: "2:45" },
  { id: 5, title: "Echoes", client: "Indie Band", category: "Music Video", views: "420K", duration: "3:58" },
  { id: 6, title: "Chef's Table", client: "Food Network", category: "Series", views: "1.8M", duration: "22:30" },
];

export default function Showreel() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section id="showreel" className="py-40 px-6 md:px-12 lg:px-24" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-baseline gap-4">
            <span className="text-sm font-mono text-white/30">02</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight" style={{ color: COLORS.text }}>
              Showreel
            </h2>
          </div>
          <p className="mt-6 text-xl text-white/40 max-w-2xl ml-14">
            A collection of my recent work across music videos, commercials, and documentaries.
          </p>
        </motion.div>

        {/* Main Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video rounded-3xl overflow-hidden mb-12"
          style={{ 
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)"
          }}
        >
          {activeVideo === null ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ 
                    border: `2px solid ${COLORS.accent}`,
                    backgroundColor: `${COLORS.accent}20`
                  }}
                  onClick={() => setActiveVideo(1)}
                >
                  <svg className="w-10 h-10" style={{ color: COLORS.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </motion.div>
                <p className="text-white/50 text-lg font-medium">Watch My Reel</p>
                <p className="text-white/30 text-sm mt-2">Featured work 2023-2024</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-center">
                <p className="text-white/50">Video player - Add showreel.mp4 to public/</p>
                <button 
                  onClick={() => setActiveVideo(null)}
                  className="mt-4 px-6 py-2 rounded-full text-sm"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
                >
                  Back
                </button>
              </div>
            </div>
          )}
          
          {/* Video overlay controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">2024 Showreel</h3>
                <p className="text-white/50 text-sm">Demo Reel • 2:34</p>
              </div>
              <button 
                className="px-6 py-2 rounded-full text-sm font-medium"
                style={{ backgroundColor: COLORS.accent }}
              >
                Play All
              </button>
            </div>
          </div>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div 
                className="relative aspect-video rounded-xl overflow-hidden mb-3"
                style={{ 
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      border: `1px solid ${COLORS.accent}`,
                      backgroundColor: `${COLORS.accent}30`
                    }}
                  >
                    <svg className="w-4 h-4" style={{ color: COLORS.accent }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <span 
                  className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium"
                  style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "white" }}
                >
                  {video.duration}
                </span>
              </div>
              <h4 className="text-sm font-medium text-white group-hover:text-white transition-colors truncate">
                {video.title}
              </h4>
              <p className="text-xs text-white/40 truncate">{video.client}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "10M+", label: "Total Views" },
            { value: "150+", label: "Projects" },
            { value: "8+", label: "Years Experience" },
            { value: "50+", label: "Clients" },
          ].map((stat, i) => (
            <div 
              key={i}
              className="text-center p-6 rounded-2xl"
              style={{ 
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)"
              }}
            >
              <div className="text-3xl md:text-4xl font-bold" style={{ color: COLORS.accent }}>
                {stat.value}
              </div>
              <div className="text-sm text-white/40 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}