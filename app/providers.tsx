'use client';

import { createContext, useState } from "react";

export const BackgroundContext = createContext<{
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
}>({
  isLoaded: false,
  setIsLoaded: () => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <BackgroundContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </BackgroundContext.Provider>
  );
} 