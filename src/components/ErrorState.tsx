'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Home, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

interface ErrorStateProps {
  title: string;
  message: string;
  showReset?: boolean;
  onReset?: () => void;
}

export const ErrorState = ({ title, message, showReset, onReset }: ErrorStateProps) => {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-6 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="p-8 sm:p-10 rounded-[32px] bg-card border border-custom shadow-2xl text-center">
          <div className="w-20 h-20 bg-primary/5 border border-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8">
            <AlertCircle size={40} strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl font-black text-main mb-4 tracking-tight">
            {title}
          </h1>
          
          <p className="text-text-muted mb-10 leading-relaxed font-medium">
            {message}
          </p>

          <div className="flex flex-col gap-3">
            {showReset && onReset && (
              <button
                onClick={onReset}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
              >
                <RefreshCcw size={18} />
                Try Again
              </button>
            )}
            
            <Link 
              href="/"
              className="w-full py-4 bg-card-hover border border-custom text-main rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-card transition-all active:scale-[0.98]"
            >
              <Home size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};