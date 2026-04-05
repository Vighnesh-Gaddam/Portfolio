// src/app/projects/error.tsx
'use client';
import { ErrorState } from '@/components/ErrorState';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorState title="Failed to load projects" message="Something went wrong loading the projects page." showReset={true} onReset={reset} />;
}