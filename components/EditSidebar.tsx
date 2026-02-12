'use client';

import { useEditSidebar, recommendations } from '@/contexts/EditSidebarContext';
import {
  IconChevronLeft,
  IconLayoutSidebarLeftCollapse,
  IconMinus,
  IconX,
  IconWand,
  IconChevronRight,
  IconUsers,
  IconPlus,
  IconThumbUp,
  IconThumbDown,
  IconCheck,
  IconLink,
  IconPencil,
  IconPhoto,
  IconSearch,
} from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditSidebar() {
  const router = useRouter();
  const {
    isEditSidebarOpen, closeEditSidebar, minimizeEditSidebar,
    selectedRec, setSelectedRec, appliedIds, isApplying, handleApply,
    openEditSidebar, editMode, setEditMode,
  } = useEditSidebar();
  const searchParams = useSearchParams();
  const hasNoRecommendations = searchParams.get('recommendations') === '0';
  const [applicationScope, setApplicationScope] = useState<'screen' | 'workflow'>('screen');

  useEffect(() => {
    if (searchParams.get('sidebar') === 'true') {
      setEditMode('recommendations');
      openEditSidebar();
    } else {
      setEditMode('screen-info');
    }
  }, [searchParams, openEditSidebar, closeEditSidebar, setEditMode]);

  const handleBack = () => {
    if (isApplying) return;
    if (selectedRec) {
      setSelectedRec(null);
    } else if (editMode === 'recommendations') {
      setEditMode('screen-info');
    } else {
      // If in info view, maybe go back to home? The back button logic for info view isn't explicitly defined but typically back from root closes or goes home.
      // Based on UI, the header back button probably shouldn't show in info view or should look different. 
      // But let's assume it keeps going back.
      router.push('/');
    }
  };

  const handleClose = () => {
    if (isApplying) return;
    setSelectedRec(null);
    closeEditSidebar();
  };

  return (
    <>
      {/* Backdrop */}
      {isEditSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full z-50 transition-transform duration-300 ease-in-out flex ${isEditSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ width: '420px', maxWidth: '95vw' }}
      >
        {/* Left icon strip */}
        <div className="w-11 bg-[#1c1917] flex flex-col items-center py-3 gap-3 shrink-0">
          {/* App logo */}
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#ea580c] to-[#dc2626] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="6" height="14" rx="1" fill="white" opacity="0.9" />
              <rect x="10" y="2" width="6" height="6" rx="1" fill="white" opacity="0.7" />
            </svg>
          </div>

          {/* Users icon */}
          <button className="w-7 h-7 rounded-md hover:bg-white/10 flex items-center justify-center transition-colors">
            <IconUsers className="w-4 h-4 text-white/70" strokeWidth={1.5} />
          </button>

          {/* Plus icon */}
          <button className="w-7 h-7 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <IconPlus className="w-4 h-4 text-white/70" strokeWidth={1.5} />
          </button>

          <div className="flex-1" />

          {/* User avatar at bottom */}
          <div className="w-7 h-7 rounded-full bg-[#ea580c] flex items-center justify-center text-white font-semibold text-[10px]">
            T
          </div>
        </div>

        {/* Main panel */}
        <div className="flex-1 bg-[#f5f5f4] flex flex-col min-w-0">
          {/* Header */}
          <div className="bg-white border-b border-[#e7e5e4] px-3 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={handleBack}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
              >
                <IconChevronLeft className="w-4 h-4 text-[#78716c]" strokeWidth={2} />
              </button>
              <h1 className="font-semibold text-sm text-[#1c1917]">Edit</h1>
            </div>
            <div className="flex items-center gap-0.5">
              <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                <IconLayoutSidebarLeftCollapse className="w-3.5 h-3.5 text-[#78716c]" strokeWidth={2} />
              </button>
              <button
                onClick={minimizeEditSidebar}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
              >
                <IconMinus className="w-3.5 h-3.5 text-[#78716c]" strokeWidth={2} />
              </button>
              <button
                onClick={handleClose}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
              >
                <IconX className="w-3.5 h-3.5 text-[#78716c]" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
            {/* Edit with AI pill */}
            {editMode === 'recommendations' && (
              <div className="inline-flex self-start items-center gap-1.5 bg-[#eff6ff] border border-[#dbeafe] rounded-lg px-3 py-1.5">
                <IconWand className="w-4 h-4 text-[#2563eb]" strokeWidth={2} />
                <span className="text-sm font-medium text-[#2563eb]">Edit with AI</span>
              </div>
            )}

            {selectedRec ? (
              /* Detail view */
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="font-bold text-base text-[#1c1917]">{selectedRec.detailTitle}</h2>
                  <p className="text-sm text-[#78716c] mt-1 leading-relaxed">
                    {selectedRec.detailDescription}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-[#1c1917]">Replace with</label>
                  <input
                    type="text"
                    defaultValue={selectedRec.replaceWith}
                    className="w-full bg-white border-2 border-[#3b82f6] rounded-xl px-4 py-3 text-sm text-[#1c1917] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm text-[#78716c]">Rate this recommendation</span>
                  <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                    <IconThumbUp className="w-4 h-4 text-[#1c1917]" strokeWidth={2} />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                    <IconThumbDown className="w-4 h-4 text-[#1c1917]" strokeWidth={2} />
                  </button>
                </div>

                {/* Select application section */}
                <div className="flex flex-col gap-3 mt-2">
                  <h3 className="text-[15px] font-bold text-[#1c1917]">Select application</h3>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setApplicationScope('screen')}
                      className="flex items-center gap-3 group text-left"
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${applicationScope === 'screen' ? 'border-[#2563eb]' : 'border-[#d6d3d1]'}`}>
                        {applicationScope === 'screen' && <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${applicationScope === 'screen' ? 'text-[#1c1917]' : 'text-[#78716c]'}`}>Apply to this screen</span>
                    </button>

                    <button
                      onClick={() => setApplicationScope('workflow')}
                      className="flex items-center gap-3 group text-left"
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${applicationScope === 'workflow' ? 'border-[#2563eb]' : 'border-[#d6d3d1]'}`}>
                        {applicationScope === 'workflow' && <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />}
                      </div>
                      <span className={`text-sm font-medium transition-colors ${applicationScope === 'workflow' ? 'text-[#1c1917]' : 'text-[#78716c]'}`}>Apply to all screens in this workflow</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : editMode === 'recommendations' && (
              /* List view */
              <div className="flex flex-col gap-2.5">
                {hasNoRecommendations ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <IconWand className="w-6 h-6 text-gray-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm font-medium text-[#1c1917]">No recommendations found</h3>
                    <p className="text-xs text-[#78716c] mt-1 max-w-[200px]">
                      AI couldn't find any PII or sensitive data to redact on this screen.
                    </p>
                  </div>
                ) : (
                  recommendations.map((rec) => {
                    const isApplied = appliedIds.has(rec.id);
                    return (
                      <button
                        key={rec.id}
                        onClick={() => setSelectedRec(rec)}
                        className="w-full bg-white border border-[#e7e5e4] rounded-xl px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                      >
                        <div>
                          {isApplied && (
                            <div className="inline-flex items-center gap-1 bg-[#dcfce7] rounded-full px-2.5 py-1 mb-2">
                              <IconCheck className="w-3.5 h-3.5 text-[#16a34a]" strokeWidth={2.5} />
                              <span className="text-xs font-medium text-[#16a34a]">Applied</span>
                            </div>
                          )}
                          <h3 className="text-sm font-medium text-[#1c1917]">{rec.title}</h3>
                          <p className="text-xs text-[#78716c] mt-0.5">{rec.subtitle}</p>
                        </div>
                        <IconChevronRight className="w-4 h-4 text-[#a8a29e] shrink-0" strokeWidth={2} />
                      </button>
                    );
                  })
                )}
              </div>
            )}

            {/* Screen Detail Mode (New State - "Screen 1") */}
            {!selectedRec && editMode === 'screen-detail' && (
              <div className="flex flex-col h-full">
                <div className="bg-white border-[1.5px] border-[#3b82f6] rounded-xl overflow-hidden mb-4">
                  <div className="px-3 pt-3 pb-2 flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-[#0f172b]">Screen 1</h3>
                      <p className="text-xs text-[#78716c] mt-px">Click on the filter button</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                        <IconLink className="w-3.5 h-3.5 text-[#78716c]" strokeWidth={2} />
                      </button>
                      <button
                        onClick={() => setEditMode('screen-info')}
                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                      >
                        <IconPencil className="w-3.5 h-3.5 text-[#78716c]" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                  <div className="px-3 pb-3">
                    <div className="bg-[#f1f5f9] rounded h-32 flex items-center justify-center border border-[#e2e8f0]">
                      <IconPhoto className="w-8 h-8 text-[#94a3b8]" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => router.push('/')}
                    className="text-sm text-[#2563eb] font-medium hover:underline flex items-center gap-1"
                  >
                    <IconChevronLeft className="w-3 h-3" strokeWidth={3} />
                    Show all screens
                  </button>
                </div>
              </div>
            )}

            {/* Screen Info View / Screen Edit Mode (Row 2) */}
            {!selectedRec && editMode === 'screen-info' && (
              <div className="flex flex-col items-center justify-center h-full px-6 text-center pt-10">
                {/* Placeholder Illustration */}
                <div className="w-32 h-32 bg-[#f1f5f9] rounded-2xl flex items-center justify-center mb-6 border border-[#e2e8f0] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex flex-col items-center">
                    <IconSearch className="w-10 h-10 text-blue-500 mb-1 opacity-80" strokeWidth={1.5} />
                    <div className="flex -mt-2">
                      <IconWand className="w-6 h-6 text-blue-600 animate-pulse" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                <p className="text-sm font-medium text-[#1c1917] leading-relaxed max-w-[280px]">
                  Search for text to edit or manually select the elements or let AI find PII recommendations for you
                </p>
              </div>
            )}
          </div>

          {/* Bottom action bar - only show in detail view */}
          {selectedRec && (
            <div className="bg-white border-t border-[#e7e5e4] px-3 py-2.5 flex items-center justify-between shrink-0">
              <div className="w-7 h-7 rounded-full bg-[#ea580c] flex items-center justify-center text-white font-semibold text-[10px]">
                T
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedRec(null)}
                  disabled={isApplying}
                  className={`h-8 px-4 rounded-lg border border-[#d6d3d1] bg-white transition-colors ${isApplying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                >
                  <span className="text-xs font-medium text-[#1c1917]">Discard</span>
                </button>
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className={`h-8 px-4 rounded-lg transition-colors flex items-center gap-1.5 ${isApplying
                    ? 'bg-[#ea580c]/70 cursor-not-allowed'
                    : 'bg-[#ea580c] hover:bg-[#c2410c]'
                    }`}
                >
                  {isApplying && (
                    <svg className="animate-spin w-3 h-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  <span className="text-xs font-medium text-white">
                    {isApplying ? 'Applying...' : 'Apply'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
