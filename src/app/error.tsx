'use client';

import { ErrorState } from '@/components/ErrorState';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorState 
      title="System Error"
      message="Something went wrong internally. Our team of bots has been notified."
      showReset={true}
      onReset={reset}
    />
  );
}