'use client';

import { createContext, useContext, useState, useEffect, useTransition, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';

const PageLoadingContext = createContext<{ start: () => void }>({ start: () => {} });

export function usePageLoading() {
  return useContext(PageLoadingContext);
}

export function PageLoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      startTransition(() => {
        setLoading(false);
      });
    }
  }, [pathname]);

  return (
    <PageLoadingContext.Provider value={{ start: () => setLoading(true) }}>
      {children}
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
    </PageLoadingContext.Provider>
  );
}