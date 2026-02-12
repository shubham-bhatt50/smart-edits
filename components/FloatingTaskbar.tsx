'use client';

import { useState, useRef, useEffect } from 'react';
import {
  IconGridDots,
  IconPlayerPause,
  IconPencil,
  IconCheck,
  IconArrowsMaximize,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/contexts/SidebarContext';

export default function FloatingTaskbar() {
  const router = useRouter();
  const { toggleSidebar, isExpanded, isMinimized, restoreSidebar, activeScreenCount, hasWarning } = useSidebar();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const taskbarRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const minimizedInitializedRef = useRef(false);

  useEffect(() => {
    // Initialize position based on state
    if (typeof window !== 'undefined') {
      if (isMinimized && !minimizedInitializedRef.current) {
        // When minimized, position at top
        minimizedInitializedRef.current = true;
        initializedRef.current = false;
        setPosition({
          x: 200,
          y: 40,
        });
      } else if (!isMinimized && !isExpanded && !initializedRef.current) {
        // When not minimized/expanded, position at bottom center
        initializedRef.current = true;
        minimizedInitializedRef.current = false;
        setPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight - 80,
        });
      }
    }
  }, [isMinimized, isExpanded]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from the taskbar background, not buttons
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

      // Constrain to viewport bounds
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

  // Show when minimized OR when not expanded/minimized (normal state)
  if (!position || isExpanded) {
    return null;
  }

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
      <div className="bg-[#1a1a1a] backdrop-blur-sm rounded-[12px] px-4 py-3 flex items-center gap-3 shadow-2xl border border-[#2a2a2a] select-none whitespace-nowrap flex-shrink-0">
        {/* Drag Icon (Grid) */}
        <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors flex-shrink-0 cursor-grab">
          <IconGridDots className="w-5 h-5 text-white/70" strokeWidth={1.5} />
        </button>

        {/* Pause Icon + Screen Mirroring Section */}
        <div className="flex items-center gap-2 px-3 py-1.5 flex-shrink-0">
          <IconPlayerPause className="w-5 h-5 text-white flex-shrink-0" strokeWidth={1.5} />
          <span className="text-white text-sm font-medium whitespace-nowrap">
            {activeScreenCount} Screens mirrored
          </span>
          {/* Warning indicator dot when minimized */}
          {isMinimized && hasWarning && (
            <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse flex-shrink-0" title="Sensitive information found" />
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#3a3a3a] flex-shrink-0" />

        {/* Edit Button (Pencil) */}
        <button
          onClick={() => router.push('/edit')}
          className="w-9 h-9 bg-[#2a2a2a] hover:bg-[#333333] rounded-full flex items-center justify-center transition-colors flex-shrink-0"
        >
          <IconPencil className="w-4 h-4 text-white" strokeWidth={2} />
        </button>

        {/* Done Button (Check) — also opens sidebar */}
        <button
          onClick={restoreSidebar}
          className="w-9 h-9 bg-[#2a2a2a] hover:bg-[#333333] rounded-full flex items-center justify-center transition-colors flex-shrink-0"
        >
          <IconCheck className="w-4 h-4 text-white" strokeWidth={2} />
        </button>

        {/* Expand Button */}
        <button
          onClick={restoreSidebar}
          className="w-9 h-9 bg-[#2a2a2a] hover:bg-[#333333] rounded-full flex items-center justify-center transition-colors flex-shrink-0"
        >
          <IconArrowsMaximize className="w-4 h-4 text-white" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

