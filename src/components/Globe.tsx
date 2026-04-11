"use client";

import React, { useEffect, useRef, useState } from 'react';
import createGlobe, { COBEOptions } from 'cobe';

interface GlobeMarker {
  location: [number, number];
  size: number;
}

type CobeState = Parameters<NonNullable<COBEOptions["onRender"]>>[0];

type GlobeRenderState = CobeState & {
  phi: number;
  width: number;
  height: number;
  markers: GlobeMarker[];
};

interface GlobeProps {
  theme?: string;
  scale?: number;
}

// Detect mobile once at module level — avoids repeated checks
const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

export const Globe: React.FC<GlobeProps> = ({ theme, scale = 1.2 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phiRef = useRef(4.7);
  const sizeRef = useRef(0);
  const themeRef = useRef(theme);
  const globeRef = useRef<{ destroy: () => void } | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const initGlobe = (size: number) => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }

      if (!canvasRef.current || size <= 0) return;

      const dpr = window.devicePixelRatio || 2;
      const px = size * dpr;

      const globeConfig: COBEOptions = {
        devicePixelRatio: dpr,
        width: px,
        height: px,
        phi: phiRef.current,
        theta: 0.25,
        dark: 1,
        diffuse: 1.2,
        // Lower quality on mobile — 4x fewer samples, much faster init
        mapSamples: isMobile ? 4000 : 16000,
        mapBrightness: 6,
        baseColor: [0.15, 0.15, 0.15],
        markerColor: [1, 1, 1],
        glowColor: [0.15, 0.15, 0.15],
        opacity: 1,
        markers: [],
        onRender: (state) => {
          const globeState = state as GlobeRenderState;

          const isDark = themeRef.current !== 'light';
          globeState.dark = isDark ? 1 : 0;
          globeState.mapBrightness = isDark ? 6 : 10;
          globeState.baseColor = isDark ? [0.15, 0.15, 0.15] : [1, 1, 1];
          globeState.markerColor = isDark ? [1, 1, 1] : [0.1, 0.1, 0.1];
          globeState.glowColor = isDark ? [0.15, 0.15, 0.15] : [0.9, 0.9, 0.9];

          const currentSize = sizeRef.current;
          if (currentSize > 0) {
            const currentPx = currentSize * dpr;
            globeState.width = currentPx;
            globeState.height = currentPx;
          }

          // Slower rotation on mobile to reduce CPU usage
          const rotationSpeed = isMobile ? 0.002 : 0.003;
          globeState.phi = phiRef.current + rotationSpeed;
          phiRef.current = globeState.phi;

          // Mumbai ripple — skip on mobile to save CPU
          if (!isMobile) {
            const cx = 19.0760;
            const cy = 72.8777;
            const now = Date.now();
            const progress = (now % 2000) / 2000;

            const lat1Rad = cx * Math.PI / 180;
            const lon1Rad = cy * Math.PI / 180;
            const sinLat1 = Math.sin(lat1Rad);
            const cosLat1 = Math.cos(lat1Rad);

            const markers: GlobeMarker[] = [{ location: [cx, cy], size: 0.06 }];
            const rippleConfigs = [{ maxScale: 24 }, { maxScale: 10 }];

            rippleConfigs.forEach(config => {
              const currentRadius = progress * config.maxScale;
              const opacity = 1 - progress;
              if (currentRadius > 0.2 && opacity > 0.01) {
                const dRad = currentRadius * Math.PI / 180;
                const sinD = Math.sin(dRad);
                const cosD = Math.cos(dRad);
                for (let i = 0; i < 40; i++) {
                  const bearing = (i / 40) * 2 * Math.PI;
                  const lat2Rad = Math.asin(
                    sinLat1 * cosD + cosLat1 * sinD * Math.cos(bearing)
                  );
                  const lon2Rad = lon1Rad + Math.atan2(
                    Math.sin(bearing) * sinD * cosLat1,
                    cosD - sinLat1 * Math.sin(lat2Rad)
                  );
                  let lon2 = lon2Rad * 180 / Math.PI;
                  if (lon2 < -180) lon2 += 360;
                  if (lon2 > 180) lon2 -= 360;
                  markers.push({
                    location: [lat2Rad * 180 / Math.PI, lon2],
                    size: 0.03 * opacity,
                  });
                }
              }
            });

            globeState.markers = markers;
          } else {
            // Just show the Mumbai dot on mobile — no ripple
            globeState.markers = [{ location: [19.0760, 72.8777], size: 0.06 }];
          }
        },
      };

      globeRef.current = createGlobe(canvasRef.current, globeConfig);
    };

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      const size = Math.min(width, height);
      if (size > 0 && Math.abs(size - sizeRef.current) > 4) {
        sizeRef.current = size;
        initGlobe(size);
      }
    });

    observer.observe(containerRef.current);

    const { offsetWidth, offsetHeight } = containerRef.current;
    const immediateSize = Math.min(offsetWidth, offsetHeight);
    if (immediateSize > 0) {
      sizeRef.current = immediateSize;
      initGlobe(immediateSize);
    }

    return () => {
      observer.disconnect();
      globeRef.current?.destroy();
      globeRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden"
    >
      <div
        className="relative flex items-center justify-center h-full aspect-square"
        style={{ height: '100%', aspectRatio: '1' }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full transition-opacity duration-500 ease-out"
          style={{
            transform: `scale(${scale})`,
            opacity: isReady ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
};