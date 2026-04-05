"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class GlobeErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[Globe Error]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-full flex flex-col justify-end p-3 sm:p-4 bg-card-hover">
          {/* Fallback pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Info bar */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-page border border-custom flex items-center justify-center text-main shrink-0 shadow-sm">
              <MapPin
                size={16}
                className="sm:w-5 sm:h-5"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[0.55rem] font-bold text-muted uppercase tracking-wider leading-tight mb-0.5">
                Based in
              </p>
              <h3 className="text-sm font-bold text-main leading-tight">
                Mumbai, India
              </h3>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}