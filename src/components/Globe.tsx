"use client";

import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

interface GlobeProps {
    theme?: string;
    scale?: number;
}

export const Globe: React.FC<GlobeProps> = ({ theme, scale = 1.2 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const phiRef = useRef(4.7);
    const sizeRef = useRef(0); // Tracks dimensions for responsiveness
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const showTimer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(showTimer);
    }, []);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        // 1. Initial size setup
        const updateSize = () => {
            if (containerRef.current) {
                sizeRef.current = containerRef.current.offsetHeight;
            }
        };
        updateSize();

        window.addEventListener('resize', updateSize);

        const isDark = theme !== 'light';

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: sizeRef.current * 2 || 400,
            height: sizeRef.current * 2 || 400,
            phi: phiRef.current,
            theta: 0.25,
            dark: isDark ? 1 : 0,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: isDark ? 6 : 10,
            baseColor: isDark ? [0.15, 0.15, 0.15] : [1, 1, 1],
            markerColor: isDark ? [1, 1, 1] : [0.1, 0.1, 0.1],
            glowColor: isDark ? [0.15, 0.15, 0.15] : [0.9, 0.9, 0.9],
            opacity: 1,
            markers: [],
            onRender: (state: any) => {
                // 2. Critical for responsiveness: Update canvas state internal dimensions
                if (sizeRef.current > 0) {
                    state.width = sizeRef.current * 2;
                    state.height = sizeRef.current * 2;
                }

                state.phi = phiRef.current + 0.003;
                phiRef.current = state.phi;

                // Mumbai Coordinates
                const cx = 19.0760;
                const cy = 72.8777;

                const now = Date.now();
                const progress = (now % 3000) / 3000;

                const lat1Rad = cx * Math.PI / 180;
                const lon1Rad = cy * Math.PI / 180;
                const sinLat1 = Math.sin(lat1Rad);
                const cosLat1 = Math.cos(lat1Rad);

                const markers: any[] = [{ location: [cx, cy], size: 0.06 }];
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
                            const lat2Rad = Math.asin(sinLat1 * cosD + cosLat1 * sinD * Math.cos(bearing));
                            const lon2Rad = lon1Rad + Math.atan2(Math.sin(bearing) * sinD * cosLat1, cosD - sinLat1 * Math.sin(lat2Rad));
                            
                            let lon2 = lon2Rad * 180 / Math.PI;
                            if (lon2 < -180) lon2 += 360;
                            if (lon2 > 180) lon2 -= 360;

                            markers.push({
                                location: [lat2Rad * 180 / Math.PI, lon2],
                                size: 0.03 * opacity
                            });
                        }
                    }
                });
                state.markers = markers;
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', updateSize);
        };
    }, [theme]); // Re-init only when theme changes

    return (
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
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