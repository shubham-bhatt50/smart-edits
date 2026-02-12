'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  isExpanded: boolean;
  isMinimized: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  minimizeSidebar: () => void;
  restoreSidebar: () => void;
  // Shared sidebar content state
  activeScreenCount: number;
  hasWarning: boolean;
  setHasWarning: (val: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Shared content state that persists across minimize/restore
  const [hasWarning, setHasWarning] = useState(true);
  const activeScreenCount = 2; // matches the 2 hardcoded ScreenCards

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
    setIsMinimized(false);
  };

  const closeSidebar = () => {
    setIsExpanded(false);
    setIsMinimized(false);
  };

  const minimizeSidebar = () => {
    setIsExpanded(false);
    setIsMinimized(true);
  };

  const restoreSidebar = () => {
    setIsExpanded(true);
    setIsMinimized(false);
  };

  return (
    <SidebarContext.Provider value={{
      isExpanded, isMinimized,
      toggleSidebar, closeSidebar, minimizeSidebar, restoreSidebar,
      activeScreenCount, hasWarning, setHasWarning,
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
