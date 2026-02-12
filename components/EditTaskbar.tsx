'use client';

import { useState, useRef, useEffect } from 'react';
import {
  IconArrowLeft,
  IconSearch,
  IconWand,
  IconArrowsMaximize,
  IconX,
  IconCheck,
  IconPencil,
  IconLink,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEditSidebar, recommendations } from '@/contexts/EditSidebarContext';
import { useSearchParams } from 'next/navigation';

export default function EditTaskbar() {
  const router = useRouter();
  const {
    isEditSidebarOpen, isEditSidebarMinimized,
    openEditSidebar, restoreEditSidebar,
    selectedRec, setSelectedRec, appliedIds, isApplying,
    editMode, setEditMode,
  } = useEditSidebar();
  const searchParams = useSearchParams();
  const hasNoRecommendations = searchParams.get('recommendations') === '0';
  const [showPopover, setShowPopover] = useState(true);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const taskbarRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const minimizedInitializedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isEditSidebarMinimized && !minimizedInitializedRef.current) {
        // When minimized, position at top
        minimizedInitializedRef.current = true;
        initializedRef.current = false;
        setPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight - 50,
        });
      } else if (!isEditSidebarMinimized && !isEditSidebarOpen && !initializedRef.current) {
        // When not minimized/open, position at bottom center
        initializedRef.current = true;
        minimizedInitializedRef.current = false;
        setPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight - 50,
        });
      }
    }
  }, [isEditSidebarMinimized, isEditSidebarOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    e.preventDefault();
    setIsDragging(true);
    const rect = taskbarRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const taskbarWidth = taskbarRef.current?.offsetWidth || 400;
      const taskbarHeight = taskbarRef.current?.offsetHeight || 60;
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      const minX = taskbarWidth / 2;
      const maxX = window.innerWidth - taskbarWidth / 2;
      const minY = taskbarHeight / 2;
      const maxY = window.innerHeight - taskbarHeight / 2;
      setPosition({
        x: Math.max(minX, Math.min(newX, maxX)),
        y: Math.max(minY, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragStart]);

  // Show when minimized OR when not open/minimized (normal state)
  // BUT: In screen-info mode, we always show the taskbar (it's the main control)
  if (!position) return null;
  // Previously only hid in 'recommendations' mode. Now hide ALWAYS if sidebar is open.
  if (isEditSidebarOpen) return null;

  const handleOpenSidebar = () => {
    setShowPopover(false);
    if (isEditSidebarMinimized) {
      restoreEditSidebar();
    } else {
      openEditSidebar();
    }
  };

  // Build the condensed status label for minimized state
  const getMinimizedLabel = () => {
    if (isApplying) return 'Applying...';

    // 1. Screen Detail mode (New state)
    if (editMode === 'screen-detail') {
      return 'Screen 1';
    }

    // 2. Screen Edit mode (Row 2)
    if (editMode === 'screen-info') {
      return 'Select any image or text to edit';
    }

    // 2. Selected Recommendation (Row 4)
    if (selectedRec) {
      return selectedRec.title;
    }

    // 3. Applied recommendations (Row 5)
    if (appliedIds.size > 0) {
      return `${appliedIds.size}/${recommendations.length} AI recommendations applied`;
    }

    // 4. Recommendations found (Row 3)
    if (editMode === 'recommendations') {
      return `${recommendations.length} recommendations found`;
    }

    return 'Select any text or image to edit';
  };

  return (
    <div
      ref={taskbarRef}
      className="fixed z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Popover - show in Screen Edit mode pointing to AI Edit */}
      {showPopover && editMode === 'screen-info' && (
        <div className="absolute bottom-full left-[158px] mb-3 w-[340px]">
          <div className="bg-white rounded-xl shadow-xl border border-[#e2e8f0] p-4 relative">
            {/* Close button */}
            <button
              onClick={() => setShowPopover(false)}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
            >
              <IconX className="w-4 h-4 text-[#78716c]" strokeWidth={2} />
            </button>

            {/* Content */}
            <h3 className="font-semibold text-base text-[#0f172b] pr-6">AI powered recommendations</h3>
            <p className="text-sm text-[#62748e] mt-2 leading-relaxed">
              Make use of AI powered PII recommendations which you can redact from your screens
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#f1f5f9]">
              <button
                onClick={() => setShowPopover(false)}
                className="text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
              >
                Dismiss
              </button>
              <button
                onClick={handleOpenSidebar}
                className="h-9 px-5 bg-[#2563eb] hover:bg-[#1d4ed8] rounded-lg text-sm font-medium text-white transition-colors"
              >
                View
              </button>
            </div>
          </div>

          {/* Arrow pointing down to AI edits */}
          <div className="flex justify-center">
            <div className="w-4 h-4 bg-white border-r border-b border-[#e2e8f0] rotate-45 -mt-2.5" />
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="bg-[#1a1d2e] backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center justify-between gap-3 shadow-2xl border border-[#2a2d3e] select-none whitespace-nowrap w-[450px]">
        {/* Content based on Mode */}
        {editMode === 'recommendations' ? (
          /* RECOMMENDATIONS MODE (Rows 3, 4, 5) */
          <>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isApplying) return;
                  if (selectedRec) {
                    setSelectedRec(null);
                  } else {
                    setEditMode('screen-info');
                  }
                }}
                className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${isApplying ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isApplying}
              >
                <IconArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
              </button>

              {/* Text label */}
              <span className="text-white text-sm font-medium px-2 flex items-center gap-2">
                {getMinimizedLabel()}
                {/* Spinner */}
                {isApplying && (
                  <svg className="animate-spin w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
              </span>
            </div>

            {/* Right side actions - Recommendations Mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={openEditSidebar}
                className="w-9 h-9 bg-[#2a2d3e] hover:bg-[#3a3d4e] rounded-full flex items-center justify-center transition-colors"
                title="Expand"
              >
                <IconArrowsMaximize className="w-4 h-4 text-white" strokeWidth={2} />
              </button>
            </div>
          </>
        ) : editMode === 'screen-detail' ? (
          /* SCREEN DETAIL MODE (New State - "Screen 1") */
          <>
            <div className="flex items-center gap-2">
              {/* Back button - goes to previous page */}
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <IconArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
              </button>

              <span className="text-white text-sm font-medium px-2">
                {getMinimizedLabel()}
              </span>
            </div>

            {/* Right side actions group */}
            <div className="flex items-center gap-2">
              {/* Link button */}
              <button className="w-9 h-9 bg-[#2a2d3e] hover:bg-[#3a3d4e] rounded-full flex items-center justify-center transition-colors">
                <IconLink className="w-4 h-4 text-white" strokeWidth={2} />
              </button>

              {/* Edit icon (Pencil) - Triggers Screen Info Mode */}
              <button
                onClick={() => setEditMode('screen-info')}
                className="w-9 h-9 bg-[#2a2d3e] hover:bg-[#3a3d4e] rounded-full flex items-center justify-center transition-colors"
                title="Edit Screen"
              >
                <IconPencil className="w-4 h-4 text-white" strokeWidth={2} />
              </button>

              {/* Expand/fullscreen button */}
              <button
                onClick={openEditSidebar}
                className="w-9 h-9 bg-[#2a2d3e] hover:bg-[#3a3d4e] rounded-full flex items-center justify-center transition-colors"
                title="Expand"
              >
                <IconArrowsMaximize className="w-4 h-4 text-white" strokeWidth={2} />
              </button>
            </div>
          </>
        ) : (
          /* SCREEN INFO / EDIT MODE (Row 2) */
          <>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditMode('screen-detail')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <IconArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
              </button>

              <span className="text-white text-sm font-medium px-2">
                {getMinimizedLabel()}
              </span>
            </div>

            {/* Right side actions group */}
            <div className="flex items-center gap-2">
              {/* AI Edit Icon (Wand) - Triggers Recommendations/Edit Mode */}
              <button
                onClick={() => {
                  setEditMode('recommendations');
                  openEditSidebar();
                }}
                className="w-9 h-9 bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full flex items-center justify-center transition-colors"
                title="AI Powered Recommendations"
              >
                <IconWand className="w-4 h-4 text-white" strokeWidth={2} />
              </button>

              {/* Search button */}
              <button className="w-9 h-9 bg-[#2a2d3e] hover:bg-[#3a3d4e] rounded-full flex items-center justify-center transition-colors">
                <IconSearch className="w-4 h-4 text-white" strokeWidth={2} />
              </button>

              {/* Expand/fullscreen button */}
              <button
                onClick={openEditSidebar}
                className="w-9 h-9 bg-[#2a2d3e] hover:bg-[#3a3d4e] rounded-full flex items-center justify-center transition-colors"
                title="Expand"
              >
                <IconArrowsMaximize className="w-4 h-4 text-white" strokeWidth={2} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
