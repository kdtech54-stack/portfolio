"use client";

import { motion } from "framer-motion";
import { ScrollyCanvas, StoryOverlay, Projects, Navbar, FilmOverlay } from "@/components";
import Showreel from "@/components/Showreel";

export default function Home() {
  return (
    <main className="relative" style={{ backgroundColor: "#0b0b0f" }}>
      <Navbar />
      <FilmOverlay />
      
      <div className="relative">
        <ScrollyCanvas />
        <StoryOverlay />
      </div>

      <div id="work">
        <Projects />
      </div>

      <Showreel />

      <section id="about" className="py-40 px-6 md:px-12 lg:px-24" style={{ backgroundColor: "#0b0b0f" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="text-sm font-mono text-white/30">03</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mt-6 mb-8 tracking-tight" style={{ color: "#f5f5f5" }}>
                About
              </h2>
              <div className="space-y-6 text-lg text-white/50 leading-relaxed">
                <p>
                  I'm a professional video editor with 8+ years of experience transforming raw footage 
                  into compelling visual stories that captivate audiences.
                </p>
                <p>
                  From music videos to commercials, documentaries to brand content — every project 
                  is an opportunity to craft something extraordinary. I believe in the power 
                  of emotional storytelling through carefully crafted edits.
                </p>
                <p>
                  My work has accumulated over 10 million views across platforms, with 
                  features on major networks and recognition at international film festivals.
                </p>
              </div>

              {/* Skills */}
              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  "Adobe Premiere Pro",
                  "After Effects",
                  "DaVinci Resolve",
                  "Color Grading",
                  "VFX",
                  "Sound Design",
                  "Motion Graphics",
                  "Storytelling"
                ].map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-sm font-medium rounded-full"
                    style={{ 
                      backgroundColor: "rgba(124, 58, 237, 0.1)",
                      border: "1px solid rgba(124, 58, 237, 0.2)",
                      color: "#a78bfa"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(124, 58, 237, 0.2), transparent 60%)"
                }}
              />
              <div 
                className="relative h-full min-h-[400px] rounded-3xl p-8 flex flex-col justify-center"
                style={{ 
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { value: "150+", label: "Projects Completed" },
                    { value: "10M+", label: "Total Views" },
                    { value: "8+", label: "Years Experience" },
                    { value: "50+", label: "Happy Clients" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center"
                    >
                      <div 
                        className="text-4xl md:text-5xl font-bold"
                        style={{ color: "#7c3aed" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/40 mt-2">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-40 px-6 md:px-12 lg:px-24 relative overflow-hidden" style={{ backgroundColor: "#0b0b0f" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-[600px] h-[600px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent 70%)" }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-sm font-mono text-white/30">04</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light mt-6 mb-8 tracking-tight" style={{ color: "#f5f5f5" }}>
            Let's Create
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto mb-12">
            Have a video project in mind? Let's discuss how we can bring your vision to life.
            I'm available for freelance work and collaborations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@example.com"
              className="px-10 py-5 rounded-full font-medium text-lg"
              style={{ backgroundColor: "#f5f5f5", color: "#0b0b0f" }}
            >
              Get in Touch
            </a>
            <a
              href="#work"
              className="px-10 py-5 rounded-full font-medium text-lg"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#f5f5f5" }}
            >
              View My Work
            </a>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 md:px-12 lg:px-24" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#7c3aed" }} />
            <span className="text-sm font-medium tracking-wider" style={{ color: "#f5f5f5" }}>KARTIK</span>
          </div>
          <p className="text-sm text-white/30">© 2024 Crafted with precision.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">YouTube</a>
            <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}