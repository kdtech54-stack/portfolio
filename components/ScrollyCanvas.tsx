"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { FRAME_COUNT, SCROLL_HEIGHT_MULTIPLIER, FRAME_PATH, FRAME_DELAY, FRAME_EXTENSION, FRAME_PADDING, COLORS } from "@/lib/config";

function getFrameUrl(index: number): string {
  const paddedIndex = String(index).padStart(FRAME_PADDING, "0");
  return `${FRAME_PATH}${paddedIndex}${FRAME_DELAY}${FRAME_EXTENSION}`;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadedImagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const bgColor = useTransform(() => COLORS.background);

  // Preload images
  useEffect(() => {
    let mounted = true;
    
    const preload = async () => {
      const images: HTMLImageElement[] = [];
      let loaded = 0;

      for (let i = 0; i < FRAME_COUNT; i++) {
        if (!mounted) return;
        
        const img = new Image();
        img.src = getFrameUrl(i);
        
        await new Promise<void>((resolve) => {
          img.onload = () => {
            loaded++;
            setLoadedCount(loaded);
            resolve();
          };
          img.onerror = () => {
            loaded++;
            setLoadedCount(loaded);
            resolve();
          };
        });
        
        images.push(img);
      }

      if (mounted) {
        loadedImagesRef.current = images;
        setIsLoaded(true);
      }
    };

    preload();

    return () => {
      mounted = false;
    };
  }, []);

  // Draw frame when scroll changes
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest: number) => {
      const idx = Math.floor(latest * (FRAME_COUNT - 1));
      const canvas = canvasRef.current;
      const img = loadedImagesRef.current[idx];

      if (!canvas || !img) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Object-fit: cover logic
      const canvasW = rect.width;
      const canvasH = rect.height;
      const imgW = img.naturalWidth || 1920;
      const imgH = img.naturalHeight || 1080;
      const imgRatio = imgW / imgH;
      const canvasRatio = canvasW / canvasH;

      let sw: number, sh: number, sx: number, sy: number;

      if (imgRatio > canvasRatio) {
        sh = canvasH;
        sw = sh * imgRatio;
        sx = (canvasW - sw) / 2;
        sy = 0;
      } else {
        sw = canvasW;
        sh = sw / imgRatio;
        sx = 0;
        sy = (canvasH - sh) / 2;
      }

      ctx.clearRect(0, 0, canvasW, canvasH);
      ctx.drawImage(img, sx, sy, sw, sh);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Initial draw when loaded
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const img = loadedImagesRef.current[0];
    if (img) {
      const canvasW = rect.width;
      const canvasH = rect.height;
      const imgW = img.naturalWidth || 1920;
      const imgH = img.naturalHeight || 1080;
      const imgRatio = imgW / imgH;
      const canvasRatio = canvasW / canvasH;

      let sw: number, sh: number, sx: number, sy: number;

      if (imgRatio > canvasRatio) {
        sh = canvasH;
        sw = sh * imgRatio;
        sx = (canvasW - sw) / 2;
        sy = 0;
      } else {
        sw = canvasW;
        sh = sw / imgRatio;
        sx = 0;
        sy = (canvasH - sh) / 2;
      }

      ctx.clearRect(0, 0, canvasW, canvasH);
      ctx.drawImage(img, sx, sy, sw, sh);
    }
  }, [isLoaded]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const img = loadedImagesRef.current[frameIndex.get()];
      if (img) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          const canvasW = rect.width;
          const canvasH = rect.height;
          const imgW = img.naturalWidth || 1920;
          const imgH = img.naturalHeight || 1080;
          const imgRatio = imgW / imgH;
          const canvasRatio = canvasW / canvasH;

          let sw: number, sh: number, sx: number, sy: number;

          if (imgRatio > canvasRatio) {
            sh = canvasH;
            sw = sh * imgRatio;
            sx = (canvasW - sw) / 2;
            sy = 0;
          } else {
            sw = canvasW;
            sh = sw / imgRatio;
            sx = 0;
            sy = (canvasH - sh) / 2;
          }

          ctx.clearRect(0, 0, canvasW, canvasH);
          ctx.drawImage(img, sx, sy, sw, sh);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [frameIndex]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${SCROLL_HEIGHT_MULTIPLIER}vh` }}
    >
      <motion.div
        className="fixed inset-0 -z-10"
        style={{ backgroundColor: bgColor }}
      />
      
      <div className="sticky top-0 left-0 right-0 bottom-0 h-screen w-full">
        {!isLoaded && (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: COLORS.background }}
          >
            <div className="flex flex-col items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full border-2 border-white/10 animate-spin"
                style={{ borderTopColor: COLORS.accent }}
              />
              <span className="text-xs text-white/30 tracking-widest">
                LOADING {loadedCount}/{FRAME_COUNT}
              </span>
            </div>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full ${isLoaded ? "block" : "hidden"}`}
        />
      </div>
    </div>
  );
}