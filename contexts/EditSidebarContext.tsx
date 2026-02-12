'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Recommendation {
  id: string;
  title: string;
  subtitle: string;
  detailTitle: string;
  detailDescription: string;
  replaceWith: string;
}

export const recommendations: Recommendation[] = [
  {
    id: 'health-records',
    title: 'Censor health records (5)',
    subtitle: 'Eg: SSN numbers',
    detailTitle: 'Censor health records (5)',
    detailDescription: 'Protect personal health records like SSN number and others for compliance',
    replaceWith: '123-123-1234',
  },
  {
    id: 'profile-pictures',
    title: 'Censor profile pictures (5)',
    subtitle: 'For privacy concerns',
    detailTitle: 'Censor profile pictures (5)',
    detailDescription: 'Blur or remove profile pictures to protect user identity and privacy',
    replaceWith: '[REDACTED]',
  },
];

interface EditSidebarContextType {
  isEditSidebarOpen: boolean;
  isEditSidebarMinimized: boolean;
  openEditSidebar: () => void;
  closeEditSidebar: () => void;
  toggleEditSidebar: () => void;
  minimizeEditSidebar: () => void;
  restoreEditSidebar: () => void;
  // Shared edit state
  selectedRec: Recommendation | null;
  setSelectedRec: (rec: Recommendation | null) => void;
  appliedIds: Set<string>;
  isApplying: boolean;

  handleApply: () => void;
  // Navigation state
  editMode: 'screen-detail' | 'screen-info' | 'recommendations';
  setEditMode: (mode: 'screen-detail' | 'screen-info' | 'recommendations') => void;
}

const EditSidebarContext = createContext<EditSidebarContextType | undefined>(undefined);

export function EditSidebarProvider({ children }: { children: ReactNode }) {
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);
  const [isEditSidebarMinimized, setIsEditSidebarMinimized] = useState(false);

  // Shared content state that persists across minimize/restore
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [isApplying, setIsApplying] = useState(false);
  const [editMode, setEditMode] = useState<'screen-detail' | 'screen-info' | 'recommendations'>('screen-info');

  const openEditSidebar = useCallback(() => {
    setIsEditSidebarOpen(true);
    setIsEditSidebarMinimized(false);
  }, []);

  const closeEditSidebar = useCallback(() => {
    setIsEditSidebarOpen(false);
    setIsEditSidebarMinimized(false);
  }, []);

  const toggleEditSidebar = useCallback(() => {
    setIsEditSidebarOpen((prev) => !prev);
    setIsEditSidebarMinimized(false);
  }, []);

  const minimizeEditSidebar = useCallback(() => {
    setIsEditSidebarOpen(false);
    setIsEditSidebarMinimized(true);
  }, []);

  const restoreEditSidebar = useCallback(() => {
    setIsEditSidebarOpen(true);
    setIsEditSidebarMinimized(false);
  }, []);

  const handleApply = useCallback(() => {
    if (selectedRec && !isApplying) {
      setIsApplying(true);
      setTimeout(() => {
        setAppliedIds((prev) => new Set(prev).add(selectedRec.id));
        setIsApplying(false);
        setSelectedRec(null);
      }, 2000);
    }
  }, [selectedRec, isApplying]);

  return (
    <EditSidebarContext.Provider value={{
      isEditSidebarOpen, isEditSidebarMinimized,
      openEditSidebar, closeEditSidebar, toggleEditSidebar, minimizeEditSidebar, restoreEditSidebar,
      selectedRec, setSelectedRec, appliedIds, isApplying, handleApply,
      editMode, setEditMode,
    }}>
      {children}
    </EditSidebarContext.Provider>
  );
}

export function useEditSidebar() {
  const context = useContext(EditSidebarContext);
  if (context === undefined) {
    throw new Error('useEditSidebar must be used within an EditSidebarProvider');
  }
  return context;
}
