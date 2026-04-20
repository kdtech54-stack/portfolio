"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "@/lib/config";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#showreel", label: "Showreel" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-12 md:py-6" style={{ backgroundColor: COLORS.background + "e6" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: COLORS.accent }}
          />
          <span className="text-sm font-medium tracking-wider" style={{ color: COLORS.text }}>
            KARTIK
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full text-xs tracking-wider uppercase"
            style={{ 
              backgroundColor: COLORS.accent,
              color: "white"
            }}
          >
            Let's Talk
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center"
        >
          <div className="flex flex-col gap-1.5 w-5">
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
              className="block h-px bg-white"
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="block h-px bg-white"
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
              className="block h-px bg-white"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 p-6"
            style={{ backgroundColor: COLORS.background }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-lg text-white/60 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}