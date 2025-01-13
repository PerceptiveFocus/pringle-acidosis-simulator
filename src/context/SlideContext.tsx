import { createContext, useContext, useState, ReactNode } from 'react';

interface SlideContextType {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  leverPosition: number;
  setLeverPosition: (position: number) => void;
}

const SlideContext = createContext<SlideContextType | undefined>(undefined);

export function SlideProvider({ children }: { children: ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [leverPosition, setLeverPosition] = useState(0);

  return (
    <SlideContext.Provider value={{ currentSlide, setCurrentSlide, leverPosition, setLeverPosition }}>
      {children}
    </SlideContext.Provider>
  );
}

export function useSlideContext() {
  const context = useContext(SlideContext);
  if (context === undefined) {
    throw new Error('useSlideContext must be used within a SlideProvider');
  }
  return context;
}
