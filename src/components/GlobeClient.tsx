"use client";

import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Globe } from './Globe';

interface MapContentProps {
  time: string;
  theme?: string;
}

export const MapContent: React.FC<MapContentProps> = ({ theme }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Globe Layer */}
      <div className="absolute inset-0 z-0">
        {/* Note: In your Globe.tsx, you might want to update the cx/cy 
            coordinates to roughly [19.2183, 72.9781] for Thane/Mumbai */}
        <Globe theme={theme} scale={1.35} />
      </div>

      {/* Subtle legibility gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/90 to-transparent pointer-events-none z-10"></div>

      {/* Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4">
        <div className="flex items-center gap-3">
          {/* Location Icon Box */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-page border border-custom flex items-center justify-center text-main shrink-0 shadow-sm">
            <MapPin size={16} className="sm:w-5 sm:h-5" strokeWidth={1.5} />
          </div>

          {/* Location details */}
          <div className="flex flex-col justify-center">
            <p className="text-[9px] font-bold text-muted uppercase tracking-wider leading-tight mb-0.5">
              Based in
            </p>
            <h3 className="text-sm font-bold text-main leading-tight">
              Mumbai, India
            </h3>
            <p className="text-xs font-mono font-bold text-muted mt-0.5 tabular-nums leading-tight">
              {time.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Kolkata'
              })} IST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};